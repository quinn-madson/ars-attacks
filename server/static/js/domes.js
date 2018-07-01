window.AFRAME.registerComponent('power-cooldown', {
  schema: {
    current: { default: 0 },
    total: { default: 5000 }
  },
  init: function () {
    this.tick = window.AFRAME.utils.throttleTick(this.tick, 250, this)
  },
  tick: function (t, dt) {
    if (this.data.current > 0) {
      this.el.setAttribute('power-cooldown', {current: this.data.current - dt})
    }
  },
  reset: function () {
    this.el.setAttribute('power-cooldown', {
      current: this.data.total
    })
  }
})
window.AFRAME.registerComponent('shield-power', {
  schema: {
    active: { default: false }
  },
  init: function () {
    this.active = false
    this.makeShield = this.makeShield.bind(this)
    this.btn = document.getElementById('helpHumans')
    this.el.addEventListener('help-humans', () => {
      if (this.el.getAttribute('power-cooldown').current > 0 || !this.data.active) {
        return
      }
      this.active = !this.active
      this.btn.style.backgroundColor = this.active ? 'yellow' : 'transparent'
    })
    this.el.addEventListener('help-aliens', () => {
      this.active = false
      this.btn.style.backgroundColor = 'transparent'
    })
    this.el.addEventListener('mouseup', this.makeShield)
  },
  update: function () {
    if (!this.data.active) {
      this.active = false
      this.btn.style.backgroundColor = 'transparent'
    }
  },
  dependencies: ['power-cooldown'],
  makeShield: function (evt) {
    if (!this.active) {
      return
    }
    const dome = document.createElement('a-entity')
    dome.addEventListener('instantiated', () => {
      dome.setAttribute('position', evt.detail.intersection.point)
    })
    dome.setAttribute('networked', {template: '#shield-dome-template'})
    this.el.components['power-cooldown'].reset()
    this.active = false
    this.btn.style.backgroundColor = 'transparent'
    this.btn.parentElement.style.transition = ''
    this.btn.parentElement.style.backgroundColor = 'red'
    window.setTimeout(() => {
      this.btn.parentElement.style.transition = 'background-color 5s'
      this.btn.parentElement.style.backgroundColor = '#CCC'
    }, 500)
    dome.timeout = window.setTimeout(() => {
      try {
        dome.parentEl.removeChild(dome)
      } catch (err) {
        console.log(err)
      }
    }, 5000)
    this.el.sceneEl.appendChild(dome)
  }
})
window.AFRAME.registerComponent('smoke-power', {
  schema: {
    active: { default: false }
  },
  init: function () {
    this.active = false
    this.makeSmoke = this.makeSmoke.bind(this)
    this.btn = document.getElementById('helpAliens')
    this.el.addEventListener('help-aliens', () => {
      if (this.el.getAttribute('power-cooldown').current > 0 || !this.data.active) {
        return
      }
      this.active = !this.active
      this.btn.style.backgroundColor = this.active ? 'yellow' : 'transparent'
    })
    this.el.addEventListener('help-humans', () => {
      this.active = false
      this.btn.style.backgroundColor = 'transparent'
    })
    this.el.addEventListener('mouseup', this.makeSmoke)
  },
  dependencies: ['power-cooldown'],
  makeSmoke: function (evt) {
    if (!this.active) {
      return
    }
    const dome = document.createElement('a-entity')
    dome.addEventListener('instantiated', () => {
      dome.setAttribute('position', evt.detail.intersection.point)
    })
    dome.setAttribute('networked', {template: '#smoke-dome-template'})
    this.el.components['power-cooldown'].reset()
    this.active = false
    this.btn.style.backgroundColor = 'transparent'
    this.btn.parentElement.style.transition = ''
    this.btn.parentElement.style.backgroundColor = 'red'
    window.setTimeout(() => {
      this.btn.parentElement.style.transition = 'background-color 5s'
      this.btn.parentElement.style.backgroundColor = '#CCC'
    }, 500)

    dome.timeout = window.setTimeout(() => {
      try {
        dome.parentEl.removeChild(dome)
      } catch (err) {
        console.log(err)
      }
    }, 10000)
    this.el.sceneEl.appendChild(dome)
  }
})
