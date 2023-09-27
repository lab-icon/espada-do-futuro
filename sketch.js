// let tiles = [];
let columns, rows;
let size;

function setup() {
  winSize = min(windowWidth,windowHeight);
  createCanvas(winSize,winSize);
  setupOsc(12000, 3334);
  // colorMode(HSB,360,120,100,255);
  noFill();
  strokeCap(SQUARE);
  columns = 5;
  rows = columns;
  size = width / columns;
  // for (i = 0; i < columns; i++) {
  //   for (j = 0; j < rows; j++) {
  //     tiles.push(new Tile(i * size, j * size, size, 0, i * columns + j, 0));
  //   }
  // }
}

function draw() {
  background(155);
  circle(x, y, 80);
  text("this is p5", x, y);
  // ToDo: remover quando houver osc
  inputValue = Math.random();

}
