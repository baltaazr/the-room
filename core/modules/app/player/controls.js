import Helpers from '../../../utils/helpers'

import Config from 'config'

const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height
const VERT_ACC = Config.game.player.acc.vertical
const HORZ_ACC = Config.game.player.acc.horizontal
const VIEWPORT_PADDING = Config.game.render.viewportPadding

export default class Controls {
  constructor(p, player) {
    this.p = p
    this.player = player

    this.globalPos = null
    this.windowPos = null

    this.isSetup = false
  }

  tick = () => {
    /* -------------------------------------------------------------------------- */
    /*                           SETUP ONCE CANVAS READY                          */
    /* -------------------------------------------------------------------------- */
    if (!this.isSetup) {
      this.globalPos = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
      this.windowPos = { x: this.p.width / 2, y: this.p.height / 2 }
      this.isSetup = true
    }

    this.handleInput()
  }

  handleInput = () => {
    const deltaFactor = this.p.deltaTime / 50

    const VERT_DELTA = VERT_ACC * deltaFactor
    const HORZ_DELTA = HORZ_ACC * deltaFactor

    if (this.p.keyIsDown(Helpers.getAscii('W'))) {
      if (this.globalPos.y - VERT_DELTA < 0) {
        console.log('got to border')
      } else {
        this.globalPos.y -= VERT_DELTA
      }

      if (this.windowPos.y - VERT_DELTA < VIEWPORT_PADDING) {
        console.log('gotta move canvas')
      } else {
        this.windowPos.y -= VERT_DELTA
      }
    }

    if (this.p.keyIsDown(Helpers.getAscii('S'))) {
      if (this.globalPos.y - VERT_DELTA > MAP_HEIGHT) {
        console.log('got to border')
      } else {
        this.globalPos.y += VERT_DELTA
      }

      if (this.windowPos.y + VERT_DELTA > this.p.height - VIEWPORT_PADDING) {
        console.log('gotta move canvas')
      } else {
        this.windowPos.y += VERT_DELTA
      }
    }

    if (this.p.keyIsDown(Helpers.getAscii('A'))) {
      if (this.globalPos.x - HORZ_DELTA < 0) {
        console.log('got to border')
      } else {
        this.globalPos.x -= HORZ_DELTA
      }

      if (this.windowPos.x - HORZ_DELTA < VIEWPORT_PADDING) {
        console.log('gotta move canvas')
      } else {
        this.windowPos.x -= HORZ_DELTA
      }

      this.player.sprite.flip()
    }

    if (this.p.keyIsDown(Helpers.getAscii('D'))) {
      if (this.globalPos.x + HORZ_DELTA > MAP_WIDTH) {
        console.log('got to border')
      } else {
        this.globalPos.x += HORZ_DELTA
      }

      if (this.windowPos.x + HORZ_DELTA > this.p.width - VIEWPORT_PADDING) {
        console.log('gotta move canvas')
      } else {
        this.windowPos.x += HORZ_DELTA
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  getPosData = () => {
    return [this.windowPos, this.globalPos]
  }
}
