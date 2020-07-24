<template>
    <div id="app">
        <loading :isShow="showOrNot" @nextPage="onNextPage"/>
        <page-kv :isShow="showOrNot" @nextPage="onNextPage"/>
        <page-one
                @playAudio="handleAudio"
                :isShow="showOrNot"
                @nextPage="onNextPage"
                @sendImg="handleImg"
        />
        <page-two :isShow="showOrNot" @nextPage="onNextPage" :mySrc="gotSrc"/>
        <music-player/>
        <wx-share
                :shareTitle="title"
                :shareDesc="desc"
                :shareImg="thumbImg"
                :shareLink="link"
        />
        <audio id="audio" :src="audio"></audio>
        <rotate-it/>
    </div>
</template>

<script>
    import Rotate from './components/rotate/Rotate'
    import MusicPlayer from './components/musicplayer/music-player'
    import Loading from './pages/loading/loading'
    import PageKV from './pages/page-kv/pageKV'
    import PageOne from './pages/page-one/pageOne'
    import PageTwo from './pages/page-two/pageTwo'
    import WxShare from './components/wxShare/wxShare'

    export default {
        name: 'app',
        components: {
            Loading,
            'rotate-it': Rotate,
            'music-player': MusicPlayer,
            'page-one': PageOne,
            'page-two': PageTwo,
            'page-kv': PageKV,
            'wx-share': WxShare,
        },
        data() {
            return {
                showOrNot: {
                    isLDShow: true,
                    isKVShow: false,
                    isPOShow: false,
                    isPTShow: false,
                },
                title: '2020北航毕业季云合影',
                desc: '北航毕业的小伙伴们，快来拍张合影吧！',
                thumbImg: require('./assets/thumb.jpg'),
                link: '',
                gotSrc: '',
                audio: require('./assets/kacha.mp3'),
            }
        },
        methods: {
            onNextPage(para) {
                Object.keys(this.showOrNot).map((item) => {
                    this.showOrNot[item] = false
                })
                this.showOrNot[para] = true
            },
            handleImg(msg) {
                this.gotSrc = msg
            },
            handleAudio() {
                this.audioPlay()
            },
            audioPlay() {
                let audio = document.getElementById('audio')
                audio.play()
                document.addEventListener(
                    'WeixinJSBridgeReady',
                    function () {
                        audio.play()
                    },
                    false
                )
            },
        },
    }
</script>

<style>
    @import './assets/reset.less';

    #app {
        width: 100%;
        height: 100%;
        min-width: 320px;
        max-width: 540px;
        -webkit-user-select: none;
        user-select: none;
    }

    canvas {
        width: 100%;
    }
</style>
