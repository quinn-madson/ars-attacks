AFRAME.registerState({
  initialState: {
    score: 0,
    life: 10,
    mode: 'lobby',
    gunsEnabled: false,
    dead: false
  },
  handlers: {
    decreaseScore: function (state, action) {
      state.score -= action.points;
    },
    increaseScore: function (state, action) {
      state.score += action.points;
    },
    decreaseLife: function (state, action) {
      var hitSound = document.createElement('audio')
      var hitSource = document.createElement('source')
      hitSource.setAttribute('src', '/sounds/hit_sound2.wav')
      hitSource.setAttribute('type', 'audio/wav')
      hitSound.appendChild(hitSource)
      hitSound.play()
      state.life -= 1;
      if (state.life <= 0) {
        AFRAME.scenes[0].emit('endGame')
        state.dead = true
      }
    },
    increaseLife: function (state, action) {
      state.life++;
    },
    startGame: function (state, action) {
      state.mode = 'battle'
      state.gunsEnabled = true
    },
    endGame: function (state, action) {
      state.mode = 'lobby'
      state.gunsEnabled = false
    }
  }
});
