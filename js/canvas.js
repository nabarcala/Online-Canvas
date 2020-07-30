
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

// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    default: 'black',
    closeWithKey: 'Enter',
    padding: 21,
    swatches: [
        '#000000',
        '#fff',
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: false
        }
    }
});

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
// currentColor.addEventListener('input', ChangeColor);
BrushSize.addEventListener('input', ChangeBrushSize);

// Change color of the brush
pickr.on('change', (color, instance) => {
    let cc = color.toRGBA().toString();
    brush.color = cc;
    pickr.setColor(cc);
});

// Change color of the brush
function ChangeColor() {
    brush.color = currentColor.value;
}
// Change width of brush
function ChangeBrushSize() {
    brush.size = BrushSize.value;
    BrushSizeLabel.innerHTML = brush.size;
}




