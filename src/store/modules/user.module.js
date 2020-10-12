import apiService from '../../services/apiService';

const state = {
  user: null
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.user = userInfo;
  }
};

const actions = {
  getUserInfo({ commit, dispatch }) {
    apiService
      .getUserInfo()
      .then(({ data }) => {
        commit('setUserInfo', data.data);
      })
      .catch(error => {
        let errorMsg;
        if (error.response) {
          if (error.response.status === 400) {
            errorMsg = 'Не удалось получить информацию о пользователе';
          }
          if (error.response.status === 401) {
            errorMsg = 'пользователь не авторизован';
          }
        } else if (error.request) {
          errorMsg = 'Возникли проблемы с сетью';
        } else {
          errorMsg = error.message;
        }
        dispatch('setError', errorMsg);
        return Promise.reject(error);
      });
  }
};

export default {
  state,
  mutations,
  actions
};
