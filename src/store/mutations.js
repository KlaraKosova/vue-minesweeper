import { Matrix } from '../Entities/Matrix'
import { ClickedOnMineError } from '../Entities/ClickedOnMineError'

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
    state.gameState.loss = false
    state.gameState.win = false
    state.gameState.lossInitiatorCoordinates = {
      x: null,
      y: null
    }
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
    try {
      state.matrix.showField({ x, y })
    } catch (error) {
      if (error instanceof ClickedOnMineError) {
        state.gameState.win = false
        state.gameState.loss = true
        state.gameState.lossInitiatorCoordinates = error.coordinates
        state.matrix.showAllMines()
      }
    }
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
    try {
      state.matrix.tryRevealAround({ x, y })
    } catch (error) {
      if (error instanceof ClickedOnMineError) {
        state.gameState.win = false
        state.gameState.loss = true
        state.gameState.lossInitiatorCoordinates = error.coordinates
        state.matrix.showAllMines()
      }
    }
  },

  /**
   * Forces vuex to recalculate number of revealed fields and fields with flags
   * @param state
   * @return {void}
   */
  recalculateState (state) {
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

    // user won every mine has flag on it and the rest of fields are revealed
    if (revealedSum + flagsSum === state.matrix.rows * state.matrix.columns && flagsSum === state.gameSettings.mines) {
      state.gameState.win = true
      state.gameState.loss = false
    }
    state.gameState.revealedSum = revealedSum
    state.gameState.flagsSum = flagsSum
  }

}
