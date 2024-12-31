// main.js
document.addEventListener("DOMContentLoaded", () => {
    // Load ASCII
    fetch("assets/ascii-art.txt")
      .then(r => r.text())
      .then(txt => {
        document.querySelector(".ascii-art-container pre").textContent = txt;
      })
      .catch(() => {});
  
    fetch("assets/ascii-art-portrait.txt")
      .then(r => r.text())
      .then(txt => {
        document.querySelector(".ascii-art-portrait-container pre").textContent = txt;
      })
      .catch(() => {});
  
    // Typewriter for top "welcome" line
    const typedTextElem = document.getElementById("typed-text");
    const welcomeMsg = " welcome to my interactive portfolio terminal. type 'help' to get started.";
    typewriter(welcomeMsg, typedTextElem, 15, () => {
      console.log("Finished typing the welcome line.");
    });
  });
  