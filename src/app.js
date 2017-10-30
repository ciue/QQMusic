import './scss/app.scss';
import { Recommend } from './scripts/recommend.js';
import { TabSwitch } from './scripts/tab.js';
import { Ranking } from './scripts/ranking.js'

new Recommend(document.querySelector('#rec-view'))
new Ranking(document.querySelector('#ranking-view'))
new TabSwitch({
tab: document.querySelector('.rev-view'),
container: document.querySelector('.container')
})








