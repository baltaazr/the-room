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
    this.end = true
  }

  updateGrid = (x, y, val) => {
    this.grid[x + ROOM_RADIUS][y + ROOM_RADIUS] = val
  }
}

export default Room
