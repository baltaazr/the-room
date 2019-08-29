import Helpers from '../../../utils/helpers'

import Config from 'config'

const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height
const VERT_ACC = Config.game.player.acc.vertical
const HORZ_ACC = Config.game.player.acc.horizontal
const ROOM_BORDER_PADDING_PX = Config.game.room.padding.px
const ROOM_BORDER_PADDING_PY = Config.game.room.padding.py
const ROOM_BORDER_PADDING_NX = Config.game.room.padding.nx
const ROOM_BORDER_PADDING_NY = Config.game.room.padding.ny
const VIEWPORT_PADDING = Config.game.render.viewportPadding
const BLUE_POWERUP_SPEED = Config.game.powerups.blue.playerSpeed

export default class Controls {
  constructor(p, player) {
    this.p = p
    this.player = player

    this.globalPos = null
    this.windowPos = null
  }

  tick = () => {
    /* -------------------------------------------------------------------------- */
    /*                           SETUP ONCE CANVAS READY                          */
    /* -------------------------------------------------------------------------- */
    if (!this.player.isSetup) {
      this.globalPos = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
      this.windowPos = { x: this.p.width / 2, y: this.p.height / 2 }
      this.player.isSetup = true
    }

    this.handleInputAndCollision()
  }

  handleInputAndCollision = () => {
    const deltaFactor = this.p.deltaTime / 50

    const VERT_DELTA =
      (this.player.powerups.blue ? BLUE_POWERUP_SPEED : VERT_ACC) * deltaFactor
    const HORZ_DELTA =
      (this.player.powerups.blue ? BLUE_POWERUP_SPEED : HORZ_ACC) * deltaFactor

    const UP_PRESSED =
      this.p.keyIsDown(Helpers.getAscii('W')) ||
      this.p.keyIsDown(this.p.UP_ARROW)
    const DOWN_PRESSED =
      this.p.keyIsDown(Helpers.getAscii('S')) ||
      this.p.keyIsDown(this.p.DOWN_ARROW)
    const LEFT_PRESSED =
      this.p.keyIsDown(Helpers.getAscii('A')) ||
      this.p.keyIsDown(this.p.LEFT_ARROW)
    const RIGHT_PRESSED =
      this.p.keyIsDown(Helpers.getAscii('D')) ||
      this.p.keyIsDown(this.p.RIGHT_ARROW)

    const { x, y } = Helpers.mapPlayerToRoomNumber(this.globalPos)
    const currRoom = this.map.getRoomByCoords(x, y)

    if (!currRoom) return

    const roomBoundaries = Helpers.getRoomBoundaries(x, y)

    const { minY: hMinY, maxY: hMaxY } = Helpers.getHallwayBoundaries(
      roomBoundaries,
      'vertical'
    )
    const { minX: hMinX, maxX: hMaxX } = Helpers.getHallwayBoundaries(
      roomBoundaries,
      'horizontal'
    )

    if (UP_PRESSED) {
      let playerMoved = false
      if (
        this.globalPos.y - VERT_DELTA <
        roomBoundaries.minY + ROOM_BORDER_PADDING_NY
      ) {
        if (currRoom.top) {
          if (Helpers.isBetween(hMinX, this.globalPos.x, hMaxX)) {
            this.globalPos.y -= VERT_DELTA
            playerMoved = true
          }
        }
      } else {
        this.globalPos.y -= VERT_DELTA
        playerMoved = true
      }

      if (playerMoved && this.windowPos.y - VERT_DELTA >= VIEWPORT_PADDING) {
        this.windowPos.y -= VERT_DELTA
      }
    }

    if (DOWN_PRESSED) {
      let playerMoved = false
      if (
        this.globalPos.y - VERT_DELTA >
        roomBoundaries.maxY - ROOM_BORDER_PADDING_PY
      ) {
        if (currRoom.bottom) {
          if (Helpers.isBetween(hMinX, this.globalPos.x, hMaxX)) {
            this.globalPos.y += VERT_DELTA
            playerMoved = true
          }
        }
      } else {
        this.globalPos.y += VERT_DELTA
        playerMoved = true
      }

      if (
        playerMoved &&
        this.windowPos.y + VERT_DELTA <= this.p.height - VIEWPORT_PADDING
      ) {
        this.windowPos.y += VERT_DELTA
      }
    }

    if (LEFT_PRESSED) {
      let playerMoved = false
      if (
        this.globalPos.x - HORZ_DELTA <
        roomBoundaries.minX + ROOM_BORDER_PADDING_NX
      ) {
        if (currRoom.left) {
          if (Helpers.isBetween(hMinY, this.globalPos.y, hMaxY)) {
            this.globalPos.x -= HORZ_DELTA
            playerMoved = true
          }
        }
      } else {
        this.globalPos.x -= HORZ_DELTA
        playerMoved = true
      }

      if (playerMoved && this.windowPos.x - HORZ_DELTA >= VIEWPORT_PADDING) {
        this.windowPos.x -= HORZ_DELTA
      }

      this.player.sprite.flipLeft()
    }

    if (RIGHT_PRESSED) {
      let playerMoved = false
      if (
        this.globalPos.x + HORZ_DELTA >
        roomBoundaries.maxX - ROOM_BORDER_PADDING_PX
      ) {
        if (currRoom.right) {
          if (Helpers.isBetween(hMinY, this.globalPos.y, hMaxY)) {
            this.globalPos.x += HORZ_DELTA
            playerMoved = true
          }
        }
      } else {
        this.globalPos.x += HORZ_DELTA
        playerMoved = true
      }

      if (
        playerMoved &&
        this.windowPos.x + HORZ_DELTA <= this.p.width - VIEWPORT_PADDING
      ) {
        this.windowPos.x += HORZ_DELTA
      }

      this.player.sprite.flipRight()
    }

    if (!UP_PRESSED && !DOWN_PRESSED && !LEFT_PRESSED && !RIGHT_PRESSED)
      this.player.isIdle = true
    else this.player.isIdle = false
    this.player.playerMove()
  }

  registerMap = map => (this.map = map)

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  getPosData = () => {
    return [this.windowPos, this.globalPos]
  }
}
