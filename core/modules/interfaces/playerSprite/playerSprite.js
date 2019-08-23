import PlayerWalkImg from '../../../assets/Owlet_Monster_Walk_6.png'

class PlayerSprite {
  constructor(p) {
    this.p = p
    this.globalPos = null
    this.windowPos = null

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

  draw = (windowPos, globalPos) => {
    const { x: wx, y: wy } = windowPos
    const { x: gx, y: gy } = globalPos

    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */
    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    if (this.imageData.length) {
      if (this.isFlipped) this.p.scale(-1, 1)

      this.p.image(
        this.imageData[this.p.frameCount % 5],
        (wx + (this.isFlipped ? 32 : 0)) * (this.isFlipped ? -1 : 1),
        wy
      )
    } else this.p.rect(wx, wy, 20, 20)
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

  flipLeft = () => (this.isFlipped = true)

  flipRight = () => (this.isFlipped = false)
}

export default PlayerSprite
