import PlayerWalkImg from '../../../assets/Owlet_Monster_Walk_6.png'

class PlayerSprite {
  constructor(p) {
    this.p = p

    this.isFlipped = false
    this.isSetup = false
  }

  loadSprite = () => {
    this.imageData = []

    this.p.loadImage(PlayerWalkImg, img => {
      for (let i = 0; i < 6; i++) {
        const pos = i * 32
        const sprite = img.get(pos, 0, 32, 32)
        this.imageData.push(sprite)
      }
    })
  }

  draw = windowPos => {
    const { x: wx, y: wy } = windowPos

    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */
    this.flashlight(wx, wy)
    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    if (this.imageData.length) {
      if (this.isFlipped) this.p.scale(-1, 1)

      this.p.imageMode(this.p.CENTER)
      this.p.image(
        this.imageData[this.p.frameCount % 5],
        wx * (this.isFlipped ? -1 : 1),
        wy
      )
    } else this.p.rect(wx, wy, 20, 20)
    this.p.pop()
  }

  flipLeft = () => (this.isFlipped = true)

  flipRight = () => (this.isFlipped = false)

  flashlight = (wx, wy) => {
    //flashlight effect
    //canvas image frame
    this.cimg = this.p.get()
    this.p.pixelDensity(0.5)
    this.cimg.loadPixels()

    for (let x = 0; x < this.cimg.width; x++) {
      for (let y = 0; y < this.cimg.height; y++) {
        //this.cimg.set(x, y, this.p.color(0, 90, 102))
        // // Calculate the 1D location from a 2D grid
        let loc = (x + y * this.cimg.width) * 4
        // Get the R,G,B values from image
        let r, g, b
        r = this.cimg.pixels[loc]
        g = this.cimg.pixels[loc + 1]
        b = this.cimg.pixels[loc + 2]

        // Calculate an amount to change brightness based on proximity to the mouse
        let lightRadius = 100
        var distance = this.p.dist(x, y, wx, wy)
        var adjustLightness = this.p.map(distance, 0, lightRadius, 1, 0)
        r *= adjustLightness
        r = this.p.constrain(r, 0, 255)
        g *= adjustLightness
        g = this.p.constrain(r, 0, 255)
        b *= adjustLightness
        b = this.p.constrain(r, 0, 255)

        //   let newLightness = this.p.lightness(rgb)
        //   newLightness += adjustLightness
        //   // Constrain RGB to make sure they are within 0-255 color range
        //   newLightness = this.p.constrain(newLightness, 0, 255)
        //   let hsv = this.p.color(
        //     'hsl(this.p.hue(rgb), this.p.saturation(rgb), newLightness)'
        //   )
        //   rgb = this.p.color(this.p.red(hsv), this.p.green(hsv), this.p.blue(hsv))

        // Make a new color and set pixel in the window
        //color c = color(r, g, b);
        let pixloc = (y * this.cimg.width + x) * 4
        this.cimg.pixels[pixloc] = r
        this.cimg.pixels[pixloc + 1] = g
        this.cimg.pixels[pixloc + 2] = b
        this.cimg.pixels[pixloc + 3] = 255
      }
    }
    this.cimg.updatePixels()
    this.p.image(this.cimg, 100, 80, 100, 80)
    this.p.set(0, 0, this.cimg)
  }
}

export default PlayerSprite
