const SPOTLIGHT_SIZE = 'transparent 40px, rgba(0, 0, 0) 70px)'

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
