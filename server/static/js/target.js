window.AFRAME.registerComponent('target', {
  init: function () {
    this.hit = this.hit.bind(this)
    this.el.addEventListener('collisions', this.hit)
  },
  hit: function (evt) {
    for (let e of evt.detail.els) {
      if (e.classList.contains('projectile')) {
        if (!window.NAF.utils.isMine(e)) {
          window.NAF.utils.takeOwnership(e)
        }
        e.parentEl.removeChild(e)
        this.el.sceneEl.emit('decreaseLife')
      }
    }
  }
})
