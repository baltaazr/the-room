import Helpers from '../../../utils/helpers'

function Debug(player, map) {
  this.getPlayer = () => player
  this.getMap = () => map

  const wrapper = document.getElementById('debug')
  const roomNumber = document.createElement('p')

  wrapper.style.color = 'white'

  wrapper.appendChild(roomNumber)

  this.getDOM_roomNumber = () => roomNumber
}

Debug.prototype.update = function() {
  const roomNumber = this.getDOM_roomNumber()

  const playerRef = this.getPlayer()
  const mapRef = this.getMap()

  const playerGlobalPos = playerRef.controls.globalPos
  const { x, y } = Helpers.mapPlayerToRoomNumber(playerGlobalPos)

  if (mapRef.isRoomExists(x, y)) roomNumber.innerHTML = `ROOM: X: ${x}, Y: ${y}`
  else roomNumber.innerHTML = 'ROOM: NOT IN A ROOM'
}

export default Debug
