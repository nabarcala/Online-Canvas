import { pickr } from './colorpicker.js'; 

export default class Canvas {

    constructor(canvasId, brushSizeId, brushSizeLabel) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');

        this.brush = {
            x: 0,
            y: 0,
            color: '#000000',
            sizeElement: document.getElementById(brushSizeId),
            size: 5,    // default size
            sizeLabel: document.getElementById(brushSizeLabel),
            cap: 'round',
            painting: false, 
        };

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth; 
        
    }

    // Get active tool
    set activeTool(tool) {
        this.tool = tool;
        console.log(this.tool);
    }

    init() {
        // Canvas mouse event listener
        this.canvas.onmousedown = e => this.startPosition(e);
        this.canvas.onmouseup = e => this.finishedPosition(e);
        this.canvas.onmousemove = e => this.draw(e);
        // Change brush size 
        this.brush.sizeElement.oninput = e => this.changeBrushSize(e);
        // Change brush color
        pickr.on('change', (color, instance) => {
            this.changeBrushColor(color);
        })
    
    }

    startPosition(e) {
        this.brush.painting = true;
        this.draw(e);
    }
    finishedPosition(e) {
        this.brush.painting = false;
        this.ctx.beginPath();
    }
    draw(e) { 
        if(!this.brush.painting) return;
        this.ctx.lineWidth = this.brush.size;
        this.ctx.lineCap = this.brush.cap;
        this.ctx.strokeStyle = this.brush.color;

        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY); 
    }
    changeBrushSize(e) {
        this.brush.size = this.brush.sizeElement.value; 
        this.brush.sizeLabel.innerHTML = this.brush.size;
    }
    changeBrushColor(color) {
        this.brush.color = color.toRGBA().toString();
        pickr.setColor(this.brush.color);
    }

}