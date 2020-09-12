// import React from 'react';

// import './Toolbar.css';
// import { Button } from '../components/Button';
// import { activeTool } from '../Canvas';
// import Tools from '../Tools';


// export default function Top() {

//     // Get active tool
//     const activeTool = (tool) => {
//         // canvasRef.current.tool = tool;
//         console.log(tool);
//     }

//     return (
//         <div className='toolbar-top'>
            
//             {/* Left: file > save, upload, clear, etc */}
//             <div className="left">
//                 <input type="file" id="open" data-command="open" className="open-file" hidden />
//                 <label htmlFor="open" id="open-file" className="disabled">
//                     <i className='bx bx-folder-open'></i>Open
//                 </label> 
//                 <Button className='btns' id="save" data-command="save" download="image.png"><i className='bx bx-save'></i>Save </Button>
//                 {/* <Button className='btns disabled' data-command="undo"><i className='bx bx-undo' ></i>Undo </Button> */}
//                 {/* <Button className='btns disabled' data-command="redo"><i className='bx bx-redo' ></i>Redo </Button> */}
//                 <Button className='btns' id="clear" data-command="clear"><i className='bx bxs-trash'></i>Clear </Button>
//             </div>
//             {/* Center: Painting brush, eraser, shapes, etc */}
//             <div className="center">
//                 {/* Eraser Tools */}
//                 <Button className='btns' dataTool="eraser" onClick={activeTool(Tools.TOOL_ERASER)}><i className='bx bxs-eraser' ></i></Button>
//                 {/* Paint Tools */}
//                 <Button className='btns' data-tool="brush" className="selected" onClick={activeTool(Tools.TOOL_BRUSH)}><i className='bx bx-paint' ></i></Button>
//                 {/* Fill Bucket */}
//                 <Button className='btns' data-tool="fill"><i className='bx bxs-color-fill' ></i></Button>
//                 {/* Shapes */}
//                 <Button className='btns' data-tool="line"><i className='bx bx-minus'></i></Button> 
//                 <Button className='btns' data-tool="square"><i className='bx bx-square'></i></Button>
//                 <Button className='btns' data-tool="circle"><i className='bx bx-circle' ></i></Button>
//             </div>
//             {/* Right: Layers */}
//             <div className="right">

//             </div>
            
            
            

//         </div>
//     )
// }
