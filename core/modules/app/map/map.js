import Room from '../room/room'
import MapSprite from '../../interfaces/mapSprite/mapSprite'
import Helpers from '../../../utils/helpers'

import Config from 'config'

const POWERUPS = Config.game.powerups

class Map {
  constructor(p, player) {
    this.level = 1

    this.player = player

    this.sprite = new MapSprite(p, player)

    this.initiateRooms()
  }

  initiateRooms = () => {
    this.startingRoom = new Room(0, 0, this)
    this.rooms = { '0,0': this.startingRoom }
    const paths = [
      [0, 1, this.startingRoom, 'top'],
      [1, 0, this.startingRoom, 'left'],
      [0, -1, this.startingRoom, 'bottom'],
      [-1, 0, this.startingRoom, 'right']
    ]
    const roomsStrings = ['0,0']
    const rooms = [this.startingRoom]
    for (let i = 0; i < this.level; i++) {
      const temp = paths.splice(Math.floor(Math.random() * paths.length), 1)[0]
      temp[2].end = false
      const newRoom = new Room(temp[0], temp[1], this)
      // eslint-disable-next-line prefer-destructuring
      newRoom[temp[3]] = temp[2]
      temp[2][this.getOppositeDir(temp[3])] = newRoom
      const newPaths = this.getSurroundings(newRoom)
      for (let n = 0; n < newPaths.length; n++) {
        const newPath = newPaths[n]
        const tempRoomString = Helpers.getRoomRep(newPath[0], newPath[1])
        let notRepeat = true
        for (let a = 0; a < roomsStrings.length; a++) {
          const roomString = roomsStrings[a]
          if (roomString === tempRoomString) {
            notRepeat = false
          }
        }
        if (notRepeat) {
          paths.push(newPath)
        }
      }
      rooms.push(newRoom)

      const newRoomRep = Helpers.getRoomRep(newRoom.x, newRoom.y)
      this.rooms[newRoomRep] = newRoom
      roomsStrings.push(newRoomRep)

      Object.keys(POWERUPS).forEach(powerupColor => {
        const powerup = POWERUPS[powerupColor]
        if (Math.random() < powerup.probability) {
          newRoom.generatePowerup(powerup.gridVal)
        }
      })
    }

    const endingRooms = []

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i]
      if (room.end) {
        endingRooms.push(room)
      }
    }

    const trueEndingRoom =
      endingRooms[Math.floor(Math.random() * endingRooms.length)]

    trueEndingRoom.updateGrid(0, 0, 2)

    this.endingGlobalCoords = Helpers.relativeToGlobal(
      trueEndingRoom.x,
      trueEndingRoom.y
    )
    console.log(roomsStrings)
  }

  update = () => {
    this.sprite.draw(this.rooms)
  }

  isRoomExists = (x, y) => !!this.rooms[Helpers.getRoomRep(x, y)]

  getSurroundings = room => {
    return [
      [room.x, room.y + 1, room, 'top'],
      [room.x + 1, room.y, room, 'left'],
      [room.x, room.y - 1, room, 'bottom'],
      [room.x - 1, room.y, room, 'right']
    ]
  }

  getOppositeDir = dir => {
    switch (dir) {
      case 'bottom':
        return 'top'
      case 'left':
        return 'right'
      case 'top':
        return 'bottom'
      case 'right':
        return 'left'
      default:
        return ''
    }
  }

  getRoomByCoords = (x, y) => this.rooms[Helpers.getRoomRep(x, y)]
}

export default Map
