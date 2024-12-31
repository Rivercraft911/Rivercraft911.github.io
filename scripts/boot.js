// boot.js
document.addEventListener("DOMContentLoaded", () => {
    const bootScreen = document.getElementById("boot-screen");
  
    function hideBootScreen() {
      bootScreen.style.display = "none";
      document.removeEventListener("keydown", hideBootScreen);
    }
  
    // Hide on keydown
    document.addEventListener("keydown", hideBootScreen);
  
    // Optionally auto-hide after a few seconds:
    // setTimeout(hideBootScreen, 3000);
  });
  