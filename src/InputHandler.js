export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0

    this.spell = [1, 9]
    this.spread = [0.1, 0.3]
    this.cost = [0, 2]
    this.bulletspeed =[0, 200]

    this.gun = 0

    window.addEventListener('keydown', (event) => {
      if(!this.game.gameOver) {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd' ||
          event.key === ' ') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }

      if (event.key === '1') {
        this.gun = 0
      }
      if (event.key === '2') {
        this.gun = 1
      }
    }})

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener(' ', (event) => {

    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', (event) => {
      if(!this.game.gameOver || event.key == ' ') {
      this.game.player.shoot(this.mouseX, this.mouseY, this.spell[this.gun], this.spread[this.gun], this.cost[this.gun], this.gun, this.bulletspeed[this.gun])
    }
    })
  }
}
