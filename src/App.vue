<template>
    <div id="app" v-cloak>
        <!--<van-nav-bar title="久邻邻" left-text="返回" left-arrow @click-left="$router.go(-1)" />-->
        <van-loading color="white" v-show="$store.state.loading"/>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!--<router-view/>-->
    </div>
</template>

<script>
    //计算根元素fontsize，1rem=20px
    //设计图/20
    !(function (doc, win) {
        var docEle = doc.documentElement,
            event = "onorientationchange" in window ? "orientationchange" : "resize", //判断是屏幕旋转还是resize;
            fn = function () {
                var width = docEle.clientWidth;
                width && (docEle.style.fontSize = 20 * (width / 375) + "px");
                //console.log(docEle.style.fontSize)
            };
        win.addEventListener(event, fn, false);
        doc.addEventListener("DOMContentLoaded", fn, false);
    }(document, window));


    import {NavBar} from 'vant';
    import {Checkbox, CheckboxGroup} from 'vant';
    import {Stepper} from 'vant';
    import {SwipeCell} from 'vant';
    import {Dialog} from 'vant';
    import {Toast} from 'vant';
    export default {
        name: 'App',
        components: {
            NavBar,
            Checkbox,
            CheckboxGroup,
            Stepper,
            SwipeCell,
            Dialog,
            Toast
        },
        methods: {},
        created: function () {
            var _this = this
//			if(_this.$store.getters.userInfo.token==null){
//				Toast('登录信息过期，请重新登录');
//				//_this.$router.push({path:'/Login'})
//			}
       }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
    }

    * {
        margin: 0;
        padding: 0
    }

    li {
        list-style: none
    }

    img {
        vertical-align: top;
        border: none
    }

    body {
        background-color: $backgroundColor;
        font-size: 12px;
        font-family: Arial, "Microsoft YaHei", Verdana, sans-serif, simsun;
        font-weight: normal;
        margin: 0;
        padding: 0;
    }

    /*flex预设*/
    .flex {
        display: flex;
    }

    .f_row {
        flex-direction: row;
    }

    .f_col {
        flex-direction: column;
    }

    .f_sa {
        justify-content: space-around;
    }

    .f_sb {
        justify-content: space-between;
    }

    .f_j_c {
        justify-content: center;
    }

    .f_j_s {
        justify-content: flex-start;
    }

    .f_j_e {
        justify-content: flex-end;
    }

    .f_a_c {
        align-items: center;
    }

    .f_a_s {
        align-items: flex-start;
    }

    .f_a_b {
        align-items: baseline;
    }

    /*vanUI cell滑块*/
    .van-swipe-cell__right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #FF4E4C;
        color: #fff;
        height: 100%;
        border-radius: 0;
    }

    /*vanUi loading*/
    .van-loading {
        position: fixed !important;
        z-index: 9999;
        left: calc(50% - 25px);
        top: calc(50% - 25px);
        padding: 10px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.5)
    }

    /*van navbar*/
    .van-nav-bar {
        background-color: #F8F8F8;
    }

    .mask-bag {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 110;
    }

    .van-popup {
        background: none;
    }

    /*商品价格*/
    .product-price {
        margin-top: 0.75rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .formatPrice1 {
            color: $fontColor;
            .symbol {
                font-size: 0.6rem;
                margin-right: 0.15rem;
            }
            .big-price {
                font-size: .75rem;
            }
        }

        del {
            color: $fontColor2;
            font-size: 0.6rem;
        }
        .btns {
            border-radius: 0.75rem;
            background: rgba(232, 73, 71, 0.1);
            width: 2.5rem;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.55rem;
            text-align: center;
            color: #E84947;
        }
    }

    /*商品价格加粗*/
    .product-price--fb {
        .formatPrice1 {
            font-weight: 600 !important;
            margin-right: 0 !important;
        }
        .big-price {
            font-size: $f10 !important;
        }
        .original-price {
            margin-left: 0.7rem !important;
        }
        .postage {
            margin-left: 0.75rem !important;
        }
    }

    /*数量加减*/
    .count-choose {
        .van-stepper {
            border-radius: 0.7rem;
            overflow: hidden;
        }
        .van-stepper__minus--disabled,
        .van-stepper__minus--disabled:active,
        .van-stepper__plus--disabled,
        .van-stepper__plus--disabled:active,
        .van-stepper__input,
        .van-stepper__minus,
        .van-stepper__plus {
            margin: 0;
            width: 1.5rem;
            background: rgba(246, 246, 246, 1);
        }
        .van-stepper__minus--disabled::after,
        .van-stepper__minus--disabled::before,
        .van-stepper__plus--disabled::after,
        .van-stepper__plus--disabled::before {
            background-color: #323233;
        }
        .van-stepper__minus::before,
        .van-stepper__plus::before {
            width: 0.55rem;
        }
        .van-stepper__minus::after,
        .van-stepper__plus::after {
            width: 0.06rem;
            height: 0.55rem;
            background: $fontColor2;
        }
        .van-stepper__minus::before,
        .van-stepper__plus::before {
            height: 0.05rem;
            width: 0.55rem;
            background: $fontColor2;
        }
        .van-stepper__input {
            font-size: $f65;
            width: 1.65rem;
            color: #323233 !important;
        }
    }

    /*购物车选择框*/
    .checkbox-warp {
        .van-checkbox {
            width: 1rem;
            display: flex;
            align-items: center;
            position: relative;
            margin-right: 0.5rem;
            .van-checkbox__icon {
                position: absolute;
                z-index: 100;
                opacity: 0;
            }
            .van-checkbox__label {
                margin-left: 0;
            }
        }
        .checkbox-img {
            width: 1rem;
            height: 1rem;
        }
    }

    /*购物车划出删除*/
    .goods-item-warp .van-swipe-cell__right ,.comment_wrap .van-swipe-cell__right{
        border-radius: 0.4rem;
    }

    .van-list__loading,
    .van-pull-refresh {
        .van-loading,
        .van-list__loading {
            display: none !important;
        }
    }

	/*确认框*/
	.van-dialog{
		border-radius: .75rem;
	}
	.van-dialog__confirm, .van-dialog__confirm:active{
		color: #E84947;
	}
</style>
