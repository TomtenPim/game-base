import Enemy from './Enemy.js'
import EnemyProjectile from './EnemyProjectile.js'
import Sprite from './assets/vampirehunter.png'


export default class EliteSquash extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 2
    this.lives = Math.floor(Math.random() * 2) + 2
    this.color = '#FFF'
    this.shootTimer = 0
    this.shootOffset = 0
    this.shootInterval = 200
    this.projectiles = []
    this.burst = 2
    this.shootCooldown = 0
    this.sprite = new Image()
    this.sprite.src = Sprite
    this.type = 'eliteSquash'
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
      
      if (this.shootTimer > (this.shootInterval + this.shootOffset) || this.burst > 0){

        if(this.burst < 0){
          this.burst = 1
        }
        
        if(this.shootCooldown <= 0){

          console.log(this.burst)

          this.shoot(this.game.player,this.x,this.y)
          this.burst--
          this.shootCooldown = 10
        }
        
       
        if(this.burst < 0){
          this.shootTimer = 0
          this.shootOffset = (Math.random()-0.5)*this.shootInterval/2
        }  
      }
      this.shootTimer++
      this.shootCooldown--
    }
  }

  shoot(player,x,y){

/*
    tx = 2(t * 600) / (-(player.y+(player.height/2) - projectile position) + sqrt(b^2 -4(time * (175/3)*7)(time * projectile speed)))
    ty = 2(t * 600) / (-(target position - projectile position) + sqrt(b^2 -4(time * target speed)(time * projectile speed)))



    bullet speed  600
    guy speed     7*58.3333333

    
    t*Sb = Position (target initial) + Velocity (target initial)*t - Position (bullet initial)

    t*600 = player.x+(player.height/2), player.y+(player.height/2) + player.speedX,player.speedY*t - (x + this.width / 2),(y + this.height / 2)
    tx*600 = player.x+(player.height/2) + player.speedX*t - (x + this.width / 2)    
    ty*600 = player.y+(player.height/2) + player.speedY*t - (y + this.height / 2)

    tx = (player.x+(player.height/2) + player.speedX*t - (x + this.width / 2))/600    
    ty = (player.y+(player.height/2) + player.speedY*t - (y + this.height / 2))/600

    t = 

    Position (bullet initial) + Vb*t = Position (target initial) + Velocity (target initial)*t


    playerWillBeX = 



    t =  2c / (-b + sqrt(b^2 -4ac))

    distance = Math.SQRT2(Math.pow(player.y+(player.height/2) - (y + this.height / 2),2) + Math.pow(player.x+(player.height/2) - (x + this.width / 2),2))
    

    t =  2(t*600) / (-(distance) + Math.SQRT2(()*() -4ac)) / (-b + sqrt(b^2 -4ac))
*/
    

    const angle = Math.atan2(
      player.y+(player.height/2) - (y + this.height / 2),
      player.x+(player.height/2) - (x + this.width / 2)
    )

    let projectileX =( this.x + this.width / 2)
    let projectileY =( this.y + this.height / 2)
        this.game.enemyProjectiles.push(
          new EnemyProjectile(
            this.game,
            projectileX,
            projectileY,
            angle,
            +100
          )
        )          
  }
}
