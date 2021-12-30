import { Matrix } from '../Entities/Matrix'

export const mutations = {
  /**
   * Generates game field according to provided settings
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
  }
}
