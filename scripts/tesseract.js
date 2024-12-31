// tesseract.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("tesseract.js: Attempting to draw a 4D Tesseract...");

  const canvas = document.getElementById("tesseract-canvas");
  if (!canvas) {
    console.error("No #tesseract-canvas found!");
    return;
  }
  const ctx = canvas.getContext("2d");

  // Match the canvas to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 16 points of a 4D hypercube
  const points = [
    [-1, -1,  1,  1],
    [ 1, -1,  1,  1],
    [ 1,  1,  1,  1],
    [-1,  1,  1,  1],
    [-1, -1, -1,  1],
    [ 1, -1, -1,  1],
    [ 1,  1, -1,  1],
    [-1,  1, -1,  1],
    [-1, -1,  1, -1],
    [ 1, -1,  1, -1],
    [ 1,  1,  1, -1],
    [-1,  1,  1, -1],
    [-1, -1, -1, -1],
    [ 1, -1, -1, -1],
    [ 1,  1, -1, -1],
    [-1,  1, -1, -1]
  ];

  let angleXW = 0; // Rotation around x–w
  let angleYZ = 0; // Rotation around y–z

  /**
   * rotate4D(vec, aXW, aYZ)
   */
  function rotate4D(vec, aXW, aYZ) {
    // vec = [x, y, z, w]
    let [x, y, z, w] = vec;

    // --- 1) Rotation in the x–w plane ---
    const cxw = Math.cos(aXW);
    const sxw = Math.sin(aXW);
    // x' = x*cos - w*sin
    // w' = x*sin + w*cos
    let x1 = x * cxw - w * sxw;
    let w1 = x * sxw + w * cxw;

    // --- 2) Rotation in the y–z plane ---
    const cyz = Math.cos(aYZ);
    const syz = Math.sin(aYZ);
    // y' = y*cos - z*sin
    // z' = y*sin + z*cos
    let y1 = y * cyz - z * syz;
    let z1 = y * syz + z * cyz;

    return [x1, y1, z1, w1];
  }

  function projectTo2D(vec4) {
    const distance = 2.5;
    const wFactor = 1 / (distance - vec4[3]);
    let x3D = vec4[0] * wFactor;
    let y3D = vec4[1] * wFactor;
    let z3D = vec4[2] * wFactor;

    const zFactor = 1 / (distance - z3D);
    const x2D = x3D * zFactor;
    const y2D = y3D * zFactor;

    return [x2D, y2D];
  }

  function bitCount(n) {
    let count = 0;
    while (n > 0) {
      count += n & 1;
      n >>= 1;
    }
    return count;
  }

  function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.fillStyle = "#0e141b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move to center of screen
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate each point in 4D, project to 2D
    const projected = [];
    for (let i = 0; i < points.length; i++) {
      // We now pass in angleXW and angleYZ
      const rotated = rotate4D(points[i], angleXW, angleYZ);
      const projected2D = projectTo2D(rotated);

      // Scale up
      const scale = 400;
      projected.push([
        projected2D[0] * scale,
        projected2D[1] * scale
      ]);
    }

    // Set stroke style for edges
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;

    // Connect edges if bit difference == 1
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        if (bitCount(i ^ j) === 1) {
          drawLine(projected[i], projected[j]);
        }
      }
    }

    ctx.restore();

    // Increment angles for next frame
    angleXW += 0.005;
    angleYZ += 0.0055;

    requestAnimationFrame(animate);
  }

  animate(); 
});
