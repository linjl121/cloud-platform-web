import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import tagsView from './modules/tagsView';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { common, tagsView }
});
