export const getters = {
  /**
   * Returns a function that can be called with <<x, y>> coordinates to get specific field
     * @return {function({ x: Number, y: Number}): Field}
   */
  field (state) {
    return (coordinates) => state.matrix.getFieldByCoordinates(coordinates)
  },
  /**
   * Returns rows and columns of the game matrix
   * @return {{rows: Number, columns: Number}}
   */
  matrixDimensions (state) {
    return { rows: state.matrix.rows, columns: state.matrix.columns }
  },
  /**
   * @see Entities/Matrix/everyMineLocated
   * @return {Boolean}
   */
  isEveryMineLocated (state) {
    return state.matrix.rows * state.matrix.columns === state.flagsSum + state.revealedSum
  }
}
