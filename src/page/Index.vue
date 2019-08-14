<template>
    <div class="home" v-cloak>
        <section>
            <van-popup v-model="isShow">
                <tips/>
            </van-popup>
            <!--客服-->
            <van-popup v-model="isCustomer">
                <tips
                    :popup.sync="isCustomer"
                    :tipsImg="customerImg"
                    tipsText="客服电话：02367891396<br>工作时间：周一～周五 09:00-17:00"
                    tipsBtnText1="拨打"
                    tipsBtnText2="取消"
                    tipsBtnPath="02367891396"
                    :isTel="true"
                />
            </van-popup>
        </section>
        <van-pull-refresh
            v-model="isUpLoading"
            @refresh="onRefresh"
            :class="isScroll ? 'active' : ''"
            style="min-height:calc(100vh - 2.5rem)"
        >
            <van-list
                v-model="isDownLoading"
                :finished="isFinished"
                finished-text="我是有底线的"
                @load="getProductList"
                class="noLoading"
            >
                <div class="home-header">
                    <img src="../assets/images/nav_07_logo@3x.png" class="hd-logo"/>
                    <div class="hd-right">
                        <div class="address_info" @click="$router.push('/Location')">
                            <img src="../assets/images/nav_03_location@3x.png" class="address_icon"/>
                            <span v-text="cityName"></span>
                            <img src="../assets/images/nav_04_down@3x.png" class="address_arrow"/>
                        </div>
                        <img src="../assets/images/nav_06_service@3x.png" class="customer_icon"
                             @click="isCustomer = true"/>
                    </div>
                    <div class="after" :style="headStyle"></div>
                </div>
                <van-swipe :autoplay="2000" indicator-color="blue" class="home-banner">
                    <van-swipe-item v-for="(item,index) in banner" class="banner_item" :key="index">
                        <img :src="item.strImageAddr"/>
                    </van-swipe-item>
                </van-swipe>
                <p class="index_main_title">精品推荐</p>

                <div class="product-box">
                    <div v-if="windowDetailList.length>0">
                        <van-swipe :autoplay="2000" indicator-color="white" class="adverImg">
                            <van-swipe-item v-for="(item,index) in windowDetailList[0].windowDetailList" :key="index">
                                <img :src="item.strImageAddr"
                                     v-lazy="item.strImageAddr"/>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <template v-if="listIsEmpty">
                        <div class="home-empty">
                            <img src="../assets/images/tips5.png"/>
                            <p class="tips">暂无商品售卖</p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="product-list">
                            <waterfall
                                :col='col'
                                :data="goodsList"
                                :isTransition="false"
                            >
                                <div
                                    v-for="(item,index) in goodsList"
                                    class="product-item"
                                    :key="index"
                                    @click="$router.push({path: 'detail', query: {pid: item.productId}})"
                                >
                                    <div class="isDistributable" v-if="userType==3 && item.isDistributable == 0">赚</div>
                                    <img
                                        :src="item.imageList.length>0&&item.imageList[0].strImageAddr"
                                        v-lazy="item.imageList.length>0&&item.imageList[0].strImageAddr"
                                    />
                                    <div class="product-info">
                                        <div class="product-text">
                                            <p class="product-title" v-text="item.strProductTitleA"></p>
                                            <p class="product-spec" v-text="item.strProductTitleB"></p>
                                        </div>
                                        <div class="product-price">
                                            <div class="">
                                                <span v-html="$options.filters.goodsDetailPrice(item.decPrice)"></span>
                                                <del>¥{{item.decMarkprice}}</del>
                                            </div>
                                            <div class="btns">去看看</div>
                                        </div>
                                    </div>
                                </div>
                            </waterfall>
                        </div>
                    </template>
                </div>
            </van-list>
        </van-pull-refresh>
        <vant-footer active="0"/>
    </div>
</template>

