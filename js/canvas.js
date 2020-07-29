
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
var BrushSize = document.querySelector('#brush-size');
var BrushSizeLabel = document.querySelector('#current-brush-size');

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

    // Canvas mouse event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});

// Event Listeners
currentColor.addEventListener('input', ChangeColor);
BrushSize.addEventListener('input', ChangeBrushSize);

// Change color of the brush
function ChangeColor() {
    brush.color = currentColor.value;
}
// Change width of brush
function ChangeBrushSize() {
    brush.size = BrushSize.value;
    BrushSizeLabel.innerHTML = brush.size;
}
