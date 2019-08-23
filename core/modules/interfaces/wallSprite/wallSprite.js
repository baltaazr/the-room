import WallTilesImg from '../../../assets/Dungeon_Tileset.png'

class WallSprite {
  constructor(p) {
    this.p = p
  }

  loadSprite = () => {
    this.p.loadImage(WallTilesImg, img => {
      this.wall = img.get(8, 0, 80, 80)
      this.vertWall = img.get(8, 16, 8, 16)
      this.horzWall = img.get(16, 0, 16, 16)
      this.horzWallU = img.get(64, 80, 32, 16)
      this.vertHall = img.get(0, 97, 32, 32)
      this.horzHall = img.get(0, 96, 32, 16)
    })
  }

  draw = () => {
    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */
    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    this.p.image(this.vertWall, -30, -30)
    this.p.image(this.horzWallU, 10, 10)
    this.drawWall({ top: true, bottom: true }, 0, 0)
    this.p.pop()
  }

  /**
   * entrances: {
   *  top: bool,
   *  bottom: bool,
   *  left: bool,
   *  right: bool
   * }
   */
  drawWall = (entrances, x, y) => {
    this.p.image(this.wall, x, y)
    if (entrances.top) this.p.image(this.vertHall, x + 24, y - 16)
    if (entrances.bottom) this.p.image(this.vertHall, x + 24, y + 64)
  }

  flipLeft = () => (this.isFlipped = true)

  flipRight = () => (this.isFlipped = false)
}

export default WallSprite
