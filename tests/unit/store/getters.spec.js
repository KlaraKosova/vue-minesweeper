import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations'
import { EmptyField } from '@/Entities/EmptyField'

describe('getters', () => {
  it('field', () => {
    const state = {
      matrix: {}
    }
    // generate matrix for testing
    mutations.generateMatrix(state, { rows: 10, columns: 10, mines: 10 })
    // stringified matrix for comparison
    const stringified = state.matrix.getStringifiedMatrix()

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
      // index of char in stringified matrix - row offset + column offset
      // one row has 21 characters (10 fields, 10 spaces, '\n')
      // columns are separated by space -> values are at odd positions
        const index = 21 * i + (2 * j + 1) - 1
        const field = getters.field(state)({ x: i, y: j })

        if (field instanceof EmptyField) {
          expect(stringified[index]).toBe('-')
        } else {
        // typecast values to Numbers
          expect(+(field.value)).toBe(+(stringified[index]))
        }
      }
    }
  })
  it('matrixDimensions', () => {
    const state = {
      matrix: {}
    }
    // generate matrix for testing
    mutations.generateMatrix(state, { rows: 15, columns: 10, mines: 10 })

    expect(getters.matrixDimensions(state).rows).toBe(15)
    expect(getters.matrixDimensions(state).columns).toBe(10)
  })
})
