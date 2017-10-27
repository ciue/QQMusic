import { RECOMMEND_URL } from './API.js'
import { Slider } from './slider.js'
import { SongList } from './songList.js'

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
        var radioList = this.wrap.querySelector('#radio-list')
        radioList.innerHTML = data.map(data =>
            `<li class="list-main">
                <a href="javascript:;" class="listmain">
                    <div class="list-media">
                        <img src=${data.picUrl}>
                        <span></span>
                    </div>
                    <div class="list-info">
                        <h3>${data.Ftitle}</h3>
                    </div>
                </a>
            </li>`
        ).join(``)
    }

    songListRender(data) {
        let url = data.map( list => ({
            desc: list.songListDesc,
            image: list.picUrl.replace('http://', 'https://'),
            id: list.id
        }))
        new SongList({
            el: this.wrap.querySelector('#song-list'),
            data: url
        })
    }
}