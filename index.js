const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.textAlign = 'center'
const img = document.getElementById('image')
const grid = new Grid(canvas, 100, 100)
grid.draw()
// BinaryTreeGenerator.generate(grid.cells)
// SideWinder.generate(grid)
// AldousBroder.generate(grid)
// Wilson.generate(grid)
HuntAndKill.generate(grid)

let cell1 = grid.cells[0][0]
let distances = cell1.distances()
// BFS.generate(cell1, grid.cells[49][49])
// DFS.generate(cell1, grid.cells[199][199])
// let southwestCell = grid.cells[grid.rows - 1][grid.columns - 1]
// let longestCell = grid.hashCells[distances.longestPath().maxCell]
// let shortPath = distances.shortestPath(southwestCell)

// let max = distances.maximum()
// grid.colorGridByDistance(max)
