import { Player, Map, Enemy } from './modules/app'
import Debug from './modules/interfaces/debug/debug'
import Spotlight from './modules/interfaces/spotlight/spotlight'

import Config from 'config'
import p5 from 'p5'

const FLOOR_SIZE = Config.game.room.floorSize
const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height

class Game {
  constructor(container) {
    this.sketch = p => {
      this.player = new Player(p)
      this.map = new Map(p, this.player)
      this.enemy = new Enemy(this.map.startingRoom)

      this.player.registerMap(this.map)

      this.debug = new Debug(this.player, this.map)
      this.spotlight = new Spotlight(this.player)

      p.preload = () => {
        this.map.sprite.loadSprite()
        this.player.sprite.loadSprite()
      }

      p.setup = () => {
        const myCanvas = p.createCanvas(600, 400)
        myCanvas.parent(container)

        p.textFont('Helvetica')
        p.textAlign(p.CENTER, p.CENTER)
        p.smooth()

        p.pixelDensity(1)
      }

      p.draw = () => {
        p.background('#160f30')
        this.update()
      }
    }
    this.initiateEnemyMovement()

    // eslint-disable-next-line new-cap
    this.p5instance = new p5(this.sketch)
  }

  update = () => {
    this.map.update()
    this.player.update()
    this.spotlight.update()
    this.debug.update()
  }

  enemyMove = () => {
    this.enemy.move(this.player)
  }

  playerMove = () => {
    if (
      Math.abs(
        this.player.controls.globalPos.x - this.map.endingGlobalCoords.x
      ) <=
        FLOOR_SIZE / 2 &&
      Math.abs(
        this.player.controls.globalPos.y - this.map.endingGlobalCoords.y
      ) <=
        FLOOR_SIZE / 2
    ) {
      this.map.level += 1
      this.map.initiateRooms()
      this.player.controls.globalPos = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
      this.player.controls.windowPos = {
        x: this.player.controls.p.width / 2,
        y: this.player.controls.p.height / 2
      }
    }
  }

  initiateEnemyMovement = () => {
    setInterval(() => {
      this.enemyMove()
    }, 1000)
  }
}

export default Game
