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
  getUserInfo({ commit }) {
    apiService.getUserInfo().then(({ data }) => {
      commit('setUserInfo', data.data);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
