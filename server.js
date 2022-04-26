//import { json } from "express/lib/response";
//import {coinFlip, coinFlips, countFlips, flipACoin} from "../modules/coin.mjs";
//import minimist from "minimist";
//import requirejs from "requirejs";

// Require Express.js
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port'];
const port = args.port || 5000



// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
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

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

 function coinFlip() {

    var x = Math.floor(Math.random()*2);
  
    if(x == 0) {
      return 'heads';
    }
    else {
      return 'tails';
    }
  }
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
  function coinFlips(flips) {
  
    const results = [];
    const num = flips;
  
    while(flips > 0) {
      results[num - flips] = coinFlip();
      flips--;
    }
    return results;
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
  function countFlips(array) {
  
    let noheads = 0;
    let notails = 0;
  
    array.forEach(element => {
      if(element == "heads") {
        noheads++;
      }
      else {
        notails++;
      }
    });
  
    /*for(var i = 0; i < length; i++) {
      if (array[i] == "heads") {
        noheads++;
      }
      else {
        notails++;
      }
    }*/
  
    return { heads: noheads, tails: notails }
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
  function flipACoin(call) {
  
    var resultingflip = coinFlip();
    var results;
  
    if(call == resultingflip) {
      results = "win";
    }
    else {
      results = "lose";
    }
    return {call: call, flip: resultingflip, result: results};
  }