class Dijkstra {
  static generate(grid) {}
}

class Distances {
  constructor(cell) {
    this.root = cell
    this.cells = {}
    this.cells[this.root.uuid] = 0
  }

  setDistance(cell, distance) {
    this.cells[cell] = distance
  }

  currentDistance(cell) {
    return this.cells[cell]
  }

  maximum() {
    return Object.values(this.cells).reduce((max, num) => {
      if (num > max) {
        max = num
      }
      return max
    }, 0)
  }

  shortestPath(goal, counter = 0) {
    let current = goal
    let breadcrumbs = new Distances(this.root)
    breadcrumbs.cells[current.uuid] = this.cells[current.uuid]
    while (current.uuid !== this.root.uuid) {
      current.links.forEach(neighbor => {
        try {
          if (this.cells[neighbor.uuid] < this.cells[current.uuid]) {
            breadcrumbs.cells[neighbor.uuid] = this.cells[neighbor.uuid]
            current = neighbor
            counter += 1
            current.colorWithDelay('orange', counter)
            throw new Error('cannot break')
          }
        } catch (e) {}
      })
    }
    return breadcrumbs
  }

  longestPath() {
    let maxDistance = 9
    let maxCell = this.root.uuid

    Object.keys(this.cells).forEach(uuid => {
      if (this.cells[uuid] > maxDistance) {
        maxDistance = this.cells[uuid]
        maxCell = uuid
      }
    })

    return { maxDistance: maxDistance, maxCell: maxCell }
  }

  getCellsFromUuids(cells) {
    return cells.reduce((accm, row) => {
      row.forEach(cell => {
        if (this.cells.includes(cell.uuid)) {
          accm.push(cell)
        }
      })
      return accm
    }, [])
  }
}
