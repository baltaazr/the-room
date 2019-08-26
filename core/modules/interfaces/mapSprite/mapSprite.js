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
  constructor(p) {
    this.p = p
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
      this.drawRoom(
        {
          top: room.top,
          bottom: room.bottom,
          left: room.left,
          right: room.right
        },
        coords[0],
        coords[1],
        room
      )
    })
    this.p.pop()
  }

  /**
   * entrances: {
   *  top: bool,
   *  bottom: bool,
   *  left: bool,
   *  right: bool
   * }
   */
  drawRoom = (entrances, x, y, room) => {
    const ABSOLUTE_COORDS = Helpers.relativeToAbsolute(x, y)

    // DRAW CORNERS
    this.p.image(
      this.corner,
      ABSOLUTE_COORDS.x -
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      ABSOLUTE_COORDS.y - (ROOM_RADIUS + 0.5) * FLOOR_SIZE - HORZ_WALL_SIZE / 2
    )
    this.p.image(
      this.corner,
      ABSOLUTE_COORDS.x +
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      ABSOLUTE_COORDS.y - (ROOM_RADIUS + 0.5) * FLOOR_SIZE - HORZ_WALL_SIZE / 2
    )
    this.p.image(
      this.cornerB,
      ABSOLUTE_COORDS.x -
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      ABSOLUTE_COORDS.y + (ROOM_RADIUS + 0.5) * FLOOR_SIZE + HORZ_WALL_SIZE / 2
    )
    this.p.image(
      this.cornerB,
      ABSOLUTE_COORDS.x +
        (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
        VERT_WALL_SIZE / 2 +
        (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
      ABSOLUTE_COORDS.y + (ROOM_RADIUS + 0.5) * FLOOR_SIZE + HORZ_WALL_SIZE / 2
    )
    for (let c = 0; c < ROOM_WIDTH; c++) {
      this.p.image(
        this.vertWall,
        ABSOLUTE_COORDS.x -
          (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
        (c - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.y
      )
      this.p.image(
        this.vertWall,
        ABSOLUTE_COORDS.x +
          (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
          VERT_WALL_SIZE / 2 +
          (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
        (c - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.y
      )

      // WALLS AND FLOOR
      for (let r = 0; r < ROOM_HEIGHT; r++) {
        if (c === 0) {
          this.p.image(
            this.horzWall,
            (r - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
            ABSOLUTE_COORDS.y -
              (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
              HORZ_WALL_SIZE / 2
          )
          this.p.image(
            this.horzWallB,
            (r - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
            ABSOLUTE_COORDS.y +
              (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
              HORZ_WALL_SIZE / 2
          )
        }
        this.p.image(
          this.floors[room.floorGrid[r][c]],
          (r - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          (c - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        switch (room.getVal(c - ROOM_RADIUS, r - ROOM_RADIUS)) {
          case 1:
            this.p.circle(
              (r - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
              (c - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.y,
              10
            )
            break
          case 2:
            this.p.image(
              this.end,
              (r - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
              (c - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.y
            )
            break
          default:
            break
        }
      }

      // TUNNELS
      if (entrances.top) {
        this.p.image(
          this.floors[room.floorGridTunnels[0][0]],
          ABSOLUTE_COORDS.x - FLOOR_SIZE,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[0][1]],
          ABSOLUTE_COORDS.x,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[0][2]],
          ABSOLUTE_COORDS.x + FLOOR_SIZE,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
      }
      if (entrances.bottom) {
        this.p.image(
          this.floors[room.floorGridTunnels[1][0]],
          ABSOLUTE_COORDS.x - FLOOR_SIZE,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[1][1]],
          ABSOLUTE_COORDS.x,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[1][2]],
          ABSOLUTE_COORDS.x + FLOOR_SIZE,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.vertWallT,
          -FLOOR_SIZE * 2 +
            VERT_WALL_SIZE / 2 +
            (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2 +
            1 +
            ABSOLUTE_COORDS.x,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.vertWallT,
          FLOOR_SIZE * 2 -
            VERT_WALL_SIZE / 2 +
            (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2 -
            1 +
            ABSOLUTE_COORDS.x,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
      }

      if (entrances.left) {
        this.p.image(
          this.floors[room.floorGridTunnels[2][0]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y - FLOOR_SIZE
        )
        this.p.image(
          this.floors[room.floorGridTunnels[2][1]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[2][2]],
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y + FLOOR_SIZE
        )
        this.p.image(
          this.horzWall,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y - HORZ_WALL_SIZE - FLOOR_SIZE
        )
        this.p.image(
          this.horzWallB,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y + HORZ_WALL_SIZE + FLOOR_SIZE
        )
        this.p.image(
          this.vertWall,
          ABSOLUTE_COORDS.x -
            (ROOM_RADIUS + 0.5) * FLOOR_SIZE -
            VERT_WALL_SIZE / 2 +
            (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
          FLOOR_SIZE + ABSOLUTE_COORDS.y + FLOOR_SIZE
        )
      }
      if (entrances.right) {
        this.p.image(
          this.floors[room.floorGridTunnels[3][0]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y - FLOOR_SIZE
        )
        this.p.image(
          this.floors[room.floorGridTunnels[3][1]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floors[room.floorGridTunnels[3][2]],
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y + FLOOR_SIZE
        )
        this.p.image(
          this.horzWall,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y - HORZ_WALL_SIZE - FLOOR_SIZE
        )
        this.p.image(
          this.horzWallB,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y + HORZ_WALL_SIZE + FLOOR_SIZE
        )
        this.p.image(
          this.vertWall,
          ABSOLUTE_COORDS.x +
            (ROOM_RADIUS + 0.5) * FLOOR_SIZE +
            VERT_WALL_SIZE / 2 +
            (HORZ_WALL_SIZE - VERT_WALL_SIZE) / 2,
          FLOOR_SIZE + ABSOLUTE_COORDS.y + FLOOR_SIZE
        )
      }
    }
  }
}

export default MapSprite
