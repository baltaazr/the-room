import p5 from 'p5'

import Map from './modules/map'
import Player from './modules/player'

class Game {
  constructor(container) {
    const player = new Player()
    const map = new Map()

    this.sketch = p => {
      p.setup = () => {
        const myCanvas = p.createCanvas(600, 400, p.WEBGL)
        myCanvas.parent(container)
      }

      p.draw = () => {
        p.background(100)
      }
    }

    // eslint-disable-next-line new-cap
    this.p5instance = new p5(this.sketch)
  }
}

export default Game
