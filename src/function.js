export function collides(grid, piece) {
  // Her bir parça bloğunun koordinatlarını kontrol edin
  for (let y = 0; y < piece.blocks.length; y++) {
    for (let x = 0; x < piece.blocks[y].length; x++) {
      // Parça bloğunun (x, y) koordinatları
      const blockX = piece.x + x;
      const blockY = piece.y + y;
     if (piece.blocks[y][x] != 0 ) {
      // Eğer parça bloğu tahtayı aşıyorsa, çarpışma olmuştur
      if (blockY >= grid.length || blockY < 0) {
        return true;
      }
      // Eğer parça bloğu tahtanın dışına çıkmışsa, çarpışma olmuştur
      if (blockX > grid[0].length || blockX < 0) {
        return 'outrange';
      }
      // Eğer parça bloğu tahtanın içindeyse, çarpışma olmuştur
      if (grid[blockY][blockX]) {
        return true;
      }      
    }
      }
      
     }
  }

export function merge(grid, piece) {
  for (let y = 0; y < piece.blocks.length; y++) {
    for (let x = 0; x < piece.blocks[y].length; x++) {
      if (piece.blocks[y][x]) {
          grid[piece.y + y][piece.x + x] = piece.color;
      }
    }
  }
}

function clearLines(grid) {
  // Tüm satırları gez
  for (let y = 0; y < grid.length; y++) {
    // Eğer satır tamamen dolduysa, sil
    if (grid[y].every(cell => cell)) {
      grid.splice(y, 1);
      grid.unshift(Array(grid[0].length).fill(null));
    }
  }
}

function createShapes() {
  const i = {
    color: "lightblue",
    blocks: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
  };

  const j = {
    color: "purple",
    blocks: [[0, 0, 0], [2, 2, 2], [0, 0, 2]]
  };

  const l = {
    color: "orange",
    blocks: [[0, 0, 0], [3, 3, 3], [3, 0, 0]]
  };

  const o = {
    color: "yellow",
    blocks: [[0, 0, 0], [0, 4, 4], [0, 4, 4], [0, 0, 0]]
  };

  const s = {
    color: "green",
    blocks: [[0, 0, 0], [0, 5, 5], [5, 5, 0]]
  };

  const t = {
    color: "mediumvioletred",
    blocks: [[0, 0, 0], [6, 6, 6], [0, 6, 0]]
  };

  const z = {
    color: "red",
    blocks: [[0, 0, 0], [7, 7, 0], [0, 7, 7]]
  };

  const shapes = {
    I: i,
    J: j,
    L: l,
    O: o,
    S: s,
    T: t,
    Z: z
  };

  return shapes;
}

export function createGrid() {
  const grid = [];

  for (let row = 0; row < 48; row++) {
    grid[row] = [];
    for (let col = 0; col < 26; col++) {
      grid[row][col] = 0;
    }
  }

  return grid;
}

export function createPiece() {
  const shapes = createShapes();
  const keys = Object.keys(shapes);
  const shape = shapes[keys[(keys.length * Math.random()) << 0]];
  const piece = {
    x: parseInt(20 * Math.random()),
    y: 0,
    color: shape.color,
    blocks: shape.blocks
  };

  return piece;
}

export function movePieceDown(grid, piece) {
  piece.y++;
  if (collides(grid, piece) == true) {
    piece.y--;
    merge(grid, piece);
    clearLines(grid);
    return createPiece();
  }

  return piece;
}

export function movePieceLeft(grid, piece) {
  piece.x--;
  if (collides(grid, piece)) {
    piece.x++;
  }
}

export function movePieceRight(grid, piece) {
  piece.x++;
  if (collides(grid, piece)) {
    piece.x--;
  }
}

export function rotatePiece(grid, piece) {
  const blocks = [];
  const length = piece.blocks.length;
  for (let y = 0; y < length; y++) {
    blocks.push([]);
    for (let x = 0; x < length; x++) {
      blocks[y].push(piece.blocks[length - 1 - x][y]);
    }
  }
  piece.blocks = blocks;
  if (collides(grid, piece)) {
    piece.blocks = blocks.map(row => row.slice()).reverse();
  }
}

export function dropPiece(grid, piece) {
  while (!collides(grid, piece)) {
    piece.y++;
  }
  piece.y--;
}

function drawGrid(context, grid) {
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = cell;
        context.fillRect(x, y, 1, 1);
      }
    });
  });
}

function drawPiece(context, piece) {
  piece.blocks.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = piece.color;
        context.fillRect(piece.x + x, piece.y + y, 1, 1);
      }
    });
  });
}

export function draw(context, grid, piece) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  drawGrid(context, grid);
  drawPiece(context, piece);
}


