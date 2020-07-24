<template>
    <div class="loading" v-if="isShow.isLDShow">
        <div class="progress-bar-wp">
            <div
                    class="progress-plane"
                    :style="`transform: translateX(${planeOffset}rem);`"
            ></div>
            <div class="progress-bar">
                <div class="progress-bar-inner" :style="`width: ${loadingNum}%;`"></div>
            </div>
            <div class="progress-text">{{ loadingNum }}%</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            isShow: Object,
        },
        data() {
            return {
                loadingNum: 0,
                preLoadImg: [
                    {src: require('../../pages/loading/img/ld-bgBottom.png')},
                    {src: require('../../pages/loading/img/ld-bgTop.png')},
                    {src: require('../../pages/loading/img/ld-plane.png')},
                    {src: require('../../pages/page-kv/img/kv-bg.jpg')},
                    {src: require('../../pages/page-kv/img/kv-students.png')},
                    {src: require('../../pages/page-kv/img/kv-title1.png')},
                    {src: require('../../pages/page-kv/img/kv-title2.png')},
                    {src: require('../../pages/page-kv/img/kv-title3.png')},
                    {src: require('../../pages/page-one/img/btn-del.png')},
                    {src: require('../../pages/page-one/img/cloud.png')},
                    {src: require('../../pages/page-one/img/fn-navigation.png')},
                    {src: require('../../pages/page-one/img/icon-f1.png')},
                    {src: require('../../pages/page-one/img/icon-f10.png')},
                    {src: require('../../pages/page-one/img/icon-f2.png')},
                    {src: require('../../pages/page-one/img/icon-f3.png')},
                    {src: require('../../pages/page-one/img/icon-f4.png')},
                    {src: require('../../pages/page-one/img/icon-f5.png')},
                    {src: require('../../pages/page-one/img/icon-f6.png')},
                    {src: require('../../pages/page-one/img/icon-f7.png')},
                    {src: require('../../pages/page-one/img/icon-f8.png')},
                    {src: require('../../pages/page-one/img/icon-f9.png')},
                    {src: require('../../pages/page-one/img/icon-m1.png')},
                    {src: require('../../pages/page-one/img/icon-m10.png')},
                    {src: require('../../pages/page-one/img/icon-m2.png')},
                    {src: require('../../pages/page-one/img/icon-m3.png')},
                    {src: require('../../pages/page-one/img/icon-m4.png')},
                    {src: require('../../pages/page-one/img/icon-m5.png')},
                    {src: require('../../pages/page-one/img/icon-m6.png')},
                    {src: require('../../pages/page-one/img/icon-m7.png')},
                    {src: require('../../pages/page-one/img/icon-m8.png')},
                    {src: require('../../pages/page-one/img/icon-m9.png')},
                    {src: require('../../pages/page-one/img/icon-s1.png')},
                    {src: require('../../pages/page-one/img/icon-s2.png')},
                    {src: require('../../pages/page-one/img/icon-s20.png')},
                    {src: require('../../pages/page-one/img/icon-s21.png')},
                    {src: require('../../pages/page-one/img/icon-s3.png')},
                    {src: require('../../pages/page-one/img/icon-s4.png')},
                    {src: require('../../pages/page-one/img/icon-s5.png')},
                    {src: require('../../pages/page-one/img/icon-s6.png')},
                    {src: require('../../pages/page-one/img/icon-s7.png')},
                    {src: require('../../pages/page-one/img/icon-s8.png')},
                    {src: require('../../pages/page-one/img/icon-s9.png')},
                    {src: require('../../pages/page-one/img/notf-n1.png')},
                    {src: require('../../pages/page-one/img/hf1.png')},
                    {src: require('../../pages/page-one/img/hf2.png')},
                    {src: require('../../pages/page-one/img/hf3.png')},
                    {src: require('../../pages/page-one/img/hf4.png')},
                    {src: require('../../pages/page-one/img/hm1.png')},
                    {src: require('../../pages/page-one/img/hm2.png')},
                    {src: require('../../pages/page-one/img/hm3.png')},
                    {src: require('../../pages/page-one/img/hm4.png')},
                    {src: require('../../pages/page-one/img/pf1.png')},
                    {src: require('../../pages/page-one/img/pf10.png')},
                    {src: require('../../pages/page-one/img/pf2.png')},
                    {src: require('../../pages/page-one/img/pf3.png')},
                    {src: require('../../pages/page-one/img/pf4.png')},
                    {src: require('../../pages/page-one/img/pf5.png')},
                    {src: require('../../pages/page-one/img/pf6.png')},
                    {src: require('../../pages/page-one/img/pf7.png')},
                    {src: require('../../pages/page-one/img/pf8.png')},
                    {src: require('../../pages/page-one/img/pf9.png')},
                    {src: require('../../pages/page-one/img/po-plus.png')},
                    {src: require('../../pages/page-one/img/po-rotate.png')},
                    {src: require('../../pages/page-one/img/po-top.png')},
                    {src: require('../../pages/page-one/img/s1.jpg')},
                    {src: require('../../pages/page-one/img/s2.jpg')},
                    {src: require('../../pages/page-one/img/s3.jpg')},
                    {src: require('../../pages/page-one/img/s4.jpg')},
                    {src: require('../../pages/page-one/img/s5.jpg')},
                    {src: require('../../pages/page-one/img/s6.jpg')},
                    {src: require('../../pages/page-one/img/s7.jpg')},
                    {src: require('../../pages/page-one/img/s8.jpg')},
                    {src: require('../../pages/page-one/img/s9.jpg')},
                    {src: require('../../pages/page-one/img/s10.jpg')},
                    {src: require('../../pages/page-one/img/s11.jpg')},
                    {src: require('../../pages/page-one/img/s12.jpg')},
                    {src: require('../../pages/page-one/img/s13.jpg')},
                    {src: require('../../pages/page-one/img/s14.jpg')},
                    {src: require('../../pages/page-one/img/s15.jpg')},
                    {src: require('../../pages/page-one/img/s16.jpg')},
                    {src: require('../../pages/page-one/img/s17.jpg')},
                    {src: require('../../pages/page-one/img/s18.jpg')},
                    {src: require('../../pages/page-one/img/s19.jpg')},
                    {src: require('../../pages/page-one/img/s20.jpg')},
                    {src: require('../../pages/page-one/img/s21.jpg')},
                    {src: require('../../pages/page-two/img/pg2-plane.png')},
                    {src: require('../../pages/page-two/img/pg2-top.png')},
                    {src: require('../../components/musicplayer/img/music-on.png')},
                    {src: require('../../components/rotate/img/rt-direction.png')},
                    {src: require('../../components/rotate/img/rt-fail.png')},
                    {src: require('../../components/rotate/img/rt-success.png')},
                ],
            }
        },
        methods: {
            generateId(index) {
                return 'mImg' + index
            },
            go() {
                this.$emit('nextPage', 'isKVShow')
            },
            loadNextImg(imgID) {
                const _this = this
                const len = this.preLoadImg.length
                const curSrc = this.preLoadImg[imgID].src
                let curImg = new Image()
                curImg.onload = function () {
                    imgID++
                    _this.loadingNum = parseInt(((imgID / len) * 100).toString())
                    if (imgID < len) {
                        _this.loadNextImg(imgID)
                    } else {
                        _this.go()
                    }
                }
                curImg.src = curSrc
            },
        },
        computed: {
            planeOffset() {
                return 0.16 * this.loadingNum
            },
        },
        mounted() {
            let imgID = 0
            this.loadNextImg(imgID)
        },
    }
</script>

<style lang="less" scoped>
    .bg(@url) {
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(@url);
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        transform-origin: 50% 50%;
        z-index: 2;
        background-color: #fff;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 17.25/2rem /* 276/16 */;
            .bg('./img/ld-bgTop.png');
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 15.125/2rem /* 242/16 */;
            .bg('./img/ld-bgBottom.png');
        }
    }

    .progress-bar-wp {
        position: relative;
        margin-bottom: 14rem;
    }

    .progress-plane {
        width: 6.625/2rem /* 106/16 */;
        height: 2.875/2rem /* 46/16 */;
        .bg('./img/ld-plane.png');
        background-size: contain;
    }

    .progress-bar {
        box-sizing: border-box;
        height: 0.625rem /* 10/16 */;
        width: 37.5/2rem /* 600/16 */;
        border: 1px solid #005b98;
        border-radius: 0.375rem /* 6/16 */;
        margin: 1rem 0 0.5rem;
    }

    .progress-bar-inner {
        height: 100%;
        background-color: #005b98;
        border-radius: 0.25rem /* 4/16 */;
    }

    .progress-text {
        text-align: center;
        color: #005b98;
        font-size: 1rem;
        line-height: 1.4;
    }
</style>
