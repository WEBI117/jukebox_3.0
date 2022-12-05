import express, { Express, Request, Response } from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import queueclass from './datastructures/trackqueue'

const app = express()
const cors = require("cors")
const loginrouter = require("./routes/login")
const tokenrouter = require("./routes/token")
const queuerouter = require("./routes/queue")
const port = 3000
const socketport = 3002
const httpServer = createServer(app);

app.use(
    cors({
        origin: '*'
    })
)
app.use(express.json())

const io = new Server(httpServer, {
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
})
httpServer.listen(socketport)


// socket io middleware
app.use((req, res, next) => {
    req.io = io
    next()
})

// routes
app.use('/login', loginrouter)
app.use('/token', tokenrouter)
app.use('/queue', queuerouter)


app.get('/', (req: Request, res: Response) => {
    res.send("Hello from working express app.")
})






app.listen(port, () => {
    console.log("App is listening on port 3000")
})
