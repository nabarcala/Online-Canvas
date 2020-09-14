import React, { useState, useEffect } from 'react';
import './Welcome.css';

export default function Welcome() {

    const [welcomeBox, setWelsomeBox] = useState(null);
    const [closeBtn, setCloseBtn] = useState(null);
    const [startDrawingBtn, setStartDrawingBtn] = useState(null);

    useEffect( () => {
        // Get all the buttons and save their state
        var welcomePop = document.getElementById("welcome");
        var closeBtn = document.getElementById("close-btn");
        var closeBtn2 = document.getElementById("start-drawing-btn");

        setWelsomeBox(welcomePop);
        setCloseBtn(closeBtn);
        setStartDrawingBtn(closeBtn2);

        // Set the window to open automatically on load
        // welcomePop.style.display = 'block';
    }, [])
    // Close the welcome window on button click
    // @TODO: Close window on outside click 
    const closeWindow = () => {
        welcomeBox.style.display = 'none';
    };

    return (
        <div className="welcome-popup popup-bg" id="welcome">
            {/* Welcome Popup */}
            <div id="popup-box">
                <div className="close-section">
                    {/* X close button */}
                    <div 
                        className="close" 
                        id="close-btn" 
                        onClick={closeWindow} 
                    >
                        <p>+</p>
                    </div>
                </div>
                
                <div class="logo-img">
                    <img src="img/painting-palette-icon.png" alt="" />
                </div>

                <div className="popup-text">
                    <h1>Hi! Ready to get creative?</h1>
                    <p>Check this stuff out!</p>
                </div>

                <div className="popup-close">
                    <a 
                        href="#" 
                        id="start-drawing-btn" 
                        onClick={closeWindow}>
                        <h3 className="btn">No! I want to start drawing!</h3>
                    </a> 
                </div>

            </div>
        </div>
    )
}
