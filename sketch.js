function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;

}

let grid;
let cols;
let rows;
let resolution = 10;

var a = 1; 
var c = true;
var d= 178;
var k = 50;

let slider;

function ResetGame() {
  setup();
}

function setup() {
  removeElements();
  const canvas = createCanvas(400, 400);
  // Places the canvas within the HTML element with id "sketch-holder"
  canvas.parent("sketch-holder2");
 
  button = createButton("Hello, the Moon");
  button.mousePressed(ResetGame);
  button.parent("sketch-holder1");

  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++){
      grid[i][j] = floor(random(2));
    }
  }

}


function draw() { 
  background(50, 50, 220);
  stroke(100);

//eyes
fill(180, 160, 0);
angleMode(DEGREES);
arc(220, 160, 20, 20, (270 + a), (270 - a), CHORD);
if (c && a <= d) {
  a++
} else if (c && a >= d) {
  c = false;
  a--
} else if (!c && a > k) {
  a--;
} else if (!c && a == k) {
  c = true;
  a ++;
};

// moon
fill(180, 160, 10);
beginShape();
// //anchor1
// point(180, 80);
// //control1
// point(210, 60);
// //control2
// point(290, 100);
// //anchor2
// point(280, 160);
// //control3
// point(275,180)
// //control4
// point(280,230)
// //anchor3
// point(90,300);
// //control5
// point(230,220)
// //control6
// point(210,160)
// //anchor4
// point(160,160);
// //control7
// point(200,110);
// //control8
// point(210,140);


strokeWeight(4);

bezier(180, 80 , 210, 60, 290, 100, 280, 160);
bezier(280, 160, 275, 180, 280, 230, 90, 300);
bezier(90, 300, 230, 220, 210, 160, 160, 180);
bezier(160, 180, 210, 140, 200, 130, 180, 80);
endShape();

stroke(220);  

// shadow
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++){
      let state = grid[i][j];

      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

  
      if (state == 0 && neighbors == 3){
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)){
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(10, 10, 100, 100);
        rect(x, y, resolution - 1, resolution - 1);
      }
    } 
  }
  
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2 ; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}
