<template>
    <div id="music" class="music" @click="toggleMusic">
        <div class="note" :class="isPlay ? 'rotating on' : 'off'"></div>
        <audio :src="musicURL" id="myMusic" preload="preload" loop></audio>
    </div>
</template>

<script>
    export default {
        name: 'MusicPlayer',
        props: {},
        data() {
            return {
                musicURL: require('./bgm.mp3'),
                isPlay: true,
            }
        },
        mounted() {
            this.audioPlay()
        },
        methods: {
            toggleMusic() {
                if (this.isPlay) {
                    this.audioPause()
                } else {
                    this.audioPlay()
                }
                this.isPlay = !this.isPlay
            },
            audioPlay() {
                let audio = document.getElementById('myMusic')
                audio.play()
                document.addEventListener(
                    'WeixinJSBridgeReady',
                    function () {
                        audio.play()
                    },
                    false
                )
            },
            audioPause() {
                let audio = document.getElementById('myMusic')
                audio.pause()
                document.addEventListener(
                    'WeixinJSBridgeReady',
                    function () {
                        audio.pause()
                    },
                    false
                )
            },
        },
    }
</script>

<style lang="less" scoped>
    .music {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        margin-right: 1rem;
        margin-top: 1rem;
        width: 4.375/2rem /* 70/16 */;
        height: 4.375/2rem /* 70/16 */;
        z-index: 10;

        .note {
            width: 4.375/2rem /* 70/16 */;
            height: 4.375/2rem /* 70/16 */;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .on {
            background-image: url(./img/music-on.png);
        }

        .off {
            background-image: url(./img/music-on.png);
            filter: grayscale(80%);
        }

        .rotating {
            animation: rotate-music 2s linear infinite;
        }
    }

    @keyframes rotate-music {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
