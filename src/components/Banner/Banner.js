import React from 'react';
import './Banner.css';

export default function Banner(imgPath) {

    return (
        <div className='banner-container' >
            <img src={imgPath.imgPath} alt=""/>
            <div className="banner-title">
                <div className="title">Natsketch Online Canvas</div>
                <div className="subtitle">Create and Share Your Art</div>
                <div className="banner-buttons">
                    <a href="/canvas">Start Drawing</a>
                    <a href="/signup">Sign Up Now</a>
                </div>
            </div>
        </div>
    )
}
