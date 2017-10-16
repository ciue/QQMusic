import './scss/app.scss';
import {
    Slider
} from './scripts/slider.js';

new Slider({
    el: document.querySelector('#slider'),
    data: [{
            link: '#',
            img: require('./imgs/1-cyx.jpg')
        },
        {
            link: '#',
            img: require('./imgs/2-xgs.jpg')
        },
        {
            link: '#',
            img: require('./imgs/3-zyx.jpg')
        },
        {
            link: '#',
            img: require('./imgs/4-xgs.jpg')
        },
        {
            link: '#',
            img: require('./imgs/5-zl.jpg')
        },
    ]
})
