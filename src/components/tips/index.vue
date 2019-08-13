<template>
    <div class="tips">
        <img src="../../assets/images/close_x.png" class="close-icon" @click="handleCancel">
        <div class="tips-content" :style="tipsTitle ? 'height:auto' : ''">
            <img :src="tipsImg" class="tips-images" v-if="tipsImg">
            <h1 v-if="tipsTitle" v-text="tipsTitle" class="tipsTitle"></h1>
            <p class="tips-text" v-html="tipsText"></p>
            <div class="btn-box">
                <div
                    class="tips-btn cancel"
                    v-text="tipsBtnText2"
                    v-if="tipsBtnText2" @click="handleCancel">
                </div>
                <!--如果是拨打电话-->
                <template v-if="isTel">
                    <a
                        class="tips-btn"
                        v-text="tipsBtnText1"
                        href="tel:02367891396"
                        :style="tipsBtnText2 ? 'width:5rem' : ''">
                    </a>
                    <!--:href="`tel:${tipsBtnPath1}`"-->
                </template>
                <template v-else>
                    <a
                        @click="handleConfirm"
                        class="tips-btn"
                        v-text="tipsBtnText1"
                        href="javascript:;"
                        :style="tipsBtnText2 ? 'width:5rem' : ''">
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tipsTitle: '',
            tipsImg: {
                default: ''
            },
            tipsText: {
                default: '！'
            },
            tipsBtnText1: {
                default: '去绑定'
            },
            tipsBtnText2: {
                default: ''
            },
            tipsBtnPath1: {
                default: ''
            },
            isTel: {
                default: false
            },
            popup: {
                default: false
            }
        },
        data() {
            return {}
        },
        methods: {
            handleCancel(){
                this.$emit(`update:popup`, false);
            },
            handleConfirm(){
                let t = this;
                if (t.tipsTitle) {
                    t.$emit(`confirmFunc`);
                }
                t.$emit(`update:popup`, false);
            }
        }
    }
</script>


<style scoped lang="scss">
    .close-icon {
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: 0.25rem;
        right: 0.25rem;
    }

    .tipsTitle {
        font-size: $f65;
        font-weight: 500;
    }

    .tips-content {
        padding: 0.75rem 2.5rem 1.25rem 2.5rem;
        background: #fff;
        border-radius: 0.25rem;
        width: 9rem;
        height: 13.475rem;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;

        .tips-images {
            width: 8.125rem;
            height: 7.5rem;
        }
        .tips-text {
            font-size: $f65;
            color: $titleColor;
            line-height: 1.15rem;
            margin: 0 -2rem;
        }
        .btn-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tips-btn {
                width: 6rem;
                height: 1.9rem;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 1rem;
                font-size: $f65;
                background: $fontColor;
                border: 1px solid $fontColor;
                &.cancel {
                    width: 5rem;
                    background: #fff;
                    color: $fontColor;
                    border: 1px solid $fontColor;
                    margin-right: 1.75rem;
                }
            }
        }
    }

</style>
