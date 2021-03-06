import React, { useRef, useState, useEffect } from 'react';

import './Canvas.css';
import './Toolbar.css';
import Point, { getMouseCoord } from './utility';
import Tools from './Tools';
import Fill from './Fill';

import { SketchPicker } from 'react-color';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
// import rough from 'roughjs/bundled/rough.esm';

function Canvas() {

    const canvasRef = useRef(null);
    // const roughRef = useRef(null);
    const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    const [selectedTool, setSelectedTool] = useState(Tools.TOOL_BRUSH);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSize, setSelectedSize] = useState("5");

    const redoStackRef = useRef([]);
    const undoStackRef = useRef([]);
    const undoStackLimit = 10; 

    // const [currentLayer, setCurrentLayer] = useState(0);
    // const layerStackRef = useRef([[]]);
    // const layerStackLimit = 5;

    // Triggers only once when the app mounts
    useEffect(() => {
        const canvas = canvasRef.current;
        // const rc = roughRef.current;
        // rc = rough.canvas;
        canvas.width = window.innerWidth - 65; 
        canvas.height = window.innerHeight - 50;
        canvas.startPos = new Point();
        canvas.currPos = new Point();
        
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        // Canvas saved data. Ensures that the canvas is up to date and all previous strokes are remembered
        canvas.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    }, []);

    const redo = () => {
        console.log("redo time!")
        console.log(redoStackRef.current)

        if(redoStackRef.current.length > 0) {
            console.log(redoStackRef.current[redoStackRef.current.length - 1])
            // Put the image onto the canvas
            ctxRef.current.putImageData(redoStackRef.current[redoStackRef.current.length - 1], 0, 0);
            canvasRef.current.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            redoStackRef.current.pop();
        } 
        // If the stack is empty
        else {
            alert("No redo available!");
        }
    };
    const undo = () => {
        console.log("undo time!")
        console.log(undoStackRef.current);
        // There must be elements in the undo stack
        if(undoStackRef.current.length > 0) {
            // Add the element to the redo array
            canvasRef.current.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            redoStackRef.current.push(canvasRef.current.savedData);
            // Restore the last element
            ctxRef.current.putImageData(undoStackRef.current[undoStackRef.current.length - 1], 0, 0);
            // Remove the restored action
            undoStackRef.current.pop();
        } 
        // If the stack is empty
        else {
            alert("No undo available!");
        }
    };
    const addCanvasData = () => {
        canvasRef.current.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        // Check the undo limit
        if(undoStackRef.current.length >= undoStackLimit) {
            // Remove the first element of the stack to keep the current relevent actions
            undoStackRef.current.shift();
        }
        // Add the latest action of the canvas data onto the stack
        undoStackRef.current.push(canvasRef.current.savedData);
        // redoStackRef.current.push(canvasRef.current.savedData);
    }
    // on Mouse Down
    const startPosition = ({nativeEvent}) => {
        setIsDrawing(true);
        console.log(selectedTool);
        // Get mouse coordinates
        const {clientX, clientY} = nativeEvent;
        // Get the starting position of the movement
        canvasRef.current.startPos = getMouseCoord(clientX, clientY, canvasRef.current);
        // Remember to get the canvas data so previous strokes are kept
        canvasRef.current.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

        // DO NOT DRAW if the fill tool is selected
        if(selectedTool === Tools.TOOL_FILL) {
            Fill(canvasRef, ctxRef, selectedColor);
            canvasRef.current.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        addCanvasData();
    };
    // on Mouse Move
    const mouseMove = ({nativeEvent}) => {
        if(!isDrawing) return;
        // Get mouse coordinates
        const {offsetX, offsetY} = nativeEvent;
        const {clientX, clientY} = nativeEvent;
        // Get current position of the mouse
        canvasRef.current.currPos = getMouseCoord(clientX, clientY, canvasRef.current);
        
        // Check the tool being used
        switch (selectedTool) {
            case Tools.TOOL_BRUSH:
                draw(offsetX, offsetY);
                break;
            case Tools.TOOL_LINE:
                drawLine();
                break;
            case Tools.TOOL_SQUARE:
                drawShape(selectedTool); 
                break;
            case Tools.TOOL_CIRCLE:
                drawShape(selectedTool); 
                break;
            case Tools.TOOL_ERASER:
                draw(offsetX, offsetY); 
                break;
            default:
                break;
        }
    };
    const draw = (x, y) => {
        if(!isDrawing) return;

        setUp();
        if(selectedTool === Tools.TOOL_ERASER) {
            ctxRef.current.strokeStyle = "rgba(0,0,0,1.0)";
            ctxRef.current.globalCompositeOperation = "destination-out";
        }

        ctxRef.current.lineTo(x, y);
        ctxRef.current.stroke();
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x, y);
        
    };
    const drawLine = () => {
        if(!isDrawing) return;
        setUp();
        // Keep previous line strokes by getting the canvas data
        ctxRef.current.putImageData(canvasRef.current.savedData, 0, 0);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(canvasRef.current.startPos.x, canvasRef.current.startPos.y);
        ctxRef.current.lineTo(canvasRef.current.currPos.x, canvasRef.current.currPos.y);
        ctxRef.current.stroke();
    };
    const drawShape = (tool) => {
        if(!isDrawing) return;
        setUp();
        // Keep previous line strokes by getting the canvas data
        ctxRef.current.putImageData(canvasRef.current.savedData, 0, 0);
        ctxRef.current.beginPath();
        // Check the tool being used
        switch (selectedTool) {
            case Tools.TOOL_SQUARE:
                ctxRef.current.strokeRect(canvasRef.current.startPos.x, canvasRef.current.startPos.y, 
                    canvasRef.current.currPos.x - canvasRef.current.startPos.x, 
                    canvasRef.current.currPos.y - canvasRef.current.startPos.y);
                break;
            case Tools.TOOL_CIRCLE:
                // roughRef.circle(100, 100, 80, { fill: 'red' });
                ctxRef.current.arc(canvasRef.current.startPos.x, canvasRef.current.startPos.y,
                    Math.abs(canvasRef.current.currPos.x - canvasRef.current.startPos.x), 
                    0, Math.PI * 2);
                break;
            default:
                break;
        }
        ctxRef.current.stroke();
    };
    // Clear the canvas
    const clear = () => {
        addCanvasData();
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    // const erase = (x, y) => {
    //     ctxRef.current.lineWidth = brushRef.current.size;
    //     ctxRef.current.lineCap = brushRef.current.cap;
    //     ctxRef.current.strokeStyle = "rgba(0,0,0,1.0)";
    //     ctxRef.current.globalCompositeOperation = "destination-out";

    //     ctxRef.current.lineTo(x, y);
    //     ctxRef.current.stroke();
    //     ctxRef.current.beginPath();
    //     ctxRef.current.moveTo(x, y);
        
    // };
    // on Mouse Up - Done drawing
    const finishedPosition = () => {
        setIsDrawing(false);
        ctxRef.current.beginPath();
    };
    const setUp = () => {
        ctxRef.current.lineWidth = selectedSize; 
        ctxRef.current.lineCap = 'round';
        ctxRef.current.strokeStyle = selectedColor;
        ctxRef.current.globalCompositeOperation = "source-over";
        // ctxRef.current.globalAlpha = 0.2;
    };
    const updateSize = (e) => {
        setSelectedSize(e.target.value);
    };
    const saveImage = () => {
        // IE/Edge Support (PNG Only)
        if(window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvasRef.current.msToBlob(), 'canvas-image.png');
        } 
        else {
            const a = document.createElement("a");

            document.body.appendChild(a);
            a.href = canvasRef.current.toDataURL("image/png");
            a.download = "canvas-image.png";
            a.click();
            document.body.removeChild(a);
        }
    };
    const openImage = (input) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();

            img.onload = function() {
                // Draw the image to the canvas
                ctxRef.current.drawImage(img, 5, 5);
            }
            // Set the image source 
            img.src = reader.result;
        }
        reader.readAsDataURL(input);
    };
    function setAsActive(tool) {
        // Get the previous and current tool
        var oldActive = document.getElementById(selectedTool + "-label");
        var newActive = document.getElementById(tool + "-label");
        // Remove the previous selected class and add it to the active tool
        oldActive.classList.remove('selected');
        newActive.classList.add('selected');
        // The new selected tool is chosen when the input is changed
    };

  return (
    <div>
        <div className="toolbar-top">
            {/* Open */}
            <input 
                type="file" 
                id="open"
                accept="image/*"
                onChange={(e) => openImage(e.target.files[0])}
                hidden 
            />
            <label htmlFor="open" id="open-file"><i className='bx bx-folder-open'></i>Open </label> 
            {/* Save Image */}
            <button 
                id="save"
                onClick={saveImage}
                hidden
            />
            <label htmlFor="save" id="save-label"><i className='bx bx-save'></i>Save </label> 
            {/* Clear Canvas */}
            <input 
                type="radio" 
                id="clear"
                onClick={clear}
            />
            <label htmlFor="clear" id="clear-label"><i className='bx bxs-trash'></i>Clear </label>
            {/* Undo */}
            <button 
                id="undo"
                onClick={undo}
                hidden
            />
            <label htmlFor="undo" id="save-label"><i className='bx bx-undo' ></i>Undo </label> 
            {/* Redo */}
            <button 
                id="redo"
                onClick={redo}
                hidden
            />
            <label htmlFor="redo" id="save-label"><i className='bx bx-redo' ></i>Redo </label> 

            {/* <Button className='btns disabled' data-command="undo"><i className='bx bx-undo' ></i>Undo </Button> */}
            {/* <Button className='btns disabled' data-command="redo"><i className='bx bx-redo' ></i>Redo </Button> */}
            
            
        </div>

        <div className="toolbar-left">
            {/* Eraser */}
            <input
                type="radio"
                id="eraser"
                checked={selectedTool === "eraser"}
                onChange={() => setSelectedTool("eraser")}
                onClick={() => setAsActive("eraser")}
            />
            <label htmlFor="eraser" id="eraser-label"><i className='bx bxs-eraser' ></i></label>
            {/* Brush */}
            <input
                type="radio"
                id="brush"
                checked={selectedTool === "brush"}
                onChange={() => setSelectedTool("brush")}
                onClick={() => setAsActive("brush")}
            />
            <label htmlFor="brush" id="brush-label" className="selected"><i className='bx bx-paint' ></i></label>
            {/* Fill Bucket */}
            <input
                type="radio"
                id="fill"
                checked={selectedTool === "fill"}
                onChange={() => setSelectedTool("fill")}
                onClick={() => setAsActive("fill")}
            />
            <label htmlFor="fill" id="fill-label"><i className='bx bxs-color-fill' ></i></label>
            {/* Shapes: line, square, circle */}
            {/* Line */}
            <input
                type="radio"
                id="line"
                checked={selectedTool === "line"}
                onChange={() => setSelectedTool("line")}
                onClick={() => setAsActive("line")}
            />
            <label htmlFor="line" id="line-label"><i className='bx bx-minus'></i></label>
            {/* Square */}
            <input
                type="radio"
                id="square"
                checked={selectedTool === "square"}
                onChange={() => setSelectedTool("square")}
                onClick={() => setAsActive("square")}
            />
            <label htmlFor="square" id="square-label"><i className='bx bx-square'></i></label>
            {/* Circle */}
            <input
                type="radio"
                id="circle"
                checked={selectedTool === "circle"}
                onChange={() => setSelectedTool("circle")}
                onClick={() => setAsActive("circle")}
            />
            <label htmlFor="circle" id="circle-label"><i className='bx bx-circle'></i></label>

            <div className="tool-settings">
                {/* Color Picker */}
                <Tippy interactive={true} placement={'right'} content={
                    <SketchPicker
                    id="colorPickerId"
                    color={selectedColor}
                    onChangeComplete={color => setSelectedColor(color.hex)}
                    />
                }>
                    <div className="colorPickerArea" style={{ backgroundColor: selectedColor }}></div>
                </Tippy>
                
            </div>
            <div className="tool-size">
                {/* Brush Size  */}
                <input 
                    type="range" 
                    name="slider" 
                    id="slider" 
                    orient="vertical" 
                    min="1" 
                    max="100" 
                    value={selectedSize}
                    step="1"
                    onChange={updateSize}
                />
                <div>{ selectedSize }</div>
            </div>

        </div>

        <div className="container-canvas">
            <canvas id="canvas"
                    onMouseDown={startPosition}
                    onMouseUp={finishedPosition}
                    onMouseMove={mouseMove}
                    ref={canvasRef}
                    > 
                {/* <div id="img-data-div"> */}
                    {/* <a id="img-file" download="image.png">download image</a> */}
                {/* </div> */}
            </canvas>
        </div>

    </div>
  );
}

export default Canvas;
