import { Player, Map, Enemy } from './modules/app'
import Spotlight from './modules/interfaces/spotlight/spotlight'
import Effects from './modules/interfaces/effects/effects'
import Helpers from './utils/helpers'

import Config from 'config'
import p5 from 'p5'

const MAP_WIDTH = Config.game.map.width
const MAP_HEIGHT = Config.game.map.height
const ROOM_RADIUS = Config.game.room.radius
const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy
const END_GRID_VAL = Config.game.room.gridVals.end
const RED_POTION_GRID_VAL = Config.game.room.gridVals.redPotion
const BLUE_POTION_GRID_VAL = Config.game.room.gridVals.bluePotion
const YELLOW_POTION_GRID_VAL = Config.game.room.gridVals.yellowPotion
const GREEN_POTION_GRID_VAL = Config.game.room.gridVals.greenPotion
const ENEMY_SPEED = Config.game.enemy.speed
const ENEMY_LEVEL_UP = Config.game.enemy.levelUpFactor
const RED_POWERUP = Config.game.powerups.red
const BLUE_POWERUP = Config.game.powerups.blue
const YELLOW_POWERUP = Config.game.powerups.yellow
const GREEN_POWERUP = Config.game.powerups.green
const ENEMY_INC = Config.game.map.enemyIncrement

class Game {
  constructor(container) {
    this.sketch = p => {
      this.player = new Player(p, this.playerMove)
      this.map = new Map(p, this.player)
      this.enemies = [new Enemy(this.map.startingRoom)]
      this.player.registerMap(this.map)

      // this.debug = new Debug(this.player, this.map)
      this.spotlight = new Spotlight(this.player)

      this.effectIndicator = new Effects(p)

      p.preload = () => {
        this.map.sprite.loadSprite()
        this.player.sprite.loadSprite()
      }

      p.setup = () => {
        const myCanvas = p.createCanvas(
          Helpers.getElementWidth(container),
          Helpers.getElementHeight(container)
        )

        myCanvas.parent(container)

        p.textFont('Helvetica')
        p.textAlign(p.CENTER, p.CENTER)
        p.smooth()
      }

      p.draw = () => {
        p.background('#160f30')
        this.update()
      }

      p.windowResized = () => {
        p.resizeCanvas(
          Helpers.getElementWidth(container),
          Helpers.getElementHeight(container)
        )
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
    this.effectIndicator.draw()
    // this.debug.update()
  }

  enemiesMove = () => {
    this.enemies.forEach(e => e.move(this.player))
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
      case GREEN_POTION_GRID_VAL:
        this.greenPotionPowerup()
        break
      default:
        break
    }
  }

  checkPlayerPos = () => {
    const roomNRoomCoords = this.player.getRoomNRoomCoords()
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

    const enemyCount = Math.floor(this.map.level / ENEMY_INC) + 1
    this.enemies = []
    for (let i = 0; i < enemyCount; i++)
      this.enemies.push(new Enemy(this.map.startingRoom))

    this.initiateEnemyMovement(ENEMY_SPEED * ENEMY_LEVEL_UP ** this.map.level)

    const level = document.getElementById('score')
    if (level) level.innerHTML = `Level ${this.map.level}`
  }

  gameOver = () => {
    if (!this.player.powerups.red) {
      const gameover = document.getElementById('gameover')
      if (gameover) gameover.style.top = '50%'
      this.p5instance.noLoop()
    }
  }

  redPotionPowerup = () => {
    this.powerupConsumed()
    this.player.powerups.red = true

    if (this.redPotionTimeout) clearTimeout(this.redPotionTimeout)

    this.effectIndicator.addEffect(
      'RED',
      RED_POWERUP.description,
      RED_POWERUP.duration
    )

    setTimeout(() => {
      this.player.powerups.red = false
      this.redPotionTimeout = undefined
    }, RED_POWERUP.duration)
  }

  bluePotionPowerup = () => {
    this.powerupConsumed()
    this.player.powerups.blue = true
    console.log('BLUE POWERUP UP')

    if (this.bluePotionTimeout) clearTimeout(this.bluePotionTimeout)

    this.effectIndicator.addEffect(
      'BLUE',
      BLUE_POWERUP.description,
      BLUE_POWERUP.duration
    )

    this.bluePotionTimeout = setTimeout(() => {
      console.log('BLUE POWERUP DOWN')
      this.player.powerups.blue = false
      this.bluePotionTimeout = undefined
    }, BLUE_POWERUP.duration)
  }

  yellowPotionPowerup = () => {
    this.powerupConsumed()
    this.player.powerups.yellow = true
    console.log('YELLOW POWERUP UP')

    if (this.yellowPotionTimeout) clearTimeout(this.yellowPotionTimeout)

    this.effectIndicator.addEffect(
      'YELLOW',
      YELLOW_POWERUP.description,
      YELLOW_POWERUP.duration
    )

    this.yellowPotionTimeout = setTimeout(() => {
      console.log('YELLOW POWERUP DOWN')
      this.player.powerups.yellow = false
      this.yellowPotionTimeout = undefined
    }, YELLOW_POWERUP.duration)
  }

  greenPotionPowerup = () => {
    this.powerupConsumed()
    this.player.powerups.green = true
    console.log('GREEN POWERUP UP')

    clearInterval(this.monsterInterval)

    this.monsterInterval = setInterval(
      this.enemiesMove,
      GREEN_POWERUP.enemySpeed
    )

    if (this.greenPotionTimeout) clearTimeout(this.greenPotionTimeout)

    this.effectIndicator.addEffect(
      'GREEN',
      GREEN_POWERUP.description,
      GREEN_POWERUP.duration
    )

    this.greenPotionTimeout = setTimeout(() => {
      console.log('GREEN POWERUP DOWN')
      clearInterval(this.monsterInterval)
      this.initiateEnemyMovement()
      this.greenPotionTimeout = undefined
    }, GREEN_POWERUP.duration)
  }

  powerupConsumed = () => {
    const roomNRoomCoords = this.player.getRoomNRoomCoords()
    const room = roomNRoomCoords[0]
    const roomCoords = roomNRoomCoords[1]
    room.updateGrid(roomCoords.x, roomCoords.y, 0)
  }

  initiateEnemyMovement = (interval = ENEMY_SPEED) => {
    clearInterval(this.monsterInterval)
    this.monsterInterval = setInterval(this.enemiesMove, interval)
  }

  terminate = () => {
    this.p5instance.remove()

    clearInterval(this.monsterInterval)
  }
}

export default Game
