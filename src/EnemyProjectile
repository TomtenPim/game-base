export default class EnemyProjectile {
  constructor(game, x, y, angle, bulletspeed) {
    this.game = game
    this.width = 10
    this.height = 10
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = 700 + bulletspeed
    this.damage = 1
    this.markedForDeletion = false
  }

  update(deltaTime) {
    if(!this.game.gameOver){
      const velocity = {
        x: this.speed * Math.cos(this.angle),
        y: this.speed * Math.sin(this.angle),
      }

      this.x += velocity.x * (deltaTime / 1000)
      this.y += velocity.y * (deltaTime / 1000)

      if (this.x > this.game.width) {
        this.markedForDeletion = true
      }
    }
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.fillStyle = '#f00'
    context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}
