import React from 'react';
import '../App.css';

export default function Button({ label, handleClick, variant }) {
    return (
        <button onClick={handleClick} variant={variant} className={label === "Reset" ? "btn2" : "btn"} >
            {label}
        </button>
    );
}
