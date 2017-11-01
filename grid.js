Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)]
}

class Grid {
  constructor(canvas, columns, rows) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.rows = rows
    this.columns = columns
    this.cells = []
    this.hashCells = {}
    this.flattenedCells = []
  }

  draw(degrees) {
    console.time('DRAW')
    let hashCells = this.hashCells
    ctx.clearRect(0, 0, this.width, this.height)
    let arr = [...Array(this.rows)]
    let cells = arr.map((row, i) => {
      return [...Array(this.columns)].map((col, j) => {
        let cell = new Cell({
          rows: this.rows,
          columns: this.columns,
          canvas: this.canvas,
          top: i * this.height / this.columns,
          left: j * this.width / this.rows,
          width: this.width / this.columns,
          height: this.height / this.rows,
          row: i,
          column: j
        })

        cell.drawCell()
        hashCells[cell.uuid] = cell
        return cell
      })
    })
    console.timeEnd('DRAW')
    this.cells = cells
    this.setNeighbors()
  }

  setNeighbors() {
    console.time('NEIGHBORS')
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.north =
          this.cells[cell.row - 1] !== undefined
            ? this.cells[cell.row - 1][cell.column]
            : null
        cell.east =
          this.cells[cell.row][cell.column + 1] !== undefined
            ? this.cells[cell.row][cell.column + 1]
            : null
        cell.south =
          this.cells[cell.row + 1] !== undefined
            ? this.cells[cell.row + 1][cell.column]
            : null
        cell.west =
          this.cells[cell.row][cell.column - 1] !== undefined
            ? this.cells[cell.row][cell.column - 1]
            : null
      })
    })
    console.timeEnd('NEIGHBORS')
  }

  size() {
    return this.rows * this.columns
  }

  randomCell() {
    return this.cells[Math.floor(Math.random() * this.rows)][
      Math.floor(Math.random() * this.columns)
    ]
  }

  flattenCells() {
    console.time('FLAT')
    let flatGrid = this.cells.reduce((accm, row) => {
      row.forEach(cell => {
        accm.push(cell)
      })
      return accm
    }, [])

    this.flattenedCells = flatGrid
    console.timeEnd('FLAT')
    return flatGrid
  }

  colorGridByDistance(maximum, counter = 0) {
    this.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        let intensity = (maximum - cell.distance) / maximum
        let dark = Math.round(255 * intensity)
        let bright = Math.round(128 + 127 * intensity)
        let color = `rgb(${bright},${dark},${bright})`
        counter += 1
        cell.color(color, counter)
      })
    })
  }

  rotate(degrees) {
    let context = this.ctx
    context.translate(canvas.width, canvas.height)
    context.rotate(degrees * (Math.PI / 180))
    context.beginPath()
  }
}
