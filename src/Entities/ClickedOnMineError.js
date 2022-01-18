export class ClickedOnMineError extends Error {
  /**
     * @param {Number} x
     * @param {Number} y
     * @param {*} params
     */
  constructor ({ x, y }, ...params) {
    super(...params)

    this.name = 'ClickedOnMineError'
    this.coordinates = { x, y }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClickedOnMineError)
    }
  }
}
