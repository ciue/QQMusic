import {songUrl,lyricUrl,albumCoverUrl} from './playerURL.js'
import {Progress} from './progress.js'
import { Lyric } from './lyric.js'

export class Music_player {
    constructor(el) {
        this.el = el
        this.error = document.querySelector('#error')
        this.el.addEventListener('click', (e) => this.event(e))
        this.audio = this.createAudio()
        this.progress = new Progress(this.el.querySelector('#progress'))
        this.lyric = new Lyric(this.el.querySelector('#lyric-text'),this.audio)
        this.fetching = false
    }


    async play(opts = {}) {
        // 重置歌词和进度条
        this.clear()
        let guid = Math.round(2147483647 * Math.random()) * (new Date).getUTCMilliseconds() % 1e10
        let vkey = await this.getVkey(opts.songid, guid)
        let song = songUrl(opts.songid, vkey, guid)
        this.audio.src = song;
        this.show();
        let ablumCover = albumCoverUrl(opts.albummid)
        this.el.querySelector('.song-name').innerHTML = decodeURI(opts.songname)
        this.el.querySelector('.singer-name').innerHTML = decodeURI(opts.singer)
        this.el.querySelector('.album-cover').src = ablumCover
        this.el.querySelector('.bg-blur').style.backgroundImage = `url(${ablumCover})`
        if (!this.fetching) {
            this.fetching = true
            this.getLyric(opts.lyricid)
                .then(() => {
                    this.audio.play() //启动时播放
                    this.progress.init(opts.duration) // 传入歌曲总时长
                    this.fetching = false
                })

        }
    }

    createAudio() {
        let audio = document.createElement('audio') 
        audio.addEventListener('error', () => {
            console.log('资源出错了');
            this.error.classList.add('show')
            setTimeout(() => this.error.classList.remove('show'),1200)
            window.location.hash = '#'
        })

        audio.addEventListener('ended', () => {
            this.audio.play();
            this.progress.init();
            this.lyric.reset();
        })
        document.body.appendChild(audio)

        return audio
    }

    event(e) {
        let target = e.target
        switch (target.id) {
            case 'pause-btn':
                this.onPause(target)
                break

            case 'play-btn':
                this.onPlay(target)
                break

            case 'hide-btn':
                this.hide()
                break
        }
    }

    onPlay(el) {
        el.id = 'pause-btn'
        el.classList.remove('icon-play')
        el.classList.add('icon-pause')
        this.audio.play()
        console.log('继续播放');
        this.progress.play()
        this.lyric.start()
    }

    onPause(el) {
        el.id = 'play-btn'
        el.classList.remove('icon-pause')
        el.classList.add('icon-play')
        this.audio.pause()
        console.log('暂停播放');
        this.progress.pause()
        this.lyric.pause()
    }

    show() {
        this.el.classList.add('show')
    }
    hide() {
        this.el.classList.remove('show')
    }

    getVkey(id, guid) {
        // jsonp 跨域
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.src = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=${id}&filename=C400${id}.m4a&guid=${guid}`
            document.getElementsByTagName("body")[0].appendChild(script);

            window.callback = function (res) {
                let vkey = res.data.items[0].vkey
                resolve(vkey)
            }
        })

    }

    getLyric(id) {
        return fetch(lyricUrl(id))
            .then(res => res.json())
            .then(json => json.lyric)
            .then(text => this.lyric.init(text))
            .catch((e) => {
                console.log(e);
            })
    }

    clear() {
        this.el.querySelector('#lyric-text').innerText = ''
        this.progress.init()
    }

}