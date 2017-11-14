import {songUrl,lyricUrl,albumCoverUrl} from './playerURL.js'
import {Progress} from './progress.js'

export class Music_player {
    constructor(el) {
        this.el = el
        this.el.addEventListener('click', (e) => this.event(e))
        this.audio = this.createAudio()
        this.progress = new Progress(this.el.querySelector('#progress'))
    }

    play(opts={}){
        log(opts)
        let song = songUrl(opts.songid)
        let lyric = lyricUrl(opts.lyricid)
        let ablumCover = albumCoverUrl(opts.albummid)
        this.el.querySelector('.song-name').innerHTML = opts.songname
        this.el.querySelector('.singer-name').innerHTML = opts.singer
        this.el.querySelector('.album-cover').src = ablumCover
        this.el.querySelector('.bg-blur').style.backgroundImage = `url(${ablumCover})`
        this.audio.src =song;
        this.audio.play()
        this.show()
        this.progress.init(opts.duration)
    }

    createAudio() {
        let audio = document.createElement('audio')
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
        // this.lyric.start()
    }

    onPause(el) {
        el.id = 'play-btn'
        el.classList.remove('icon-pause')
        el.classList.add('icon-play')
        this.audio.pause()
        console.log('暂停播放');
        this.progress.pause()
        // this.lyric.start()
    }

    show() {
        this.el.classList.add('show')
    }
    hide() {
        this.el.classList.remove('show')
    }
}