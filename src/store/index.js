import Vuex from 'vuex'
import Vue from 'vue'
import { mutations } from './mutations.js'
import { getters } from '@/store/getters'
Vue.use(Vuex)

export const store = new Vuex.Store({
  /**
   * @typedef {{
   *   matrix: {Matrix}
   * }} VuexState
   */
  state: {
    matrix: {}
  },
  getters,
  mutations
})
