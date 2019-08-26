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

    this.handleInput()
  }

  handleInput = () => {
    const deltaFactor = this.p.deltaTime / 50

    const VERT_DELTA = VERT_ACC * deltaFactor
    const HORZ_DELTA = HORZ_ACC * deltaFactor

    const { x, y } = Helpers.mapPlayerToRoomNumber(this.globalPos)
    const currRoom = this.map.getRoomByCoords(x, y)

    if (!currRoom) return

    const roomBoundaries = Helpers.getRoomBoundaries(x, y)

    if (this.p.keyIsDown(Helpers.getAscii('W'))) {
      if (
        this.globalPos.y - VERT_DELTA <
        roomBoundaries.minY + ROOM_BORDER_PADDING_NY
      ) {
        if (currRoom.top) {
          const hallwayBoundaries = Helpers.getHallwayBoundaries(
            roomBoundaries,
            'top'
          )
          if (hallwayBoundaries) {
            const { minX, maxX } = hallwayBoundaries
            if (Helpers.isBetween(minX, this.globalPos.x, maxX))
              this.globalPos.y -= VERT_DELTA
          }
        }
      } else {
        this.globalPos.y -= VERT_DELTA
      }

      if (this.windowPos.y - VERT_DELTA >= VIEWPORT_PADDING) {
        this.windowPos.y -= VERT_DELTA
      }
    }

    if (this.p.keyIsDown(Helpers.getAscii('S'))) {
      if (
        this.globalPos.y - VERT_DELTA >
        roomBoundaries.maxY - ROOM_BORDER_PADDING_PY
      ) {
        if (currRoom.bottom) {
          const hallwayBoundaries = Helpers.getHallwayBoundaries(
            roomBoundaries,
            'bottom'
          )
          if (hallwayBoundaries) {
            const { minX, maxX } = hallwayBoundaries
            if (Helpers.isBetween(minX, this.globalPos.x, maxX))
              this.globalPos.y += VERT_DELTA
          }
        }
      } else {
        this.globalPos.y += VERT_DELTA
      }

      if (this.windowPos.y + VERT_DELTA <= this.p.height - VIEWPORT_PADDING) {
        this.windowPos.y += VERT_DELTA
      }
    }

    if (this.p.keyIsDown(Helpers.getAscii('A'))) {
      if (
        this.globalPos.x - HORZ_DELTA <
        roomBoundaries.minX + ROOM_BORDER_PADDING_NX
      ) {
        if (currRoom.left) {
          const hallwayBoundaries = Helpers.getHallwayBoundaries(
            roomBoundaries,
            'left'
          )
          if (hallwayBoundaries) {
            const { minY, maxY } = hallwayBoundaries
            if (Helpers.isBetween(minY, this.globalPos.y, maxY))
              this.globalPos.x -= HORZ_DELTA
          }
        }
      } else {
        this.globalPos.x -= HORZ_DELTA
      }

      if (this.windowPos.x - HORZ_DELTA >= VIEWPORT_PADDING) {
        this.windowPos.x -= HORZ_DELTA
      }

      this.player.sprite.flipLeft()
    }

    if (this.p.keyIsDown(Helpers.getAscii('D'))) {
      if (
        this.globalPos.x + HORZ_DELTA >
        roomBoundaries.maxX - ROOM_BORDER_PADDING_PX
      ) {
        if (currRoom.right) {
          const hallwayBoundaries = Helpers.getHallwayBoundaries(
            roomBoundaries,
            'right'
          )
          if (hallwayBoundaries) {
            const { minY, maxY } = hallwayBoundaries
            if (Helpers.isBetween(minY, this.globalPos.y, maxY))
              this.globalPos.x += HORZ_DELTA
          }
        }
      } else {
        this.globalPos.x += HORZ_DELTA
      }

      if (this.windowPos.x + HORZ_DELTA <= this.p.width - VIEWPORT_PADDING) {
        this.windowPos.x += HORZ_DELTA
      }

      this.player.sprite.flipRight()
    }
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
