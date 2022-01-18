import { EmptyField } from './EmptyField'
import { Mine } from './Mine'
import { NumberField } from './NumberField'
import { ClickedOnMineError } from './ClickedOnMineError'

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

    // queue for keeping fields that have been found, but not inspected for potential neighbouring EmptyFields
    const found = []
    // store for fields that have been inspected
    const processed = []
    // function for conditional pushing to the found queue
    // field is pushed to the found queue if:
    //    - it is not in the found queue
    //    - it is not in the processed array
    //    - it is hidden (edge fields could have been discovered with previous clicks)
    function process (field) {
      const searchByCoordinatesFunc = processedField => {
        if (processedField.getCoordinates().x !== field.getCoordinates().x) {
          return false
        }
        if (processedField.getCoordinates().y !== field.getCoordinates().y) {
          return false
        }
        return true
      }
      const includedInProcessed = !!processed.find(searchByCoordinatesFunc)
      const includedInFound = !!found.find(searchByCoordinatesFunc)

      if (!includedInFound && !includedInProcessed && field.hidden) {
        found.push(field)
      }
    }
    // start with the field user clicked on
    found.push(this.#matrix[x][y])

    while (found.length) {
      const current = found.shift()
      const coordinates = current.getCoordinates()
      current.show()
      processed.push(current)

      if (current instanceof Mine) {
        throw new ClickedOnMineError({ x: coordinates.x, y: coordinates.y })
      }
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
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   * @return {void}
   */
  tryRevealAround ({ x, y }) {
    // conditional revealing to the found stack
    const process = field => {
      if (!field.flagged) {
        this.showField({ x: field.getCoordinates().x, y: field.getCoordinates().y })
      }
    }
    const field = this.#matrix[x][y]
    let neighbourFlagCount = 0
    // TODO: refactor
    // search for flags
    if (x !== 0) {
      if (y !== 0) {
        const topLeft = this.#matrix[x - 1][y - 1]
        if (topLeft.flagged) {
          ++neighbourFlagCount
        }
      }
      if (y !== this.columns - 1) {
        const topRight = this.#matrix[x - 1][y + 1]
        if (topRight.flagged) {
          ++neighbourFlagCount
        }
      }

      const above = this.#matrix[x - 1][y]
      if (above.flagged) {
        ++neighbourFlagCount
      }
    }

    if (x !== this.rows - 1) {
      if (y !== 0) {
        const bottomLeft = this.#matrix[x + 1][y - 1]
        if (bottomLeft.flagged) {
          ++neighbourFlagCount
        }
      }
      if (y !== this.columns - 1) {
        const bottomRight = this.#matrix[x + 1][y + 1]
        if (bottomRight.flagged) {
          ++neighbourFlagCount
        }
      }

      const below = this.#matrix[x + 1][y]
      if (below.flagged) {
        ++neighbourFlagCount
      }
    }
    if (y !== 0) {
      const left = this.#matrix[x][y - 1]
      if (left.flagged) {
        ++neighbourFlagCount
      }
    }
    if (y !== this.columns - 1) {
      const right = this.#matrix[x][y + 1]
      if (right.flagged) {
        ++neighbourFlagCount
      }
    }
    if (neighbourFlagCount !== field.value) {
      return
    }

    // cycle around to reveal
    if (x !== 0) {
      if (y !== 0) {
        const topLeft = this.#matrix[x - 1][y - 1]
        process(topLeft)
      }
      if (y !== this.columns - 1) {
        const topRight = this.#matrix[x - 1][y + 1]
        process(topRight)
      }

      const above = this.#matrix[x - 1][y]
      process(above)
    }

    if (x !== this.rows - 1) {
      if (y !== 0) {
        const bottomLeft = this.#matrix[x + 1][y - 1]
        process(bottomLeft)
      }
      if (y !== this.columns - 1) {
        const bottomRight = this.#matrix[x + 1][y + 1]
        process(bottomRight)
      }

      const below = this.#matrix[x + 1][y]
      process(below)
    }
    if (y !== 0) {
      const left = this.#matrix[x][y - 1]
      process(left)
    }
    if (y !== this.columns - 1) {
      const right = this.#matrix[x][y + 1]
      process(right)
    }
  }

  /**
   * Returns true if user located every mine (put flag on it)
   * i.e. matrix rows * matrix columns == revealed fields + fields with flags
   * @return {Boolean}
   */
  /* everyMineLocated () {
    let flagsSum = 0
    let revealedSum = 0
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.#matrix[i][j].flagged) {
          flagsSum++
        }
        if (!this.#matrix[i][j].hidden) {
          revealedSum++
        }
      }
    }
    console.log('rev', revealedSum)
    console.log('flag', flagsSum)
    return this.rows * this.columns === flagsSum + revealedSum
  } */

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
