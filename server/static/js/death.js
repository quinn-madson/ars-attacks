window.AFRAME.registerComponent('death', {
  schema: {
    active: { default: false }
  },
  update: function () {
    if (this.data.active === true) {
      this.deathDome = document.createElement('a-entity')
      this.deathDome.setAttribute('networked', { template: '#dead-player-template' })
      this.el.appendChild(this.deathDome)
      const youdie = document.createElement('a-image')
      youdie.setAttribute('src', '#youdie-texture')
      youdie.setAttribute('position', '0 0 -1')
      this.deathDome.appendChild(youdie)
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
