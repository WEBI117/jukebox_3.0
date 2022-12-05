interface songInterface {
    name: string,
    uri: string
    duration: number
}

const songHelper = {
    extractSong: (spotifySongObject: any) => {
        var songobj: songInterface = {
            name: spotifySongObject.name,
            uri: spotifySongObject.uri,
            duration: spotifySongObject.duration_ms
        }
        return songobj
    },
}

export {songInterface, songHelper}
