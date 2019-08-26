import { Player, Map, Enemy } from './modules/app'
import Helpers from './utils/helpers'
import Debug from './modules/interfaces/debug/debug'

import Config from 'config'
import p5 from 'p5'

const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy
const FLOOR_SIZE = Config.game.room.floorSize
const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height

class Game {
  constructor(container) {
    this.sketch = p => {
      this.player = new Player(p, this.playerMove)
      this.map = new Map(p, this.player)
      this.enemy = new Enemy()

      this.player.registerMap(this.map)

      this.debug = new Debug(this.player, this.map)

      p.preload = () => {
        this.map.sprite.loadSprite()
        this.player.sprite.loadSprite()
      }

      p.setup = () => {
        const myCanvas = p.createCanvas(600, 400)
        myCanvas.parent(container)

        p.textFont('Helvetica')
        p.textAlign(p.CENTER, p.CENTER)
      }

      p.draw = () => {
        p.background('#160f30')
        this.update()
      }
    }

    // eslint-disable-next-line new-cap
    this.p5instance = new p5(this.sketch)
  }

  update = () => {
    this.map.update()
    this.player.update()
    this.debug.update()
  }

  enemyMove = () => {
    this.enemy.move(this.player)

    this.map.rooms[
      Helpers.getRoomRep(this.enemy.room[0], this.enemy.room[1])
    ].updateGrid(
      this.enemy.roomCoords[0],
      this.enemy.roomCoords[1],
      ENEMY_GRID_VAL
    )
  }

  playerMove = () => {
    // if (
    //   Math.abs(
    //     this.player.controls.globalPos.x - this.map.endingGlobalCoords.x
    //   ) <=
    //     FLOOR_SIZE / 2 &&
    //   Math.abs(
    //     this.player.controls.globalPos.y - this.map.endingGlobalCoords.y
    //   ) <=
    //     FLOOR_SIZE / 2
    // ) {
    //   this.map.level += 1
    //   this.map.initiateRooms()
    //   this.player.controls.globalPos = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
    //   this.player.controls.windowPos = {
    //     x: this.p.width / 2,
    //     y: this.p.height / 2
    //   }
    // }
  }
}

export default Game
