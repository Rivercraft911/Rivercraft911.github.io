// typing.js

/**
 * Typewriter effect
 * @param {string} text - The text to type
 * @param {HTMLElement} target - where to place typed chars
 * @param {number} speed - ms per char
 * @param {function} callback - optional callback
 */
function typewriter(text, target, speed = -1000, callback) {
  let idx = 0;
  const timer = setInterval(() => {
    target.textContent += text[idx];
    idx++;
    if (idx === text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}
