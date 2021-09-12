import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Textbox({ label, value, handleChange, error }) {
    if (label.includes("short")) {
        return (
            <TextField
                label={label}
                variant="standard"
                error={error}
                helperText="Required field*"
                fullWidth
                required
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            />
        );
    } else {
        return (
            <TextField
                label={label}
                variant="standard"
                fullWidth
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            />
        );
    }
}
