window.AFRAME.registerComponent('shooter', {
  schema: {
    team: { type: 'string', oneOf: ['human', 'alien'] },
    active: { default: false },
    direction: { type: 'vec3', default: { x: 0, y: 0, z: -1 } },
    enableTouch: { default: true },
    enableMouse: { default: true },
    otherFireEvent: { default: '' }
  },
  init: function () {
    this.shoot = window.AFRAME.utils.throttle(this.shoot, 300, this)
    if (this.data.enableMouse) {
      document.addEventListener('mousedown', this.shoot)
    }
    if (this.data.enableTouch) {
      document.addEventListener('touchstart', this.shoot)
    }
    this.el.addEventListener('triggerdown', this.shoot)
    this.el.addEventListener('trackpaddown', this.shoot)
    if (this.data.otherFireEvent.length) {
      document.addEventListener(this.data.otherFireEvent, this.shoot)
    }
    // this.el.addEventListener('controllerconnected', evt => {
    //   if (evt.detail.name === 'oculus-touch-controls') {
    //     this.el.setAttribute('shooter', { direction: { x: 0, y: -0.8, z: -1 } })
    //   }
    //   if (evt.detail.name === 'windows-motion-controls') {
    //     this.el.setAttribute('shooter', { direction: { x: 0, y: -0.4472, z: -0.8944 } })
    //   }
    // })
  },
  shoot: (function () {
    const ray = new window.THREE.Ray()
    const direction = new window.THREE.Vector3()
    const position = new window.THREE.Vector3()
    return function () {
      if (!this.data.active) {
        return
      }
      var countdownSound = document.createElement('audio')
      var countdownSource = document.createElement('source')
      countdownSource.setAttribute('src', '/sounds/blaster1.wav')
      countdownSource.setAttribute('type', 'audio/wav')
      countdownSound.appendChild(countdownSource)
      countdownSound.play()
      const proj = document.createElement('a-entity')
      const rotation = this.el.getAttribute('rotation')
      direction.copy(this.data.direction)
      direction.transformDirection(this.el.object3D.matrixWorld).normalize()
      this.el.object3D.getWorldPosition(position)
      ray.set(position, direction)
      proj.setAttribute('position', ray.at(0.7))
      proj.setAttribute('rotation', rotation)
      proj.setAttribute('networked', {
        template: `#${this.data.team}-projectile-template`,
        attachTemplateToLocal: false
      })
      proj.classList.add('projectile')
      proj.setAttribute('mixin', 'projectile-mixin')
      if (this.data.team === 'human') {
        proj.setAttribute('material', 'color: green')
      } else {
        proj.setAttribute('material', 'color: red')
      }
      proj.setAttribute('collision-filter', {
        group: `${this.data.team}Bullets`,
        collidesWith: 'players, default'
      })
      proj.setAttribute('projectile', {
        dir: ray.at(1)
      })
      this.el.sceneEl.appendChild(proj)
    }
  })()
})
