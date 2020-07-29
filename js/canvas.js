
// let canvas;
// let ctx;
// let savedImageData;
// let dragging = false;
// let strokeColor = 'black';
// let fillColor = 'black';
// let lineWidth = 2;
// let polygonSides = 6;
// let currentTool = 'brush';

// let canvasWidth = window.innerWidth;
// let canvasHeight = window.innerHeight;

// Canvas variables
// var canvas, ctx,  
//     brush = {
//         x: 0,
//         y: 0,
//         color: '#000000',
//         size: 10,
//         down: false,
//     },
//     strokes = [],
//     currentStroke = null;

// function redraw () {
//     ctx.clearRect(0,0,canvas.width(), canvas.height());

// }

// function init () {
//     canvas = $('#canvas');
//     canvas.attr({ 
//         width: window.innerWidth,
//         height: window.innerHeight,
//     });
//     ctx = canvas.getContext('2d');

//     // Mouse Even function
//     function mouseEvent (e) {
//         brush.x = e.pageX;
//         brush.y = e.pageY;

//         currentStroke = {
//             color: brush.color,
//             size: brush.size,
//             points: [],
//         };

//         currentStroke.points.push({
//             x: brush.x,
//             y: brush.y
//         });

//         redraw();
//     };

//     // Event listeners
//     canvas.mousedown(function(e) {
//         brush.down = true;
//         mouseEvent(e);
//         strokes.push(currentStroke);

//     }).mouseup(function(e) {
//         brush.down = false;
//         mouseEvent(e);
//         currentStroke = null;

//     }).mousemove(function(e) {
//         if(brush.down) {
//             mouseEvent(e);
//         }
//     });
// }

// $(init);

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

// Set length and width of canvas
window.addEventListener('load', () => {

    // canvas = document.querySelector('#canvas');
    // c = canvas.getContext('2d');

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

        // changeColor();
    }

    function ChangeColor() {
        brush.color = document.querySelector('#color-picker');
        // brush.color = colorr;
        c.strokeStyle = brush.color
    }


    //eventlisteners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    // document.addEventListener('click', changeColor);

});

// window.addEventListener('resize', () => {

//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;
// })