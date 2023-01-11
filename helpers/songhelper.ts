interface songInterface {
    name: string,
    uri: string
    duration_ms: number
}

const songHelper = {
    extractSong: (spotifySongObject: any) => {
        var songobj: songInterface = {
            name: spotifySongObject.name,
            uri: spotifySongObject.uri,
            duration_ms: spotifySongObject.duration_ms
        }
        return songobj
    },
}

export {songInterface, songHelper}
