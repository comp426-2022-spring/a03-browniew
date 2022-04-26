import { json } from "express/lib/response";
import {coinFlip, coinFlips, countFlips, flipACoin} from "./modules/coin.mjs";

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || 5000

// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip();
    res.status(200).json({"flip": flip});
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    res.status(200).json({"raw": flips, "summary": countFlips(flips)})
    //Some
    //expressions
    //go
    //here
});

app.get('/app/flip/call/:string', (req, res) => {
    const call = flipACoin(req.params.string);
    res.status(200).json(call);
});