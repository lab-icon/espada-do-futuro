let tiles = [];
let columns, rows;
let tile_size;
let a = 0;

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
  if(frameCount % 10 == 0){
    // random_rotation_update();
    control_rotation_update();
  }
}

function random_rotation_update() {
  for (let i = 0; i < tiles.length; i++) {
    if(random(1) > 0.4){
      tiles[i].random_rotation();
    }
  }
}

function control_rotation_update() {
  for (let i = 0; i < tiles.length; i++) {
    let perlin_noise = noise(a);
    tiles[i].control_rotation(map(perlin_noise, 0, 1, 0, 2));
    a += 0.1
  }
}