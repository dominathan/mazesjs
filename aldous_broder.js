class AldousBroder {
  static generate(grid) {
    console.time('ALDOUS')
    let cell = grid.randomCell()
    let unvisited = grid.size() - 1

    while (unvisited > 0) {
      let neighbors = cell.neighbors()
      let neighbor = neighbors.sample()

      if (neighbor.links.length < 1) {
        cell.link(neighbor)
        unvisited -= 1
      }

      cell = neighbor
    }
    console.timeEnd('ALDOUS')
  }
}
