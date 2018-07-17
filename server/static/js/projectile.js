window.AFRAME.registerComponent('projectile', {
  schema: {
    dir: { type: 'vec3' },
    power: { default: 50 }
  },
  init: function () {
    this.tick = window.AFRAME.utils.throttleTick(this.tick, 1000, this)
    const lookTarget = new window.THREE.Vector3()
      .copy(this.data.dir)
    //   .add(this.el.object3D.position)
    this.el.object3D.lookAt(lookTarget)
    if (this.el.body) {
      window.setTimeout(() => this.applyForce())
    } else {
      this.el.addEventListener(
        'body-loaded',
        () => this.applyForce(),
        { once: true }
      )
    }
    this.el.setAttribute('dynamic-body', {shape: 'none'})
    this.el.setAttribute('shape', 'shape: box; halfExtents: 0.05 0.05 0.05')
    this.duration = 0
  },
  tick: function (t, dt) {
    this.duration += dt
    if (this.el.object3D.position.lengthSq() > 25000 ||
        this.duration > 10000) {
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
      dir.normalize()
      dir.scale(this.data.power, dir)
      this.el.body.applyLocalImpulse(dir, source)
    }
  })()
})
