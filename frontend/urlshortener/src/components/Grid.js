import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Textbox from './Textbox';
import Button from './Button';
import axios from 'axios';
import Result from './Result';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

export default function FullWidthGrid({ action }) {
    const classes = useStyles();
    const [originalURL, setOriginalURL] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [shortenedURL, setShortenedURL] = useState('http://short.it/');
    const [message, setMessage] = useState(false);
    const [textboxError, setTextboxError] = useState(false)

    const handleSubmit = () => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*"
        }
        if (action === 'shorten') {
            if (originalURL === '') {
                setTextboxError(true);
            } else {
                const api = 'http://0.0.0.0:8001/create';
                var is_custom = "false";
                if (customURL !== '') {
                    is_custom = "true"
                }
                const request = {
                    "original_url": originalURL,
                    "custom_url": customURL,
                    "is_custom": is_custom
                };
                axios.post(api, request, headers)
                    .then((response) => {
                        const res = response.data
                        console.log('response --->', res)
                        if (res.exist === "false") {
                            setShortenedURL(res.data.shortened_url)
                            console.log('shortenedURL --->', shortenedURL)
                        }
                        setMessage(res.message)
                    })
                    .catch((error) => { console.log(error) })
            }
        } else {
            if (shortenedURL === '') {
                setTextboxError(true);
            } else {
                setOriginalURL(''); // clear previous state if exists
                const api = 'http://0.0.0.0:8001/find';
                var request = {
                    "shortened_url": shortenedURL
                };
                if (!shortenedURL.includes("http://short.it/")) {
                    console.log('it went in')
                    request = {
                        "shortened_url": "http://short.it/" + shortenedURL
                    };
                }
                console.log('request --->', request)
                axios.post(api, request, headers)
                    .then((response) => {
                        const res = response.data
                        console.log('response --->', res)
                        if (res.exist === "true") {
                            setOriginalURL(res.data.original_url)
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
        setShortenedURL('https://short.it/');
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
                        <Result message={message} URL={shortenedURL}/>
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
                        <Result message={message} URL={originalURL}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
