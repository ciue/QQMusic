export class Lyric {
    constructor(el, audio, lineHeight) {
        this.el = el
        this.audio = audio
        this.lyric = ''
        this.index = 0
        this.lineHeight = lineHeight || 42 // 42为默认的歌词行高
    }

    init(text) {
        this.lyric = this.formatText(text).match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)
        this.render(this.lyric)
    }

    reset() {
        this.index = 0
        this.el.style.transform = `translateY(0px)`
        this.update()
    }

    update() {
        // 滚动及监听歌词
        this.fn = function () {
            for (let i = this.index; i < this.lyricline.length; i++) {
                if (Math.floor(this.audio.currentTime) === +this.lyricline[i].attributes['data-time'].value) {
                    this.lyricline[i].classList.add('lyric-current')
                    this.index = i
                    if (this.lyricline[i].previousElementSibling) {
                        this.lyricline[i].previousElementSibling.classList.remove('lyric-current')
                    }
                }
            }
            if (this.index >= 4) {
                const y = -(this.index - 3) * this.lineHeight
                this.el.style.transform = `translateY(${y}px)`
            }
        }

        //  每两秒执行一次 timeupdate 绑定事件
        this.audio.addEventListener('timeupdate', () => this.throttle(this.fn, this, 500))
    }

    start() {
        this.audio.addEventListener('timeupdate', () => this.throttle(this.fn, this, 500))
    }

    pause() {
        this.audio.removeEventListener('timeupdate', () => this.throttle(this.fn, this, 500))
        
    }

    render(lyric) {
        let html = lyric.map(line =>
            `<p data-time="${this.getTimePoint(line.slice(1,9))}">${line.slice(10)}</p>
        `).join('')
        this.el.innerHTML = html
        this.lyricline = this.el.querySelectorAll('p')
        this.update()
    }

    getTimePoint(time) {
        let timePoint = time.replace(/(\d{2}):(\d{2}).\d{2}/, (match, p1, p2) => 60 * (+p1) + (+p2))
        return timePoint
    }

    formatText(text) {
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }

    throttle(fn, context, delay) {
        let cur = +new Date()
        let diff = cur - this.pre
        if (!this.pre || diff >= delay) {
            fn.call(context)
            this.pre = cur
        } else if (this.pre && diff < delay) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => fn.call(context), delay)
        }
    }
}