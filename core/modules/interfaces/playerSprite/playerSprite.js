import PlayerWalkImg from '../../../assets/Owlet_Monster_Walk_6.png'
import PlayerIdleImg from '../../../assets/Owlet_Monster_Idle_4.png'

// change every 5 frames
const SPRITE_CHANGE_IDLE_FRAME = 5
const SPRITE_CHANGE_WALK_FRAME = 2

class PlayerSprite {
  constructor(p, player) {
    this.p = p
    this.player = player

    this.isFlipped = false
    this.isSetup = false
  }

  loadSprite = () => {
    this.walkingImgs = []
    this.idleImgs = []

    this.p.loadImage(PlayerWalkImg, img => {
      for (let i = 0; i < 6; i++) {
        const pos = i * 32
        const sprite = img.get(pos, 0, 32, 32)
        this.walkingImgs.push(sprite)
      }
    })

    this.p.loadImage(PlayerIdleImg, img => {
      for (let i = 0; i < 4; i++) {
        const pos = i * 32
        const sprite = img.get(pos, 0, 32, 32)
        this.idleImgs.push(sprite)
      }
    })
  }

  draw = windowPos => {
    const { x: wx, y: wy } = windowPos

    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */

    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    if (this.walkingImgs.length) {
      if (this.isFlipped) this.p.scale(-1, 1)

      const { frameCount } = this.p
      const sprite = this.player.isIdle
        ? this.idleImgs[Math.floor(frameCount / SPRITE_CHANGE_IDLE_FRAME) % 3]
        : this.walkingImgs[
            Math.floor(frameCount / SPRITE_CHANGE_WALK_FRAME) % 5
          ]

      this.p.imageMode(this.p.CENTER)
      this.p.image(sprite, wx * (this.isFlipped ? -1 : 1), wy)
    } else this.p.rect(wx, wy, 20, 20)
    this.p.pop()

    // this.flashlight(wx, wy)
  }

  flipLeft = () => (this.isFlipped = true)

  flipRight = () => (this.isFlipped = false)

  // flashlight = (wx, wy) => {
  //   // flashlight effect
  //   // canvas image frame
  //   this.p.loadPixels()

  //   const lightRadius = 100

  //   for (let y = 0; y < this.p.height; y++) {
  //     for (let x = 0; x < this.p.width; x++) {
  //       // // Calculate the 1D location from a 2D grid
  //       const loc = (x + y * this.p.width) * 4
  //       // Get the R,G,B values from image
  //       let r = this.p.pixels[loc]
  //       let g = this.p.pixels[loc + 1]
  //       let b = this.p.pixels[loc + 2]

  //       // Calculate an amount to change brightness based on proximity to the mouse
  //       const distance = this.p.dist(x, y, wx, wy)
  //       const adjustLightness = this.p.map(distance, 0, lightRadius, 1, 0)

  //       r *= adjustLightness
  //       g *= adjustLightness
  //       b *= adjustLightness

  //       r = this.p.constrain(r, 0, 255)
  //       g = this.p.constrain(r, 0, 255)
  //       b = this.p.constrain(r, 0, 255)

  //       //   let newLightness = this.p.lightness(rgb)
  //       //   newLightness += adjustLightness
  //       //   // Constrain RGB to make sure they are within 0-255 color range
  //       //   newLightness = this.p.constrain(newLightness, 0, 255)
  //       //   let hsv = this.p.color(
  //       //     'hsl(this.p.hue(rgb), this.p.saturation(rgb), newLightness)'
  //       //   )
  //       //   rgb = this.p.color(this.p.red(hsv), this.p.green(hsv), this.p.blue(hsv))

  //       // Make a new color and set pixel in the window
  //       // color c = color(r, g, b);
  //       this.p.pixels[loc] = r
  //       this.p.pixels[loc + 1] = g
  //       this.p.pixels[loc + 2] = b
  //       this.p.pixels[loc + 3] = 255
  //     }
  //   }

  //   this.p.updatePixels()
  // }
}

export default PlayerSprite
