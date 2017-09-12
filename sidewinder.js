class SideWinder {
  static generate(grid) {
    console.time('SIDEWINDER')
    grid.cells.forEach(row => {
      let run = []
      row.forEach(cell => {
        run.push(cell)
        let atEasternBoundary = cell.east === null
        let atNortherBoundary = cell.north === null

        let shouldCloseOut =
          atEasternBoundary ||
          (!atNortherBoundary && Math.floor(Math.random() * 2) == 0)

        if (shouldCloseOut) {
          let member = run.sample()
          if (member.north) {
            member.link(member.north)
          }
          run = []
        } else {
          cell.link(cell.east)
        }
      })
    })
    console.timeEnd('SIDEWINDER')
  }
}
