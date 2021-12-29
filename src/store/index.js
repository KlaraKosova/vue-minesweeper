import Vuex from 'vuex'
import Vue from 'vue'
import { mutations } from 'mutations.js'
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
  getters: {
    /**
     * @return {function({ x: Number, y: Number}): Field}
     */
    field (state) {
      return (coordinates) => state.matrix.getFieldByCoordinates(coordinates)
    }
  },
  mutations
})
