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
        bluePotion: 4,
        yellowPotion: 5,
        greenPotion: 6
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
    },
    powerups: {
      red: {
        duration: 5000,
        probability: 0.05,
        gridVal: 3
      },
      blue: {
        playerSpeed: 7,
        duration: 5000,
        probability: 0.1,
        gridVal: 4
      },
      yellow: {
        duration: 5000,
        probability: 0.1,
        gridVal: 5,
        lightFar: 200,
        lightNear: 80
      },
      green: {
        enemySpeed: 1000,
        duration: 5000,
        probability: 0.1,
        gridVal: 6
      }
    },
    enemy: {
      speed: 500
    }
  }
}

module.exports = Config
