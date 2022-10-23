import express,{Express, Request, Response} from 'express';
const app = express()
const axios = require("axios")
const port = 3000
const client_ID="9c2551871ad14cb9868036ed0029a391"
const client_secret="e60faa589d364207932479e004e637f6"
const redir_uri="http://localhost:3000/mypage"


app.get('/', (req: Request,res: Response)=>{
    res.send("Hello from working express app.")
})

app.get('/login', (req: Request,res: Response) => {
    var params:{[key:string]:string}={
        client_id:client_ID,
        response_type:"code",
        redirect_uri:redir_uri,
        scope:"streaming user-modify-playback-state user-read-playback-state user-read-currently-playing"
    }
    var querystring=Object.keys(params).reduce((querystring,paramkey) => {
        return querystring + paramkey + "=" + params[paramkey] + "&"
    },"?")
    querystring=querystring.slice(0,querystring.length-1)

    res.redirect("https://accounts.spotify.com/authorize"+querystring)
})

app.get('/mypage', async (req:Request,res: Response) => {
    var code=req.query.code
    var authstring="Basic" + " " + (new Buffer(client_ID + ':' + client_secret).toString('base64'))
    var body={
        grant_type:"authorization_code",
        code:code,
        redirect_uri:redir_uri
    }
    var header={
        "Content-Type":"application/x-www-form-urlencoded",
        "Authorization": authstring
    }
    try{
        //var resp = await axios.post("https://accounts.spotify.com/api/token",body,{
        //    headers: header
        //})
        var resp = await axios({
            method: 'post',
            url: "https://accounts.spotify.com/api/token",
            data: body,
            headers: header
        })
        if(resp.status === 200){
            res.send(`Access Token: ${resp.data.access_token}`)
        }
        else{
            res.send(resp.statusText)
        }
    }
    catch(err){
        console.log(err)
        res.send("error with request.")
    }
})

app.get('mypagewithcode',(req,res) => {
    res.send("Got token from spotify")
})

app.listen(port,()=>{
    console.log("App is listening on port 3000")
})
