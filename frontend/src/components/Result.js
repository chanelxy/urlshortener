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

export default function Result({ action, message, shortened="", original="" }) {
    const classes = useStyles();
    var url = shortened;
    if (message) {
        if (action === "shorten") {
            if (message.includes("exists") || message.includes("valid")) {
                url = '';
            }
        } else if (action === "search") {
            url = original;
        }
        return (
            <Paper className={classes.paper}>
                <div className="result container" data-testid="result">
                    <div className="row">
                        <div className="col">
                            {message}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <a href={url} className="link">{url}</a>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
    console.log('url', url)
    return null
}
