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
  tile_size = width / columns;
  array_length = columns * rows;
  let index = 0;
  for (let i = 0; i < array_length; i++) {
    for(let j = 0; j < array_length; j++){
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
  // noLoop();
}
