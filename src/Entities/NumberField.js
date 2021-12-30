import { Field } from './Field'

export class NumberField extends Field {
  /**
   * Initializes field with value 1
   */
  constructor () {
    super()
    this.value = 1
  }

  /**
   * Increments field value
   */
  increment () {
    ++this.value
  }
}
