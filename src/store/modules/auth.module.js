import apiService from '../../services/apiService';

const state = {
  token: localStorage.getItem('token') || null
};

const mutations = {
  authComplete(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
    apiService.setHeader('Authorization', `Bearer ${token}`);
  },
  authReset(state) {
    localStorage.removeItem('token');
    state.user = null;
    state.token = null;
    apiService.removeHeader('Authorization');
  }
};

const actions = {
  logIn({ commit }, userData) {
    return apiService.logIn(userData).then(({ data }) => {
      commit('authComplete', data.token);
    });
  },
  register({ commit }, userData) {
    return apiService.register(userData).then(({ data }) => {
      commit('authComplete', data.token);
    });
  },
  logOut({ commit }) {
    commit('authReset');
  },
  checkAuth({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setHeader('Authorization', `Bearer ${token}`);
    } else {
      commit('authReset');
    }
  }
};

const getters = {
  isLoggedIn(state) {
    return Boolean(state.token);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
