let tiles = [];
let columns, rows;
let tile_size;

function setup() {
  winSize = min(windowWidth,windowHeight);
  createCanvas(winSize,winSize);
  setupOsc(12000, 3334);

  // colorMode(HSB,360,120,100,255);
  noFill();
  columns = 5;
  rows = columns;
  tile_size = winSize / columns;
  let index = 0;
  for (let i = 0; i < columns + 1; i++) {
    for(let j = 0; j < rows + 1; j++){
      const tile = new Tile(j, i, tile_size, i);
      tiles.push(tile);
      index++;
    }
  }
}

function draw() {
  background(255);
  // ToDo: remover quando houver osc
  inputValue = Math.random();

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display_point();
  }
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display_curve();
  }
  // noLoop();
}
