window.AFRAME.registerComponent('projectile', {
  schema: {
    dir: { type: 'vec3' },
    power: { default: 50 }
  },
  dependencies: ['dynamic-body'],
  init: function () {
    this.tick = window.AFRAME.utils.throttleTick(this.tick, 1000, this)
    // const lookTarget = new window.THREE.Vector3()
    //   .copy(this.data.dir)
    //   .add(this.el.object3D.position)
    // this.el.object3D.lookAt(lookTarget)
    if (this.el.body) {
      window.setTimeout(() => this.applyForce())
    } else {
      this.el.addEventListener(
        'body-loaded',
        () => this.applyForce(),
        { once: true }
      )
    }
  },
  tick: function () {
    if (this.el.object3D.position.lengthSq() > 625) {
      this.el.parentEl.removeChild(this.el)
    }
  },
  applyForce: (function () {
    const dir = new window.CANNON.Vec3()
    const source = new window.CANNON.Vec3()
    return function () {
      source.set(0, 0, 0)
      dir.copy(this.data.dir)
      this.el.body.pointToLocalFrame(dir, dir)
      dir.scale(this.data.power, dir)
      this.el.body.applyLocalImpulse(dir, source)
    }
  })()
})
