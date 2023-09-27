// tiles
let tiles = [];
let columns, rows;
let tile_size;
let noise_clock = 0;

// colors
let table;
let colors = [];

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  // ToDo: mudar para 4:3 (1440, 1080);
  winSize = min(windowWidth,windowHeight);
  createCanvas(winSize,winSize);
  setupOsc(8888, 3334);
  
  // tiles
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
  
  // colors
  colorMode(HSB,360,120,100,255);
  noFill();
  palette_update(colors[1],colors[2],colors[3]);
}

function draw() {
  background(colors[0]);
  // ToDo: remover quando houver osc
  inputValue = Math.random();
  // console.log({oscValue})

  // for (let i = 0; i < tiles.length; i++) {
  //   tiles[i].display_point();
  // }
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display_curve();
  }
  if(frameCount % 10 == 0){
    // random_rotation_update();
    control_rotation_update();
  }
  if(frameCount % 180 == 0)
  {
    palette_update();
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
    let perlin_noise = noise(noise_clock);
    if (random()>0.9)
      tiles[i].control_rotation(map(perlin_noise, 0, 1, 0, 2));
    noise_clock += 0.1
  }
}

function getColors() {
  for (col1 = 0;col1<5;col1++){
  h = int(table.get(palette, col1 * 3)) + random(-8, 8);
  s = int(table.get(palette, col1 * 3 + 1)) + random(-8, 10);
  b = int(table.get(palette, col1 * 3 + 2)) + random(-20, -5);
    colors[col1] = color(h,s,b);
  }
}

function palette_update() {
  palette = floor(random(38));
  getColors();
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].palette_update(colors[1],colors[2],colors[3]);
  }
}