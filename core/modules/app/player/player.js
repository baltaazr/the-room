import PlayerSprite from '../../interfaces/playerSprite/playerSprite'

export default class Player {
  constructor(p) {
    this.sprite = new PlayerSprite(p)
  }

  update = () => {
    this.sprite.draw()
  }
}
