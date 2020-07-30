import { pickr } from './colorpicker.js'; 
import Tool from './tool.class.js';
import Canvas from './canvas.class.js'

var canvas = new Canvas(
    'canvas', 'brush-size', 'current-brush-size'
    ); 
canvas.activeTool = Tool.TOOL_BRUSH;
canvas.init(); 


// All data-commands
document.querySelectorAll('[data-command]').forEach(
    item => {
        item.addEventListener('click', e => {
            // console.log(item.getAttribute('data-command'));
        });
    } 
);
// All data-tools, and select the one clicked
document.querySelectorAll('[data-tool]').forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector('[data-tool].selected').classList.toggle('selected');
            item.classList.toggle('selected');

            let selectedTool = item.getAttribute('data-tool');
            canvas.activeTool = selectedTool;

            switch(selectedTool) {
                case Tool.TOOL_ERASER:
                case Tool.TOOL_BRUSH:
                case Tool.TOOL_FILL:
                case Tool.TOOL_LINE:
                case Tool.TOOL_SQUARE:
                case Tool.TOOL_CIRCLE:
            }
        });
    }
); 

// var currentColor = document.querySelector('#color-picker');
// var BrushSize = document.querySelector('#brush-size');
// var BrushSizeLabel = document.querySelector('#current-brush-size');

// const sliderVal = document.querySelector('.slider-val span');



// // Event Listeners
// // currentColor.addEventListener('input', ChangeColor);
// BrushSize.addEventListener('input', ChangeBrushSize);
// BrushSize.oninput = (() => {
//     let val = BrushSize.value;
//     this.brush.size = val;
//     BrushSizeLabel.innerHTML = val;
//     sliderVal.textContent = val;
//     // sliderVal.style.left = ((val+100)/2) + '%';
//     // sliderVal.classList.add('show'); 
// })

// // Change color of the brush
// pickr.on('change', (color, instance) => {
//     let cc = color.toRGBA().toString();
//     this.brush.color = cc;
//     pickr.setColor(cc);
// });

// // Change color of the brush
// function ChangeColor() {
//     this.brush.color = currentColor.value;
// }
// // Change width of brush
// function ChangeBrushSize() {
//     let val = BrushSize.value;
//     this.brush.size = val;
//     BrushSizeLabel.innerHTML = val;
//     sliderVal.textContent = val;
//     // sliderVal
// }




