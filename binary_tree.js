class BinaryTreeGenerator {
  static generate(grid) {
    grid.forEach(rows => {
      rows.forEach(cell => {
        if (cell.isEasternEdge()) {
          cell.link(cell.south)
          return
        }

        if (cell.isSouthernEdge()) {
          cell.link(cell.east)
          return
        }

        Math.floor(Math.random() * 2) === 1
          ? cell.link(cell.east)
          : cell.link(cell.south)
      })
    })
  }
}
