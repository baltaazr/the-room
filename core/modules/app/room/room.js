import Config from 'config'

const EMPTY_CELL_VAL = Config.game.room.gridVals.empty
const ENEMY_CELL_VAL = Config.game.room.gridVals.enemy
const END_CELL_VAL = Config.game.room.gridVals.end
const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
const MONSTER_GRID_TIMEOUT_CONSTANT =
  Config.game.room.monsterGridTimeoutConstant
const LEVEL_ENEMY_INTERVAL = Config.game.room.levelEnemyInterval

class Room {
  constructor(x, y, map) {
    this.x = x
    this.y = y

    this.map = map

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
    const prevVal = this.grid[y + ROOM_RADIUS][x + ROOM_RADIUS]
    this.grid[y + ROOM_RADIUS][x + ROOM_RADIUS] = val

    if (val === ENEMY_CELL_VAL) {
      const timeout = setTimeout(() => {
        this.grid[y + ROOM_RADIUS][x + ROOM_RADIUS] =
          prevVal === END_CELL_VAL ? END_CELL_VAL : EMPTY_CELL_VAL
        clearTimeout(timeout)
      }, MONSTER_GRID_TIMEOUT_CONSTANT + this.map.level * LEVEL_ENEMY_INTERVAL)
    }
  }

  updateTunnels = (n, i, val) => {
    this.gridTunnels[n][i] = val

    if (val === ENEMY_CELL_VAL) {
      const timeout = setTimeout(() => {
        this.gridTunnels[n][i] = EMPTY_CELL_VAL
        clearTimeout(timeout)
      }, MONSTER_GRID_TIMEOUT_CONSTANT + this.map.level * LEVEL_ENEMY_INTERVAL)
    }
  }

  getVal = (x, y) => this.grid[y + ROOM_RADIUS][x + ROOM_RADIUS]

  getValTunnels = (n, i) => this.gridTunnels[n][i]

  generatePowerup = potionGridVal => {
    this.updateGrid(
      Math.floor(Math.random() * (ROOM_WIDTH - 2)) - ROOM_RADIUS + 1,
      Math.floor(Math.random() * (ROOM_HEIGHT - 2)) - ROOM_RADIUS + 1,
      potionGridVal
    )
  }
}

export default Room
