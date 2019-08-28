function Effects(p) {
  this.p = p

  this.element = document.getElementById('effect')

  this.effects = {}
}

Effects.prototype.addEffect = function(name, description, timeout) {
  this.effects[name] = description

  setTimeout(() => {
    delete this.effects[name]
  }, timeout)
}

Effects.prototype.draw = function() {
  const totalString = Object.keys(this.effects)
    .map(key => `${this.effects[key]}<br/>`)
    .join(' ')

  this.element.innerHTML = totalString
}

export default Effects
