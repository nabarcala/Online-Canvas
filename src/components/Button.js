import React from 'react';
import './Button.css';

// CSS button classes (styles and sizes)
const STYLES = ['btn-nav', 'btn--primary', 'btn--outline'];
const SIZES = ['btn-nav', 'btn--medium', 'btn--large'];
const SELECTED = ['notSelected', 'selected'];

// 
export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
    selected
}) => {
    // If the button does not have a class listed above, automatically apply the first class 
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkIfSelected = SELECTED.includes(selected) ? selected : SIZES[0];
    // 
    return (
        <button 
        // Add the button style and size
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkIfSelected}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
};