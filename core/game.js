import p5 from 'p5'

class Game {
  constructor(container) {
    this.sketch = p => {
      p.setup = () => {
        const myCanvas = p.createCanvas(600, 400, p.WEBGL)
        myCanvas.parent(container)
      }

      p.draw = () => {
        p.background(100)
        p.normalMaterial()
        p.noStroke()
        p.push()
        p.rotateZ(p.frameCount * 0.01)
        p.rotateX(p.frameCount * 0.01)
        p.rotateY(p.frameCount * 0.01)
        p.box(100)
        p.pop()
      }
    }

    // eslint-disable-next-line new-cap
    this.p5instance = new p5(this.sketch)
  }
}

export default Game
