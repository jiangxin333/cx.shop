<template>
    <div class="content" v-cloak>
        <header v-if="tabsCurrent == 0">
            <div class="header-new-bar" :style="headStyle">
                <img src="../../assets/images/icon_back.png"
                     class="icon_back"
                     @click="$router.go(-1)"
                     v-if="!isScroll"
                />
                <img src="../../assets/images/nav_01_back@3x.png" class="icon_back"
                     @click="$router.go(-1)"
                     style="width:0.6rem;height:1.1rem;"
                     v-else
                />
                <div class="navBox" v-if="isScroll">
                    <div class="nav-item"
                         v-for="(item,index) in navList"
                         :class="{'active':tabsCurrent===index}"
                         @click="tabClick(index)">
                        {{item.name}}
                    </div>
                </div>
                <div v-if="isScroll"></div>
                <img src="../../assets/images/icon_shares.png"
                     class="icon_back"
                     v-if="!isScroll"
                     @click="share.isShowsShare = true"
                />
            </div>
        </header>
        <header v-if="tabsCurrent == 1">
            <div class="header-new-bar" style="background: rgb(246, 246, 246);">
                <img src="../../assets/images/nav_01_back@3x.png" class="icon_back"
                     @click="$router.go(-1)"
                     style="width:0.6rem;height:1.1rem;"
                />
                <div class="navBox">
                    <div class="nav-item"
                         v-for="(item,index) in navList"
                         :class="{'active':tabsCurrent===index}"
                         @click="tabClick(index)">
                        {{item.name}}
                    </div>
                </div>
                <div></div>
            </div>
        </header>
        <div class="swiper-container swiper_con">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <section id="product">
                        <van-swipe :autoplay="2000" class="product-banner" @change="onChangeSwipe">
                            <template v-if="goodsInfo.imageList">
                                <van-swipe-item
                                    v-for="(item,index) in goodsInfo.imageList"
                                    class="banner_item"
                                    :key="index"
                                >
                                    <img v-lazy="item.strImageAddr" class="product-img"/>
                                </van-swipe-item>
                                <div class="custom-indicator" slot="indicator">
                                    {{ swipeCurrent + 1 }}/{{goodsInfo.imageList.length}}
                                </div>
                            </template>
                        </van-swipe>
                        <div class="product-warp">
                            <div class="goods-title">
                                <div class="goods-name" v-text="goodsInfo.strProductTitleA"></div>
                                <div class="share-btn" v-if="userType == 3 && goodsInfo.isDistributable == 0"
                                     @click="share.isShowsShare = true">分享立赚
                                </div>
                            </div>
                            <div class="goods-desc" v-text="goodsInfo.strProductTitleB"></div>
                            <div class="product-price product-price--fb">
                                <div>
                                    <span v-html="$options.filters.goodsDetailPrice(goodsInfo.decPrice || 0)"></span>
                                    <del class="original-price">市场价：{{goodsInfo.decMarkprice || 0}}</del>
                                    <span
                                        class="postage"
                                        v-if="userType == 3 && goodsInfo && goodsInfo.isDistributable == 0"
                                        v-text="goodsInfo.isFree == 1 ?  '邮费:' + (goodsInfo.decPostage || 0) + '元' :'包邮' ">
                                    </span>
                                </div>
                                <template v-if="userType == 3 && goodsInfo && goodsInfo.isDistributable == 0">
                                    <div class="commission">
                                        <span class="tit">预计佣金</span>
                                        <span
                                            v-html="$options.filters.goodsDetailPrice((goodsInfo.decPrice*(goodsInfo.decDistributionRatio/100)))">
                                        </span>
                                    </div>
                                </template>
                                <template v-else>
                                    <span
                                        class="postage"
                                        v-if="goodsInfo"
                                        v-text="goodsInfo.isFree == 1 ?  '邮费:' + goodsInfo.decPostage + '元' :'包邮' ">
                                    </span>
                                </template>
                            </div>
                        </div>
                        <div class="module-sku" @click="sku.isShowskus = true">
                            <span class="l">商品规格</span>
                            <span class="r">{{sku.strSpecName == '' ? '请选择规格' : '已选：' + sku.strSpecName}}</span>
                        </div>
                        <div id="detailAdvertise" v-html="goodsInfo.productDetailsContent">
                        </div>
                    </section>
                </div>
                <div class="swiper-slide">
                    <template v-if="evaluateList.length==0">
                        <empty :emptyImg="emptyCommentImg" emptyText="暂无评价内容"/>
                    </template>
                    <template v-else>
                        <section id="comment">
                            <div class="cmt-list">
                                <div class="cmt-item" v-for="(item,index) in evaluateList" :key="index">
                                    <div class="cmt-user">
                                        <img :src="item.str_head"/>
                                        <div class="cmt-user-info">
                                            <p class="cmt-username" v-text="item.str_nickname"></p>
                                            <p class="cmt-time-attr"><span
                                                v-text="item.dat_createtime"></span><span v-if="item.str_spec_name">规格：{{item.str_spec_name}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="cmt_cnt" v-text="item.str_evaluate_content"></div>
                                </div>
                            </div>
                        </section>
                    </template>
                </div>
            </div>
        </div>
        <section class="van--popup">
            <van-popup v-model="sku.isShowskus" position="bottom">
                <skus :sku.sync="sku" :goodsInfo="goodsInfo"/>
            </van-popup>
            <van-popup v-model="share.isShowsShare" position="bottom">
                <share :share.sync="share" :goodsInfo="goodsInfo"/>
            </van-popup>
            <van-popup v-model="share.isShowsPoster" style="    overflow-y: inherit;">
                <poster :share.sync="share" :goodsInfo="goodsInfo"/>
            </van-popup>
        </section>
        <footer>
            <div class="btnTools">
                <div class="ptBtnTools"></div>
                <div class="btnTools-box">
                    <div class="icon-btn-box">
                        <div class="icon-btn icon-shop" @click="$router.push({path: '/'})">
                            <img src="../../assets/images/icon_shop.png"/>
                            <span>首页</span>
                        </div>
                        <div class="icon-btn icon-dong" @click="isCustomer = true">
                            <img src="../../assets/images/icon_dong.png"/>
                            <span>客服</span>
                        </div>
                        <div class="icon-btn icon-cart" @click="$router.push({path: 'cart', query: {detail: true}})">
                            <img src="../../assets/images/icon_carts.png"/>
                            <span>购物车</span>
                        </div>
                    </div>
                    <div class="btn-groups">
                        <template v-if="goodsInfo.isShelf == 1">
                            <div class="bbtn btn-invalid">商品已下架</div>
                        </template>
                        <template v-else>
                            <div class="bbtn btn-cart" @click="sku.isShowskus = true">加入购物车</div>
                            <div class="bbtn btn-buy" @click="sku.isShowskus = true">立即购买</div>
                        </template>
                    </div>
                </div>
            </div>
        </footer>
        <section>
            <!--商品下架-->
            <van-popup v-model="sku.isShowPopup">
                <tips
                    :popup.sync="sku.isShowPopup"
                    :tipsImg="haltSales"
                    tipsText="sorry，该商品已下架！"
                    tipsBtnText1="确定"
                />
            </van-popup>
            <!--客服-->
            <van-popup v-model="isCustomer">
                <tips
                    :popup.sync="isCustomer"
                    :tipsImg="customerImg"
                    tipsText="客服电话：023-123789<br>工作时间：周一～周五 09:00-17:00"
                    tipsBtnText1="拨打"
                    tipsBtnText2="取消"
                    tipsBtnPath="023-123789"
                    :isTel="true"
                />
            </van-popup>
        </section>
    </div>
</template>

<script>
    import tips from '@/components/tips';
    import skus from "./skus"
    import share from "./share"
    import poster from "./poster"
    import empty from '@/components/empty';

    export default {
        components: {
            skus,
            share,
            poster,
            empty,
            tips,
        },
        data() {
            return {
                haltSales: require("../../assets/images/tips4.png"), /*商品是否下架图片*/
                emptyCommentImg: require("../../assets/images/tips7.png"),
                mySwiper: '',
                navList: [
                    {name: '详情'},
                    {name: '评价'}
                ],
                sku: {
                    skuNumber: 1,
                    isShowskus: false,
                    strSpecName: '',
                    isShowPopup: false,
                    isBuyBtn: false,
                },
                share: {
                    isShowsPoster: false,
                    isShowsShare: false,
                },
                tabsCurrent: 0,
                swipeCurrent: 0,
                evaluateList: [], /*评论*/
                banner: [], /*banner*/
                productId: '', /*商品ID*/
                goodsInfo: '', /*商品信息*/
                isScroll: false, /*是否该滚动*/
                headStyle: '', /*头部样式*/
                detailScrollTop: 0, /*记录详情滚动条位置*/
                commentScrollTop: 0, /*记录评论滚动条位置*/
                isCustomer: false, /*是否调用打开客服*/
                customerImg: require("@/assets/images/tips6.png"),
                userType: '', /*获取用户是否分销身份*/
            }
        },
        mounted(){
            let t = this;
            let userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
            t.userType = userInfo && userInfo.type || '';
            t.mySwiper = new Swiper('.swiper-container', {
                initialSlide: t.tabsCurrent,
                autoplay: false,
                autoHeight: true,
                threshold: 80,
                onSlideChangeStart: function () {
                    t.tabsCurrent = t.mySwiper.activeIndex;
                    if (t.tabsCurrent == 0) {
//                        document.documentElement.scrollTop = t.detailScrollTop;
                        document.body.scrollTop = t.detailScrollTop;
                    } else {
//                        document.documentElement.scrollTop = t.commentScrollTop;
                        document.body.scrollTop = t.commentScrollTop;
                    }
                }
            });
            window.addEventListener('scroll', this.handleScroll); 
        },
        created () {
        	var _this=this
            _this.getProductDetail(this.$route.query.pid);
            localStorage.setItem('fxyId',this.$route.query.did);
            if(_this.$route.query.did){
            	console.log('为分享链接')
            	var url=_this.$store.state.urlConfig.getUserInfo
            	if(localStorage.getItem('userInfo')){
            		_this.$axios.getToken(url,'')
					.then(res => {
						console.log(res)
						if(res.data.data.type==4){//type3社区合伙人 type4普通 
							console.log('非分销员')
							var url2 = _this.$store.state.urlConfig.addDistributionToUser;
			            	_this.$axios.postToken(url2,{distributionId:_this.$route.query.did})
			                .then(res => {
								console.log(res)
								if(res.data.code==200){
//									_this.$toast(res.data.msg)
//									_this.$toast('绑定分销员成功')
									
								}
			                });
						}
		    		});
            	}
            }
        },
        methods: {
            /*滚动条滚动事件*/
            handleScroll(e){
                let t = this;
                t.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (t.tabsCurrent == 0) {
                    t.detailScrollTop = ~~t.scrollTop;
                } else {
                    t.commentScrollTop = ~~t.scrollTop;
                }
                t.isScroll = t.scrollTop >= 50 ? true : false;
                t.headStyle = `background: rgba(248,248,248,${t.scrollTop / 200})`;
            },
            /*商品图切换*/
            onChangeSwipe(index) {
                this.swipeCurrent = index;
            },
            /*tab切换*/
            tabClick(index){
                this.tabsCurrent = index;
                this.mySwiper.slideTo(index, 500, false);
            },
            /*获取商品详情*/
            getProductDetail(pid){
                let t = this;
                t.productId = pid;
                t.$axios.post(t.$store.state.urlConfig.getProductDetail, {productId: pid}).then(res => {
                    t.goodsInfo = res.data.data;
                    t.productEvaluateList(pid);
                    setTimeout(() => {
                        t.mySwiper.onResize();
                    }, 500);
                });
            },
            /*获取商品评论*/
            productEvaluateList(pid){
                let t = this;
                t.$axios.post(t.$store.state.urlConfig.productEvaluateList, {productId: pid}).then(res => {
                    t.evaluateList = res.data.data;
                });
            }
        }
    }
</script>
<style lang="scss">
    .swiper_con {
        min-height: calc(100vh - 6.55rem);
    }

    .product-banner .custom-indicator {
        position: absolute;
        right: $spaceLF;
        bottom: 60px;
        height: 0.9rem;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        background: rgba(218, 218, 218, 0.8);
        border-radius: 1rem;
        color: rgba(120, 120, 120, 1);
    }

    #detailAdvertise {
        img {
            max-width: 100% !important;
            height: auto;
        }
    }

