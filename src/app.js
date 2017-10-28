import './scss/app.scss';
import { Recommend } from './scripts/recommend.js';
import { TabSwitch } from './scripts/tab.js';
import { Ranking } from './scripts/ranking.js'

new TabSwitch({
    tab: document.querySelectorAll('.rev-view'),
    container: document.querySelectorAll('.container')
})

new Recommend(document.querySelector('#rec-view'))

new Ranking(document.querySelector('#ranking-view'))


