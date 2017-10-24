export class Slider {
    constructor(options = {}) {
        this.el = options.el;
        this.data = options.data
        this.interval = options.interval || 2500
        this.index = 0
        this.render()
        this.start()
    }

    render() {
        let data = this.data
        this.el.innerHTML = ' <ul class="slider-wrap"> </ul> ';
        this.wrap = this.el.firstElementChild;
        this.wrap.style.width = `${this.data.length * 100}%`;

        this.wrap.innerHTML = data.map(data =>
            `<li class="item">
                    <a href="${data.link}">
                    <img src="${data.image}" alt=""></a>
                </li>`
        ).join(``)
    }

    start() {
        setInterval(this.next.bind(this), this.interval)
    }

    next() {
        if (this.index === (this.data.length - 1)) {
            this.index = 0
        } else(this.index += 1);
        let x = `-${this.index * 100 / this.data.length}%`
        this.wrap.style.transform = `translateX(${x})`
    }
}