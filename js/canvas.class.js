import { pickr } from './colorpicker.js'; 
import Tool from './tool.class.js';
import Point, { getMouseCoord } from './utility.js'
import Fill from './fill.class.js';

export default class Canvas {

    constructor(canvasId, brushSizeId, brushSizeLabel, clearId, saveId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');
        this.tool; 
        this.x;

        this.brush = {
            x: 0,
            y: 0,
            color: 'rgba(0, 0, 0, 1)',
            sizeElement: document.getElementById(brushSizeId),
            size: 5,    // default size
            sizeLabel: document.getElementById(brushSizeLabel),
            cap: 'round',
            painting: false, 
        };

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth; 
        this.clearElement = document.getElementById(clearId);
        this.savebtn = document.getElementById(saveId);
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
        
        // Change brush size 
        this.brush.sizeElement.oninput = e => this.changeBrushSize(e);

        // Change brush color with pickr
        pickr.on('change', (color, instance) => {
            this.changeBrushColor(color);
        })

        // Clear 
        this.clearElement.onclick = e => this.clearCanvas(e);

        // save the canvas image
        console.log('right before');
        this.savebtn.onclick = e => this.saveImage(); 
    }

    startPosition(e) { // On mouse down
        this.brush.painting = true;
        this.savedData = this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.canvas.onmousemove = e => this.onMouseMove(e);

        this.startPos = getMouseCoord(e, this.canvas);

        if(this.tool == Tool.TOOL_FILL) {
            new Fill(this.canvas, this.startPos, this.brush.color);
        }
    }
    finishedPosition(e) { // On mouse up
        this.brush.painting = false;
        this.ctx.beginPath();
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }
    onMouseMove(e) {
        this.currPos = getMouseCoord(e, this.canvas);
        
        switch(this.tool) {
            case Tool.TOOL_BRUSH:
                this.draw(e);
                break;
            case Tool.TOOL_LINE:
                this.drawLine(e);
                break;
            case Tool.TOOL_ERASER:
                this.erase(e);
                break; 
            case Tool.TOOL_FILL:
                
                break;
            default:
                break; 
        }
    }
    setUp(e) {
        this.ctx.lineWidth = this.brush.size;
        this.ctx.lineCap = this.brush.cap;
        this.ctx.strokeStyle = this.brush.color;
        this.ctx.globalCompositeOperation = "source-over";
    }
    draw(e) { 
        if(!this.brush.painting) return;
        this.setUp(e);

        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
    }
    drawLine(e) { 
        if(!this.brush.painting) return;
        this.setUp(e);

        this.ctx.putImageData(this.savedData, 0, 0);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
        this.ctx.lineTo(this.currPos.x, this.currPos.y);
        this.ctx.stroke();
    }
    erase(e) {
        this.ctx.lineWidth = this.brush.size;
        this.ctx.lineCap = this.brush.cap;
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.strokeStyle = "rgba(0,0,0,1.0)";

        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY); 
    }
    clearCanvas(e) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    changeBrushSize(e) {
        this.brush.size = this.brush.sizeElement.value; 
        this.brush.sizeLabel.innerHTML = this.brush.size;
    }
    changeBrushColor(color) {
        this.brush.color = color.toRGBA().toString();
        pickr.setColor(this.brush.color);
    }
    saveImage() {
        var imageFile = document.getElementById('save');
        imageFile.setAttribute('download', 'image.png');
        imageFile.setAttribute('href', this.canvas.toDataURL());  
        
    }
    openImage() {
        let img = new Image();
        img.onload = function(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0);
        };
        img.src = 'image.png';
    }
}