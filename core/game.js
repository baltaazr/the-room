import { Player, Map, Enemy } from './modules/app'
import Spotlight from './modules/interfaces/spotlight/spotlight'
import Helpers from './utils/helpers'

import Config from 'config'
import p5 from 'p5'

const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height
const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy
const END_GRID_VAL = Config.game.room.gridVals.end
const RED_POTION_GRID_VAL = Config.game.room.gridVals.redPotion
const BLUE_POTION_GRID_VAL = Config.game.room.gridVals.bluePotion
const YELLOW_POTION_GRID_VAL = Config.game.room.gridVals.yellowPotion
const ENEMY_SPEED = Config.game.enemy.speed
const RED_POWERUP = Config.game.powerups.red
const BLUE_POWERUP = Config.game.powerups.blue
const YELLOW_POWERUP = Config.game.powerups.yellow

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
      this.initiateEnemyMovement()
    }

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
    if (this.checkPlayerPos() === ENEMY_GRID_VAL) {
      this.gameOver()
    }
  }

  playerMove = () => {
    switch (this.checkPlayerPos()) {
      case ENEMY_GRID_VAL:
        this.gameOver()
        break
      case END_GRID_VAL:
        this.levelUp()
        break
      case RED_POTION_GRID_VAL:
        this.redPotionPowerup()
        break
      case BLUE_POTION_GRID_VAL:
        this.bluePotionPowerup()
        break
      case YELLOW_POTION_GRID_VAL:
        this.yellowPotionPowerup()
        break
      default:
        break
    }
  }

  getPlayerRoomNRoomCoords = () => {
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
    return [room, roomCoords]
  }

  checkPlayerPos = () => {
    const roomNRoomCoords = this.getPlayerRoomNRoomCoords()
    const room = roomNRoomCoords[0]
    const roomCoords = roomNRoomCoords[1]
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

    return gridVal
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
    if (!this.player.powerups.red) {
      const gameover = document.getElementById('gameover')
      if (gameover) gameover.style.display = 'flex'
    }
  }

  redPotionPowerup = () => {
    const roomNRoomCoords = this.getPlayerRoomNRoomCoords()
    const room = roomNRoomCoords[0]
    const roomCoords = roomNRoomCoords[1]
    room.updateGrid(roomCoords.x, roomCoords.y, 0)
    this.player.powerups.red = true
    console.log('RED POWERUP UP')
    setTimeout(() => {
      console.log('RED POWERUP DOWN')
      this.player.powerups.red = false
    }, RED_POWERUP.duration)
  }

  bluePotionPowerup = () => {
    const roomNRoomCoords = this.getPlayerRoomNRoomCoords()
    const room = roomNRoomCoords[0]
    const roomCoords = roomNRoomCoords[1]
    room.updateGrid(roomCoords.x, roomCoords.y, 0)
    this.player.powerups.blue = true
    console.log('BLUE POWERUP UP')
    setTimeout(() => {
      console.log('BLUE POWERUP DOWN')
      this.player.powerups.blue = false
    }, BLUE_POWERUP.duration)
  }

  yellowPotionPowerup = () => {
    const roomNRoomCoords = this.getPlayerRoomNRoomCoords()
    const room = roomNRoomCoords[0]
    const roomCoords = roomNRoomCoords[1]
    room.updateGrid(roomCoords.x, roomCoords.y, 0)
    this.player.powerups.yellow = true
    console.log('YELLOW POWERUP UP')
    setTimeout(() => {
      console.log('YELLOW POWERUP DOWN')
      this.player.powerups.yellow = false
    }, YELLOW_POWERUP.duration)
  }

  initiateEnemyMovement = () => {
    setTimeout(
      () => {
        this.enemyMove()
        this.initiateEnemyMovement()
      },
      this.player.powerups.yellow ? YELLOW_POWERUP.enemySpeed : ENEMY_SPEED
    )
  }
}

export default Game
