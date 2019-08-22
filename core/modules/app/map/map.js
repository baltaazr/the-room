class Map {
  constructor() {
    this.level = 1
    this.rooms = new Array(this.level)
    this.initiateRooms()
  }

  initiateRooms = () => {
    const paths = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    const rooms = [[0, 0]]
    const roomsStrings = ['0,0']
    for (let i = 0; i < this.level; i++) {
      const newRoom = paths.splice(Math.floor(Math.random() * paths.length), 1)
      const newPaths = this.getSurroundings(newRoom)
      for (let n = 0; n < newPaths.length; n++) {
        const newPath = newPaths[n]
        if (!roomsStrings.includes(`${newPath[0]},${newPath[1]}`)) {
          paths.push(newPath)
        }
      }
      rooms.push(newRoom)
      roomsStrings.push(`${newRoom[0]},${newRoom[1]}`)
    }
    return rooms
  }

  getSurroundings = room => {
    return [
      [room[0], room[1] + 1],
      [room[0] + 1, room[1]],
      [room[0], room[1] - 1],
      [room[0] - 1, room[1]]
    ]
  }
}

export default Map
