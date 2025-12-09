var app = new Vue({
        el: '#app',
        data: {
            timeHanlde: null,
            tim: 0,
            
            masterUrls: [
                "https://kl99.info/",
                "https://kl99.ing/",
                "https://kl99.la/",
                "https://kl99.land/",
                "https://kl99.life/",
                "https://kl99.limo/",
                "https://kl99.link/",
                "https://kl99.live/",
                "https://kl99.loan/",
                "https://kl99.love/",
                "https://kl99.me/",
                "https://kl99.meme/",
                "https://kl99.men/",
                "https://kl99.mobi/",
                "https://99kl.mobi/",
                "https://99kl.moda/",
                "https://99kl.news/",
                "https://99kl.online/",
        ],

            urls: [],
            moburls: [], 

            waitingText: "đang kiểm duyệt ",
            connectTimeout: "hết hạn",
            connectFail: '9ms',
            name: 'okking.com/',
            kefuUrl: "https://jo1k9iebnb.ssi7gwlj.com/033def1ddbe37c4jkfle-keli38e81cd5e5774f95b58aa2cc447ecae39b93163469fc1d3a9234c6d43fca27db&chatgroup=3",
            apkAppUrl: 'https://99kl.online/DownloadApp/',
            pcUrl: 'https://99kl.online/DownloadApp/',
        },
        mounted() {
            this.urls = this.getRandomUrls(5);
            this.moburls = this.getRandomUrls(5);

            this.startPingCheck();
        },
        methods: {
            getRandomUrls(count) {
                const shuffled = this.masterUrls.slice().sort(() => 0.5 - Math.random());
                const selectedUrls = shuffled.slice(0, count);


                return selectedUrls.map((url, index) => ({
                    url: url,
                    title: `Link truy cập ${index + 1}`,
                    second: this.waitingText,
                    time: 0
                }));
            },
            

            startPingCheck() {
                this.timeHanlde = setInterval(() => {
                    this.tim++
                }, 100)
                for (let i = 0; i < this.urls.length; i++) {
                    this.send(this.urls[i].url, i, 'urls')
                }
                for (let j = 0; j < this.moburls.length; j++) {
                    this.send(this.moburls[j].url, j, 'moburls');
                }
                setTimeout(() => {
                    this.sortList(this.urls);
                    this.sortList(this.moburls);
                }, 1000)
            },

            refresh() {
                this.tim = 0
                clearInterval(this.timeHanlde)
                
 
                this.urls = this.getRandomUrls(5);
                this.moburls = this.getRandomUrls(5);
                
                this.startPingCheck();
            },
            
  
            sortOrder(filed, type = 'asc') {
                return (a, b) => {
                    if (type === 'asc') return a[filed] > b[filed] ? 1 : -1;
                    return a[filed] > b[filed] ? -1 : 1;
                }
            },
            sortList() {
                this.urls.sort(this.sortOrder('time', 'asc'))
                this.moburls.sort(this.sortOrder('time', 'asc'))
            },
            send(url, index, listName) { 
                const _this = this
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'jsonp',
                    timeout: 1000,
                    complete: function (res) {
                        const targetList = _this[listName];                         
                        if (res.status == 200) {
                            if (_this.tim > 5000) {
                                targetList[index].second = _this.connectTimeout;
                            }
                            else {
                                targetList[index].second = _this.tim + 'ms';
                            }
                            targetList[index].time = _this.tim;
                        }
                        else {
                            targetList[index].second = _this.connectFail;
                            targetList[index].time = 999999;
                        }
                    },
                })
            },
            
            down() {
                if (this.browserDetection() == 'PC') {
                    window.location.href = this.pcUrl;
                } else {
                    if (this.browserDetection() == 'iphone' || this.browserDetection() == 'ipad') {
                        window.location.href = this.ios_step_1
                        setTimeout(() => {
                            window.location.href = this.ios_step_2
                        }, 2000)
                    } else {
                        window.location.href = this.apkAppUrl;
                    }
                }
            },
            browserDetection() {
                var userAgent = window.navigator.userAgent.toLowerCase();
                var browser = null;
                if (userAgent.match(/ipad/i)) {
                    browser = 'ipad';
                } else if (userAgent.match(/iphone os/i)) {
                    browser = 'iphone';
                } else if (userAgent.match(/midp/i)) {
                    browser = 'midp'
                } else if (userAgent.match(/rv:1.2.3.4/i)) {
                    browser = 'rv:1.2.3.4';
                } else if (userAgent.match(/ucweb/i)) {
                    browser = 'ucweb';
                } else if (userAgent.match(/android/i)) {
                    browser = 'android';
                } else if (userAgent.match(/windows ce/i)) {
                    browser = 'windowsCe';
                } else if (userAgent.match(/windows mobile/i)) {
                    browser = 'windowsMobile';
                } else {
                    browser = 'PC'
                }
                return browser;
            }
        }
    })
    document.addEventListener("DOMContentLoaded", function () {
        const txtElements = document.querySelectorAll(".txt");

        function updateRandomPing() {
            txtElements.forEach(element => {
                const randomPing = Math.floor(Math.random() * 10 + 1) + "ms";
                element.textContent = randomPing;
            });
        }

        updateRandomPing();

        setTimeout(() => {
            setInterval(updateRandomPing, 1000);
        }, 1000);
    });