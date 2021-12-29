import { Field } from './Field'

export class NumberField extends Field {
  constructor () {
    super()
    this.value = 1
  }

  increment () {
    ++this.value
  }
}
