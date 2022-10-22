import express,{Express, Request, Response} from 'express';
const app = express()
const axios = require("axios")
const port = 3000
const client_ID="46928defa1474960b3e1c247aea5eae8"
const client_secret="45949d8d578349038136060b12030779"
const redir_uri="http://localhost:3000/mypage"


app.get('/', (req: Request,res: Response)=>{
    res.send("Hello from working express app.")
})

app.get('/login', (req: Request,res: Response) => {
    var params:{[key:string]:string}={
        client_id:client_ID,
        response_type:"code",
        redirect_uri:redir_uri,
    }
    var querystring=Object.keys(params).reduce((querystring,paramkey) => {
        return querystring + paramkey + "=" + params[paramkey] + "&"
    },"?")
    querystring=querystring.slice(0,querystring.length-1)

    res.redirect("https://accounts.spotify.com/authorize"+querystring)
})

app.get('/mypage', async (req:Request,res: Response) => {
    // get auth token
    res.send("redirected")
})

app.get('mypagewithcode',(req,res) => {
    res.send("Got token from spotify")
})

app.listen(port,()=>{
    console.log("App is listening on port 3000")
})
