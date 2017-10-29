export class LazyLoad {
    constructor(el) {
        this.el = el
        window.addEventListener('scroll', () => {
            this.checkShow()
        })
    }
    // TODO  throttle

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
        let {top,left,right,bottom} = img.getBoundingClientRect()
        let vpWidth = document.documentElement.clientWidth
        let vpHeight = document.documentElement.clientHeight
        return (
            (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
            (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }
}