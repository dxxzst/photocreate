<template>
    <div id="wxshare"></div>
</template>

<script>
    import wx from 'wx-jssdk-common'
    import qs from 'qs'

    export default {
        name: 'WxShare',
        props: {
            shareTitle: String,
            shareDesc: String,
            shareImg: String,
            shareLink: String,
        },
        mounted() {
            this.shareThis()
        },
        methods: {
            shareThis() {
                const URL = 'https://photo.buaa.edu.cn/codes/2020/touxiangfg/game.php/Home/Share/JDOU_shareWx';
                const currentUrl = "https://photo.buaa.edu.cn/"; //window.location.href
                const data = {url: currentUrl}
                this.postData(URL, qs.stringify(data))
                    .then((data) => {
                        const {appId, timestamp, nonceStr, signature} = data
                        wx.config({
                            debug: false,
                            appId,
                            timestamp,
                            nonceStr,
                            signature,
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                            ],
                        })
                        this.wxReady()
                    })
                    /* eslint-disable-next-line */
                    .catch(error => console.error(error));
            },
            postData(url = '', data = {}) {
                return fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: data,
                }).then((response) => response.json())
            },
            wxReady() {
                wx.ready(() => {
                    let appMessageShareData = {
                        title: this.shareTitle,
                        desc: this.shareDesc,
                        link: this.shareLink,
                        imgUrl: this.shareImg,
                    }
                    wx.onMenuShareAppMessage(appMessageShareData)
                    wx.onMenuShareTimeline(appMessageShareData)
                })
                wx.error((res) => {
                    /* eslint-disable-next-line */
                    console.log(res.errMsg);
                })
            },
        },
    }
</script>
