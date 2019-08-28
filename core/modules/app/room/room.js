import Config from 'config'

const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
class Room {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.grid = new Array(ROOM_WIDTH)
    for (let i = 0; i < ROOM_WIDTH; i++) {
      this.grid[i] = new Array(ROOM_HEIGHT)
    }
    // [TOP,BOTTOM,LEFT,RIGHT] NEGATIVE -> POSITIVE
    this.gridTunnels = new Array(4)
    for (let i = 0; i < 4; i++) {
      this.gridTunnels[i] = new Array(3)
    }

    this.floorGrid = new Array(ROOM_WIDTH)
    for (let r = 0; r < ROOM_WIDTH; r++) {
      this.floorGrid[r] = new Array(ROOM_HEIGHT)
      for (let c = 0; c < ROOM_HEIGHT; c++) {
        this.floorGrid[r][c] = Math.floor(Math.random() * 12)
      }
    }
    // [TOP,BOTTOM,LEFT,RIGHT] NEGATIVE -> POSITIVE
    this.floorGridTunnels = new Array(4)
    for (let i = 0; i < 4; i++) {
      this.floorGridTunnels[i] = new Array(3)
      for (let n = 0; n < 3; n++) {
        this.floorGridTunnels[i][n] = Math.floor(Math.random() * 12)
      }
    }
    this.end = true
  }

  updateGrid = (x, y, val) => {
    this.grid[y + ROOM_RADIUS][x + ROOM_RADIUS] = val
  }

  updateTunnels = (n, i, val) => {
    this.gridTunnels[n][i] = val
  }

  getVal = (x, y) => this.grid[y + ROOM_RADIUS][x + ROOM_RADIUS]

  getValTunnels = (n, i) => this.gridTunnels[n][i]

  generatePowerup = potionGridVal => {
    this.updateGrid(
      Math.floor(Math.random() * ROOM_WIDTH - ROOM_RADIUS),
      Math.floor(Math.random() * ROOM_HEIGHT - ROOM_RADIUS),
      potionGridVal
    )
  }
}

export default Room
