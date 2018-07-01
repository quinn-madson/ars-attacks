window.AFRAME.registerComponent('lobby', {
  schema: {
    countDown: { default: 10 }
  },
  init: function () {
    this.startGame = this.startGame.bind(this)
    var that = this
    this.countdownTimer = setTimeout(function() {
      NAF.connection.broadcastData('start-game', {})
      that.startGame()
    }, this.data.countDown * 1000)
    NAF.connection.subscribeToDataChannel('start-game', function() {
      that.startGame()
    }) 
  },
  update: function () {
  },
  startGame: function(debug) {
    clearTimeout(this.countdownTimer)
    NAF.connection.unsubscribeToDataChannel('start-game')
    var countdownEl = document.createElement('a-entity')
    countdownEl.setAttribute('geometry', 'primitive:box; height:2; width:2; depth: 2;')
    countdownEl.setAttribute('material', 'shader:gif;src:url(images/countdown2.gif);')
    countdownEl.setAttribute('gif', '')
    countdownEl.setAttribute('position', '0 0.25 -3')
    countdownEl.setAttribute('rotation', '0 45 0')
    this.el.appendChild(countdownEl)
    var that = this
    var countdownSound = document.createElement('audio')
    var countdownSource = document.createElement('source')
    countdownSource.setAttribute('src', '/sounds/countdown.wav')
    countdownSource.setAttribute('type', 'audio/wav')
    countdownSound.appendChild(countdownSource)
    countdownSound.play()
    setTimeout(function(){
      countdownEl.pause()
    }, 4000)
    setTimeout(function() {
      that.el.removeChild(countdownEl)
      AFRAME.scenes[0].emit('startGame')
    }, 4500)
  }
})
