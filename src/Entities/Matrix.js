import { EmptyField } from './EmptyField'
import { Mine } from './Mine'
import { NumberField } from './NumberField'

export class Matrix {
  rows;
  columns;
  #matrix;
  /**
   * Initializes matrix with empty fields
   * @param {Number} rows number of rows
   * @param {Number} columns number of columns
   */
  constructor (rows, columns) {
    this.rows = rows
    this.columns = columns
    this.#matrix = []

    for (let i = 0; i < rows; i++) {
      const tmpRowArray = []
      for (let j = 0; j < columns; j++) {
        tmpRowArray.push(new EmptyField({ x: i, y: j }))
      }
      this.#matrix.push(tmpRowArray)
    }
  }

  /**
   * Fills the matrix with mines and corresponding neighbour fields numbers
   * @param {Number} mines number of mines to be generated
   * @return void
   */
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
      this.#matrix[row][col] = new Mine({ x: row, y: col })

      // TODO: refactor
      // increment fields around mine
      if (row !== 0) {
        if (col !== 0) { // top left corner
          if (this.#matrix[row - 1][col - 1] instanceof EmptyField) {
            this.#matrix[row - 1][col - 1] = new NumberField({ x: row - 1, y: col - 1 })
          } else if (this.#matrix[row - 1][col - 1] instanceof NumberField) {
            this.#matrix[row - 1][col - 1].increment()
          }
        }
        if (col !== this.columns - 1) { // top right corner
          if (this.#matrix[row - 1][col + 1] instanceof EmptyField) {
            this.#matrix[row - 1][col + 1] = new NumberField({ x: row - 1, y: col + 1 })
          } else if (this.#matrix[row - 1][col + 1] instanceof NumberField) {
            this.#matrix[row - 1][col + 1].increment()
          }
        }
        // top and directly above
        if (this.#matrix[row - 1][col] instanceof EmptyField) {
          this.#matrix[row - 1][col] = new NumberField({ x: row - 1, y: col })
        } else if (this.#matrix[row - 1][col] instanceof NumberField) {
          this.#matrix[row - 1][col].increment()
        }
      }

      if (row !== this.rows - 1) {
        if (col !== 0) { // bottom left corner
          if (this.#matrix[row + 1][col - 1] instanceof EmptyField) {
            this.#matrix[row + 1][col - 1] = new NumberField({ x: row + 1, y: col - 1 })
          } else if (this.#matrix[row + 1][col - 1] instanceof NumberField) {
            this.#matrix[row + 1][col - 1].increment()
          }
        }
        if (col !== this.columns - 1) { // bottom right corner
          if (this.#matrix[row + 1][col + 1] instanceof EmptyField) {
            this.#matrix[row + 1][col + 1] = new NumberField({ x: row + 1, y: col + 1 })
          } else if (this.#matrix[row + 1][col + 1] instanceof NumberField) {
            this.#matrix[row + 1][col + 1].increment()
          }
        }
        // bottom and directly below
        if (this.#matrix[row + 1][col] instanceof EmptyField) {
          this.#matrix[row + 1][col] = new NumberField({ x: row + 1, y: col })
        } else if (this.#matrix[row + 1][col] instanceof NumberField) {
          this.#matrix[row + 1][col].increment()
        }
      }
      if (col !== 0) { // same row, left
        if (this.#matrix[row][col - 1] instanceof EmptyField) {
          this.#matrix[row][col - 1] = new NumberField({ x: row, y: col - 1 })
        } else if (this.#matrix[row][col - 1] instanceof NumberField) {
          this.#matrix[row][col - 1].increment()
        }
      }
      if (col !== this.columns - 1) { // same row, right
        if (this.#matrix[row][col + 1] instanceof EmptyField) {
          this.#matrix[row][col + 1] = new NumberField({ x: row, y: col + 1 })
        } else if (this.#matrix[row][col + 1] instanceof NumberField) {
          this.#matrix[row][col + 1].increment()
        }
      }
    })
  }

  /**
   * Returns specific field based on provided coordinates
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   * @return {Object}
   */
  getFieldByCoordinates ({ x, y }) {
    return this.#matrix[x][y]
  }

  /**
   * Show field based on coordinates
   * if user clicks on EmptyField, the whole area of EmptyFields is revealed
   * // TODO: game over on mine
   * // TODO: fields around empty
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   * @return {void}
   */
  showField ({ x, y }) {
    // if clicked on EmptyField, look around the field for another EmptyFields and reveal them as well
    // then look around found for each of that fields
    // if clicked on non-empty field, the loop ends after one iteration

    // stack for keeping fields that have been found, but not inspected for potential neighbouring EmptyFields
    const found = []
    // store for fields that have been inspected
    const processed = []
    // conditional pushing to the found stack
    function process (field) {
      if (!processed.includes(field)) {
        found.push(field)
      }
    }
    // start with the field user clicked on
    found.push(this.#matrix[x][y])

    while (found.length) {
      const current = found.pop()
      const coordinates = current.getCoordinates()
      current.show()
      processed.push(current)

      // looking around only EmptyFields
      if (!(current instanceof EmptyField)) {
        continue
      }
      // TODO: refactor
      // cycle around field
      if (coordinates.x !== 0) {
        if (coordinates.y !== 0) {
          const topLeft = this.#matrix[coordinates.x - 1][coordinates.y - 1]
          process(topLeft)
        }
        if (coordinates.y !== this.columns - 1) {
          const topRight = this.#matrix[coordinates.x - 1][coordinates.y + 1]
          process(topRight)
        }

        const above = this.#matrix[coordinates.x - 1][coordinates.y]
        process(above)
      }

      if (coordinates.x !== this.rows - 1) {
        if (coordinates.y !== 0) {
          const bottomLeft = this.#matrix[coordinates.x + 1][coordinates.y - 1]
          process(bottomLeft)
        }
        if (coordinates.y !== this.columns - 1) {
          const bottomRight = this.#matrix[coordinates.x + 1][coordinates.y + 1]
          process(bottomRight)
        }

        const below = this.#matrix[coordinates.x + 1][coordinates.y]
        process(below)
      }
      if (coordinates.y !== 0) {
        const left = this.#matrix[coordinates.x][coordinates.y - 1]
        process(left)
      }
      if (coordinates.y !== this.columns - 1) {
        const right = this.#matrix[coordinates.x][coordinates.y + 1]
        process(right)
      }
    }
  }

  /**
   * Returns the matrix in string format
   * Rows are separated by '\n', columns by ' '
   * !!! Each field has space next to it !!!
   * Mines are represented by 'x', empty fields by '-'
   * @return {String} matrix
   */
  getStringifiedMatrix () {
    let str = ''
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        str += `${this.#matrix[i][j].value === null ? '-' : this.#matrix[i][j].value} `
      }

      str += '\n'
    }

    return str
  }
}
