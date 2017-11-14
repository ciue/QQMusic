export class Progress {
    constructor(el, start) {
        this.el = el
        this.progressLoad = this.el.querySelector('.progress-load')
        this.elapsed = this.el.querySelector('.elapsed-time')
        this.duration = this.el.querySelector('.duration-time')
        this.elapsedTime = 0
        this.durationTime = 0
    }

    init(duration) {
        clearInterval(this.intervalId)
        this.elapsedTime = 0
        if (duration) {
            this.durationTime = duration
            this.duration.innerHTML = this.formatTime(duration)
        }
        this.intervalId = setInterval(this.update.bind(this), 500)
    }

    update(elapsed) {
        if (this.elapsedTime >= this.durationTime) this.reset()
        this.elapsedTime += 0.5
        this.elapsed.innerHTML = this.formatTime(this.elapsedTime)
    }

    pause() {
        clearInterval(this.intervalId)
    }

    play() {
        this.intervalId = setInterval(this.updateTime.bind(this), 50)
    }

    formatTime(time) {
        let min = Math.floor(time / 60)
        let sec = Math.floor(time % 60)
        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec
        return `${min}:${sec}`
    }

}