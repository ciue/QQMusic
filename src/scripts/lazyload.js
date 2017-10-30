export class LazyLoad {
    constructor(el) {
        this.el = el
        this.pre
        this.timer
        window.addEventListener('scroll', () => this.throttle(this.checkShow, this, 300))
        window.dispatchEvent(new Event('scroll'))
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

    checkShow() {
        console.log(new Date())
        this.imgs = [].slice.call(document.querySelectorAll('.lazyload'))
        this.imgs.map(img => {
            if (this.isVisible(img)) {
                img.src = img.dataset.url;
                img.classList.remove('lazyload')
            }
        })
    }

    isVisible(img) {
        let {
            top,
            left,
            right,
            bottom
        } = img.getBoundingClientRect()
        let vpWidth = document.documentElement.clientWidth
        let vpHeight = document.documentElement.clientHeight
        return (
            (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
            (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }
}