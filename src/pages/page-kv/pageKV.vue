<template>
    <div v-if="isShow.isKVShow" class="pg-kv">
        <div class="title-group">
            <div class="t1 ani1"></div>
            <div class="t2 ani2"></div>
            <div class="t3 ani2"></div>
        </div>
        <div class="pg-stu"></div>
        <button class="start" @click="showNext">点击开始</button>
    </div>
</template>

<script>
    export default {
        name: 'PageKV',
        props: {
            isShow: Object,
        },
        data() {
            return {}
        },
        components: {},
        methods: {
            showNext() {
                setTimeout(() => {
                    this.$emit('nextPage', 'isPOShow')
                }, 200)
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

    .pg-kv {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .bg('./img/kv-bg.jpg');
    }

    .title-group {
        position: absolute;
        top: 20vh;
        left: 50%;
        width: 32.5/2rem /* 520/16 */;
        transform: translateX(-50%);
    }

    .t1 {
        width: 31.6875/2rem /* 507/16 */;
        height: 9.875/2rem /* 158/16 */;
        .bg('./img/kv-title1.png');
    }

    .t2 {
        margin: 0.5rem 0;
        width: 32.125/2rem /* 514/16 */;
        height: 3.9375/2rem /* 63/16 */;
        .bg('./img/kv-title2.png');
    }

    .t3 {
        width: 31.8125/2rem /* 509/16 */;
        height: 2.1875/2rem /* 35/16 */;
        .bg('./img/kv-title3.png');
    }

    .pg-stu {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 14vh;
        width: 35.1875/2rem /* 563/16 */;
        height: 18.6875/2rem /* 299/16 */;
        .bg('./img/kv-students.png');
    }

    .start {
        position: absolute;
        left: 50%;
        bottom: 10vh;
        margin-left: -5rem;
        width: 8.75rem /* 140/16 */;
        padding: 4px 14px;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 20px;
        letter-spacing: 2px;
        border: 2px solid #fff;
        border-radius: 40px;
        color: #fff;

        &:active {
            opacity: 0.6;
        }
    }

    @keyframes transLeft {
        from {
            transform: translateX(-20%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .ani1 {
        animation: transLeft 0.8s ease-in;
        animation-fill-mode: both;
    }

    .ani2 {
        animation: transTop 0.8s ease-in 0.6s;
        animation-fill-mode: both;
    }

    @keyframes transTop {
        from {
            transform: translateY(-20%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>
