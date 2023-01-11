const axios = require("axios")
import { songInterface, songHelper } from '../helpers/songhelper'


class trackQueue {
    queue: songInterface[]
    constructor() {
        this.queue = []
    }
    addsong(song: songInterface) {
        this.queue.push(song)
    }
    removePlaySong() {
        if (this.queue.length != 0) {
            this.queue.shift()
        }
    }
    getQueue() {
        var cpy = this.queue
        return cpy
    }

    async _populatequeuefortest(token: string) {
        var resp = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/search',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                q: "doja",
                type: "track"
            }
        })

        this.queue = resp.data.tracks.items.map(songHelper.extractSong)
    }
}
const trackQueueInstance = new trackQueue()
export default trackQueueInstance
