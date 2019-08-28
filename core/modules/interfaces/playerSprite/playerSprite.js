import PlayerWalkImg from 'assets/sprites/Owlet_Monster_Walk_6.png'
import PlayerIdleImg from 'assets/sprites/Owlet_Monster_Idle_4.png'
import Config from 'config'

// change every 5 frames
const SPRITE_CHANGE_IDLE_FRAME = 5
const SPRITE_CHANGE_WALK_FRAME = 2
const SPRITE_WIDTH = Config.game.player.sprite.width

class PlayerSprite {
  constructor(p, player) {
    this.p = p
    this.player = player

    this.isFlipped = false
    this.isSetup = false
  }

  loadSprite = () => {
    this.walkingImgs = []
    this.idleImgs = []

    this.p.loadImage(PlayerWalkImg, img => {
      for (let i = 0; i < 6; i++) {
        const pos = i * 32
        const sprite = img.get(pos, 0, 32, 32)
        this.walkingImgs.push(sprite)
      }
    })

    this.p.loadImage(PlayerIdleImg, img => {
      for (let i = 0; i < 4; i++) {
        const pos = i * 32
        const sprite = img.get(pos, 0, 32, 32)
        this.idleImgs.push(sprite)
      }
    })
  }

  draw = windowPos => {
    const { x: wx, y: wy } = windowPos

    /* -------------------------------------------------------------------------- */
    /*                              DRAW PLAYER HERE                              */
    /* -------------------------------------------------------------------------- */

    this.p.push()
    this.p.rectMode(this.p.CENTER)
    this.p.fill('#eae7af')
    if (this.walkingImgs.length) {
      if (this.isFlipped) this.p.scale(-1, 1)

      const { frameCount } = this.p
      const sprite = this.player.isIdle
        ? this.idleImgs[Math.floor(frameCount / SPRITE_CHANGE_IDLE_FRAME) % 3]
        : this.walkingImgs[
            Math.floor(frameCount / SPRITE_CHANGE_WALK_FRAME) % 5
          ]

      this.p.imageMode(this.p.CENTER)
      this.p.image(
        sprite,
        (wx + SPRITE_WIDTH / 4) * (this.isFlipped ? -1 : 1),
        wy
      )
    } else this.p.rect(wx, wy, 20, 20)
    this.p.pop()
  }

  flipLeft = () => (this.isFlipped = true)

  flipRight = () => (this.isFlipped = false)
}

export default PlayerSprite
