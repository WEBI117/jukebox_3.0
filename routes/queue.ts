import express, { Express, Request, Response } from 'express';
const router = express.Router()
import queueclass from '../datastructures/trackqueue'
import { songInterface, songHelper } from '../datastructures/songhelper'

// Send queue of songs to play
router.get("/", async (req, res) => {
    var queue = queueclass.getQueue()
    var queueobj: { queue: any } = {
        queue: queue
    }
    res.status(200).json(queueobj)
})

router.get("/addsong", (req: Request, res: Response) => {
    var song: songInterface = req.body as songInterface
    var extracted = songHelper.extractSong(song)
    queueclass.addsong(extracted)
    var q = queueclass.getQueue()
    // socket emit song added event...
    req.io.emit("queueupdated")
    // Need to implement a socket io utility class to have access to the socketio instance...
})

module.exports = router 