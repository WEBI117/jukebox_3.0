import express, { Express, Request, Response } from 'express';
const router = express.Router();
import tokenhelper from '../helpers/tokenhelper';
const { networkInterfaces } = require('os');


router.get('/', (req, res) => {
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    console.log(results)
    if(results.en0){
        res.send(results.en0[0]) 
    }
    else{
        res.send('')
    }
})

module.exports = router
// May be useful in production deployments
//router.get('/', (req, res) => {
//    if (tokenhelper.getToken() != "") {
//        res.status(200).send(tokenhelper.getToken())
//    }
//    else {
//        res.status(403).send("")
//    }
//})
