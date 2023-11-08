import Projectile from "./Projectile"

export default class Enemy {
  constructor(game, color) {
    this.game = game
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
    this.markedForDeletion = false
    this.color = color
    this.type = 'enemy'

    this.projectiles = []
    this.exploding = false
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX
    if (this.x < 0 || this.x > this.game.width) this.markedForDeletion = true
    if (this.y < 0 || this.y > this.game.height) this.markedForDeletion = true

    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    //context.fillStyle = this.color
    //context.fillRect(this.x, this.y, this.width, this.height)
    context.drawImage(this.sprite, this.x, this.y, this.width, this.height)

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  explode(bullets) {
      this.exploding = true
      for(let i = 0; i < bullets; i++){
        let angle = ((Math.random() - 0.5) * 6.3)
        this.game.player.projectiles.push(
          new Projectile(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle,
            0
          )
        )
      }
  }
}