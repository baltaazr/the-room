import Config from 'config'

const LIGHT_FAR = Config.game.player.light.far
const LIGHT_NEAR = Config.game.player.light.near
const SPOTLIGHT_SIZE = `transparent ${LIGHT_NEAR}px, rgba(0, 0, 0) ${LIGHT_FAR}px)`

function Spotlight(player) {
  const spotlight = document.getElementById('spotlight')

  this.getSpotlight = () => spotlight
  this.getPlayer = () => player
}

Spotlight.prototype.update = function() {
  const spotlight = this.getSpotlight()
  const playerRef = this.getPlayer()

  const { x, y } = playerRef.controls.windowPos

  spotlight.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, ${SPOTLIGHT_SIZE}`
}

export default Spotlight
