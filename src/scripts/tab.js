export class TabSwitch {
    constructor(el) {
        this.el = el
        this.init()
        this.bind()
    }

    init() {
        this.tabHeader = this.el.tab[0].querySelectorAll('.nav a');
        this.tabContainer = this.el.container[0].children
    }

    bind() {
        var _this = this
        this.tabHeader.forEach(function (tab) {
            tab.onclick = function (e) {
                var target = e.target
                var idx = Array().indexOf.call(_this.tabHeader, target)
                _this.tabHeader.forEach(function (tabLi) {
                    tabLi.classList.remove('current')
                })

                Array.prototype.forEach.call(_this.tabContainer, function (content) {
                    content.classList.remove('current')
                })
                // _this.tabContainer.forEach(function (content) {
                //     console.log('1')
                //     content.classList.remove('current')
                // })
                target.classList.add('current')
                _this.tabContainer[idx].classList.add('current')
            }
        });
    }


}