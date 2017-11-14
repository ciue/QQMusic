export class Progress {
    constructor(el) {
        this.el = el
        this.progressLoad = this.el.querySelector('.progress-load')
        this.elapsed = this.el.querySelector('.elapsed-time')
        this.duration = this.el.querySelector('.duration-time')
        this.elapsedTime = 0
        this.durationTime = 0
        this.translate = 0
    }

    init(duration) {
        clearInterval(this.intervalId)
        this.elapsedTime = 0
        this.progressLoad.style.transform = `translateX(-100%)`
        if (duration) {
            this.durationTime = duration
            this.duration.innerHTML = this.formatTime(duration)
        }
        this.intervalId = setInterval(this.update.bind(this), 100)
    }

    update(elapsed) {
        if (this.elapsedTime >= this.durationTime) this.reset()
        this.elapsedTime += 0.1
        this.elapsed.innerHTML = this.formatTime(this.elapsedTime)
        let translate = (this.elapsedTime / this.durationTime)*100-100
        console.log(translate);
        this.progressLoad.style.transform = `translateX(${translate}%)`
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