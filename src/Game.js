import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Candy from './Candy.js'
import Squash from './Squash.js'
import EliteSquash from './EliteSquash.js'
import ElitePumpkin from './ElitePumpkin.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.enemies = []
    this.enemyProjectiles = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.enemyKilled = 0
    this.mistMeter = 100


    this.player = new Player(this)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    
      if (this.enemyTimer > (this.enemyInterval*(Math.pow(0.75, this.enemyKilled/80)))) {
        if (Math.random() < 0.2) {
          let x = (Math.random()*this.width)-32
          let y = (Math.random()*this.height)-32
          this.enemies.push(new Candy(this, x, y))
        } else {
          let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
          let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
          if (x === 0) {
            y = Math.random() * this.height // if on left edge, randomize y position
          } else if (x === this.width) {
            y = Math.random() * this.height // if on right edge, randomize y position
          } else if (y === 0) {
            x = Math.random() * this.width // if on top edge, randomize x position
          } else {
            x = Math.random() * this.width // if on bottom edge, randomize x position
          }

          if((Math.random()-this.gameTime* 0.0000001) < 0.15){
            if((Math.random()-this.gameTime* 0.00000005+0.045) < 0.05){
              this.enemies.push(new EliteSquash(this, x, y))
            }else if((Math.random()-this.gameTime* 0.0000001+0.05) < 0.20){
              this.enemies.push(new ElitePumpkin(this, x, y))
            }
            else{
              this.enemies.push(new Squash(this, x, y))
            }
          }else{
            this.enemies.push(new Pumpkin(this, x, y))
          }
        }
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
    

      this.player.update(deltaTime)

      this.enemyProjectiles.forEach((enemyProjectile) => {
        if (this.checkCollision(enemyProjectile, this.player)){
          this.player.lives--
          enemyProjectile.markedForDeletion = true
        }
      })
    }

    this.enemies.forEach((enemy) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        if (enemy.type === 'candy') {
          this.player.ammo += 5
          this.player.lives++

        }
        this.player.lives--
        enemy.markedForDeletion = true
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.type === 'candy') {
            enemy.explode(20)
            this.enemyKilled--
          }
          
          enemy.lives -= projectile.damage

          if (enemy.lives < 1){
            enemy.markedForDeletion = true
            this.enemyKilled++
          }
          projectile.markedForDeletion = true
        }
      })
    })

    this.enemyProjectiles.forEach((enemyProjectile) => {
      enemyProjectile.update(deltaTime)
    })
    this.enemyProjectiles = this.enemyProjectiles.filter(
      (enemyProjectile) => !enemyProjectile.markedForDeletion
    )

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.enemyProjectiles.forEach((enemyProjectile) => {
      enemyProjectile.draw(context)
    })
  }

  checkCollision(object1, object2) {
    if (object1.dashing != true && object2.dashing != true) {
      return (
        object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.height + object1.y > object2.y
      )
    }
  }
}
