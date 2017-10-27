export class SongList {
    constructor(opts = {}) {
        this.el = opts.el;
        this.data = opts.data;
        this.render()
    }

    render(){
        this.wrap = this.el.querySelector('#list-wrap')
        this.wrap.innerHTML = this.data.map ( data => 
            `<li class="list-item">
                <div class="list-pic">
                    <a href="https://y.qq.com/n/yqq/playlist/${data.id}.html">
                        <img src="${data.image}" alt="#">
                    </a>
                </div>
                <h4 class="list-desc">${data.desc}</h4>
            </li>`
        ).join(``)
    }
}