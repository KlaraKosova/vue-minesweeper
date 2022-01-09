export class Field {
  hidden;
  value;
  #x;
  #y;
  /**
   * Initializes the field
   * All fields are hidden at the start of the game, the value is overwritten by child classes
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   */
  constructor ({ x, y }) {
    this.hidden = true
    this.value = null
    this.#x = x
    this.#y = y
  }

  /**
   * Changes the 'hidden' attribute to false
   * !!! Should be called only from Matrix (except for function mocks in tests)
   * @return void
   */
  show () {
    this.hidden = false
  }

  /**
   * Returns the coordinates of the field
   * @return {{x, y}}
   */
  getCoordinates () {
    return {
      x: this.#x,
      y: this.#y
    }
  }
}
