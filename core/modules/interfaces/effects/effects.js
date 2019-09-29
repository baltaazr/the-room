import YellowEffectImg from 'assets/sprites/7_firespin_spritesheet.png'
import GreenEffectImg from 'assets/sprites/8_protectioncircle_spritesheet.png'
import RedEffectImg from 'assets/sprites/13_vortex_spritesheet.png'
import BlueEffectImg from 'assets/sprites/18_midnight_spritesheet.png'

const SPRITE_OFFSET_X = 8
const SPRITE_OFFSET_Y = 0
const SPRITE_INTERVAL = 2
const REVOLVE_INTERVAL = 16
const REVOLVE_RADIUS = 30
const SPRITE_DIMENSION = 40

function Effects(p, player) {
  this.p = p
  this.player = player

  this.element = document.getElementById('effect')

  this.effects = {}
  this.sprites = {}
}

Effects.prototype.loadSprites = function() {
  this.sprites.yellow = []
  this.p.loadImage(YellowEffectImg, img => {
    for (let r = 0; r < 8; r++) {
      const posR = r * 100
      for (let c = 0; c < (r === 7 ? 5 : 8); c++) {
        const posC = c * 100
        const sprite = img.get(posR, posC, 100, 100)
        this.sprites.yellow.push(sprite)
      }
    }
  })

  this.sprites.blue = []
  this.p.loadImage(BlueEffectImg, img => {
    for (let r = 0; r < 8; r++) {
      const posR = r * 100
      for (let c = 0; c < (r === 7 ? 5 : 8); c++) {
        const posC = c * 100
        const sprite = img.get(posR, posC, 100, 100)
        this.sprites.blue.push(sprite)
      }
    }
  })

  this.sprites.green = []
  this.p.loadImage(GreenEffectImg, img => {
    for (let r = 0; r < 8; r++) {
      const posR = r * 100
      for (let c = 0; c < (r === 7 ? 5 : 8); c++) {
        const posC = c * 100
        const sprite = img.get(posR, posC, 100, 100)
        this.sprites.green.push(sprite)
      }
    }
  })

  this.sprites.red = []
  this.p.loadImage(RedEffectImg, img => {
    for (let r = 0; r < 8; r++) {
      const posR = r * 100
      for (let c = 0; c < (r === 7 ? 5 : 8); c++) {
        const posC = c * 100
        const sprite = img.get(posR, posC, 100, 100)
        this.sprites.red.push(sprite)
      }
    }
  })
}

Effects.prototype.addEffect = function(name, description) {
  this.effects[name] = description
}

Effects.prototype.removeEffect = function(name) {
  delete this.effects[name]
}

Effects.prototype.draw = function() {
  const totalString = Object.keys(this.effects)
    .map(key => `${this.effects[key]}<br/>`)
    .join(' ')

  this.element.innerHTML = totalString

  const { YELLOW, BLUE, GREEN, RED } = this.effects
  const { x, y } = this.player.controls.windowPos
  const spriteIndex = Math.floor(this.p.frameCount / SPRITE_INTERVAL) % 61

  this.p.push()
  this.p.imageMode(this.p.CENTER)
  if (YELLOW) {
    this.p.image(
      this.sprites.yellow[spriteIndex],
      x +
        SPRITE_OFFSET_X +
        Math.cos(this.p.frameCount / REVOLVE_INTERVAL) * REVOLVE_RADIUS,
      y +
        SPRITE_OFFSET_Y +
        Math.sin(this.p.frameCount / REVOLVE_INTERVAL) * REVOLVE_RADIUS,
      SPRITE_DIMENSION,
      SPRITE_DIMENSION
    )
  }

  if (BLUE) {
    this.p.image(
      this.sprites.blue[spriteIndex],
      x +
        SPRITE_OFFSET_X +
        Math.cos(this.p.frameCount / REVOLVE_INTERVAL + Math.PI / 2) *
          REVOLVE_RADIUS,
      y +
        SPRITE_OFFSET_Y +
        Math.sin(this.p.frameCount / REVOLVE_INTERVAL + Math.PI / 2) *
          REVOLVE_RADIUS,
      SPRITE_DIMENSION,
      SPRITE_DIMENSION
    )
  }

  if (GREEN) {
    this.p.image(
      this.sprites.green[spriteIndex],
      x +
        SPRITE_OFFSET_X +
        Math.cos(this.p.frameCount / REVOLVE_INTERVAL + Math.PI) *
          REVOLVE_RADIUS,
      y +
        SPRITE_OFFSET_Y +
        Math.sin(this.p.frameCount / REVOLVE_INTERVAL + Math.PI) *
          REVOLVE_RADIUS,
      SPRITE_DIMENSION,
      SPRITE_DIMENSION
    )
  }

  if (RED) {
    this.p.image(
      this.sprites.red[spriteIndex],
      x +
        SPRITE_OFFSET_X +
        Math.cos(this.p.frameCount / REVOLVE_INTERVAL - Math.PI / 2) *
          REVOLVE_RADIUS,
      y +
        SPRITE_OFFSET_Y +
        Math.sin(this.p.frameCount / REVOLVE_INTERVAL - Math.PI / 2) *
          REVOLVE_RADIUS,
      SPRITE_DIMENSION,
      SPRITE_DIMENSION
    )
  }

  this.p.pop()
}

export default Effects
