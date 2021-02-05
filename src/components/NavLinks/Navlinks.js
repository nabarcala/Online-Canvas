import React from 'react';
import './Navlinks.css';

export default function Navlinks() {
    return (
        <div className='navlinks-container'>
            <div className="navlinks">
                <div className="navlink">
                    <a href="#/">Feed</a>
                </div>
                <div className="navlink">
                    <a href="#/">Explore</a>
                </div>
                <div className="navlink">
                    <a href="#/">Popular</a>
                </div>
                <div className="navlink">
                    <a href="#/">About</a>
                </div>
            </div>
        </div>
    )
}
