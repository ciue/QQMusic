import { SEARCH_URL } from './API.js'

export class Search {
    constructor(el) {
        this.el = el
        this.input = this.el.querySelector('#input')
        this.songs = this.el.querySelector('.song-list')
        this.cancel = this.el.querySelector('.cancel')
        this.keyWord
        this.page = 1
        this.curpage = 20
        this.nomore = false
        this.isload =false
        window.addEventListener('scroll', this.onscroll.bind(this))
        this.input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.input.addEventListener('click', () => {this.input.select() })
        this.cancel.addEventListener('click', this.reset.bind(this))
    }

    onKeyUp(e) {
        let keyWord = e.target.value.trim()
        this.keyWord =keyWord
        if (!keyWord) return this.reset()
        if (e.key !== 'Enter') return;
        this.search(keyWord)
    }

    onscroll(e) {
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            if (!this.keyWord) return this.reset()            
            this.search(this.keyWord, this.page + 1)
        }
    }

    search(keyWord, page) {
        if (this.isload) return;       
        this.isload = true
        fetch(`${SEARCH_URL}?keyword=${keyWord}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.semantic.curpage
                this.nomore = (json.message === 'no results')
                return json.data
            })
            .then(data => this.render(data))
            .then( () =>this.isload = false)
            .catch(() =>this.isload = false)
    }

    render(data) {
        this.songs.innerHTML += data.song.list.map(song =>{
            let singer = song.singer.map( singer => singer.name);

            return `<li class="song-item">
            <a href="#player?singer=${singer}&songname=${song.songname}&songid=${song.songmid}&lyricid=${song.songid}&albummid=${song.albummid}&duration=${song.interval}">
            <i class="icon"></i>
            <h6 class="song-name">${song.songname}</h6>
            <p class="song-artist">${singer}</p>
            </a>
         </li>`}).join('');
        // this.songs.innerHTML += data.zhida.map(data =>
        //     `<li class="song-singer">
        //     <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${data.singermid}.jpg?max_age=2592000"
        //     <h6 class="song-name">${data.singername}</h6>
        //     <p><span>单曲：${data.songnum}</span><span>专辑：${data.albumnum}</span><p>
        //  </li>`).join('');

    }

    reset() {
        this.page = 1
        this.curpage = 20
        this.songs.innerHTML = ''
        this.input.value = ''
    }
}