// matrix.js
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");
  
    // Fullscreen
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    const chars = "アカサタナハマヤabcdefghijklmnopqrstuvwxyz0123456789".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
  
    // y positions of each column
    const drops = new Array(columns).fill(1);
  
    function drawMatrix() {
      // Semi-transparent background to fade old text
      ctx.fillStyle = "rgba(14, 20, 27, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = "#0aff0a";
      ctx.font = fontSize + "px monospace";
  
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
        // reset drop
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 60);
  });
  