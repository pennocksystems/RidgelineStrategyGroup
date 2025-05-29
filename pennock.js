const text = "Trusted solutions for modern websites and intelligent automation.";
const typingTarget = document.getElementById("typing-text");

let index = 0;
function type() {
  if (index <= text.length) {
    typingTarget.innerHTML = text.substring(0, index) + '<span class="cursor">|</span>';
    index++;
    setTimeout(type, 50);
} else {
    // Remove the cursor after the typing finishes
    typingTarget.innerHTML = text;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();

  // MATRIX ANIMATION CODE
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  const letters = 'アカサタナハマヤラワ0123456789ABCDEF'.split('');
  const fontSize = 14;
  let columns = canvas.width / fontSize;

  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    // Create gradient from top (0) to bottom (canvas.height)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1E90FF'); // Dodger Blue at top
    gradient.addColorStop(1, '#8A2BE2'); // Blue Violet at bottom
  
    // Fade the canvas with a semi-transparent black to create the trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = gradient;  // Use gradient fill for the text
    ctx.font = fontSize + 'px monospace';
  
    for (let i = 0; i < columns; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  

  setInterval(drawMatrix, 50);
});

function typeEffect(element, text, speed = 70) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".typing-h3").forEach(span => {
      const text = span.getAttribute("data-text");
      if (text) {
        typeEffect(span, text);
      }
    });
  });