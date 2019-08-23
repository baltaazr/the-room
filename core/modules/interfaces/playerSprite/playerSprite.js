// import PlayerWalkImg from '../../../assets/Owlet_Monster_Walk_6.png'

class PlayerSprite {
  constructor(p) {
    this.p = p
    this.globalPos = null
    this.windowPos = null

    this.isSetup = false
  }

  // loadSprite = () => {
  //   this.imageData = []
  //   const newImage = new Image()
  //   newImage.onload = () => {
  //     Promise.all([
  //       // Cut out two sprites from the sprite sheet
  //       createImageBitmap(newImage, 0, 0, 32, 32),
  //       createImageBitmap(newImage, 32, 0, 32, 32),
  //       createImageBitmap(newImage, 64, 0, 32, 32),
  //       createImageBitmap(newImage, 128, 0, 32, 32),
  //       createImageBitmap(newImage, 160, 0, 32, 32),
  //       createImageBitmap(newImage, 192, 0, 32, 32)
  //     ]).then(sprites => {
  //       // Draw each sprite onto the canvas
  //       this.imageData.push(...sprites)
  //       console.log(this.imageData)
  //     })
  //   }
  //   newImage.src = PlayerWalkImg
  // }

  draw = (windowPos, globalPos) => {
    const { x: wx, y: wy } = windowPos
    const { x: gx, y: gy } = globalPos

    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */
    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    // if (this.imageData.length) {
    // console.log(this.imageData[this.p.frameCount % 5])
    // this.p.image(this.imageData[this.p.frameCount % 5], wx, wy)
    // } else
    this.p.rect(wx, wy, 20, 20)
    this.p.pop()

    /* -------------------------------------------------------------------------- */
    /*                                  FOR DEBUG                                 */
    /* -------------------------------------------------------------------------- */
    this.p.push()
    this.p.fill(255)
    this.p.textAlign(this.p.CENTER, this.p.CENTER)
    this.p.text(`x:${gx.toFixed(1)} y:${gy.toFixed(1)}`, 100, 10)
    this.p.pop()
  }
}

export default PlayerSprite
