import React, { useRef, useState, useEffect } from 'react';
// import rough from 'roughjs/bundled/rough.esm';

import './Canvas.css';
import './Toolbar/Toolbar.css';
import Point, { getMouseCoord } from './utility';
import Tools from './Tools';

import { Button } from './components/Button';
import Fill from './Fill';

import { SketchPicker } from 'react-color';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional


function Canvas() {

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const brushRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState(Tools.TOOL_LINE);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSize, setSelectedSize] = useState("5")



    // Triggers only once when the app mounts
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth - 65; 
        canvas.height = window.innerHeight - 50;
        canvas.startPos = new Point();
        canvas.currPos = new Point();
        // Default tool is the brush
        setSelectedTool(Tools.TOOL_BRUSH);
        
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        // Canvas saved data. Ensures that the canvas is up to date and all previous strokes are remembered
        canvas.savedData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Save default brush settings for user override later
        const brush = {
            x: 0, 
            y: 0,
            // color: 'rgba(51,0,255,1)',
            color: '#fffff',
            cap: 'round',
            size: '5'
        };
        brushRef.current = brush;

    }, []);
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
            new Fill(canvasRef, ctxRef, selectedColor);
        }
    
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
        ctxRef.current.lineCap = brushRef.current.cap;
        ctxRef.current.strokeStyle = selectedColor;
        ctxRef.current.globalCompositeOperation = "source-over";
    };
    const updateSize = (e) => {
        setSelectedSize(e.target.value);
    };
    const saveImage = () => {
        var imgFile = document.getElementById('save');
        console.log(imgFile);
        // imgFile.setAttribute('download', 'image.png');
        // imgFile.setAttribute('href', canvasRef.current.toDataURL()); 

        var dataURL = canvasRef.current.toDataURL();
        console.log(dataURL);
        // imgConverted.src = dataURL;

        // IE/Edge Support (PNG Only)
        if(window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvasRef.current.msToBlob(), 'canvas-image.png');
        } else {
            const a = document.createElement("a");

            document.body.appendChild(a);
            a.href = canvasRef.current.toDataURL("image/png");
            a.download = "canvas-image.png";
            a.click();
            document.body.removeChild(a);
        }
    }

  return (
    <div>

        <div className="toolbar-top">
            {/* Open */}
            <input 
                type="file" 
                id="open"
                className="open-file" 
                hidden 
            />
            <label htmlFor="open" id="open-file" className="disabled"><i className='bx bx-folder-open'></i>Open </label> 
            {/* Save Image */}
            <button 
                // type="radio"
                id="save"
                // download="image.png"
                onClick={saveImage}
                hidden
            />
            <label htmlFor="save" id="save"><i className='bx bx-save'></i>Save </label> 
            {/* <Button 
            className='btns' 
            id="save" data-command="save" 
            download="image.png">
            <i className='bx bx-save'></i>Save </Button> */}


            {/* <Button className='btns' id="save" data-command="save" download="image.png"><i className='bx bx-save'></i>Save </Button> */}
            {/* <Button className='btns disabled' data-command="undo"><i className='bx bx-undo' ></i>Undo </Button> */}
            {/* <Button className='btns disabled' data-command="redo"><i className='bx bx-redo' ></i>Redo </Button> */}
            {/* <Button className='btns' id="clear" data-command="clear"><i className='bx bxs-trash'></i>Clear </Button> */}
            
            {/* Clear Canvas */}
            <input 
                type="radio" 
                id="clear"
                onClick={clear}
            />
            <label htmlFor="clear"><i className='bx bxs-trash'></i>Clear </label>
        </div>

        <div className="toolbar-left">
            {/* Eraser */}
            <input
                type="radio"
                id="eraser"
                checked={selectedTool === "eraser"}
                onChange={() => setSelectedTool("eraser")}
            />
            <label htmlFor="eraser"><i className='bx bxs-eraser' ></i></label>
            {/* Brush */}
            <input
                type="radio"
                id="brush"
                checked={selectedTool === "brush"}
                onChange={() => setSelectedTool("brush")}
            />
            <label htmlFor="brush"><i className='bx bx-paint' ></i></label>
            {/* Fill Bucket */}
            <input
                type="radio"
                id="fill"
                checked={selectedTool === "fill"}
                onChange={() => setSelectedTool("fill")}
            />
            <label htmlFor="fill"><i className='bx bxs-color-fill' ></i></label>
            {/* Shapes: line, square, circle */}
            <input
                type="radio"
                id="line"
                checked={selectedTool === "line"}
                onChange={() => setSelectedTool("line")}
            />
            <label htmlFor="line"><i className='bx bx-minus'></i></label>
            <input
                type="radio"
                id="square"
                checked={selectedTool === "square"}
                onChange={() => setSelectedTool("square")}
            />
            <label htmlFor="square"><i className='bx bx-square'></i></label>
            {/* Circle */}
            <input
                type="radio"
                id="circle"
                checked={selectedTool === "circle"}
                onChange={() => setSelectedTool("circle")}
            />
            <label htmlFor="circle"><i className='bx bx-circle'></i></label>

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
                <div id="img-data-div">
                    <a id="img-file" download="image.png">download image</a>
                </div>
            </canvas>
        </div>

    </div>
  );
}

export default Canvas;
