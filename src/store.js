import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  count: 11
};

const mutations = {
  minus(state) {
    state.count--;
  },
  add(state, n) {
    state.count += n.a;
  }
};

const getters = {
  count: function(state) {
    return state.count += 1000;
  }
};

const actions = {
  jiaplus(content) {
    content.commit('add', { a: 10 });
  },
  jianplus({ commit }) {
    commit('minus');
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});

