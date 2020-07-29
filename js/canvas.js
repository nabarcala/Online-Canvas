
// Canvas variables
var canvas = document.querySelector('#canvas'), 
    c = canvas.getContext('2d'),  
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 1,
        cap: 'round',
        painting: false, 
    },
    strokes = [],
    currentStroke = null;

var currentColor = document.querySelector('#color-picker');

window.addEventListener('load', () => {

    // Set length and width of canvas
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth; 

    function startPosition() {
        brush.painting = true;
        draw(e);
    }
    function finishedPosition() {
        brush.painting = false;
        c.beginPath();
    }
    function draw(e) {
        if(!brush.painting) return;
        c.lineWidth = brush.size;
        c.lineCap = brush.cap;
        c.strokeStyle = brush.color;

        c.lineTo(e.clientX, e.clientY);
        c.stroke();
        c.beginPath();
        c.moveTo(e.clientX, e.clientY);
    }

    // Event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});

// Change color of the brush
currentColor.addEventListener('input', ChangeColor);

function ChangeColor() {
    brush.color = currentColor.value;
}
