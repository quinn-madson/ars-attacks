window.AFRAME.registerComponent('death', {
  schema: {
    active: { default: false }
  },
  update: function () {
    if (this.data.active === true) {
      this.deathDome = document.createElement('a-entity')
      this.deathDome.setAttribute('networked', { template: '#dead-player-template' })
      this.el.appendChild(this.deathDome)
    } else {
      try {
        if (this.deathDome) {
          this.el.removeChild(this.deathDome)
          this.deathDome = null
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
})
