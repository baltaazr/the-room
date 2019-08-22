import Room from '../room/room'

class Map {
  constructor() {
    this.level = 1
    this.rooms = new Array(this.level)
    this.initiateRooms()
  }

  initiateRooms = () => {
    const startingRoom = new Room(0, 0)

    const paths = [
      [0, 1, startingRoom],
      [1, 0, startingRoom],
      [0, -1, startingRoom],
      [-1, 0, startingRoom]
    ]
    const rooms = [startingRoom]
    const roomsStrings = ['0,0']
    for (let i = 0; i < this.level; i++) {
      const temp = paths.splice(Math.floor(Math.random() * paths.length), 1)
      temp[2].end = false
      const newRoom = new Room(temp[0], temp[1])
      const newPaths = this.getSurroundings(newRoom)
      for (let n = 0; n < newPaths.length; n++) {
        const newPath = newPaths[n]
        if (!roomsStrings.includes(`${newPath[0]},${newPath[1]}`)) {
          paths.push(newPath)
        }
      }
      rooms.push(newRoom)
      roomsStrings.push(`${newRoom.x},${newRoom.y}`)
    }

    const endingRooms = []

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i]
      if (room.end) {
        endingRooms.push(room)
      }
    }

    endingRooms[Math.floor(Math.random() * endingRooms.length)].trueEnd = true

    return rooms
  }

  getSurroundings = room => {
    return [
      [room.x, room.y + 1, room],
      [room.x + 1, room.y, room],
      [room.x, room.y - 1, room],
      [room.x - 1, room.y, room]
    ]
  }
}

export default Map
