import { RECOMMEND_URL } from './API.js'
import { Slider } from './slider.js'

export class Recommend {
    constructor(el) {
        this.wrap = el;
        this.getData()
    }

    getData() {
        fetch(RECOMMEND_URL)
            .then(res => res.json())
            .then(json => this.data = json.data)
            .then(() => this.render())
    }
    render() {
        this.sliderRender(this.data.slider)
        this.radioRender(this.data.radioList)
        this.songListRender(this.data.songList)
    }
    sliderRender(data) {
        let url = data.map(slide => ({
            link: slide.linkUrl.replace('http://', 'https://'),
            image: slide.picUrl.replace('http://', 'https://')
        }))

        new Slider({
            el: this.wrap.querySelector('#slider'),
            data: url
        })
    }
    radioRender(data) {
        this.wrap.querySelector('#radio-list').innerHTML = data.map(data =>
            `<li class="list-item">
                <a href="javascript:;" class="listmain">
                    <div class="list-media">
                        <img src=${data.picUrl}>
                        <span></span>
                    </div>
                    <div class="list-desc">
                        <h3 class="list-title">${data.Ftitle}</h3>
                    </div>
                </a>
            </li>`
        ).join(``)
    }

    songListRender(data) {
        this.wrap.querySelector('#list-wrap').innerHTML = data.map ( data => 
            `<li class="list-item">
                <div class="list-media">
                    <a href="https://y.qq.com/n/yqq/playlist/${data.id}.html">
                        <img src="${data.picUrl.replace('http://', 'https://')}" alt="#">
                    </a>
                </div>
                <div class="list-desc">
                <h4 class="list-title">${data.songListDesc}</h4>
                </div>
            </li>`
        ).join(``)
    }
}