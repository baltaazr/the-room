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
    this.floorGrid = new Array(ROOM_WIDTH)
    for (let r = 0; r < ROOM_WIDTH; r++) {
      this.floorGrid[r] = new Array(ROOM_HEIGHT)
      for (let c = 0; c < ROOM_HEIGHT; c++) {
        this.floorGrid[r][c] = Math.floor(Math.random() * 12)
      }
    }
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
    this.grid[x + ROOM_RADIUS][y + ROOM_RADIUS] = val
  }

  getVal = (x, y) => this.grid[x + ROOM_RADIUS][y + ROOM_RADIUS]
}

export default Room
