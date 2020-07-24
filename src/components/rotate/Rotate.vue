<template>
    <div id="orientLayer" v-show="orientState">
        <div class="rt-wp">
            <div class="phone">
                <div class="rt-fail RF"></div>
                <div class="rt-success RS"></div>
                <div class="rt-direction direction"></div>
            </div>
            <span class="text">请旋转屏幕，竖屏观看</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Rotate',
        data() {
            return {
                orientState: false,
            }
        },
        mounted() {
            // 判断横屏竖屏
            function tiao() {
                // var _w = $(window).width()
                // var _h = $(window).height()
                // console.log(_w,_h)
                // $('.swiper').css({'width': _w + 'px', 'height': _h + 'px'})
            }

            let _this = this

            function orientationChange() {
                switch (window.orientation) {
                    case -90:
                    case 90:
                        _this.orientState = true
                        break
                    case 0:
                    case 180:
                        _this.orientState = false
                        setTimeout(function () {
                            tiao()
                        }, 200)

                        break
                }
            }

            window.onorientationchange = orientationChange
        },
    }
</script>

<style scoped lang="less">
    *::-webkit-scrollbar {
        display: none;
    }

    #orientLayer {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.96);
        background-size: 100% 100%;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bg() {
        background-size: cover;
        background-repeat: no-repeat;
    }

    .rt-wp {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .phone {
        position: relative;
        width: 5rem /* 80/16 */;
        height: 5rem /* 80/16 */;
    }

    .rt-fail {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -4.625/4rem /* 74/16 */;
        margin-left: -7.875/4rem /* 126/16 */;
        width: 7.875/2rem /* 126/16 */;
        height: 4.625/2rem /* 74/16 */;
        .bg();
        background-image: url('./img/rt-fail.png');
    }

    .rt-success {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -7.875/4rem /* 126/16 */;
        margin-left: -4.625/4rem /* 74/16 */;
        width: 4.625/2rem /* 74/16 */;
        height: 7.875/2rem /* 126/16 */;
        .bg();
        background-image: url('./img/rt-success.png');
    }

    .rt-direction {
        position: absolute;
        left: 20%;
        top: -2%;
        width: 2.1875/2rem /* 35/16 */;
        height: 2.125/2rem /* 34/16 */;
        .bg();
        background-image: url('./img/rt-direction.png');
    }

    .text {
        margin-top: 1.25rem /* 20/16 */;
        text-align: center;
        color: #eee;
        font-size: 0.825rem;
    }

    .direction {
        transform-origin: center;
        animation: direction 2s linear infinite;
        animation-fill-mode: both;
    }

    @keyframes direction {
        0%,
        20% {
            opacity: 0;
        }
        22%,
        40% {
            opacity: 1;
        }
        42%,
        100% {
            opacity: 0;
        }
    }

    .RF {
        transform-origin: center;
        animation: RF 2s linear infinite;
        animation-fill-mode: both;
    }

    @keyframes RF {
        0%,
        45% {
            opacity: 1;
            transform: rotate(0);
        }
        46%,
        50% {
            opacity: 1;
            transform: rotate(90deg);
        }
        51%,
        100% {
            opacity: 0;
        }
    }

    .RS {
        transform-origin: center;
        animation: RS 2s linear infinite;
        animation-fill-mode: both;
    }

    @keyframes RS {
        0%,
        50% {
            opacity: 0;
        }
        52%,
        100% {
            opacity: 1;
        }
    }
</style>
