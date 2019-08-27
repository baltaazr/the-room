import { Player, Map, Enemy } from './modules/app'
import Spotlight from './modules/interfaces/spotlight/spotlight'
import Helpers from './utils/helpers'

import Config from 'config'
import p5 from 'p5'

const FLOOR_SIZE = Config.game.room.floorSize
const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height
const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy

class Game {
  constructor(container) {
    this.sketch = p => {
      this.player = new Player(p, this.playerMove)
      this.map = new Map(p, this.player)
      this.enemy = new Enemy(this.map.startingRoom)

      this.player.registerMap(this.map)

      // this.debug = new Debug(this.player, this.map)
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
    // this.debug.update()
  }

  enemyMove = () => {
    this.enemy.move(this.player)
    if (this.checkIfPlayerDead()) {
      this.gameOver()
    }
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
      this.levelUp()
    }
    if (this.checkIfPlayerDead()) {
      this.gameOver()
    }
  }

  checkIfPlayerDead = () => {
    const relativeCoords = Helpers.globalToRelative(
      this.player.controls.globalPos.x,
      this.player.controls.globalPos.y
    )
    const room = this.map.rooms[
      Helpers.getRoomRep(
        Math.round(relativeCoords.x),
        Math.round(relativeCoords.y)
      )
    ]
    const roomCoords = {
      x: Math.round((relativeCoords.x - room.x) * (ROOM_WIDTH + 1)),
      y: Math.round((relativeCoords.y - room.y) * (ROOM_HEIGHT + 1))
    }

    let gridVal = 0
    if (
      Math.abs(roomCoords.x) <= ROOM_RADIUS &&
      Math.abs(roomCoords.y) <= ROOM_RADIUS
    ) {
      gridVal = room.getVal(roomCoords.x, roomCoords.y)
    } else if (
      roomCoords.x <= -ROOM_RADIUS - 1 &&
      Math.abs(roomCoords.y) <= 1 &&
      room.left
    ) {
      gridVal = room.getValTunnels(2, roomCoords.y + 1)
    } else if (
      roomCoords.x >= ROOM_RADIUS + 1 &&
      Math.abs(roomCoords.y) <= 1 &&
      room.right
    ) {
      gridVal = room.getValTunnels(3, roomCoords.y + 1)
    } else if (
      roomCoords.y <= -ROOM_RADIUS - 1 &&
      Math.abs(roomCoords.x) <= 1 &&
      room.top
    ) {
      gridVal = room.getValTunnels(0, roomCoords.x + 1)
    } else if (
      roomCoords.y >= ROOM_RADIUS + 1 &&
      Math.abs(roomCoords.x) <= 1 &&
      room.bottom
    ) {
      gridVal = room.getValTunnels(1, roomCoords.x + 1)
    }
    console.log(room.x, room.y, roomCoords, gridVal, room.getVal(-4, 4))
    return gridVal === ENEMY_GRID_VAL
  }

  levelUp = () => {
    this.map.level += 1
    this.map.initiateRooms()
    this.player.controls.globalPos = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
    this.player.controls.windowPos = {
      x: this.player.controls.p.width / 2,
      y: this.player.controls.p.height / 2
    }
    this.enemy = new Enemy(this.map.startingRoom)

    const level = document.getElementById('score')
    if (level) level.innerHTML = `Level ${this.map.level}`
  }

  gameOver = () => {
    const gameover = document.getElementById('gamemover')
    if (gameover) gameover.style.display = 'block'
  }

  initiateEnemyMovement = () => {
    setInterval(() => {
      this.enemyMove()
    }, 1000)
  }
}

export default Game
