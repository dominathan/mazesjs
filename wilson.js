class Wilson {
  static generate(grid) {
    console.time('WILSON')
    let unvisited = grid.flattenCells()

    let first = unvisited.sample()
    unvisited.splice(unvisited.indexOf(first), 1)

    while (unvisited.length > 0) {
      let cell = unvisited.sample()
      let path = [cell]
      while (unvisited.includes(cell)) {
        let neighbors = cell.neighbors()
        cell = neighbors.sample()
        let position = path.indexOf(cell)
        if (position !== -1) {
          path = path.slice(0, position + 1)
        } else {
          path.push(cell)
        }
      }
      for (let i = 0; i <= path.length - 2; i++) {
        path[i].link(path[i + 1])
        unvisited.splice(unvisited.indexOf(path[i]), 1)
      }
    }
    console.timeEnd('WILSON')
  }
}
