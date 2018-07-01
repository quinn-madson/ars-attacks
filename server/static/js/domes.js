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
  init: function () {
    this.active = false
    this.makeShield = this.makeShield.bind(this)
    this.el.addEventListener('help-humans', () => {
      this.active = !this.active
    })
    this.el.addEventListener('help-aliens', () => {
      this.active = false
    })
    this.el.addEventListener('click', this.makeShield)
  },
  dependencies: ['power-cooldown'],
  makeShield: function (evt) {
    if (this.el.getAttribute('power-cooldown').current > 0) {
      return
    }
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
  init: function () {
    this.active = false
    this.makeSmoke = this.makeSmoke.bind(this)
    this.el.addEventListener('help-aliens', () => {
      this.active = !this.active
    })
    this.el.addEventListener('help-humans', () => {
      this.active = false
    })
    this.el.addEventListener('click', this.makeSmoke)
  },
  dependencies: ['power-cooldown'],
  makeSmoke: function (evt) {
    if (this.el.getAttribute('power-cooldown').current > 0) {
      return
    }
    if (!this.active) {
      return
    }
    const dome = document.createElement('a-entity')
    // let delay = 1000
    // const tick = 100
    // const total = 10000
    dome.addEventListener('instantiated', () => {
      dome.setAttribute('position', evt.detail.intersection.point)
    })
    dome.setAttribute('networked', {template: '#smoke-dome-template'})
    this.el.components['power-cooldown'].reset()
    this.active = false
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