<script>
    import AMap from 'AMap'
    import tips from '@/components/tips';
    export default{
        components: {
            tips,
        },
        computed: {},
        data(){
            return {
                col: 2,
                listIsEmpty: false, /*商品是否为空*/
                isUpLoading: false, /*是否上拉*/
                isDownLoading: false, /*是否下拉*/
                isFinished: false, /*是否还有更多*/
                scrollTop: 0, /*距离顶部距离*/
                isScroll: false, /*滚动是否超过50*/
                isShow: false, /*是否调用打开提示*/
                isCustomer: false, /*是否调用打开客服*/
                cityName: localStorage.getItem('cityName') || '', /*城市名*/
                customerImg: require("@/assets/images/tips6.png"),
                windowDetailList: '',
                banner: [],
                goodsList: [],
                userType: '',
                pageBox: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    totalPage: ''
                },
                headStyle: '',
            }
        },
        mounted(){
            let t = this;
            if (!t.cityName) {
                t.util.getMap().then((res) => {
                    if (res.code === 200) {
                        t.cityName = res.cityName;
                    } else {
                        t.$router.push({path: '/Location', query: {code: res.code}});
                    }
                });
            }
            t.onRefresh();
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            /*滚动条滚动事件*/
            handleScroll(e){
                let t = this;
                t.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                t.isScroll = t.scrollTop >= 1 ? true : false;
                t.headStyle = `background: rgba(232,73,71,${t.scrollTop / 100})`;
            },
            /*根据用户首页定位地址查询Banner信息*/
            getBanner(){
                let t = this;
                t.$axios.post(t.$store.state.urlConfig.findBanner, {strWindowArea: t.cityName}).then(res => {
                    t.getFindWindowConfigure().then(t.getProductList);
                    if (res.data.data && res.data.data.length > 0) {
                        // t.banner = res.data.data[0].imageList;
                        // 上条注释数据赋值格式错误，重新赋值；
                        t.banner = res.data.data;
                        t.banner.length = t.banner.length >= 5 ? 5 : t.banner.length;
                    } else {
                        t.banner = [];
                        t.isRefresh = false;
                    }
                });
            },
            /*根据用户首页定位地址查询橱窗信息*/
            getFindWindowConfigure(){
                let t = this;
                return t.$axios.post(t.$store.state.urlConfig.findWindowConfigure, {strWindowArea: t.cityName}).then(res => {
                    res = res.data.data;
                    if (res) {
                        t.windowDetailList = res;
                    } else {
                        t.isRefresh = false;
                        t.windowDetailList = [];
                    }
                });
            },
            /*根据定位区域获取商品列表*/
            getProductList(){
                let t = this,
                    param = t.pageBox;
                param.strSaleArea = t.cityName;
                return t.$axios.post(t.$store.state.urlConfig.getProductList, param).then(res => {
                    if (t.isUpLoading) {
                        t.isRefresh = true;
                        t.goodsList = [];
                    } else {
                        t.isRefresh = false;
                    }
                    t.isUpLoading = false;
                    t.isDownLoading = false;
                    res = res.data && res.data.data;
                    if (!res) {
                        t.listIsEmpty = true;
                        return;
                    }
                    t.goodsList = t.goodsList.concat(res.list);
                    t.listIsEmpty = t.goodsList.length > 0 ? false : true;
                    t.pageBox.totalPage = res.totalPage;
                    if (t.pageBox.pageNum >= t.pageBox.totalPage) {
                        t.isFinished = true;
                    }
                    t.pageBox.pageNum += 1;
                });
            },
            /*上拉刷新*/
            onRefresh(){
                let t = this;
                t.pageBox.pageNum = 1;
                t.isFinished = false;
                t.isUpLoading = true;
                let userInfo = localStorage.getItem('userInfo') || '';
                if (userInfo) {
                    userInfo = JSON.parse(userInfo);
                    t.userType = userInfo.type || '';
                }
                t.getBanner();
            },
        },
        activated(){
            let t = this;
            let newCityname = localStorage.getItem('cityName');
            let RefreshCart = localStorage.getItem('RefreshHome');
            if (t.cityName != newCityname || RefreshCart) {
                t.cityName = newCityname;
                t.onRefresh();
                localStorage.removeItem('RefreshHome')
            }
        }
    }
