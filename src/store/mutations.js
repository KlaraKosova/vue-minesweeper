import { Matrix } from '../Entities/Matrix'

export const mutations = {
  /**
   * Generates game field based on provided settings
   * @param {VuexState} state
   * @param {Object} options
   * @param {Number} options.rows Number of rows
   * @param {Number} options.columns Number of columns
   * @param {Number} options.mines Number of mines
   * @return void
   */
  generateMatrix (state, { rows, columns, mines }) {
    // reset matrix
    state.matrix = new Matrix(rows, columns)
    state.matrix.generateMines(mines)
  },

  /**
   * Propagates to matrix
   * @param {VuexState} state
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   * @return {void}
   */
  showField (state, { x, y }) {
    state.matrix.showField({ x, y })
  },

  /**
   * Propagates to matrix
   * @param {VuexState} state
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   * @return {void}
   */
  tryRevealAround (state, { x, y }) {
    state.matrix.tryRevealAround({ x, y })
  }
}
