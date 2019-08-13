<template>
    <div class="empty" >
        <div class="empty-content">
            <img :src="emptyImg" class="empty-images" style="pointer-events: none;">
            <p class="empty-text" v-text="emptyText"></p>
            <div class="empty-btn-group">
                <button class="empty-btn empty-btn1" v-if="emptyBtn1" v-text="emptyBtn1"></button>
                <button class="empty-btn empty-btn2" v-if="emptyBtn2" v-text="emptyBtn2"></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            emptyImg: {
                default: require("../../assets/images/tips1.png")
            },
            emptyText: {
                default: '！'
            },
            emptyBtn1: {
                default: ''
            },
            emptyBtn2: {
                default: ''
            },
            btn1Href:{},
            btn2Href:{}
        },
        data() {
            return {
            }
        },
        methods: {}
    }
</script>


<style scoped lang="scss">
    .empty {
        padding-top: 3rem;
        .empty-content {
            .empty-images {
                width: 8.6rem;
                height: 7.8rem;
                display: block;
                margin: 3.25rem auto 2.2rem auto;
            }
            .empty-text {
                font-size: $f7;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 1rem;
                text-align: center;
            }
        }
        .empty-btn-group {
            margin: 3.2rem 1.25rem 0 1.25rem;
            .empty-btn {
                width: 100%;
                height: 2rem;
                font-size: $f75;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.6rem;
                border-radius: 5rem;
                background: none;
                border:0;
            }
            .empty-btn1 {
                color: #fff;
                background: linear-gradient(270deg, rgba(255, 78, 76, 1) 0%, rgba(254, 120, 79, 1) 100%);
            }
            .empty-btn2 {
                color: rgba(232, 73, 71, 1);
                border: 1px solid rgba(232, 73, 71, 1)
            }
        }
    }
</style>
