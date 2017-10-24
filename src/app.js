import './scss/app.scss';
import { Recommend } from './scripts/recommend.js';
import { TabSwitch } from './scripts/tab.js';

new TabSwitch({
    tab: document.querySelectorAll('.rev-view'),
    container: document.querySelectorAll('.container')
})

new Recommend(document.querySelector('#rec-view'))
