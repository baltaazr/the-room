const Config = {
  window: {
    width: 1000,
    height: 800
  },
  game: {
    render: {
      viewportPadding: 100
    },
    player: {
      acc: {
        vertical: 10,
        horizontal: 10
      }
    },
    map: {
      width: 5000,
      height: 3000
    },
    room: {
      width: 9,
      height: 9,
      radius: 4,
      gridVals: {
        empty: 0,
        enemy: 1
      }
    }
  }
}

module.exports = Config
