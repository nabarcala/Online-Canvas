import React from 'react';
import Cavas from './Canvas';

export default function Toolbar() {
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
            <input
                type="radio"
                id="line"
                checked={selectedTool === "line"}
                onChange={() => setSelectedTool("line")}
                onClick={() => setAsActive("line")}
            />
            <label htmlFor="line" id="line-label"><i className='bx bx-minus'></i></label>
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
        </div>
    )
}
