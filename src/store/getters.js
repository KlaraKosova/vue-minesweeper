export const getters = {
  /**
     * @return {function({ x: Number, y: Number}): Field}
   */
  field (state) {
    return (coordinates) => state.matrix.getFieldByCoordinates(coordinates)
  }
}
