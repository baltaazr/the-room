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
        vertical: 5,
        horizontal: 5
      },
      light: {
        far: 100, // px
        near: 40
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
        enemy: 1,
        end: 2,
        redPotion: 3,
        bluePotion: 4
      },
      padding: {
        px: 16,
        nx: 30,
        py: 28,
        ny: 20
      },
      floorSize: 16,
      vertWallSize: 7,
      horzWallSize: 16
    }
  }
}

module.exports = Config
