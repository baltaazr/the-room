import Config from 'config'

const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height
const TOTAL_ROOM_DIMENSION = 176

export default class Helpers {
  static getAscii = c => c.charCodeAt(0)

  // GET GLOBAL POSITION FOR A ROOM
  static relativeToGlobal = (x, y) => {
    // 0 should be MAP WIDTH/HEIGHT / 2
    const CENTER_X = MAP_WIDTH / 2
    const CENTER_Y = MAP_HEIGHT / 2

    const deltaX = x * TOTAL_ROOM_DIMENSION
    const deltaY = y * TOTAL_ROOM_DIMENSION

    return { x: CENTER_X + deltaX, y: CENTER_Y + deltaY }
  }

  static mapGlobalToPlayerViewport = (roomGlobalPos, player) => {
    const { x, y } = roomGlobalPos

    const { x: pGlobalX, y: pGlobalY } = player.controls.globalPos
    const { x: pWindowX, y: pWindowY } = player.controls.windowPos

    const roomGDeltaXToPlayer = x - pGlobalX
    const roomGDeltaYToPlayer = y - pGlobalY

    return {
      x: pWindowX + roomGDeltaXToPlayer,
      y: pWindowY + roomGDeltaYToPlayer
    }
  }
}