</script>
<style lang="scss">
    .adverImg,
    .home-banner {
        .van-swipe__indicator {
            width: .6rem;
            height: .1rem;
            border-radius: 0;
            margin-right: 0.2rem;
        }
    }

    .van-pull-refresh.active {
        .van-pull-refresh__track {
            transform: initial !important;
        }
    }

    .van-list__finished-text {
        position: relative;
        &:after,
        &:before {
            content: '';
            display: block;
            width: 3rem;
            height: 1px;
            top: 50%;
            position: absolute;
            background: rgba(230, 230, 230, 1);
        }
        &:after {
            left: 4rem;
        }
        &:before {
            right: 4rem;
        }
    }

</style>
<style scoped lang="scss">
    .home-empty {
        margin: 1rem -0.75rem 0 -0.75rem;
        padding: 2rem $spaceLF;
        background: #fff;
        text-align: center;
        img {
            width: 8.1rem;
            height: 7.5rem;
        }
        .tips {
            color: $fontColor2;
            font-size: $f65;
            margin-top: 0.75rem;
        }
    }

    .home-banner {
        height: 12rem;
        .banner_item {
            text-align: center;
            width: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .home-header {
        height: 46px;
        line-height: 46px;
        padding: 0 $spaceLF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100% - 1.5rem);
        z-index: 999;
        /*transition: 0.45s;*/
        .after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            display: block;
            z-index: -1;
            /*transition: 0.45s;*/
        }
        .hd-logo {
            width: 3.95rem;
            height: 0.65rem;
        }
        .hd-right {
            display: flex;
            align-items: center;
            .address_info {
                color: #fff;
                font-size: $f7;
                display: flex;
                align-items: center;
                .address_icon {
                    width: 0.5rem;
                    height: 0.6rem;
                }
                span {
                    margin: 0 0.2rem;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 3rem;
                }
                .address_arrow {
                    width: 0.35rem;
                    height: 0.175rem;
                }
            }
            .customer_icon {
                width: 0.9rem;
                height: 0.9rem;
                margin-left: 1.25rem;
            }
        }
    }

    .index_main_title {
        color: $titleColor;
        padding: 0 $spaceLF;
        height: 7rem;
        line-height: 2.5rem;
        font-weight: 500;
        font-size: $f8;
        background: #fff;
        background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.15));

    }

    .product-box {
        margin-top: -4.5rem;
        padding: 0 $spaceLF;
        .adverImg {
            border-radius: .35rem;
            overflow: hidden;
            height: 6.25rem;
            margin-bottom: 0.75rem;
            img {
                width: 100%;
                height: 100%;
                border-radius: .35rem;
                object-fit: cover;
            }
        }
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }

    .product-list {
        margin: 0rem -0.35rem 0 -0.35rem;
        .product-item {
            background: #fff;
            overflow: hidden;
            margin: 0 0.325rem .75rem 0.325rem;
            border-radius: 0.35rem;
            position: relative;
            .isDistributable {
                width: 1.5rem;
                height: 1.5rem;
                line-height: 1.5rem;
                background: linear-gradient(90deg, rgba(232, 73, 71, 1), rgba(251, 125, 40, 1));
                box-shadow: 0 2px 2px 0 rgba(232, 73, 71, 0.31);
                border-radius: 50%;
                font-weight: 800;
                position: absolute;
                left: .5rem;
                top: .5rem;
                text-align: center;
                color: #fff;
                z-index: 10;
                font-size: 0.825rem;
            }
            img {
                width: 100%;
                /*min-height: 8.6rem;*/
                /*max-height: 9.5rem;*/
                object-fit: cover;
                background: #fafafa;
            }
            .product-info {
                padding: 0.75rem 0.45rem;
                .product-title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    color: $titleColor;
                    font-size: $f65;
                    margin-bottom: 0.25rem;
                }
                .product-spec {
                    font-size: $f55;
                    color: $fontColor2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

</style>
