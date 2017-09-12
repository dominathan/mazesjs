class DFS {
  static generate(start, goal, counter = 0) {
    console.time('DFS')
    const visited = {}
    const unvisited = [start]

    while (unvisited.length) {
      counter += 1
      let cell = unvisited.pop()
      if (cell === goal) {
        console.timeEnd('DFS')
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
    console.timeEnd('DFS')
    return null
  }
}
