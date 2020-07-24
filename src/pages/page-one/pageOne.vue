<template>
    <div v-show="isShow.isPOShow" class="po">
        <section ref="canvas" id="canvas-container"></section>
        <section class="po-controller" ref="controller">
            <img
                    crossOrigin="anonymous"
                    ref="temp"
                    :src="mySrc"
                    id="tempImg"
                    alt=""
            />
            <nav class="po-nav">
                <ul class="po-nav-tab" @click="navSelect">
                    <li
                            class="po-nav-tab-item"
                            :class="selectedNum === 1 ? 'po-nav-tab-item__selected' : 0"
                            data-id="1"
                    >
                        场景
                    </li>
                    <li
                            class="po-nav-tab-item"
                            :class="selectedNum === 2 ? 'po-nav-tab-item__selected' : 0"
                            data-id="2"
                    >
                        女生
                    </li>
                    <li
                            class="po-nav-tab-item"
                            :class="selectedNum === 3 ? 'po-nav-tab-item__selected' : 0"
                            data-id="3"
                    >
                        男生
                    </li>
                    <li
                            class="po-nav-tab-item"
                            :class="selectedNum === 4 ? 'po-nav-tab-item__selected' : 0"
                            data-id="4"
                    >
                        寄语
                    </li>
                </ul>
            </nav>
            <div class="po-contents">
                <div
                        class="po-content-wp"
                        @click="handleSelect"
                        :style="`height: ${getHeight()}px`"
                >
                    <ul
                            class="po-content-a-list"
                            :class="selectedNum === 1 ? '' : 'hideContent'"
                    >
                        <li
                                class="po-content-a-item"
                                :data-index="item.no"
                                v-for="item in envData"
                                :key="item.no"
                        >
                            <img :src="item.src" alt=""/>
                            <span class="po-item-text">{{ item.txt }}</span>
                        </li>
                    </ul>
                    <ul
                            class="po-content-b-list"
                            :class="selectedNum === 2 ? '' : 'hideContent'"
                    >
                        <li
                                class="po-content-b-item"
                                :data-index="item.no"
                                v-for="item in girlData"
                                :key="item.no"
                        >
                            <img :src="item.src" alt=""/>
                            <span class="po-item-text">{{ item.txt }}</span>
                        </li>
                    </ul>
                    <ul
                            class="po-content-b-list"
                            :class="selectedNum === 3 ? '' : 'hideContent'"
                    >
                        <li
                                class="po-content-b-item"
                                :data-index="item.no"
                                v-for="item in boyData"
                                :key="item.no"
                        >
                            <img :src="item.src" alt=""/>
                            <span class="po-item-text">{{ item.txt }}</span>
                        </li>
                    </ul>
                    <ul
                            class="po-content-d-list"
                            :class="selectedNum === 4 ? '' : 'hideContent'"
                    >
                        <li
                                class="po-content-d-item"
                                :data-index="item.no"
                                v-for="item in txtData"
                                :key="item.no"
                                :class="item.no == textSelected ? 'text-active' : ''"
                        >
                            <span class="po-item-text">{{ item.txt }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="po-preview" @click="showNext"></div>
        </section>
        <div class="cloud-wp" v-show="isNotice">
            <div class="cloud">{{ noticeTxt }}</div>
        </div>
        <div class="loading-wp" v-show="isLoading">
            <div class="ld-inner">
                <div class="ld-img"></div>
                <p>加载中...</p>
            </div>
        </div>
        <div class="notf" v-show="isNotf">
            <div class="notf-img"></div>
            <p>点击加号，添加人脸</p>
        </div>
        <div class="input-wp">
            <input ref="input" id="input" type="file" accept="image/*"/>
        </div>
        <div :class="isFlix ? 'flix' : ''"></div>
    </div>
</template>

<script>
    import * as PIXI from 'pixi.js'
    import {envData, girlData, boyData, txtData} from './contentData'
    import {startMerge} from './mergeAPI.js'
    import EXIF from 'exif-js'

    const Application = PIXI.Application
    const Sprite = PIXI.Sprite

    export default {
        name: 'PageOne',
        props: {
            isShow: Object,
        },
        data() {
            return {
                envData,
                girlData,
                boyData,
                txtData,
                mySrc: '',
                isFlix: false,
                isNotice: false,
                isLoading: false,
                isNotf: false,
                clicked: false,
                noticeTxt: '',
                mergedSrc: null,
                selectedNum: 1,
                textSelected: 41,
                qr: require('./img/qr.jpg'),
                cap1: require('./img/cap1.png'),
                cap2: require('./img/cap2.png'),
                cap3: require('./img/cap3.png'),
                btnDel: require('./img/btn-del.png'),
                btnPlus: require('./img/po-plus.png'),
                hf1: require('./img/hf1.png'),
                hf2: require('./img/hf2.png'),
                hf3: require('./img/hf3.png'),
                hf4: require('./img/hf4.png'),
                hm1: require('./img/hm1.png'),
                hm2: require('./img/hm2.png'),
                hm3: require('./img/hm3.png'),
                hm4: require('./img/hm4.png'),
                text: require('./img/po-txt.jpg'),
                bg11: require('./img/s1.jpg'),
                bg12: require('./img/s2.jpg'),
                bg13: require('./img/s3.jpg'),
                bg14: require('./img/s4.jpg'),
                bg15: require('./img/s5.jpg'),
                bg16: require('./img/s6.jpg'),
                bg17: require('./img/s7.jpg'),
                bg18: require('./img/s8.jpg'),
                bg19: require('./img/s9.jpg'),
                bg110: require('./img/s10.jpg'),
                bg111: require('./img/s11.jpg'),
                bg112: require('./img/s12.jpg'),
                bg113: require('./img/s13.jpg'),
                bg114: require('./img/s14.jpg'),
                bg115: require('./img/s15.jpg'),
                bg116: require('./img/s16.jpg'),
                bg117: require('./img/s17.jpg'),
                bg118: require('./img/s18.jpg'),
                bg119: require('./img/s19.jpg'),
                bg120: require('./img/s20.jpg'),
                bg121: require('./img/s21.jpg'),
                ele21: require('./img/pf1.png'),
                ele22: require('./img/pf2.png'),
                ele23: require('./img/pf3.png'),
                ele24: require('./img/pf4.png'),
                ele25: require('./img/pf5.png'),
                ele26: require('./img/pf6.png'),
                ele27: require('./img/pf7.png'),
                ele28: require('./img/pf8.png'),
                ele29: require('./img/pf9.png'),
                ele210: require('./img/pf10.png'),
                ele31: require('./img/pm1.png'),
                ele32: require('./img/pm2.png'),
                ele33: require('./img/pm3.png'),
                ele34: require('./img/pm4.png'),
                ele35: require('./img/pm5.png'),
                ele36: require('./img/pm6.png'),
                ele37: require('./img/pm7.png'),
                ele38: require('./img/pm8.png'),
                ele39: require('./img/pm9.png'),
                ele310: require('./img/pm10.png'),
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            showNext() {
                const stuCount = this.app.stage.children.slice(2).length
                if (stuCount <= 1) {
                    const txt = '请先添加人物！'
                    this.showToast(txt)
                } else {
                    setTimeout(() => {
                        this.$emit('nextPage', 'isPTShow')
                    }, 500)
                    this.isFlix = true
                    this.$emit('playAudio')
                    this.genImg()
                }
            },
            navSelect(evt) {
                const ele = document.querySelector('.po-content-wp')
                ele.scrollTo(0, 0)
                let target = evt.target
                while (target.tagName !== 'LI') {
                    target = target.parentNode
                }
                const num = target.dataset.id
                this.selectedNum = parseInt(num)
            },
            handleSelect(evt) {
                let target = evt.target
                while (target.tagName !== 'LI') {
                    target = target.parentNode
                }
                const idx = target.dataset.index
                if (/^1\d+/.test(idx)) {
                    this.changeScene(idx)
                } else if (/^2|3\d+/.test(idx)) {
                    if (!this.clicked) {
                        this.showNotf()
                        this.clicked = true
                    }
                    this.addEle(idx)
                } else {
                    this.addSlogan(idx)
                }
            },
            getHeight() {
                const winH = window.innerHeight
                const winW = window.innerWidth
                return winH - winW - 50
            },
            genImg() {
                this.clearOutline()
                const qrSpr = Sprite.from(this.qr)
                qrSpr.width = 80
                qrSpr.height = 80
                qrSpr.anchor.set(0.5, 0.5)
                qrSpr.position.set(658, 569)
                qrSpr.name = 'qr'

                const text = new PIXI.Text('扫描制作祝福卡', {
                    fontFamily: 'Arial',
                    fontSize: 10,
                    fill: 0x005a83,
                })
                text.anchor.set(0.5, 0.5)
                text.position.set(658, 613)
                this.app.stage.addChild(qrSpr)
                this.app.stage.addChild(text)

                setTimeout(() => {
                    this.mergedSrc = this.app.renderer.plugins.extract.base64(
                        this.app.stage
                    )
                }, 100)
                setTimeout(() => {
                    this.$emit('sendImg', this.mergedSrc)
                }, 200)
            },
            showToast(txt) {
                this.isNotice = true
                this.noticeTxt = txt
                setTimeout(() => {
                    this.isNotice = false
                }, 1500)
            },
            showNotf() {
                this.isNotf = true
                setTimeout(() => {
                    this.isNotf = false
                }, 1500)
            },
            init() {
                const app = new Application({
                    width: 750,
                    height: 656,
                    antialias: true,
                    // transparent: true,
                    backgroundColor: 0xffffff,
                    resolution: 1,
                })
                this.app = app
                const myCanvas = this.$refs.canvas
                myCanvas.appendChild(app.view)

                const bgSpr = Sprite.from(this.bg11)
                bgSpr.width = 750
                bgSpr.height = 500
                bgSpr.position.set(0, 0)
                bgSpr.name = 'bg'
                bgSpr.interactive = true

                bgSpr.on('tap', () => {
                    this.clearOutline()
                })
                app.stage.addChild(bgSpr)
                const text = Sprite.from(this.text)
                text.anchor.set(0, 1)
                text.position.set(0, 656)
                app.stage.addChild(text)
                this.addSlogan('41')
            },
            changeScene(num) {
                const bgSpr = Sprite.from(this[`bg${num}`])
                bgSpr.width = 750
                bgSpr.height = 500
                bgSpr.position.set(0, 0)
                bgSpr.name = 'bg'
                bgSpr.interactive = true
                bgSpr.on('tap', () => {
                    this.clearOutline()
                })
                this.app.stage.removeChildAt(0)
                this.app.stage.addChild(bgSpr)
                this.app.stage.setChildIndex(bgSpr, 0)
            },
            addEle(name) {
                this.clearOutline()
                // 获取当前人物个数
                const stuCount = this.app.stage.children.slice(2).length
                if (stuCount > 6) {
                    const txt = '合影最多只能上传6人哦！'
                    this.showToast(txt)
                } else {
                    const givenName = name + Math.random().toString(36).substring(7)
                    const originalPos = this.setOriginalPos()
                    const w = 86
                    const h = 291
                    const container = new PIXI.Container()
                    container.x = originalPos.x
                    container.y = originalPos.y
                    container.interactive = true
                    container.name = givenName
                    this.targetName = givenName

                    const eleSpr = Sprite.from(this[`ele${name}`])
                    eleSpr.width = w
                    eleSpr.height = h
                    eleSpr.anchor.set(0.5, 0.5)
                    eleSpr.name = `${name}Spr`

                    container.addChild(eleSpr)
                    // container.addChild(faceSpr)
                    this.addController(container, w, h, name)
                    this.app.stage.addChild(container)
                }
            },
            addSlogan(para) {
                const curSlogan = this.app.stage.getChildByName('slogan')
                if (curSlogan) {
                    this.app.stage.removeChild(curSlogan)
                }
                this.textSelected = para
                const myText = this.txtData.filter((item) => item.no == para)
                let text = new PIXI.Text(myText[0].txt, {
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fill: 0x7f7f7f,
                    fontWeight: 'bolder',
                })
                text.position.set(176, 544)
                text.name = 'slogan'
                this.app.stage.addChild(text)
                this.app.stage.setChildIndex(text, 2)
            },
            setOriginalPos() {
                const random = Math.random() * 40
                const posX = 375 + random
                const posY = 250 + random
                return {
                    x: posX,
                    y: posY,
                }
            },
            addController(sprController, sprWidth, sprHeight, name) {
                // console.log(name)
                const gen = name.slice(0, 1)
                const num = name.slice(1)
                // 添加清除按钮
                const crossSpr = Sprite.from(this.btnDel)
                crossSpr.width = 40
                crossSpr.height = 40
                crossSpr.anchor.set(0.5, 0.5)
                crossSpr.position.set(sprWidth / 2 + 10, -sprHeight / 2 - 10)
                crossSpr.interactive = true
                crossSpr.name = 'crossBtn'

                // 添加➕按钮
                // const plusSpr = Sprite.from(this.btnPlus)
                // plusSpr.width = 20
                // plusSpr.height = 20
                // plusSpr.anchor.set(0.5, 0.5)
                // plusSpr.position.set(3, -96)
                // plusSpr.interactive = true
                // plusSpr.name = 'plusBtn'

                // plusSpr.on('tap', () => {
                //   this.controller = sprController
                //   this.uploadImg(name)
                // })
                // 添加 head
                let head
                if (gen == 2) {
                    if (num == 1) {
                        head = this.hf1
                    } else if (num >= 2 && num < 5) {
                        head = this.hf2
                    } else if (num >= 5 && num < 8) {
                        head = this.hf3
                    } else {
                        head = this.hf4
                    }
                } else {
                    if (num == 1) {
                        head = this.hm1
                    } else if (num >= 2 && num < 5) {
                        head = this.hm2
                    } else if (num >= 5 && num < 8) {
                        head = this.hm3
                    } else {
                        head = this.hm4
                    }
                }

                const plusSpr = Sprite.from(head)
                plusSpr.anchor.set(0.5, 0.5)
                plusSpr.position.set(0, -110)
                plusSpr.interactive = true
                plusSpr.name = 'plusBtn'

                plusSpr.on('tap', () => {
                    this.controller = sprController
                    this.uploadImg(name)
                })

                // 添加轮廓线
                const borderLine = new PIXI.Graphics()
                borderLine.lineStyle(2, 0xbfd7e3)
                borderLine.drawRoundedRect(
                    -sprWidth / 2 - 10,
                    -sprHeight / 2 - 10,
                    sprWidth + 20,
                    sprHeight + 20,
                    10
                )
                borderLine.endFill()

                // 添加隐藏操作
                crossSpr.on('tap', () => {
                    sprController.parent.removeChild(sprController)
                })

                // 添加容器移动操作
                sprController.on('touchstart', (evt) => {
                    this.targetName = evt.target.name
                    this.isDrag = true
                    if (this.targetName !== 'crossBtn' && this.targetName !== 'plusBtn') {
                        // this.clearOutline()
                        const curContainer = this.getSelectedContainer(this.targetName)
                        if (curContainer !== undefined) {
                            const len = this.app.stage.children.length - 1
                            this.app.stage.setChildIndex(curContainer, len)
                        }
                    }
                })

                sprController.on('touchmove', (evt) => {
                    const posX = evt.data.global.x
                    const posY = evt.data.global.y
                    if (this.targetName !== 'crossBtn' && this.isDrag) {
                        const curContainer = this.getSelectedContainer(this.targetName)

                        const leftZone = curContainer.width / 2
                        const upZone = curContainer.height / 2

                        if (posX < leftZone) {
                            curContainer.x = leftZone
                        } else if (posX > 750 - leftZone) {
                            curContainer.x = 750 - leftZone
                        } else {
                            curContainer.x = posX
                        }

                        if (posY < upZone) {
                            curContainer.y = upZone
                        } else if (posY > 500 - upZone) {
                            curContainer.y = 500 - upZone
                        } else {
                            curContainer.y = posY
                        }
                    }
                })

                sprController.on('touchend', () => {
                    this.isDrag = false
                })
                sprController.on('touchendoutside', () => {
                    this.isDrag = false
                })

                sprController.addChild(borderLine)
                sprController.addChild(crossSpr)
                sprController.addChild(plusSpr)
                sprController.scale.set(1.1, 1.1)
            },
            getSelectedContainer(name) {
                this.clearOutline()
                const curContainer = this.app.stage.getChildByName(name)
                const innerLen = curContainer.children.length
                const lastIdx = innerLen - 1
                if (innerLen === 4) {
                    curContainer.children[lastIdx].visible = true
                    curContainer.children[lastIdx - 1].visible = true
                    curContainer.children[lastIdx - 2].visible = true
                } else {
                    curContainer.children[lastIdx].visible = true
                    curContainer.children[lastIdx - 3].visible = true
                    curContainer.children[lastIdx - 2].visible = true
                }
                return curContainer
            },
            clearOutline() {
                const children = this.app.stage.children
                const modifiedChildren = children.slice(3)
                const len = modifiedChildren.length
                for (let i = 0; i < len; i++) {
                    const innerLen = modifiedChildren[i].children.length
                    const lastChildIndex = innerLen - 1
                    if (innerLen === 4) {
                        modifiedChildren[i].children[lastChildIndex - 2].visible = false
                        modifiedChildren[i].children[lastChildIndex - 1].visible = false
                    } else {
                        modifiedChildren[i].children[lastChildIndex - 2].visible = false
                        modifiedChildren[i].children[lastChildIndex - 3].visible = false
                    }
                }
            },
            compressImg(imgSrc, idx) {
                const img = new Image()
                const _this = this
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                img.src = imgSrc
                img.onload = function () {
                    // 图片原始尺寸
                    let orientation = ''
                    let originWidth = img.width
                    let originHeight = img.height
                    // 最大尺寸限制
                    let maxWidth = 500
                    let maxHeight = 500
                    // 目标尺寸
                    // 图片尺寸超过1000x1000的限制
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            img.width = maxWidth
                            img.height = Math.round(maxWidth * (originHeight / originWidth))
                        } else {
                            img.height = maxHeight
                            img.width = Math.round(maxHeight * (originWidth / originHeight))
                        }
                    }
                    // canvas对图片进行缩放
                    canvas.width = img.width
                    canvas.height = img.height
                    // 清除画布
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    EXIF.getData(img, function () {
                        orientation = EXIF.getTag(this, 'Orientation')
                        // console.log(orientation)
                        switch (Number(orientation)) {
                            case 2:
                                ctx.translate(img.width, 0)
                                ctx.scale(-1, 1)
                                ctx.drawImage(img, 0, 0, img.width, img.height)
                                break
                            case 3:
                                ctx.rotate((180 * Math.PI) / 180)
                                ctx.drawImage(img, -img.width, -img.height, img.width, img.height)
                                break
                            case 4:
                                ctx.translate(img.width, 0)
                                ctx.scale(-1, 1)
                                ctx.rotate((180 * Math.PI) / 180)
                                ctx.drawImage(img, -img.width, -img.height, img.width, img.height)
                                break
                            case 5:
                                ctx.translate(img.width, 0)
                                ctx.scale(-1, 1)
                                ctx.rotate((90 * Math.PI) / 180)
                                ctx.drawImage(img, 0, -img.width, img.height, img.width)
                                break
                            // case 6:
                            //   canvas.width = img.height
                            //   canvas.height = img.width
                            //   ctx.rotate((90 * Math.PI) / 180)
                            //   ctx.drawImage(img, 0, 0, img.width, -img.height)
                            //   break
                            case 7:
                                ctx.translate(img.width, 0)
                                ctx.scale(-1, 1)
                                ctx.rotate((270 * Math.PI) / 180)
                                ctx.drawImage(img, -img.height, 0, img.height, img.width)
                                break
                            // case 8:
                            //   ctx.rotate((270 * Math.PI) / 180)
                            //   ctx.drawImage(img, -img.height, 0, img.height, img.width)
                            //   break
                            case 8:
                                // console.log("旋转270°");
                                canvas.height = img.width
                                canvas.width = img.height
                                ctx.rotate(-Math.PI / 2)
                                ctx.translate(-img.width, 0)
                                ctx.drawImage(img, 0, 0, img.width, img.height)
                                break
                            default:
                                ctx.drawImage(img, 0, 0, img.width, img.height)
                                break
                        }
                    })
                    const base64Image = canvas.toDataURL('image/jpg', 0.2)
                    startMerge(base64Image)
                        .then((res) => _this.addFace(res, idx))
                        .catch((e) => {
                            console.error(e)
                            _this.showToast('没识别到人脸哦~请上传一张正面照吧~')
                            _this.isLoading = false
                        })
                }
            },
            uploadImg(idx) {
                const inputEle = this.$refs.input
                inputEle.click()
                const _this = this

                inputEle.onchange = function () {
                    _this.isLoading = true
                    const reader = new FileReader()
                    reader.readAsDataURL(inputEle.files[0])
                    reader.onload = function (evt) {
                        const base64Image = evt.target.result
                        _this.compressImg(base64Image, idx)
                    }
                }
            },
            addFace(data, idx) {
                const num = +idx.slice(1)
                let myCap
                if (num >= 2 && num < 5) {
                    myCap = this.cap3
                } else if (num >= 5 && num < 8) {
                    myCap = this.cap2
                } else if (num >= 8 && num <= 10) {
                    myCap = this.cap1
                } else {
                    myCap = ''
                }
                const _this = this
                const {Data, base64, faceinfo} = data
                const {top, left, width, height} = faceinfo.faces[0].face_rectangle
                const {Width, Height} = Data.Elements[0]
                const modHeight = top + height / 2
                const modWidth = left + width / 2
                // console.log({
                //   top,
                //   left,
                //   width,
                //   height,
                // })
                // console.log({
                //   Width,
                //   Height,
                // })
                const offsetHeight = Height / 2 - modHeight
                const offsetWidth = Width / 2 - modWidth
                const faceSpr = Sprite.from(base64)
                const scale = 45 / width
                // console.log(`scale: ${scale}`)
                faceSpr.width = Math.round(Width * scale)
                faceSpr.height = Math.round(Height * scale)
                faceSpr.anchor.set(0.5, 0.5)
                // console.log({
                //   offsetWidth,
                //   offsetHeight,
                // })
                faceSpr.position.set(-2 + offsetWidth * scale, -92 + offsetHeight * scale)
                faceSpr.name = 'face'

                let capSpr
                if (num != 1) {
                    capSpr = Sprite.from(myCap)
                    capSpr.width = 90
                    capSpr.height = 95
                    capSpr.anchor.set(0.5, 0.5)

                    if (offsetHeight > 0) {
                        capSpr.position.set(0, -134 + offsetHeight * scale)
                    } else {
                        capSpr.position.set(0, -108 + offsetHeight * scale)
                    }
                    capSpr.name = 'cap'
                }

                _this.controller.removeChildAt(3)
                _this.controller.addChild(faceSpr)
                _this.controller.setChildIndex(faceSpr, 3)
                if (num != 1) {
                    _this.controller.addChild(capSpr)
                    _this.controller.setChildIndex(capSpr, 4)
                }
                _this.isLoading = false
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

    .po {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            content: '';
            width: 46.875/2rem /* 750/16 */;
            height: 17.25/2rem /* 276/16 */;
            .bg('./img/po-top.png');
        }
    }

    #canvas-container {
        position: absolute;
        padding-top: 3.5rem /* 80/16 */;
    }

    .po-controller {
        position: absolute;
        bottom: 0;
        width: 100%;
        transition: all 0.4s;
    }

    .po-nav-tab {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 3.125rem /* 50/16 */;
        background-color: #ffffff;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.08), 0 1px 10px 0 rgba(0, 0, 0, 0.06),
        0 2px 4px -1px rgba(0, 0, 0, 0.1);

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            background-color: #2070a1;
            transform: scaleY(0.5);
            z-index: 3;
        }
    }

    .po-nav-tab-item__selected {
        background-color: #eee;
    }

    .po-nav-tab-item {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        color: #005a92;

        &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: #2070a1;
            transform: scaleX(0.5);
        }

        &:last-child::before {
            width: 0;
        }
    }

    .po-contents {
        background-color: #eeeeee;
    }

    .po-content-wp {
        // height: 18.75rem /* 300/16 */;
        overflow-y: scroll;
    }

    .po-content-a-list {
        display: flex;
        flex-wrap: wrap;

        .po-content-a-item {
            flex-basis: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.125rem /* 18/16 */ 0;

            img {
                width: 9.6875/2rem /* 155/16 */;
                height: 6.8125/2rem /* 109/16 */;
                border-radius: 8px;
                border: 1px solid #eee;
            }
        }
    }

    .po-content-b-list {
        display: flex;
        flex-wrap: wrap;

        .po-content-b-item {
            flex-basis: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0.625rem /* 10/16 */ 0;
            padding: 0.25rem /* 4/16 */ 0 0.375rem /* 6/16 */;

            img {
                width: 9.625/2rem /* 154/16 */;
                height: 6.75/2rem /* 108/16 */;
            }
        }
    }

    .po-content-d-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0.625rem /* 10/16 */ 0;

        .po-content-d-item {
            flex-basis: 100%;
            display: flex;
            flex-direction: column;
            padding: 0.625rem /* 10/16 */ 0.875rem /* 14/16 */;

            .po-item-text {
                text-align: left;
                margin-top: 0;
                font-size: 1rem;
                color: #7f7f7f;
            }
        }

        .text-active {
            .po-item-text {
                color: #005a98;
            }
        }
    }

    .po-item-text {
        box-sizing: border-box;
        min-width: 3.125rem /* 50/16 */;
        height: 1.125rem /* 18/16 */;
        margin-top: 0.75rem /* 12/16 */;
        padding: 0 0.25rem /* 4/16 */;
        font-size: 0.75rem /* 12/16 */;
        line-height: 1.125rem /* 18/16 */;
        color: #005a92;
        text-align: center;
        // text-shadow: 0 0 4px #005a92;
    }

    // 输入框
    .input-wp {
        position: absolute;
        transform: translateX(-999px);
    }

    //提示
    .cloud-wp {
        // position: fixed;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
    }

    .cloud {
        position: absolute;
        left: 50%;
        top: 20%;
        box-sizing: border-box;
        padding: 4.2rem 2rem 0;
        line-height: 1.2;
        text-align: center;
        margin-left: -33.3125/4rem /* 533/16 */;
        width: 33.3125/2rem /* 533/16 */;
        height: 16.1875/2rem /* 259/16 */;
        .bg('./img/cloud.png');
        color: #005a98;
    }

    // 预览
    .po-preview {
        position: absolute;
        top: -7rem;
        right: 1rem;
        width: 4.9375/2rem /* 79/16 */;
        height: 5/2rem /* 80/16 */;
        .bg('./img/fn-navigation.png');
        transition: transform 0.3s;

        &:active {
            transform: scale(0.9);
        }
    }

    // notf
    .notf {
        position: absolute;
        left: 50%;
        margin-left: -7.5rem;
        top: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 15rem /* 240/16 */;
        height: 15rem /* 240/16 */;
        border-radius: 10px;
        background: #f0f0f0;

        p {
            color: #005b98;
            margin-top: 1rem;
        }

        .notf-img {
            width: 8.9375/2rem /* 143/16 */;
            height: 12.625/2rem /* 202/16 */;
            .bg('./img/notf-n1.png');
        }
    }

    // loading
    .ld-inner {
        position: absolute;
        left: 50%;
        margin-left: -9.375/2rem /* 150/16 */;
        top: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 9.375rem /* 150/16 */;
        height: 9.375rem /* 150/16 */;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.8);

        p {
            color: white;
            margin-top: 1rem;
        }
    }

    .ld-img {
        width: 8.1875/2rem /* 131/16 */;
        height: 8.4375/2rem /* 135/16 */;
        .bg('./img/po-rotate.png');
        transform-origin: center;
        animation: rotateIt 2s linear infinite;
    }

    @keyframes rotateIt {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .hideContent {
        display: none;
    }

    .flix {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 10;
        animation: flix 0.5s linear forwards;
    }

    @keyframes flix {
        0%,
        100% {
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
    }

    #tempImg {
        position: absolute;
        transform: translateX(-999px);
    }
</style>
