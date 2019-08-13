<template>
    <!--<van-nav-bar :title="title" :left-text="leftText" @click-left="go_Back"/>-->
    <div class="vs-header">
        <div class="vs-header-box" :class="isFiexd ? 'vs-fiexd' : '' ">
            <div class="vs-header-left" v-show="leftArrow">
                <img src="../../assets/images/nav_01_back@3x.png" @click="go_Back"/>
            </div>
            <div class="vs-header-title" v-text="title"></div>
            <div class="vs-header-right">
                <slot name="rights"></slot>
            </div>
        </div>
        <div class="pb-header" v-if="isFiexd"></div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                default: '这里是标题'
            },
            backPath:'',
            isFiexd: {
                default: true
            },
            leftArrow: {
                default: true
            }
        },
        data() {
            return {
                TabarActive: 0,
            }
        },
        methods: {
            go_Back(){
                let t = this;
//              let bpath = t.backPath ? t.backPath : -1;
//              t.$router.go(bpath);
                if(t.backPath){
                	console.log("返回 "+t.backPath)
                	t.$router.push({path : '/'+t.backPath})
                }else{
                	console.log("返回-1")
                	t.$router.go(-1);
                }
                
            }
        }
    }
</script>


<style lang="scss">
    .vs-header {
        .vs-header-box {
            width: 100%;
            height: 2.2rem;
            background: #f8f8f8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            &.vs-fiexd {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1000;
            }

            .vs-header-left {
                width: 0.6rem;
                height: 1.1rem;
                margin-left: 0.45rem;
                position: relative;
                z-index: 2;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .vs-header-title {
                width: 100%;
                position: absolute;
                z-index: 1;
                text-align: center;
                font-size: $f85;
                color: $titleColor;
            }
            .vs-header-right {
                margin-right: 0.45rem;
                position: relative;
                z-index: 2;
            }
        }

        .pb-header {
            padding-bottom: 2.2rem;
        }
    }
</style>
