import { Field } from './Field'

export class Mine extends Field {
  constructor ({ x, y }) {
    super({ x, y })
    this.value = 'x'
  }
}
