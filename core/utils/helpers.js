export default class Helpers {
  static getAscii = c => c.charCodeAt(0)

  static relativeToAbsolute = (x, y) => ({ x: x * 176, y: y * 176 })
}
