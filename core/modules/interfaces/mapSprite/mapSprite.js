import WallTilesImg from '../../../assets/Dungeon_Tileset.png'
import Helpers from '../../../utils/helpers'

import Config from 'config'

const FLOOR_SIZE = Config.game.room.floorSize
const VERT_WALL_SIZE = Config.game.room.vertWallSize
const HORZ_WALL_SIZE = Config.game.room.horzWallSize
const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius
const END_WIDTH = Config.game.room.endWidth
const END_HEIGHT = Config.game.room.endHeight

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
      this.end = img.get(65, 130, 14, 12)
    })
  }

  draw = map => {
    this.p.push()
    this.p.rectMode(this.p.CENTER)

    this.p.fill('#eae7af')
    Object.keys(map).forEach(roomCoords => {
      const coords = roomCoords.split(',')
      const room = map[roomCoords]

      // NO NEED TO EXTRACT. IT'S PASS BY REFERENCE
      this.drawRoom(room, coords[0], coords[1])
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

      // WALLS AND FLOOR
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
        switch (room.getVal(c - ROOM_RADIUS, r - ROOM_RADIUS)) {
          case 1:
            this.p.circle(
              (r - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.x,
              (c - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.y,
              10
            )
            break
          case 2:
            this.p.image(
              this.end,
              (r - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.x,
              (c - ROOM_RADIUS) * FLOOR_SIZE + WINDOW_COORDS.y
            )
            break
          default:
            break
        }
      }

      // TUNNELS
      if (room.top) {
        this.p.image(
          this.floors[room.floorGridTunnels[0][0]],
          WINDOW_COORDS.x - FLOOR_SIZE,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[0][1]],
          WINDOW_COORDS.x,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[0][2]],
          WINDOW_COORDS.x + FLOOR_SIZE,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
      }
      if (room.bottom) {
        this.p.image(
          this.floors[room.floorGridTunnels[1][0]],
          WINDOW_COORDS.x - FLOOR_SIZE,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[1][1]],
          WINDOW_COORDS.x,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[1][2]],
          WINDOW_COORDS.x + FLOOR_SIZE,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.y
        )
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
      }

      if (room.left) {
        this.p.image(
          this.floors[room.floorGridTunnels[2][0]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y - FLOOR_SIZE
        )
        this.p.image(
          this.floors[room.floorGridTunnels[2][1]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[2][3]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y + FLOOR_SIZE
        )
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
      }
      if (room.right) {
        this.p.image(
          this.floors[room.floorGridTunnels[3][0]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y - FLOOR_SIZE
        )
        this.p.image(
          this.floors[room.floorGridTunnels[3][0]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[3][0]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + WINDOW_COORDS.x,
          WINDOW_COORDS.y + FLOOR_SIZE
        )
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
      }
    }
  }
}

export default MapSprite
