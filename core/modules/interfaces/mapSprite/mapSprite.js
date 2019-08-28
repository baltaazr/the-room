import Helpers from '../../../utils/helpers'

import WallTilesImg from 'assets/sprites/Dungeon_Tileset.png'
import Config from 'config'

const FLOOR_SIZE = Config.game.room.floorSize
const VERT_WALL_SIZE = Config.game.room.vertWallSize
const HORZ_WALL_SIZE = Config.game.room.horzWallSize
const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
const ENEMY_GRID_VAL = Config.game.room.gridVals.enemy
const END_GRID_VAL = Config.game.room.gridVals.end
const RED_POTION_GRID_VAL = Config.game.room.gridVals.redPotion
const BLUE_POTION_GRID_VAL = Config.game.room.gridVals.bluePotion
const YELLOW_POTION_GRID_VAL = Config.game.room.gridVals.yellowPotion
const GREEN_POTION_GRID_VAL = Config.game.room.gridVals.greenPotion

class MapSprite {
  constructor(p, player) {
    this.p = p
    this.player = player
  }

  loadSprite = () => {
    this.p.loadImage(WallTilesImg, img => {
      this.vertWall = img.get(9, 16, 7, 16)
      this.vertWallT = img.get(9, 32, 7, 16)
      this.horzWall = img.get(16, 0, 16, 16)
      this.horzWallB = img.get(16, 64, 16, 16)
      this.corner = img.get(9, 0, 7, 16)
      this.cornerB = img.get(9, 64, 7, 16)
      this.floors = [
        img.get(96, 0, 16, 16),
        img.get(112, 0, 16, 16),
        img.get(128, 0, 16, 16),
        img.get(144, 0, 16, 16),
        img.get(96, 16, 16, 16),
        img.get(112, 16, 16, 16),
        img.get(128, 16, 16, 16),
        img.get(144, 16, 16, 16),
        img.get(96, 32, 16, 16),
        img.get(112, 32, 16, 16),
        img.get(128, 32, 16, 16),
        img.get(144, 32, 16, 16)
      ]
      this.end = img.get(64, 128, 16, 16)
      this.bones = img.get(112, 112, 16, 16)
      this.redPotion = img.get(144, 128, 16, 16)
      this.bluePotion = img.get(112, 144, 16, 16)
      this.yellowPotion = img.get(96, 144, 16, 16)
      this.greenPotion = img.get(96, 128, 16, 16)
    })
  }

  draw = map => {
    this.p.push()
    this.p.rectMode(this.p.CENTER)

    this.p.fill('#eae7af')
    Object.keys(map).forEach(roomCoords => {
      const room = map[roomCoords]

      // NO NEED TO EXTRACT. IT'S PASS BY REFERENCE
      this.drawRoom(room, room.x, room.y)
    })

    this.p.pop()
  }

