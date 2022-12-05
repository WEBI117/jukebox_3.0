import express, { Express, Request, Response } from 'express';
const router = express.Router()
import tokenhelper from '../datastructures/tokenhelper'

router.get('/', (req, res) => {
    if (tokenhelper.getToken() != "") {
        res.status(200).send(tokenhelper.getToken())
    }
    else {
        res.status(403).send("")
    }
})

module.exports = router
