import Enemy from './Enemy.js'
import Sprite from './assets/knight.png'

export default class ElitePumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 8
    this.lives = Math.floor(Math.random() * 3) + 7
    this.color = 'blue'
    this.type = 'elitePumpkin'
    this.sprite = new Image()
    this.sprite.src = Sprite
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