  drawRoom = (room, x, y) => {
    if (!this.player.isSetup) return

    const GLOBAL_COORDS = Helpers.relativeToGlobal(x, y)
    const WINDOW_COORDS = Helpers.mapGlobalToPlayerViewport(
      GLOBAL_COORDS,
      this.player
    )

    // DRAW CORNERS
    this.p.image(
      this.corner,
      WINDOW_COORDS.x -
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      WINDOW_COORDS.y - (ROOM_RADIUS + 0.5) * FLOOR_SIZE - HORZ_WALL_SIZE / 2
    )
    this.p.image(
      this.corner,
      WINDOW_COORDS.x +
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      WINDOW_COORDS.y - (ROOM_RADIUS + 0.5) * FLOOR_SIZE - HORZ_WALL_SIZE / 2
    )
    this.p.image(
      this.cornerB,
      WINDOW_COORDS.x -
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      WINDOW_COORDS.y + (ROOM_RADIUS + 0.5) * FLOOR_SIZE + HORZ_WALL_SIZE / 2
    )
    this.p.image(
      this.cornerB,
      WINDOW_COORDS.x +
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      WINDOW_COORDS.y + (ROOM_RADIUS + 0.5) * FLOOR_SIZE + HORZ_WALL_SIZE / 2
    )
    // WALLS AND FLOOR
    for (let c = 0; c < ROOM_WIDTH; c++) {
      this.p.image(
        this.vertWall,
        WINDOW_COORDS.x -
          (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
        (c - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.y
      )
      this.p.image(
        this.vertWall,
        WINDOW_COORDS.x +
          (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
        (c - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.y
      )

      for (let r = 0; r < ROOM_HEIGHT; r++) {
        if (c === 0) {
          this.p.image(
            this.horzWall,
            (r - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.x,
            WINDOW_COORDS.y -
              (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
              HORZ_WALL_SIZE / 2
          )
          this.p.image(
            this.horzWallB,
            (r - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.x,
            WINDOW_COORDS.y +
              (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
              HORZ_WALL_SIZE / 2
          )
        }
        this.p.image(
          this.floors[room.floorGrid[r][c]],
          (r - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.x,
          (c - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.y
        )
        let img = null
        switch (room.getVal(r - ROOM_RADIUS, c - ROOM_RADIUS)) {
          case ENEMY_GRID_VAL:
            img = this.bones
            break
          case END_GRID_VAL:
            img = this.end
            break
          case RED_POTION_GRID_VAL:
            img = this.redPotion
            break
          case BLUE_POTION_GRID_VAL:
            img = this.bluePotion
            break
          case YELLOW_POTION_GRID_VAL:
            img = this.yellowPotion
            break
          case GREEN_POTION_GRID_VAL:
            img = this.greenPotion
            break
          default:
            break
        }
        if (img) {
          this.p.image(
            img,
            (r - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.x,
            (c - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.y
          )
        }
      }
    }
    // TUNNELS
    if (room.top) {
      for (let n = 0; n < 3; n++) {
        this.p.image(
          this.floors[room.floorGridTunnels[0][n]],
          WINDOW_COORDS.x + FLOOR_SIZE * (n - 1),
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
      }
      for (let i = -1; i < 2; i++) {
        if (room.getValTunnels(0, i + 1) === ENEMY_GRID_VAL) {
          this.p.push()
          this.p.imageMode(this.p.CENTER)
          this.p.image(
            this.bones,
            WINDOW_COORDS.x + FLOOR_SIZE * i + FLOOR_SIZE / 2,
            -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y + FLOOR_SIZE / 2
          )
          this.p.pop()
        }
      }
    }
    if (room.bottom) {
      for (let n = 0; n < 3; n++) {
        this.p.image(
          this.floors[room.floorGridTunnels[1][n]],
          WINDOW_COORDS.x + FLOOR_SIZE * (n - 1),
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
      }
      this.p.image(
        this.vertWallT,
        -FLOOR_SIZE * 2 +
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2 +
          1 +
          WINDOW_COORDS.x,
        (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
      )
      this.p.image(
        this.vertWallT,
        FLOOR_SIZE * 2 -
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2 -
          1 +
          WINDOW_COORDS.x,
        (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
      )
      for (let i = -1; i < 2; i++) {
        if (room.getValTunnels(1, i + 1) === ENEMY_GRID_VAL) {
          this.p.push()
          this.p.imageMode(this.p.CENTER)
          this.p.image(
            this.bones,
            WINDOW_COORDS.x + FLOOR_SIZE * i + FLOOR_SIZE / 2,
            (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y + FLOOR_SIZE / 2
          )
          this.p.pop()
        }
      }
    }

    if (room.left) {
      for (let n = 0; n < 3; n++) {
        this.p.image(
          this.floors[room.floorGridTunnels[2][n]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y + FLOOR_SIZE * (n - 1)
        )
      }
      this.p.image(
        this.horzWall,
        -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
        WINDOW_COORDS.y - HORZ_WALL_SIZE - FLOOR_SIZE
      )
      this.p.image(
        this.horzWallB,
        -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
        WINDOW_COORDS.y + HORZ_WALL_SIZE + FLOOR_SIZE
      )
      this.p.image(
        this.vertWall,
        WINDOW_COORDS.x -
          (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
        FLOOR_SIZE + WINDOW_COORDS.y + FLOOR_SIZE
      )
      for (let i = -1; i < 2; i++) {
        if (room.getValTunnels(2, i + 1) === ENEMY_GRID_VAL) {
          this.p.push()
          this.p.imageMode(this.p.CENTER)
          this.p.image(
            this.bones,
            -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x + FLOOR_SIZE / 2,
            WINDOW_COORDS.y + FLOOR_SIZE * i + FLOOR_SIZE / 2
          )
          this.p.pop()
        }
      }
    }
    if (room.right) {
      for (let n = 0; n < 3; n++) {
        this.p.image(
          this.floors[room.floorGridTunnels[3][n]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y + FLOOR_SIZE * (n - 1)
        )
      }
      this.p.image(
        this.horzWall,
        (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
        WINDOW_COORDS.y - HORZ_WALL_SIZE - FLOOR_SIZE
      )
      this.p.image(
        this.horzWallB,
        (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
        WINDOW_COORDS.y + HORZ_WALL_SIZE + FLOOR_SIZE
      )
      this.p.image(
        this.vertWall,
        WINDOW_COORDS.x +
          (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
        FLOOR_SIZE + WINDOW_COORDS.y + FLOOR_SIZE
      )
      for (let i = -1; i < 2; i++) {
        if (room.getValTunnels(3, i + 1) === ENEMY_GRID_VAL) {
          this.p.push()
          this.p.imageMode(this.p.CENTER)
          this.p.image(
            this.bones,
            (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x + FLOOR_SIZE / 2,
            WINDOW_COORDS.y + FLOOR_SIZE * i + FLOOR_SIZE / 2
          )
          this.p.pop()
        }
      }
    }
    // TEST

    // const roomCoords = this.player.getRoomNRoomCoords()[1]

    // this.p.rect(
    //   roomCoords.x * FLOOR_SIZE + WINDOW_COORDS.x + FLOOR_SIZE / 2,
    //   roomCoords.y * FLOOR_SIZE + WINDOW_COORDS.y + FLOOR_SIZE / 2,
    //   16,
    //   16
    // )
  }
}

export default MapSprite
