import { mutations } from '@/store/mutations'
import { Matrix } from '@/Entities/Matrix'

test('"generateMatrix" generates matrix 10x10 with 10 mines', () => {
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
