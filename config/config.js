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
        far: 10000, // px
        near: 10000
      },
      sprite: {
        width: 32,
        height: 32
      }
    },
    map: {
      width: 5000,
      height: 3000,
      enemyIncrement: 5 // every 4 levels
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
        px: 20,
        nx: 24,
        py: 28,
        ny: 20
      },
      floorSize: 16,
      vertWallSize: 7,
      horzWallSize: 16,
      monsterGridTimeoutConstant: 3000, // 1s
      levelEnemyInterval: 200
    },
    powerups: {
      red: {
        duration: 5000,
        probability: 0.05,
        // probability: 1,
        gridVal: 3,
        description: 'Invincibility'
      },
      blue: {
        playerSpeed: 7,
        duration: 5000,
        probability: 0.1,
        gridVal: 4,
        description: 'Speed'
      },
      yellow: {
        duration: 5000,
        probability: 0.1,
        gridVal: 5,
        lightFar: 200,
        lightNear: 80,
        description: 'Night Vision'
      },
      green: {
        enemySpeed: 1000,
        duration: 5000,
        probability: 0.5,
        gridVal: 6,
        description: 'Necromancer'
      }
    },
    enemy: {
      speed: 500,
      levelUpFactor: 0.95
    }
  }
}

export default Config
