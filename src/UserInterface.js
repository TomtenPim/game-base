export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Lives: ${this.game.player.lives}`, 20, 30)
    context.fillText(`Ammo: ${this.game.player.ammo}`, 20, 60)
    context.fillText(`Mist: ${this.game.player.mistMeter /10}`, 20, 90)
    context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 20, 120)
    context.fillText(`Kills: ${this.game.enemyKilled}`, 20, 150)

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 50
      )
      context.fillText(
        'press r to restart',
        this.game.width / 2,
        this.game.height / 2 + 10
      )

      context.fillText(
        'w,a,s,d or arrow keys to move',
        this.game.width / 2,
        this.game.height / 2 + 130
      )
      context.fillText(
        'click to shoot',
        this.game.width / 2,
        this.game.height / 2 + 180
      )
      context.fillText(
        '1 or 2 to swich weapons',
        this.game.width / 2,
        this.game.height / 2 + 230
      )
      context.fillText(
        'hold spacebar for intangibility',
        this.game.width / 2,
        this.game.height / 2 + 280
      )

    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    context.restore()
  }
}
