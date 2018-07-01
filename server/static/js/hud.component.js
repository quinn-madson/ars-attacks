window.AFRAME.registerComponent('hud', {
  schema: {
    currentLife: { default: 10 },
    totalLife: { default: 10 },
    depth: { default: 0.02 },
    height: { default: 0.02 },
    width: { default: 0.05 },
    goodColor: { default: 'green' },
    warnColor: { default: 'yellow' },
    badColor: { default: 'red' },
    space: { default: 0 },
    qiMeterPosition: { default: '-0.13 0.051 -0.57' },
  },
  init: function () {
    this.qiCursor = 0
    this.qiMeter = document.createElement('a-entity')
    this.qiMeter.setAttribute('position', this.data.qiMeterPosition)
    this.qiMeter.setAttribute('rotation', '0 0 90')
    this.el.appendChild(this.qiMeter)
  },
  update: function () {
    while (this.qiMeter.firstChild) {
      this.qiMeter.removeChild(this.qiMeter.firstChild)
      this.qiCursor = 0
    }
    for (let i = 0; i < this.data.currentLife; i++) {
      let qi = document.createElement('a-box')
      qi.setAttribute('depth', this.data.depth)
      qi.setAttribute('height', this.data.height)
      qi.setAttribute('width', this.data.width)
      let indicatorColor = this.data.goodColor
      if (this.data.currentLife < 3) {
        indicatorColor = this.data.badColor
      } else if (this.data.currentLife < 7) {
        indicatorColor = this.data.warnColor
      }
      qi.setAttribute('color', indicatorColor)
      qi.setAttribute('position', `${this.qiCursor} 0 0`)
      this.qiCursor = this.qiCursor + this.data.space + this.data.width
      this.qiMeter.appendChild(qi)
    }
  }
})
