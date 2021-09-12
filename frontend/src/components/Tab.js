import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from './Grid';
import '../App.css';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    tab: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.875em',
        fontWeight: 600,
        letterSpacing: '1.25px',
        lineHeight: '2em',
        textTransform: 'none'
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Shorten" className={classes.tab} />
                <Tab label="Search" className={classes.tab} />
            </Tabs>
            <TabPanel value={value} index={0} >
                <Grid action="shorten" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid action="search" />
            </TabPanel>
        </Paper>
    );
}
