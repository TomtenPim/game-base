import Enemy from './Enemy.js'
import Sprite from './assets/peasant.png'

export default class Pumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 2
    this.lives = Math.floor(Math.random() * 3) + 1
    this.color = 'orange'
    this.sprite = new Image()
    this.sprite.src = Sprite
    this.type = 'pumpkin'
  }

  update(player) {
    if(!this.game.gameOver){
      const dx = player.x - this.x // calculate the x distance to the player
      const dy = player.y - this.y // calculate the y distance to the player
      const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
      const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
      const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
      this.x += speedX // move the enemy towards the player on the x axis
      this.y += speedY // move the enemy towards the player on the y axis
    }
  }
}
