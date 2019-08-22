class PlayerSprite {
  constructor(p) {
    this.p = p
    this.globalPos = null
    this.windowPos = null

    this.isSetup = false
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
