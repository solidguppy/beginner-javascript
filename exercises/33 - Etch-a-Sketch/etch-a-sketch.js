console.log('It works!');


// SELECT the elements on the page canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
// const {width} = canvas;
// const {height} = canvas;

const {width, height} = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // Start the drawing.
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function draw({key}) {
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    console.log(key);
    ctx.beginPath(); // Start the drawing.
    ctx.moveTo(x, y);
    
    // x = x - MOVE_AMOUNT;
    // y = y - MOVE_AMOUNT;
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();

} 


// write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({key: e.key});
    }
}

// clear /shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
      'animationend',
      function() {
        console.log('Done the shake!');
        canvas.classList.remove('shake');
      },
      { once: true }
    );
  }

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);