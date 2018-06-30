AFRAME.registerState({
  initialState: {
    score: 0,
    life: 10
  },
  handlers: {
    decreaseScore: function (state, action) {
      state.score -= action.points;
    },
    increaseScore: function (state, action) {
      state.score += action.points;
    },
    decreaseLife: function (state, action) {
      state.life--;
    },
    increaseLife: function (state, action) {
      state.life++;
    }
  },
});