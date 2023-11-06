import Projectile from './Projectile.js'
import SpriteGun from './assets/gunpireGun.png'
import SpriteShotgun from './assets/gunpireShotgun.png'
import SpriteMist from './assets/gunpireMist.png'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 32
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []
    this.sprite = new Image()
    this.sprite.src = SpriteGun 
    this.spriteshot = new Image()
    this.spriteshot.src = SpriteShotgun
    this.spritemist = new Image()
    this.spritemist.src = SpriteMist

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 7

    this.maxAmmo = 2
    this.ammo = 2
    this.ammoTimer = 0
    this.ammoInterval = 2000

    this.lives = 3
    this.mistMeter = 1000  
    this.dashing = true
    this.gun = 0
  }

  
  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    if(!this.game.gameOver){
      if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')|| this.game.keys.includes('A')) {
        this.speedX = -this.maxSpeed
      } else if (
        this.game.keys.includes('ArrowRight') ||
        this.game.keys.includes('d') ||
        this.game.keys.includes('D')
      ) {
        this.speedX = this.maxSpeed
      } else {
        this.speedX = 0
      }

      if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w') || this.game.keys.includes('W')) {
        this.speedY = -this.maxSpeed
      } else if (
        this.game.keys.includes('ArrowDown') ||
        this.game.keys.includes('s') ||
        this.game.keys.includes('S')
      ) {
        this.speedY = this.maxSpeed
      } else {
        this.speedY = 0
      }

      if (this.game.keys.includes('1')) {
        this.gun = 0
      }
      if (this.game.keys.includes('2')) {
        this.gun = 1
      }

      if (this.game.keys.includes(' ') && this.mistMeter > 40) {
        this.dashing = true
        this.mistMeter -= 10
        if(this.mistMeter < 0){
          this.mistMeter = 0
        }

      } else {
        this.dashing = false
      }

      if (this.mistMeter < 1000 && !this.dashing){
      this.mistMeter++
      }

      if(this.y > 0  && this.y < this.game.height-this.height){
        this.y += this.speedY
        } else{
          if  (this.y < this.game.height/2){
            this.y = 1
          } else {
            this.y = this.game.height-this.height-1
          }
        }
      
      if(this.x > 0  && this.x < this.game.width-this.width){
      this.x += this.speedX
      } else{
        if  (this.x < this.game.width/2){
          this.x = 1
        } else {
          this.x = this.game.width-this.width-1
        }
      }

      /*
      if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
        this.ammoTimer = 0
        this.ammo++
        if (this.ammo < this.maxAmmo) {
          this.ammo++
        }
      } else {
        this.ammoTimer += deltaTime
      }*/

      // projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update(deltaTime)
      })
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      )
    }
  }

  draw(context) {
    context.fillStyle = '#aaa'
    context.fillRect(this.x+7, this.y+7, this.width-14, this.height-14)

    if(this.dashing){
      context.drawImage(this.spritemist, this.x-1, this.y-1, this.width+4, this.height+4)
    }else if(this.gun == 1){
      context.drawImage(this.spriteshot, this.x-1, this.y-1, this.width+4, this.height+4)
    }else {
      context.drawImage(this.sprite, this.x-1, this.y-1, this.width+4, this.height+4)
    }

    /*if(!this.dashing){
      context.drawImage(this.sprite, this.x-1, this.y-1, this.width+4, this.height+4)
    }*/

    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  shoot(mouseX, mouseY, spell, spread, cost, gun, bulletspeed) {
    // get angle between player and mouse

    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    if (this.ammo > cost-1 || gun == 0) {
      this.ammo -= cost

      if(!this.dashing){
      for (let i = 0; i < spell; i++) {

        this.projectiles.push(
          new Projectile(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            (angle + (Math.random() - 0.5) * spread),
            ((Math.random() - 0.5) *bulletspeed)
          )
        )
      }}
    } else {
      console.log('out of ammo')
    }
  }
}

/*

 + this.projectiles.width / 2
*/