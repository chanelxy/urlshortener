import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


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

const Popularity = ({visitCount, lastVisitedDT}) => {
    const classes = useStyles();
    if (!lastVisitedDT) {
        return (<></>)
    }
    return (
        <Paper className={classes.paper}>
            <div className="result container" data-testid="result">
                <div className="row">
                    <div className="col">
                        Number of times visited: {visitCount}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Last visited date/time: {lastVisitedDT}
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default Popularity
