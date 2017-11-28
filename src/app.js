import './scss/app.scss';
import { Recommend } from './scripts/recommend.js';
import { TabSwitch } from './scripts/tab.js';
import { Ranking } from './scripts/ranking.js';
import { Search } from './scripts/search.js';
import { Music_player } from './scripts/music_player.js';

window.log = console.log.bind(console)


new TabSwitch({
    tab: document.querySelector('.nav'),
    container: document.querySelector('.container')
})

new Recommend(document.querySelector('#rec-view'))

new Ranking(document.querySelector('#ranking-view'))

new Search ( document.querySelector('#search-view'))


let player = new Music_player ( document.querySelector('#player-view'))

document.querySelector('#player').addEventListener('click',()=>{
    console.log('show the player');
    player.show()
})

let onHashChange = function(e){
    let hash = window.location.hash
    let obj = {}
    let array = /^(#player\?)/.test(hash) ? hash.replace(/^(#player\?)/,'').split('&') : false;
    if(array){
        array.map( (info)=>{
            obj[info.replace(/=.+/,'')] = info.replace(/.+=/,'')
        })
        player.play(obj)
    }else{
        player.hide()
    }

}
window.addEventListener('hashchange' ,onHashChange)





