import React from 'react';
import '../App.css';

export default function Button({ label, handleClick, variant }) {
    if (label !== "Reset") {
        return (
            <button onClick={handleClick} fullWidth variant={variant} className="btn" >
                {label}
            </button>
        );
    } else if (label === "Reset") {
        return (
            <button onClick={handleClick} fullWidth variant={variant} className="btn2">
                {label}
            </button>
        );
    }
}
