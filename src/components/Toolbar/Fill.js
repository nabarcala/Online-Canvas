import Point from './Point';

export default function Fill(canvasRef, ctxRef, selectedColor) {

    // convert hex to rgba
    const hexToRgba = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        if(result == null) {
            // console.log('result: ' + result + ' hex: ' + hex);
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            // console.log('NEW result: ' + result + ' hex: ' + hex);
            return [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                parseInt(result[4], 16)
            ];
        }
        // console.log('result: ' + result + ' hex: ' + hex);
        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ];
    }
    // Get the pixel image of the given point
    const getPixel = (point) => {
        var imgData = canvasRef.current.savedData;
        // if goes outside the canvas
        if(point.x < 0 || point.y < 0 || point.x >= imgData.width || point.y >= imgData.height) {
            return [-1, -1, -1, -1] // impossible color
        }
        else { // get the target color from where we click the fill bucket
            const offset = (point.y * imgData.width + point.x) * 4;
            return [
                imgData.data[offset + 0], // r
                imgData.data[offset + 1], // g
                imgData.data[offset + 2], // b
                imgData.data[offset + 3]  // a
            ];
        }
    };
    // Set the image data with the given color at the given point
    const setPixel = (point, color) => {
        var imgData = canvasRef.current.savedData;
        const offset = (point.y * imgData.width + point.x) * 4;
        // Set the pixel color
        imgData.data[offset + 0] = color[0]; // r
        imgData.data[offset + 1] = color[1]; // g
        imgData.data[offset + 2] = color[2]; // b
        imgData.data[offset + 3] = color[3]; // a
    };
    // floodFill(pixel, target-color, replacement-color)
    // Add the next locations to fill to the fillStack and set the pixel with the replacement color
    const floodFill = (point, target, fill, fillStack) => {
        // target = replacement, return
        if(doTheColorsMatch(target, fill)) { 
            return; 
        }
        // else pixel color == target
        const pixelColor = getPixel(point);
        // console.log("pixel color: " + pixelColor);
        if(doTheColorsMatch(pixelColor, target)) {
            // set pixel to replacement color
            setPixel(point, fill);
            // Save all the calls in the stack
            // perform flood fill for all for sides
            fillStack.push([new Point(point.x + 1, point.y), target, fill]);
            fillStack.push([new Point(point.x - 1, point.y), target, fill]);
            fillStack.push([new Point(point.x, point.y + 1), target, fill]);
            fillStack.push([new Point(point.x, point.y - 1), target, fill]);
            // return
        }
    };
    // Go through the fill stack and begin to fill with the color
    const fillColor = (fillStack) => {
        var imageData = canvasRef.current.savedData;
        // if there are still calls left in the stack
        if(fillStack.length > 0) {
            let range = fillStack.length;
            
            for(let i = 0; i < range; i++) {
                floodFill(fillStack[i][0], fillStack[i][1], fillStack[i][2], fillStack);
            }
            fillStack.splice(0, range);
            fillColor(fillStack); 
        }
        else {
            console.log("end")
            ctxRef.current.putImageData(imageData, 0, 0);
            fillStack = [];
        }
    };
    // Check if the color targeted is the same as the given color
    const doTheColorsMatch = (a, b) => {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    };

    
    // Convert to RGBA
    const color = hexToRgba(selectedColor);
    // Get the 
    const point = new Point(canvasRef.current.startPos.x, canvasRef.current.startPos.y);
    const targetColor = getPixel(point);
    // Create the stack and begin to fill using Flood Fill Algorithm
    const fillStack = [];
    floodFill(point, targetColor, color, fillStack);
    fillColor(fillStack);

    var imageData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    // ctxRef.current.putImageData(imageData, 0, 0);

    canvasRef.current.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

    
    return(imageData);
}
