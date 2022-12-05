import express, { Express, Request, Response } from 'express';
const router = express.Router()
import queueclass from '../datastructures/trackqueue'
import tokenhelper from '../datastructures/tokenhelper'
const axios = require("axios")
const client_ID = "9c2551871ad14cb9868036ed0029a391"
const client_secret = "e60faa589d364207932479e004e637f6"
const redir_uri = "http://localhost:3000/login/mypage"

router.get('/', (req: Request, res: Response) => {
    var params: { [key: string]: string } = {
        client_id: client_ID,
        response_type: "code",
        redirect_uri: redir_uri,
        scope: "streaming user-modify-playback-state user-read-playback-state user-read-currently-playing"
    }
    var querystring = Object.keys(params).reduce((querystring, paramkey) => {
        return querystring + paramkey + "=" + params[paramkey] + "&"
    }, "?")
    querystring = querystring.slice(0, querystring.length - 1)

    res.redirect("https://accounts.spotify.com/authorize" + querystring)
})

router.get('/mypage', async (req: Request, res: Response) => {
    var code = req.query.code
    var authstring = "Basic" + " " + (new Buffer(client_ID + ':' + client_secret).toString('base64'))
    var body = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redir_uri
    }
    var header = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": authstring
    }
    try {
        //var resp = await axios.post("https://accounts.spotify.com/api/token",body,{
        //    headers: header
        //})
        var resp = await axios({
            method: 'post',
            url: "https://accounts.spotify.com/api/token",
            data: body,
            headers: header
        })
        if (resp.status === 200) {
            tokenhelper.setToken(resp.data.access_token)

            //await queueclass._populatequeuefortest(tokenhelper.getToken())
            //console.log(queueclass.getQueue())

            //console.log(tokenhelper.getToken())
            res.send(`Access Token: ${resp.data.access_token}`)
        }
        else {
            res.send(resp.statusText)
        }
    }
    catch (err) {
        console.log(err)
        res.send("error with request.")
    }
})

module.exports = router
