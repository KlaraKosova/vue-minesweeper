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
  },

  /**
   * Forces vuex to recalculate number of revealed fields and fields with flags
   *
   * @param state
   * @return {void}
   */
  recalculateState (state) {
    console.log('here')
    let flagsSum = 0
    let revealedSum = 0
    for (let i = 0; i < state.matrix.rows; i++) {
      for (let j = 0; j < state.matrix.columns; j++) {
        const field = state.matrix.getFieldByCoordinates({ x: i, y: j })
        if (field.flagged) {
          flagsSum++
        }
        if (!field.hidden) {
          revealedSum++
        }
      }
    }

    state.revealedSum = revealedSum
    state.flagsSum = flagsSum
  }

}
