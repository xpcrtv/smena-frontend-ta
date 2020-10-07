const state = {
  error: null
};

const mutations = {
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  }
};

const actions = {
  setError({ commit }, error) {
    commit('setError', error);
  }
};

const getters = {
  errorMessage(state) {
    return state.error;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
