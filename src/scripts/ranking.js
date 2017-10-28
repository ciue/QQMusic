import { TOPLIST_URL } from './API.js'

export class Ranking {
    constructor( el ) {
        this.el = el
        this.getData()
    }

    getData() {
        fetch(TOPLIST_URL)
            .then(res => res.json())
            .then(json => this.data = json.data.topList)
            .then(() => this.render())
    }

    render() {
        console.log(this.el.querySelector('.ranking-list'))
        this.el.querySelector('.ranking-list').innerHTML = this.data.map ( data => 
            `<li class="ranking-item">
                <div class="main">
                    <a href="#" >
                        <img src="${data.picUrl.replace('http://', 'https://')}" data-url="${data.picUrl.replace('http://', 'https://')}">
                        <span class="count">${(data.listenCount/1000).toFixed(1)}万</span>
                    </a>
                </div>
                <div class="info">
                    <h3>${data.topTitle}</h3>
                    ${this.songName(data.songList)}
                </div>
            </li>`   
        ).join('')
    }

    songName( list ){
        return list.map( (data,i) => 
            `<p>
            <i>${i + 1}</i>
            <span>${data.songname}</span><i>- ${data.singername}</i>
            </p>`
        ).join('')
    }
}