</style>

<style scoped lang="scss">

    .header-new-bar {
        height: 2.2rem;
        padding: 0 $spaceLF;
        position: fixed;
        width: calc(100% - 1.5rem);
        top: 0;
        left: 0;
        z-index: 99;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon_back {
            width: 1.75rem;
            height: 1.75rem;
        }
        .navBox {
            display: flex;
            justify-content: center;
            .nav-item {
                font-size: $f65;
                padding: 0 1.75rem;
                height: 2.2rem;
                display: flex;
                align-items: center;
                color: $fontColor2;
                position: relative;
                &.active {
                    color: $titleColor;
                    &:after {
                        content: "";
                        position: absolute;
                        bottom: 0.35rem;
                        left: 50%;
                        width: 1.25rem;
                        height: .15rem;
                        background: #E84947;
                        margin-left: -0.625rem;
                    }
                }
            }
        }
    }

    .product-banner {
        width: 100%;
        height: 20.25rem;
        .product-img {
            background: $backgroundColor;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .product-warp {
        background: #fff;
        margin-top: -2.15rem;
        position: relative;
        z-index: 98;
        padding: 0.5rem $spaceLF;
        border-radius: 0.5rem 0.5rem 0 0;

        .goods-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.3rem;

            .goods-name {
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                font-size: $f75;
                color: $titleColor;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                width: calc(100% - 2.75rem);
                min-height: 1rem;
            }
            .share-btn {
                width: 3.5rem;
                height: 1.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background: linear-gradient(180deg, rgba(255, 173, 13, 1) 0%, rgba(255, 136, 46, 1) 100%);
                border-radius: 0.7rem 0 0 0.7rem;
                margin-right: -$spaceLF;
                font-size: $f65;
            }
        }

        .goods-desc {
            font-size: $f55;
            line-height: 1rem;
            color: $fontColor2;
            margin-bottom: 0.15rem;
            min-height: 1rem;
        }
        .commission .tit {
            color: $fontColor2;
            font-size: $f55;
        }
    }

    .module-sku {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        padding: 0 $spaceLF;
        font-size: $f55;
        margin: 0.5rem 0;
        height: 2.2rem;
        .l {
            color: $fontColor2;
        }
    }

    .cmt-list {
        padding: 2.2rem $spaceLF 0 $spaceLF;
        background: #fff;
        .cmt-item {
            border-bottom: $cardBorder;
            padding: 0.65rem 0;
        }
        .cmt-user {
            display: flex;
            align-items: center;
            img {
                width: 1.75rem;
                height: 1.75rem;
                margin-right: 0.55rem;
                border-radius: 50%;
                object-fit: cover;
            }
            .cmt-user-info {
                display: flex;
                flex-direction: column;
                .cmt-username {
                    font-size: $f65;
                    color: $fontColor2;
                }
                .cmt-time-attr {
                    font-size: $f55;
                    color: $fontColor2;
                    margin-top: 0.15rem;
                    span {
                        margin-right: 0.5rem;
                    }
                }
            }
        }
        .cmt_cnt {
            font-size: $f65;
            color: $titleColor;
            margin: 0.55rem 0 0 2.3rem;
        }
    }

    .btnTools {
        .ptBtnTools {
            padding-top: 2.55rem;
        }
        .btnTools-box {
            width: 100%;
            height: 2.55rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 99;
        }

        .icon-btn-box {
            flex: 1;
            display: flex;
            align-items: center;
            height: 2.55rem;
            .icon-btn {
                font-size: 0.5rem;
                color: $fontColor2;
                img {
                    display: block;
                    width: 0.9rem;
                    height: 0.9rem;
                    margin: 0 auto 0.3rem auto;
                }
                &.icon-shop {
                    margin-left: 0.55rem;

                }
                &.icon-dong {
                    margin: 0 1.45rem 0 1.45rem;

                }
            }

        }
        .btn-groups {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0.5rem;
            width: 10.8rem;
            .bbtn {
                width: 5.4rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: $f65;
            }
            .btn-cart {
                border-radius: 1.25rem 0 0 1.25rem;
                background: linear-gradient(90deg, rgba(255, 187, 0, 1) 0%, rgba(255, 132, 49, 1) 100%);
            }
            .btn-buy {
                background: rgba(255, 78, 76, 1);
                border-radius: 0 1.25rem 1.25rem 0;
            }
            .btn-invalid {
                width: 100%;
                background: rgba(152, 152, 152, 1);
                border-radius: 1.25rem;
            }
        }
    }
</style>
