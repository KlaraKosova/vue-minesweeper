import { EmptyField } from './EmptyField'
import { Mine } from './Mine'
import { NumberField } from './NumberField'

export class Matrix {
  rows;
  columns;
  #matrix;
  /**
   * Initializes matrix with empty fields
   * @param {Number} rows
   * @param {Number} columns
   */
  constructor (rows, columns) {
    this.rows = rows
    this.columns = columns
    this.#matrix = []

    for (let i = 0; i < rows; i++) {
      const tmpRowArray = []
      for (let j = 0; j < columns; j++) {
        tmpRowArray.push(new EmptyField())
      }
      this.#matrix.push(tmpRowArray)
    }

    // console.log(this.#matrix)
  }

  generateMines (mines) {
    const mineSequences = []
    for (let i = 0; i < mines; i++) {
      let mineSequence
      // unique position for each mine
      do {
        mineSequence = Math.round(Math.random() * this.rows * this.columns)
      } while (mineSequences.includes(mineSequence))
      mineSequences.push(mineSequence)
    }

    // create instances of mines and store them in the matrix
    mineSequences.forEach((sequence) => {
      const row = Math.floor(sequence / this.rows)
      const col = sequence % this.rows
      this.#matrix[row][col] = new Mine()

      // TODO: refactor
      // increment fields around mine
      if (row !== 0) {
        if (col !== 0) {
          if (this.#matrix[row - 1][col - 1] instanceof EmptyField) {
            this.#matrix[row - 1][col - 1] = new NumberField()
          } else if (this.#matrix[row - 1][col - 1] instanceof NumberField) {
            this.#matrix[row - 1][col - 1].increment()
          }
        }
        if (col !== this.columns - 1) {
          if (this.#matrix[row - 1][col + 1] instanceof EmptyField) {
            this.#matrix[row - 1][col + 1] = new NumberField()
          } else if (this.#matrix[row - 1][col + 1] instanceof NumberField) {
            this.#matrix[row - 1][col + 1].increment()
          }
        }
        if (this.#matrix[row - 1][col] instanceof EmptyField) {
          this.#matrix[row - 1][col] = new NumberField()
        } else if (this.#matrix[row - 1][col] instanceof NumberField) {
          this.#matrix[row - 1][col].increment()
        }
      }

      if (row !== this.rows - 1) {
        if (col !== 0) {
          if (this.#matrix[row + 1][col - 1] instanceof EmptyField) {
            this.#matrix[row + 1][col - 1] = new NumberField()
          } else if (this.#matrix[row + 1][col - 1] instanceof NumberField) {
            this.#matrix[row + 1][col - 1].increment()
          }
        }
        if (col !== this.columns - 1) {
          if (this.#matrix[row + 1][col + 1] instanceof EmptyField) {
            this.#matrix[row + 1][col + 1] = new NumberField()
          } else if (this.#matrix[row + 1][col + 1] instanceof NumberField) {
            this.#matrix[row + 1][col + 1].increment()
          }
        }
        if (this.#matrix[row + 1][col] instanceof EmptyField) {
          this.#matrix[row + 1][col] = new NumberField()
        } else if (this.#matrix[row + 1][col] instanceof NumberField) {
          this.#matrix[row + 1][col].increment()
        }
      }
      if (col !== 0) {
        if (this.#matrix[row][col - 1] instanceof EmptyField) {
          this.#matrix[row][col - 1] = new NumberField()
        } else if (this.#matrix[row][col - 1] instanceof NumberField) {
          this.#matrix[row][col - 1].increment()
        }
      }
      if (col !== this.columns - 1) {
        if (this.#matrix[row][col + 1] instanceof EmptyField) {
          this.#matrix[row][col + 1] = new NumberField()
        } else if (this.#matrix[row][col + 1] instanceof NumberField) {
          this.#matrix[row][col + 1].increment()
        }
      }
    })
  }

  getFieldByCoordinates ({ x, y }) {
    return this.#matrix[x][y]
  }

  logMatrix () {
    let str = ''
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        str += `${this.#matrix[i][j].value === null ? '-' : this.#matrix[i][j].value} `
      }

      str += '\n'
    }

    console.log(str)
  }
}
