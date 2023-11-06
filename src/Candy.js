import Enemy from './Enemy'
import Sprite from './assets/ammo.png'

export default class Candy extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.sprite = new Image()
    this.sprite.src = Sprite
    this.type = 'candy'
  }
}
