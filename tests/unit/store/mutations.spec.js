import { mutations } from '@/store/mutations'
import { Matrix } from '@/Entities/Matrix'

describe('mutations', () => {
  it('generateMatrix', () => {
    const state = {
      matrix: {}
    }
    mutations.generateMatrix(state, { rows: 10, columns: 10, mines: 10 })

    const stringified = state.matrix.getStringifiedMatrix()
    expect(state.matrix).toBeInstanceOf(Matrix)
    // if we split stringified matrix by 'x' (mines), we must get number of mines + 1
    expect(stringified.split('x').length).toBe(11)
    console.log(stringified)
  })
  it('"showField" for NumberFields (value "1")', () => {
    const state = {
      matrix: {}
    }
    // generates testing matrix
    mutations.generateMatrix(state, { rows: 10, columns: 10, mines: 1 })
    const stringified = state.matrix.getStringifiedMatrix()
    // finds position of first field with value 1
    const position = stringified.split(' ').indexOf('1')
    // get coordinates from position
    let x, y
    // eslint-disable-next-line prefer-const
    [x, y] = [Math.floor(position / 10), position % 10]

    mutations.showField(state, { x, y })
    const field = state.matrix.getFieldByCoordinates({ x, y })

    expect(field.hidden).toBe(false)
  })
})
