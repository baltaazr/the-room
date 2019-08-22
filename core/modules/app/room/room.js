class Room {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.grid = new Array(9)
    for (let i = 0; i < 10; i++) {
      this.grid[i] = new Array(9)
    }
    this.end = true
  }

  updateGrid = (x, y, val) => {
    this.grid[x + 4][y + 4] = val
  }
}

export default Room
