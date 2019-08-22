import { Player } from './modules/app'

import p5 from 'p5'

class Game {
  constructor(container) {
    this.sketch = p => {
      this.player = new Player(p)

      p.setup = () => {
        const myCanvas = p.createCanvas(600, 400)
        myCanvas.parent(container)
      }

      p.draw = () => {
        p.background('#160f30')
        this.update()
      }
    }

    // eslint-disable-next-line new-cap
    this.p5instance = new p5(this.sketch)
  }

  update = () => {
    this.player.update()
  }
}

export default Game
