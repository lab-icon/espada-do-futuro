let tiles = [];
let columns, rows;
let tile_size;

function setup() {
  // ToDo: mudar para 4:3 (1440, 1080);
  winSize = min(windowWidth,windowHeight);
  createCanvas(winSize,winSize);
  setupOsc(12000, 3334);

  // colorMode(HSB,360,120,100,255);
  noFill();
  columns = 10;
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
  if(frameCount % 30 == 0){
    random_update();
  }
}

function random_update() {
  for (let i = 0; i < tiles.length; i++) {
    if(random(1) > 0.4){
      tiles[i].update();
    }
  }
}