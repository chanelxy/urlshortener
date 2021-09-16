import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Textbox from './Textbox';
import Button from './Button';
import axios from 'axios';
import Result from './Result';
import Popularity from './Popularity';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

// function to check for invalid URL
const checkValidURL = (url) => {
    if (url === '') {
        return false
    } else if (!url.includes(".")) {
        return false
    } else if (url.includes(" ")) {
        return false
    } else if (url.includes('"')) {
        return false
    }
    return true
}

export default function FullWidthGrid({ action }) {
    const classes = useStyles();
    const [originalURL, setOriginalURL] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [shortenedURL, setShortenedURL] = useState('https://url-shortit.herokuapp.com/');
    const [message, setMessage] = useState(false);
    const [textboxError, setTextboxError] = useState(false)
    const [visitCount, setvisitCount] = useState(0);
    const [lastVisitedDT, setlastVisitedDT] = useState('');

    // set up headers for api
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*"
    }

    // start up server on page load
    // useEffect(() => {
    //     axios.get('https://url-shortit.herokuapp.com/', headers)
    // }, [])

    const handleSubmit = () => {
        if (action === 'shorten') {
            // check if original URL given is valid
            if (!checkValidURL(originalURL)) {
                setTextboxError(true);
                setMessage("Please key in a valid URL.")
            } else {
                const api = process.env.REACT_APP_API_CREATE;
                var is_custom = false;
                if (customURL !== '') {
                    is_custom = true
                }
                const request = {
                    "original_url": originalURL,
                    "custom_url": customURL,
                    "is_custom": is_custom
                };
                axios.post(api, request, headers)
                    .then((response) => {
                        const res = response.data
                        if (!res.exist) {
                            setShortenedURL(res.data.shortened_url)
                        }
                        setMessage(res.message)
                    })
                    .catch((error) => { console.log(error) })
            }
        } else {
            if (shortenedURL === '') {
                setTextboxError(true);
            } else {
                setOriginalURL('');
                const api = process.env.REACT_APP_API_FIND;
                var request = {
                    "shortened_url": shortenedURL
                };
                if (!shortenedURL.includes("https://url-shortit.herokuapp.com/")) {
                    request = {
                        "shortened_url": "https://url-shortit.herokuapp.com/" + shortenedURL
                    };
                }
                axios.post(api, request, headers)
                    .then((response) => {
                        const res = response.data
                        if (res.exist) {
                            setOriginalURL(res.data.original_url);
                            setvisitCount(res.data.visit_count);
                            setlastVisitedDT(res.data.last_visited_date);
                        }
                        setMessage(res.message)
                    })
                    .catch((error) => { console.log(error) })
            }
        }
    }

    const handleReset = () => {
        setOriginalURL('');
        setCustomURL('');
        setShortenedURL('https://url-shortit.herokuapp.com/');
        setMessage('');
        setTextboxError(false);
    }

    if (action === 'shorten') {
        return (
            <div className={classes.root}>
                <Grid container spacing={3} justifyContent="center" >
                    <Grid item xs={12}>
                        <Textbox label="Enter URL to shorten" value={originalURL} handleChange={setOriginalURL} error={textboxError} />
                    </Grid>
                    <Grid item xs={12}>
                        <Textbox label="Custom keyword (Optional)" value={customURL} handleChange={setCustomURL} error={textboxError} />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Button label="Short it!" variant="contained" handleClick={handleSubmit} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button label="Reset" variant="outlined" handleClick={handleReset} />
                    </Grid>
                    <Grid item xs={12}>
                        <Result action="shorten" message={message} shortened={shortenedURL} original={originalURL} />
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Textbox label="Enter a short.it URL to search" value={shortenedURL} handleChange={setShortenedURL} error={textboxError} />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Button label="Search" variant="contained" handleClick={handleSubmit} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button label="Reset" variant="outlined" handleClick={handleReset} />
                    </Grid>
                    <Grid item xs={12}>
                        <Result action="search" message={message} original={originalURL} />
                        <Popularity visitCount={visitCount} lastVisitedDT={lastVisitedDT} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
