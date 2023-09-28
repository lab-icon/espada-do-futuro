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
  // winSize = min(windowWidth,windowHeight);
  winSize = 640;
  createCanvas(winSize,winSize);
  setupOsc(8888, 3334);
  
  // tiles
  columns = 2 + 10;
  console.log(columns);
  rows = columns;
  tile_size = winSize / (columns -2);
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

  if(frameCount % 10 == 0){
    // random_rotation_update();
    control_rotation_update();
  }
  // if(frameCount % 180 == 0)
  // {
  //   palette_update();
  // }

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

// cicles the colors from inside out
function cicling_colors() {
  let temp_color = colors[0];
  for (let i = 0; i < colors.length - 1; i++) {
    colors[i] = colors[i + 1];
  }
  colors[colors.length - 1] = temp_color;
}

let sine_angle = 0;
function breathing_stroke(increment_value, amplitude) {
  let weight_modfier = map(sin(sine_angle), -1, 1, -amplitude, amplitude);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].stroke_weight_update(weight_modfier);
  }
  sine_angle += increment_value;
}

// translation controls
let line_offset = 0;
function sliding_lines(sliding_speed) { // pensar numa forma menos destrutiva de fazer isso
  for (let i = 0; i < tiles.length; i++) {
    let current_tile_grid_position_y = tiles[i].position_y / tiles[i].size;
    if (current_tile_grid_position_y % 2 == 0) {
      tiles[i].position_x += sliding_speed;
      if (tiles[i].position_x >= winSize) {
        tiles[i].position_x = - tile_size;
      }
    } else {
      tiles[i].position_x -= sliding_speed;
      if (tiles[i].position_x <= -tile_size) {
        tiles[i].position_x = winSize + tile_size;
      }
    }
  }
}

let collumns_offset = 0;
function sliding_collumns(sliding_speed) {
  for (let i = 0; i < tiles.length; i++) {
    let current_tile_grid_position_x = tiles[i].position_x / tiles[i].size;
    if (current_tile_grid_position_x % 2 == 0) {
      tiles[i].position_y += sliding_speed;
      if (tiles[i].position_y >= winSize) {
        tiles[i].position_y = - tile_size;
      }
    } else {
      tiles[i].position_y -= sliding_speed;
      if (tiles[i].position_y <= -tile_size) {
        tiles[i].position_y = winSize + tile_size;
      }
    }
  }
}