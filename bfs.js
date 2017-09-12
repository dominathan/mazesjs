class BFS {
  static generate(start, goal, counter = 0) {
    console.time('BFS')
    const visited = {}
    const unvisited = [start]

    while (unvisited.length) {
      counter += 1
      let cell = unvisited.shift()
      if (cell === goal) {
        console.log('WNNING')
        console.timeEnd('BFS')
        return [goal, true]
      }

      if (visited[cell.uuid]) {
        continue
      }

      cell.links.forEach(neighbor => {
        unvisited.push(neighbor)
        if (!visited[cell.uuid]) {
          // cell.drawLineWithDelay(cell.neighborDirection(neighbor), counter)
          cell.drawLine(cell.neighborDirection(neighbor), counter)
        }
      })

      visited[cell.uuid] = true
    }
    console.timeEnd('BFS')
    return null
  }
}
