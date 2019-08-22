class Enemy {
  constructor() {
    this.room = [0, 0]
    this.roomCoords = [0, 0]
  }

  move = player => {
    const surroundings = this.getSurroundings(this.roomCoords)
    let dist = this.getDist(
      this.getAbsoluteCoords(this.room, surroundings[0]),
      this.getAbsoluteCoords(player.room, player.roomCoords)
    )
    let newPosition = surroundings[0]
    for (let i = 1; i < surroundings.length; i++) {
      const tempDist = this.getDist(
        this.getAbsoluteCoords(this.room, surroundings[i]),
        this.getAbsoluteCoords(player.room, player.roomCoords)
      )
      if (tempDist < dist) {
        newPosition = surroundings[i]
        dist = tempDist
      }
    }

    if (newPosition[0] > 4) {
      this.room[0] += 1
      this.roomCoords[0] = -4
    } else if (newPosition[0] < -4) {
      this.room[0] -= 1
      this.roomCoords[0] = 4
    } else if (newPosition[1] > 4) {
      this.room[1] += 1
      this.roomCoords[1] = -4
    } else if (newPosition[1] < -4) {
      this.room[1] -= 1
      this.roomCoords[1] = 4
    } else {
      this.roomCoords = newPosition
    }
  }

  getSurroundings = coords => {
    return [
      [coords[0], coords[1] + 1],
      [coords[0] + 1, coords[1]],
      [coords[0], coords[1] - 1],
      [coords[0] - 1, coords[1]]
    ]
  }

  getAbsoluteCoords = (room, roomCoords) => {
    return [room[0] + roomCoords[0] / 9, room[1] + roomCoords[1] / 9]
  }

  getDist = (p1, p2) => Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)
}

export default Enemy
