export class Field {
  /**
   * Initializes the field
   * All fields are hidden at the start of the game, the value is overwritten by child classes
   */
  constructor () {
    this.hidden = true
    this.value = null
  }
}
