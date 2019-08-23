import PlayerSprite from '../../interfaces/playerSprite/playerSprite'

import Controls from './controls'

export default class Player {
  constructor(p) {
    this.controls = new Controls(p, this)

    this.sprite = new PlayerSprite(p)
  }

  update = () => {
    this.controls.tick()
    this.sprite.draw(...this.controls.getPosData())
  }
}
