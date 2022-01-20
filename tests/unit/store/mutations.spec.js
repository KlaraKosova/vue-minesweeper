import { mutations } from '@/store/mutations'
import { Matrix } from '@/Entities/Matrix'

describe('mutations', () => {
  it('generateMatrix for square matrix', () => {
    const state = {
      matrix: {},
      gameState: {}
    }
    mutations.generateMatrix(state, { rows: 10, columns: 10, mines: 10 })

    const stringified = state.matrix.getStringifiedMatrix()
    expect(state.matrix).toBeInstanceOf(Matrix)
    // if we split stringified matrix by 'x' (mines), we must get number of mines + 1
    expect(stringified.split('x').length).toBe(11)
    console.log(stringified)
  })

  it('generateMatrix for rows > columns', () => {
    const state = {
      matrix: {},
      gameState: {}
    }
    mutations.generateMatrix(state, { rows: 20, columns: 10, mines: 10 })

    const stringified = state.matrix.getStringifiedMatrix()
    expect(state.matrix).toBeInstanceOf(Matrix)
    // if we split stringified matrix by 'x' (mines), we must get number of mines + 1
    expect(stringified.split('x').length).toBe(11)
  })
  it('generateMatrix for rows < columns', () => {
    const state = {
      matrix: {},
      gameState: {}
    }
    mutations.generateMatrix(state, { rows: 10, columns: 20, mines: 10 })

    const stringified = state.matrix.getStringifiedMatrix()
    expect(state.matrix).toBeInstanceOf(Matrix)
    // if we split stringified matrix by 'x' (mines), we must get number of mines + 1
    expect(stringified.split('x').length).toBe(11)
  })

  it('"showField" for NumberFields (value "1")', () => {
    const state = {
      matrix: {},
      gameState: {}
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
