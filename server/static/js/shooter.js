window.AFRAME.registerComponent('shooter', {
  init: function () {
    this.shoot = window.AFRAME.utils.throttle(this.shoot, 300, this)
    document.addEventListener('mousedown', this.shoot)
    document.addEventListener('touchstart', this.shoot)
    this.el.addEventListener('triggerdown', this.shoot)
    this.el.addEventListener('trackpaddown', this.shoot)
  },
  shoot: (function () {
    const ray = new window.THREE.Ray()
    const direction = new window.THREE.Vector3()
    return function () {
      const proj = document.createElement('a-entity')
      const rotation = this.el.getAttribute('rotation')
      direction.set(0, 0, -1)
      direction.transformDirection(this.el.object3D.matrixWorld).normalize()
      ray.set(this.el.object3D.position, direction)
      proj.setAttribute('position', ray.at(0.1))
      proj.setAttribute('rotation', rotation)
      proj.setAttribute('networked', {
        template: '#projectile-template',
        attachTemplateToLocal: false
      })
      proj.classList.add('projectile')
      proj.setAttribute('mixin', 'projectile-mixin')
      proj.setAttribute('projectile', {
        dir: ray.at(1)
      })
      this.el.sceneEl.appendChild(proj)
    }
  })()
})
