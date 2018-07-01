window.AFRAME.registerComponent('shooter', {
  schema: {
    direction: { type: 'vec3', default: { x: 0, y: 0, z: -1 } },
    enableTouch: { default: true },
    enableMouse: { default: true }
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
      const proj = document.createElement('a-entity')
      const rotation = this.el.getAttribute('rotation')
      direction.copy(this.data.direction)
      direction.transformDirection(this.el.object3D.matrixWorld).normalize()
      this.el.object3D.getWorldPosition(position)
      ray.set(position, direction)
      proj.setAttribute('position', ray.at(0.3))
      proj.setAttribute('rotation', rotation)
      proj.setAttribute('networked', {
        template: '#projectile-template',
        attachTemplateToLocal: false
      })
      proj.classList.add('projectile')
      proj.setAttribute('mixin', 'projectile-mixin')
      proj.setAttribute('collision-filter', {
        group: 'projectiles',
        collidesWith: 'players, default'
      })
      proj.setAttribute('projectile', {
        dir: ray.at(1)
      })
      this.el.sceneEl.appendChild(proj)
    }
  })()
})
