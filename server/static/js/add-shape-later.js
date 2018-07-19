window.AFRAME.registerComponent('add-shape-later', {
  schema: { type: 'string' },
  multiple: true,
  init: function () {
    if (this.el.sceneEl.hasLoaded) {
      this.addShapeLater()
    } else {
      this.el.sceneEl.addEventListener('loaded', this.addShapeLater.bind(this))
    }
  },
  addShapeLater: function () {
    Promise.resolve().then(() => {
      this.el.setAttribute('shape' + (this.id ? `__${this.id}` : ''), this.data)
    })
  }
})
