import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#586ff1',
        color: '#fff'
    }
}));

export default function Result({ message, URL }) {
    const classes = useStyles();
    var link = URL;
    if (!URL.includes("http")) {
        link = "https://" + URL
    }
    if (message) {
        return (
            <Paper className={classes.paper}>
                <div className="result container">
                    <div className="row">
                        <div className="col">
                            {message}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <a href={link} className="link">{URL}</a>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
    return null
}
