export function songUrl(id) {
    return `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
}

export function lyricUrl(id) {
    return `https://qq-music-api.now.sh/lyrics?id=${id}`
}

export function albumCoverUrl(id) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}