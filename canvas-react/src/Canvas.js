import React, { useRef, useState, useEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm';

import './Canvas.css';
import './Toolbar/Toolbar.css';
import Point, { getMouseCoord } from './utility';
import Tools from './Tools';
import { pickr } from './components/pickr';
import { Button } from './components/Button';
import Fill from './Fill';

// const generator = rough.generator();

// function createElement(startX, startY, endX, endY, tool) {
//     console.log(tool); 
//     var temp;
//     // const roughEl
//         // tool === Tools.TOOL_LINE 
//         // ? generator.line(startX, startY, endX, endY)
//         // : generator.rectangle(startX, startY, endX - startX, endY - startY);
//     switch (tool) {
//         case Tools.TOOL_BRUSH:
            
//             // temp = generator.linearPath([[startX, startY], [endX, endY]]);
//             // ctxRef.current.lineTo(startX, startY); 
//             // ctxRef.current.stroke();
//             break;
//         case Tools.TOOL_LINE:
//             temp = generator.line(startX, startY, endX, endY);
//             break;
//         case Tools.TOOL_SQUARE:
//             temp = generator.rectangle(startX, startY, endX - startX, endY - startY);
//             break;
//         default:
//             break;
//     }
//     const roughEl = temp;
    
//     return {startX, startY, endX, endY, roughEl}; 
// }

// function Canvas() {

//     const canvasRef = useRef(null)
//     const ctxRef = useRef(null)
//     const brushRef = useRef(null);
//     const roughRef = useRef(null);
//     const [elements, setElements] = useState([])
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [selectedTool, setSelectedTool] = useState(Tools.TOOL_LINE);

//     // Triggers only once when the app mounts
//     useLayoutEffect(() => {
//         // const canvas = canvasRef.current;
//         const canvas = document.getElementById("canvas");
//         canvas.width = window.innerWidth; 
//         canvas.height = window.innerHeight;
//         canvas.tool = Tools.TOOL_BRUSH;

        
//         // roughCanvas.rectangle(50, 50, 100, 100);
//         // roughRef.current = roughCanvas;

//         const ctx = canvas.getContext("2d");
//         // ctxRef.current = ctx;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         const brush = {
//             x: 0,
//             y: 0,
//             color: 'rgba(0, 0, 0, 1)',
//             // sizeElement: document.getElementById(brushSizeId),
//             size: 5,    // default size
//             // sizeLabel: document.getElementById(brushSizeLabel),
//             cap: 'round',
//         };
//         brushRef.current = brush;
//         const roughCanvas = rough.canvas(canvas);
//         // Render the elements on the canvas
//         elements.forEach(({roughEl}) => roughCanvas.draw(roughEl));
//         // const rect = generator.rectangle(50, 100, 100, 100);
//         // roughCanvas.draw(rect);

//     }, [elements]);
//     // on Mouse Down
//     const startPosition = ({nativeEvent}) => {
//         setIsDrawing(true);
//         // Get mouse coordinates
//         const {clientX, clientY} = nativeEvent;
//         // Create an element using the start position
//         const el = createElement(clientX, clientY, clientX, clientY, selectedTool);
//         // Push the element being created into the array element
//         setElements((prevState) => [...prevState, el]);
//     };
//     // on Mouse Move
//     const mouseMove = ({nativeEvent}) => {
//         if(!isDrawing) return;
//         // setUp();
//         // Get mouse coordinates
//         const {clientX, clientY} = nativeEvent;

//         // Get the starting position
//         const index = elements.length - 1;
//         const {startX, startY} = elements[index];
//         // Keep drawing the element
//         const updatedEl = createElement(startX, startY, clientX, clientY, selectedTool);
//         // Update array with the new complete element
//         const arrayCopy = [...elements];
//         arrayCopy[index] = updatedEl;
//         setElements(arrayCopy);
        

//         // ctxRef.current.lineTo(offsetX, offsetY);
//         // ctxRef.current.stroke();
//     };
//     // on Mouse Up
//     const finishedPosition = () => {
//         // Done drawing
//         setIsDrawing(false);
//         // ctxRef.current.beginPath();
//         // canvasRef.onmousemove = null;
//         // document.onmouseup = null;
//     };

// const generator = rough.generator();

// function createElement(startX, startY, endX, endY, tool) {
//     console.log(tool); 
//     var temp;
//     // const roughEl
//         // tool === Tools.TOOL_LINE 
//         // ? generator.line(startX, startY, endX, endY)
//         // : generator.rectangle(startX, startY, endX - startX, endY - startY);
//     switch (tool) {
//         case Tools.TOOL_BRUSH:
            
//             // temp = generator.linearPath([[startX, startY], [endX, endY]]);
//             // ctxRef.current.lineTo(startX, startY); 
//             // ctxRef.current.stroke();
//             break;
//         case Tools.TOOL_LINE:
//             temp = generator.line(startX, startY, endX, endY);
//             break;
//         case Tools.TOOL_SQUARE:
//             temp = generator.rectangle(startX, startY, endX - startX, endY - startY);
//             break;
//         default:
//             break;
//     }
//     const roughEl = temp;
    
//     return {startX, startY, endX, endY, roughEl}; 
// }

function Canvas() {

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const brushRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState(Tools.TOOL_LINE);

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
            color: 'rgba(51,0,255,1)',
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
            // new Fill(canvasRef.current, canvasRef.current.startPos, brushRef.current.color);
    
            var imgData = canvasRef.current.savedData;
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
            // case Tools.TOOL_FILL:
            //     new Fill(canvasRef.current, canvasRef.current.startPos, brushRef.current.color);
            //     break;
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
    const erase = (x, y) => {
        ctxRef.current.lineWidth = brushRef.current.size;
        ctxRef.current.lineCap = brushRef.current.cap;
        ctxRef.current.strokeStyle = "rgba(0,0,0,1.0)";
        ctxRef.current.globalCompositeOperation = "destination-out";

        ctxRef.current.lineTo(x, y);
        ctxRef.current.stroke();
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x, y);
        
    };
    // on Mouse Up - Done drawing
    const finishedPosition = () => {
        setIsDrawing(false);
        ctxRef.current.beginPath();
    };
    const setUp = () => {
        ctxRef.current.lineWidth = brushRef.current.size;
        ctxRef.current.lineCap = brushRef.current.cap;
        ctxRef.current.strokeStyle = brushRef.current.color;
        ctxRef.current.globalCompositeOperation = "source-over";
    };


  return (
    <div>

        <div className="toolbar-top">
            <input type="file" id="open" data-command="open" className="open-file" hidden />
            <label htmlFor="open" id="open-file" className="disabled">
                <i className='bx bx-folder-open'></i>Open
            </label> 
            <Button className='btns' id="save" data-command="save" download="image.png"><i className='bx bx-save'></i>Save </Button>
            {/* <Button className='btns disabled' data-command="undo"><i className='bx bx-undo' ></i>Undo </Button> */}
            {/* <Button className='btns disabled' data-command="redo"><i className='bx bx-redo' ></i>Redo </Button> */}
            <Button className='btns' id="clear" data-command="clear"><i className='bx bxs-trash'></i>Clear </Button>
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