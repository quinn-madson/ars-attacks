AFRAME.registerState({
  initialState: {
    score: 0,
    life: 10,
    mode: 'lobby',
    gunsEnabled: false
  },
  handlers: {
    decreaseScore: function (state, action) {
      state.score -= action.points;
    },
    increaseScore: function (state, action) {
      state.score += action.points;
    },
    decreaseLife: function (state, action) {
      state.life -= action.power || 1;
      if (state.life <= 0) {
        window.AFRAME.scenes[0].pause()
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
