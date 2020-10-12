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
  logIn({ commit, dispatch }, userData) {
    return apiService
      .logIn(userData)
      .then(({ data }) => {
        commit('authComplete', data.token);
      })
      .catch(error => {
        let errorMsg;
        if (error.response) {
          if (error.response.status === 401) {
            errorMsg = 'неправильные имя пользователя/пароль';
          }
        } else if (error.request) {
          errorMsg = 'Возникли проблемы с сетью';
        } else {
          errorMsg = error.message;
        }
        dispatch('setError', errorMsg);
        return Promise.reject(error);
      });
  },
  register({ commit, dispatch }, userData) {
    return apiService
      .register(userData)
      .then(({ data }) => {
        commit('authComplete', data.token);
      })
      .catch(error => {
        let errorMsg;
        if (error.response) {
          if (error.response.status === 401) {
            errorMsg = 'Пользователь с таким именем уже зарегистрирован';
          }
        } else if (error.request) {
          errorMsg = 'Возникли проблемы с сетью';
        } else {
          errorMsg = error.message;
        }
        dispatch('setError', errorMsg);
        return Promise.reject(error);
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
