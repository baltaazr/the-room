import WallTilesImg from '../../../assets/Dungeon_Tileset.png'
import Helpers from '../../../utils/helpers'

import Config from 'config'

const FLOOR_SIZE = Config.game.room.floorSize
const VERT_WALL_SIZE = Config.game.room.vertWallSize
const HORZ_WALL_SIZE = Config.game.room.horzWallSize
const ROOM_WIDTH = Config.game.room.width
const ROOM_HEIGHT = Config.game.room.height
const ROOM_RADIUS = Config.game.room.radius

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
      this.floor = img.get(96, 0, 16, 16)
    })
  }

  draw = () => {
    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */
    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    this.drawRoom({ top: true, bottom: true, left: true, right: true }, 0, 0)
    this.drawRoom({ top: true, bottom: true, left: true, right: true }, -1, 0)
    this.drawRoom({ top: true, bottom: true, left: true, right: true }, 1, 0)
    this.drawRoom({ top: true, bottom: true, left: true, right: true }, 0, 1)
    this.drawRoom({ top: true, bottom: true, left: true, right: true }, 0, -1)
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
  drawWall = (entrances, x, y) => {
    this.p.image(this.wall, x, y)
    if (entrances.top) this.p.image(this.vertHall, x + 24, y - 16)
    if (entrances.bottom) this.p.image(this.vertHall, x + 24, y + 64)
  }

  drawRoom = (entrances, x, y) => {
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
          this.floor,
          (r - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          (c - ROOM_RADIUS) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
      }

      // TUNNELS
      if (entrances.top) {
        this.p.image(
          this.floor,
          ABSOLUTE_COORDS.x - FLOOR_SIZE,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floor,
          ABSOLUTE_COORDS.x,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floor,
          ABSOLUTE_COORDS.x + FLOOR_SIZE,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
      }
      if (entrances.bottom) {
        this.p.image(
          this.floor,
          ABSOLUTE_COORDS.x - FLOOR_SIZE,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floor,
          ABSOLUTE_COORDS.x,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floor,
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
          this.floor,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y - FLOOR_SIZE
        )
        this.p.image(
          this.floor,
          -(ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floor,
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
          this.floor,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y - FLOOR_SIZE
        )
        this.p.image(
          this.floor,
          (ROOM_RADIUS + 1) * FLOOR_SIZE + ABSOLUTE_COORDS.x,
          ABSOLUTE_COORDS.y
        )
        this.p.image(
          this.floor,
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

  flipLeft = () => (this.isFlipped = true)

  flipRight = () => (this.isFlipped = false)
}

export default MapSprite
