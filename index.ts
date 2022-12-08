import express, { Express, Request, Response } from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import queueclass from './datastructures/trackqueue'
import fs from 'fs'

const app = express()
const cors = require("cors")
const http = require('http')
const https = require('https')
const loginrouter = require("./routes/login")
const tokenrouter = require("./routes/token")
const queuerouter = require("./routes/queue")
const searchrouter = require("./routes/search")
const port = 3000
const httpsport = 3443
const socketport = 3002
const httpSocketServer = createServer(app);

app.use(
    cors({
        origin: '*'
    })
)
app.use(express.json())

const io = new Server(httpSocketServer, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log(`client connected with socket id: ${socket.id}`)
    socket.on("songplayed", () => {
        queueclass.removePlaySong()
        io.emit("queueupdated")
    })
    socket.on('addsong', (song,callback) => {
        queueclass.addsong(song)
        callback({
            "status": 200
        })
    })
})
httpSocketServer.listen(socketport)


// socket io middleware
app.use((req, res, next) => {
    req.io = io
    next()
})

// routes
app.use('/login', loginrouter)
app.use('/token', tokenrouter)
app.use('/queue', queuerouter)
app.use('/search', searchrouter)


app.get('/', (req: Request, res: Response) => {
    res.send("Hello from working express app.")
})






app.listen(port,'0.0.0.0', () => {
    console.log("App is listening on port 3000")
})
