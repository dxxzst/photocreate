<template>
    <div v-if="isShow.isPTShow" class="pg2">
        <div class="slogan-wp">
            <div class="plane"></div>
            <p>德才兼备 知行合一</p>
        </div>
        <div class="img-wp">
            <img :src="mySrc" alt=""/>
        </div>
        <p class="notice shineIt">&lt;长按图片保存海报&gt;</p>
        <div class="btn-group">
            <button class="btn btn-l" @click="replay">再拍一次</button>
            <!-- <button class="btn btn-r" @click="showMask">召唤同学</button> -->
        </div>
        <div class="mask" v-show="isMask" @click="hideMask">
            <div class="mask-img"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageTwo',
        props: {
            isShow: Object,
            mySrc: String,
        },
        data() {
            return {
                //
                isMask: false,
            }
        },
        methods: {
            showNext() {
                //
            },
            replay() {
                window.location.href = 'https://jiandoukeji.com/h5/2020/graduation'
            },
            showMask() {
                this.isMask = true
            },
            hideMask() {
                this.isMask = false
            },
        },
    }
</script>

<style lang="less" scoped>
    .bg(@url) {
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(@url);
    }

    .pg2 {
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
            .bg('../loading/img/ld-bgTop.png');
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 15.125/2rem /* 242/16 */;
            .bg('../loading/img/ld-bgBottom.png');
        }
    }

    .slogan-wp {
        position: relative;
        margin: 1rem 0;

        .plane {
            position: absolute;
            left: -4rem;
            top: -9rem;
            width: 24.5625/2rem /* 393/16 */;
            height: 18.75/2rem /* 300/16 */;
            .bg('./img/pg2-plane.png');
        }

        p {
            color: #005b98;
            font-size: 1.25rem /* 20/16 */;
            letter-spacing: 6px;
        }
    }

    .btn {
        padding: 8px 20px;
        outline: none;
        border: none;
        background-color: #005b98;
        border-radius: 20px;
        color: #fff;
        font-size: 1rem;
        letter-spacing: 2px;

        &:active {
            opacity: 0.6;
        }
    }

    .btn-l {
        // margin-right: 2rem;
        padding: 8px 30px;
    }

    .img-wp {
        margin: 1rem 0 1rem;
        box-shadow: 0 0 10px rgba(50, 50, 50, 0.3);

        img {
            width: 100%;
        }
    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(50, 50, 50, 0.8);
        z-index: 12;
    }

    .mask-img {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 35.25/2rem /* 564/16 */;
        height: 35.75/2rem /* 572/16 */;
        .bg('./img/pg2-top.png');
    }

    .notice {
        margin: 1rem 0 1.5rem;
        font-size: 0.875rem /* 14/16 */;
        color: #999;
        letter-spacing: 2px;
    }

    .shineIt {
        animation: shine 1.6s ease-in-out infinite;
    }

    @keyframes shine {
        0%,
        100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
</style>
