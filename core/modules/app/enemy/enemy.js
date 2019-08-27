import Helpers from '../../../utils/helpers'

import Config from 'config'

const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy

class Enemy {
  constructor(room) {
    this.room = room
    this.roomCoords = { x: 4, y: -4 }
  }

  move = player => {
    const surroundings = this.getSurroundings(this.roomCoords)
    let dist = this.getDist(
      Helpers.relativeToGlobal(
        this.room.x + this.roomCoords.x / (ROOM_WIDTH + 1),
        this.room.y + this.roomCoords.y / (ROOM_HEIGHT + 1)
      ),
      player.controls.globalPos
    )
    let newPosition = this.roomCoords
    for (let i = 0; i < surroundings.length; i++) {
      const tempDist = this.getDist(
        Helpers.relativeToGlobal(
          this.room.x + surroundings[i].x / (ROOM_WIDTH + 1),
          this.room.y + surroundings[i].y / (ROOM_HEIGHT + 1)
        ),
        player.controls.globalPos
      )
      if (tempDist < dist) {
        newPosition = surroundings[i]
        dist = tempDist
      }
    }

    if (newPosition.y === -ROOM_RADIUS - 1) {
      this.room.updateTunnels(0, newPosition.x + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
    } else if (newPosition.y === ROOM_RADIUS + 1) {
      this.room.updateTunnels(1, newPosition.x + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
    } else if (newPosition.x === -ROOM_RADIUS - 1) {
      this.room.updateTunnels(2, newPosition.y + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
    } else if (newPosition.x === ROOM_RADIUS + 1) {
      this.room.updateTunnels(3, newPosition.y + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
    } else if (newPosition.y < -ROOM_RADIUS - 1) {
      this.room = this.room.top
      this.room.updateTunnels(1, newPosition.x + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
      this.roomCoords.y = ROOM_RADIUS + 1
    } else if (newPosition.y > ROOM_RADIUS + 1) {
      this.room = this.room.bottom
      this.room.updateTunnels(0, newPosition.x + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
      this.roomCoords.y = -ROOM_RADIUS - 1
    } else if (newPosition.x < -ROOM_RADIUS - 1) {
      this.room = this.room.left
      this.room.updateTunnels(3, newPosition.y + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
      this.roomCoords.x = ROOM_RADIUS + 1
    } else if (newPosition.x > ROOM_RADIUS + 1) {
      this.room = this.room.right
      this.room.updateTunnels(2, newPosition.y + 1, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
      this.roomCoords.x = -ROOM_RADIUS - 1
    } else {
      this.room.updateGrid(newPosition.x, newPosition.y, ENEMY_GRID_VAL)
      this.roomCoords = newPosition
    }
  }

  getSurroundings = coords => {
    const translations = [
      { x: 0, y: +1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ]

    const surroundings = []

    for (let n = 0; n < translations.length; n++) {
      const translation = translations[n]
      const newCoords = {
        x: coords.x + translation.x,
        y: coords.y + translation.y
      }
      if (
        Math.abs(newCoords.x) <= ROOM_RADIUS &&
        Math.abs(newCoords.y) <= ROOM_RADIUS
      ) {
        surroundings.push(newCoords)
      } else if (
        newCoords.x <= -ROOM_RADIUS - 1 &&
        Math.abs(newCoords.y) <= 1 &&
        this.room.left
      ) {
        surroundings.push(newCoords)
      } else if (
        newCoords.x >= ROOM_RADIUS + 1 &&
        Math.abs(newCoords.y) <= 1 &&
        this.room.right
      ) {
        surroundings.push(newCoords)
      } else if (
        newCoords.y <= -ROOM_RADIUS - 1 &&
        Math.abs(newCoords.x) <= 1 &&
        this.room.top
      ) {
        surroundings.push(newCoords)
      } else if (
        newCoords.y >= ROOM_RADIUS + 1 &&
        Math.abs(newCoords.x) <= 1 &&
        this.room.bottom
      ) {
        surroundings.push(newCoords)
      }
    }
    return surroundings
  }

  getDist = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

export default Enemy
