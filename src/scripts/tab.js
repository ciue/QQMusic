export class TabSwitch {
    constructor(opts={}) {
        this.tabHeader = opts.tab.querySelectorAll('.nav a');
        this.tabContainer = opts.container.children
        this.bind()
    }

    bind() {
        var _this = this
        Array.prototype.forEach.call(this.tabHeader, (tab) => {
            tab.onclick = function (e) {
                var target = e.target
                var idx = Array().indexOf.call(_this.tabHeader, target)

                Array.prototype.forEach.call(_this.tabHeader, (tabLi) => {
                    tabLi.classList.remove('current')
                })

                Array.prototype.forEach.call(_this.tabContainer, function (content) {
                    content.classList.remove('current')
                })

                target.classList.add('current')
                _this.tabContainer[idx].classList.add('current')
                window.dispatchEvent(new Event('scroll'))    // 排行榜首屏懒加载    
            }
        })
        // this.tabHeader.forEach(function (tab) {
        //     tab.onclick = function (e) {        
        //         var target = e.target
        //         var idx = Array().indexOf.call(_this.tabHeader, target)
        //         _this.tabHeader.forEach(function (tabLi) {
        //             tabLi.classList.remove('current')
        //         })

        //         Array.prototype.forEach.call(_this.tabContainer, function (content) {
        //             content.classList.remove('current')
        //         })

        //         target.classList.add('current')
        //         _this.tabContainer[idx].classList.add('current')
        //         window.dispatchEvent( new Event('scroll') )    // 排行榜首屏懒加载           
        //     }
        // });
    }
}