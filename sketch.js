// tiles
let tiles = [];
let columns, rows;
let tile_size;
let noise_clock = 0;

// colors
let table;
let colors = [];

let WIDTH = 1440;
let HEIGHT = 1080;
let MIN_TILE_SIZE = 60;
let MAX_TILE_SIZE = 1000;

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  // ToDo: mudar para 4:3 (1440, 1080);
  // winSize = min(windowWidth,windowHeight);
  createCanvas(WIDTH,HEIGHT);
  // createCanvas(winSize,winSize);
  setupOsc(8888, 3334);
  
  for (let i=MIN_TILE_SIZE; i<=MAX_TILE_SIZE; i++) {
    if (width%i==0 && height%i==0) {
      console.log(i);
      tile_size = i;
      break;
    }
  }

  // tiles
  columns = floor(WIDTH / tile_size);
  rows = floor(HEIGHT / tile_size);
  // tile_size = winSize / (columns -2);
  
  let index = 0;
  for (let i = 0; i < columns + 1; i++) {
    for(let j = 0; j < rows + 1; j++){
      const tile = new Tile(i, j, tile_size, i + j);
      tiles.push(tile);
      index++;
    }
  }
  
  // colors
  colorMode(HSB,360,100,100,255);
  noFill();
  change_palette();
  update_tiles_palette(colors[1],colors[2],colors[3]);
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

}

// rotatation controls
function random_rotation_update() {
  for (let i = 0; i < tiles.length; i++) {
    if(random(1) > rotateNumberScale){
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

// color controls
function getColors() {
  for (col1 = 0;col1<5;col1++){
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
    colors[col1] = color(h,s,b);
  }
}

function change_palette() {
  palette = floor(random(38));
  getColors();
}

function update_tiles_palette() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].palette_update(colors[1],colors[2],colors[3]);
  }
}

function keyPressed () {
  if(keyCode === 70) {
    let fs = fullscreen();
    fullscreen(!fs)
  }
}