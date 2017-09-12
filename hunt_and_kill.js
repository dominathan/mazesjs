class HuntAndKill {
  static generate(grid) {
    grid.flattenCells()
    console.time('HUNT')
    let current = grid.randomCell()
    while (current) {
      let unvisited_neighbors = current
        .neighbors()
        .filter(cell => cell.links.length < 1)
      if (unvisited_neighbors.length > 0) {
        let neighbor = unvisited_neighbors.sample()
        current.link(neighbor)
        current = neighbor
      } else {
        current = null
        grid.flattenedCells.forEach(cell => {
          try {
            let visited_neighbors = cell
              .neighbors()
              .filter(neighbor => neighbor.links.length > 0)
            if (cell.links.length < 1 && visited_neighbors.length > 0) {
              current = cell
              let neighbor = visited_neighbors.sample()
              current.link(neighbor)
              throw Error('break out of loop')
            }
          } catch (e) {
            // console.log('yay', e)
          }
        })
      }
    }
    console.timeEnd('HUNT')
  }
}
