// tesseract.js
let angle = 0;
let points = [];

function setup() {
  // Create a p5 canvas that fills the screen behind everything
  let c = createCanvas(windowWidth, windowHeight, WEBGL);
  c.id("tesseract-canvas"); // so it matches your style
  // By default, p5 creates a <canvas> at z-index: 0, 
  // but we can push it behind other elements:
  c.elt.style.zIndex = "-999";
  c.elt.style.position = "fixed";
  c.elt.style.top = "0";
  c.elt.style.left = "0";

  // 16 points of a hypercube (similar to your existing points)
  points = [
    createVector(-1, -1,  1,  1),
    createVector( 1, -1,  1,  1),
    createVector( 1,  1,  1,  1),
    createVector(-1,  1,  1,  1),
    createVector(-1, -1, -1,  1),
    createVector( 1, -1, -1,  1),
    createVector( 1,  1, -1,  1),
    createVector(-1,  1, -1,  1),
    createVector(-1, -1,  1, -1),
    createVector( 1, -1,  1, -1),
    createVector( 1,  1,  1, -1),
    createVector(-1,  1,  1, -1),
    createVector(-1, -1, -1, -1),
    createVector( 1, -1, -1, -1),
    createVector( 1,  1, -1, -1),
    createVector(-1,  1, -1, -1)
  ];
}

function draw() {
  background(15, 20, 27); // a dark background
  // Move origin to center
  translate(width/2, height/2);

  // Rotate in “4D” by messing with angles in 3D plus extra dimension
  angle += 0.01;

  // We'll project 4D -> 3D -> 2D 
  let projected = [];
  for (let v of points) {
    let rotated = rotate4D(v, angle);
    // Basic perspective
    let w = 1 / (2 - rotated.w);
    let x = (rotated.x * w) * 200;
    let y = (rotated.y * w) * 200;
    let z = (rotated.z * w) * 200;
    projected.push(createVector(x, y, z));
  }

  stroke(0, 255, 0);
  strokeWeight(2);
  noFill();

  // Edges: connect points that differ by 1 bit in their indexes
  // This is a simplified approach for p5
  for (let i = 0; i < 16; i++) {
    for (let j = i+1; j < 16; j++) {
      let diff = bitCount(i ^ j);
      if (diff === 1) {
        line(projected[i].x, projected[i].y, projected[i].z, 
             projected[j].x, projected[j].y, projected[j].z);
      }
    }
  }
}

// Simple 4D rotation around xw axis
function rotate4D(vec, a) {
  let c = cos(a);
  let s = sin(a);
  // rotate vector around x-w plane
  let x = vec.x * c - vec.w * s;
  let w = vec.x * s + vec.w * c;

  // return new “vector4”
  return { x: x, y: vec.y, z: vec.z, w: w };
}

// Counts number of bits in an integer
function bitCount(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
