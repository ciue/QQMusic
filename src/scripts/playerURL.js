export function songUrl(id,vkey,guid) {
    return `http://dl.stream.qqmusic.qq.com/C400${id}.m4a?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`
    // return `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
}

export function lyricUrl(id) {
    return `https://qq-music-api.now.sh/lyrics?id=${id}`
}

export function albumCoverUrl(id) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}
