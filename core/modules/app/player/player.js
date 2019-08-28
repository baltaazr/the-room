import PlayerSprite from '../../interfaces/playerSprite/playerSprite'
import Helpers from '../../../utils/helpers'

import Controls from './controls'

import Config from 'config'

const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height

export default class Player {
  constructor(p, playerMove) {
    this.playerMove = playerMove
    this.controls = new Controls(p, this)

    this.sprite = new PlayerSprite(p, this)

    this.powerups = { red: false, blue: false, yellow: false, green: false }
  }

  registerMap = map => {
    this.map = map

    this.controls.registerMap(map)
  }

  update = () => {
    this.controls.tick()
    this.sprite.draw(...this.controls.getPosData())
  }

  getRoomNRoomCoords = () => {
    const relativeCoords = Helpers.globalToRelative(
      this.controls.globalPos.x,
      this.controls.globalPos.y
    )
    const room = this.map.rooms[
      Helpers.getRoomRep(
        Math.round(relativeCoords.x),
        Math.round(relativeCoords.y)
      )
    ]
    const roomCoords = {
      x: Math.round((relativeCoords.x - room.x) * (ROOM_WIDTH + 2)),
      y: Math.round((relativeCoords.y - room.y) * (ROOM_HEIGHT + 2))
    }
    return [room, roomCoords]
  }
}
