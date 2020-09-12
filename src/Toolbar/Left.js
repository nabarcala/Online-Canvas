// import React, { useState } from 'react';

// import './Toolbar.css';
// import { Button } from '../components/Button';
// import { ChromePicker } from 'react-color';

// export default function Left() {

//     const [color, setColor] = useState('#fff');

//     return (
//         <div className='toolbar-left'>

//             <div className="toolbar-items">
//                 {/* Eraser Tools */}
//                 <Button className='btns' data-tool="eraser"><i className='bx bxs-eraser' ></i></Button>
//                 {/* Paint Tools */}
//                 <Button className='btns' data-tool="brush" className="selected"><i className='bx bx-paint' ></i></Button>
//                 {/* Fill Bucket */}
//                 <Button className='btns' data-tool="fill"><i className='bx bxs-color-fill' ></i></Button>
//                 {/* Shapes */}
//                 <Button className='btns' data-tool="line"><i className='bx bx-minus'></i></Button> 
//                 <Button className='btns' data-tool="square"><i className='bx bx-square'></i></Button>
//                 <Button className='btns' data-tool="circle"><i className='bx bx-circle' ></i></Button>

//             </div>


            
//             <span className="divider"> </span>

//             {/* Tool Sizes and Colors */}

//             <div className="brush-wrapper">
//                 {/* <div className="color-picker"></div>  */}
//                 <ChromePicker />
//                 <input className="slider" type="range" id="brush-size" min="1" max="100" value="5" orient="vertical" /> 
                
//                 {/* <div class="all-sizes">
//                     <span class="size size1"> 3 </span>
//                     <span class="size size2">0</span>
//                 </div> */}
                
//                 <span id="current-brush-size">5</span>
                
//             </div>
//         </div>
//     )
// }
