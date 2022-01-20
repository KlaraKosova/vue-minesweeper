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
    matrix: {},
    revealedSum: 0,
    flagsSum: 0,
    gameState: {
      generatingMatrix: false,
      revealedSum: 0,
      flagsSum: 0,
      win: false,
      loss: false,
      // coordinates of the mine that user clicked on
      lossInitiatorCoordinates: {
        x: null,
        y: null
      }
    },
    gameSettings: {
      rows: 10,
      columns: 10,
      mines: 20
    }
  },
  getters,
  mutations
})
