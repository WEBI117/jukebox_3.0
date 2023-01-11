import express, { Express, Request, Response } from 'express';
import axios from 'axios'
import tokenHelper from '../helpers/tokenhelper'
import { RESERVED_EVENTS } from 'socket.io/dist/socket';
const router = express.Router()

router.get('/', async (req, res) => {
    // get song from search stringin body or query param.
    try{
        var searchString = req.query.searchstring
        var token = tokenHelper.getToken()
        if(searchString != undefined){
            if(token != '' || token != undefined){
                var searchRequest = await axios({
                        method: 'get',
                        url: 'https://api.spotify.com/v1/search',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: {
                            q: searchString,
                            type: "track"
                        }
                    })
                res.status(searchRequest.status).send(searchRequest.data.tracks.items)
                return
            }
            res.status(500).send('Invalid authentication token.')
            return
        }
        res.status(500).send('Invalid query parameters.')
        return
    }
    catch (err){
        console.log(err)
        res.status(500).send('internal server error encountered.')
        return
    }
})

module.exports = router
