import Enemy from './Enemy.js'
import EnemyProjectile from './EnemyProjectile'
import Sprite from './assets/hunter.png'

export default class Squash extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 2
    this.lives = Math.floor(Math.random() * 2) + 1
    this.color = '#FF0'
    this.shootTimer = 0
    this.shootOffset = 0
    this.shootInterval = 200
    this.sprite = new Image()
    this.sprite.src = Sprite
    this.type = 'squash'
  }

  update(player, deltaTime) {
    if(!this.game.gameOver){
      const dx = player.x - this.x // calculate the x distance to the player
      const dy = player.y - this.y // calculate the y distance to the player
      const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
      const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
      const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
      if (distance > 400){
        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis
      }else if(distance < 390){
        this.x += speedX/-1.5 // move the enemy away from the player on the x axis
        this.y += speedY/-1.5 // move the enemy away from the player on the y axis        
      }
      
      if (this.shootTimer > (this.shootInterval + this.shootOffset) ){
        this.shoot(this.game.player,this.x,this.y)
        this.shootOffset = (Math.random()-0.5)*this.shootInterval/2
        this.shootTimer = 0
      }
      this.shootTimer++
    }
  }

  shoot(player,x,y){

    const angle = Math.atan2(
      player.y - (y + this.height / 2),
      player.x - (x + this.width / 2)
    )

    let projectileX =( this.x + this.width / 2)
    let projectileY =( this.y + this.height / 2)
        this.game.enemyProjectiles.push(
          new EnemyProjectile(
            this.game,
            projectileX,
            projectileY,
            angle,
            -200
          )
        )         
  }
}
