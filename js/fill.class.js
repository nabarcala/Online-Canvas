import { pickr } from './colorpicker.js'; 
import Point from "./point.model.js"

export default class Fill {

    constructor(canvas, point, color) {
        this.ctx = canvas.getContext('2d');
        this.imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        
        console.log(color);
        // console.log(color.toHEXA());

        // get HSVA color from pickr
        var hsva = pickr.getColor();
        console.log(hsva);
        // convert it to hex theh rgba
        var hex = hsva.toHEXA().toString();
        console.log(hex);
        console.log("to RGBA: " + hsva.toRGBA());
        const fillColor = this.hexToRgba(hex);

        const targetColor = this.getPixel(point);
        
        console.log(fillColor);

        this.fillStack = [];
        this.floodFill(point, targetColor, fillColor);
        this.fillColor();
    }

    getPixel(point) {
        // if goes outside the canvas
        if(point.x < 0 || point.y < 0 || point.x >= this.imageData.width || point.y >= this.imageData.height) {
            return [-1, -1, -1, -1] // impossible color
        }
        else { // get the target color from where we click the fill bucket
            const offset = (point.y * this.imageData.width + point.x) * 4;

            return [
                this.imageData.data[offset + 0], // r
                this.imageData.data[offset + 1], // g
                this.imageData.data[offset + 2], // b
                this.imageData.data[offset + 3]  // a
            ];
        }
    }
    setPixel(point, color) {
        const offset = (point.y * this.imageData.width + point.x) * 4;
        // Set the pixel color
        this.imageData.data[offset + 0] = color[0]; // r
        this.imageData.data[offset + 1] = color[1]; // g
        this.imageData.data[offset + 2] = color[2]; // b
        this.imageData.data[offset + 3] = color[3]; // a
        
    }
    // convert hex to rgba
    hexToRgba(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        if(result == null) {
            console.log('result: ' + result + ' hex: ' + hex);
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            console.log('NEW result: ' + result + ' hex: ' + hex);
            return [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                parseInt(result[4], 16)
            ];
        }

        console.log('result: ' + result + ' hex: ' + hex);
        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ];
        
        
    }

    // floodFill(pixel, target-color, replacement-color)
    floodFill(point, target, fill) {
        // target = replacement, return
        if(this.doTheColorsMatch(target, fill)) return;

        // else pixel color == target
        const pixelColor = this.getPixel(point);
        if(this.doTheColorsMatch(pixelColor, target)) {
            // set pixel to replacement color
            this.setPixel(point, fill);

            // Save all the calls in the stack

            // perform flood fill for all for sides
            this.fillStack.push([new Point(point.x + 1, point.y), target, fill]);
            this.fillStack.push([new Point(point.x - 1, point.y), target, fill]);
            this.fillStack.push([new Point(point.x, point.y + 1), target, fill]);
            this.fillStack.push([new Point(point.x, point.y - 1), target, fill]);

            // return
        }
    }
    fillColor() {
        // if there are still calls left in the stack
        if(this.fillStack.length) {
            let range = this.fillStack.length;
            
            for(let i = 0; i < range; i++) {
                this.floodFill(this.fillStack[i][0], this.fillStack[i][1], this.fillStack[i][2]);
            }

            this.fillStack.splice(0, range);

            this.fillColor(); 
        }
        else {
            this.ctx.putImageData(this.imageData, 0, 0);
            this.fillStack = [];
        }
    }
    doTheColorsMatch(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
}