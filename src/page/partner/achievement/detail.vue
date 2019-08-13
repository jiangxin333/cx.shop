<template>
    <div class="achievement">
        <header>
            <vant-header title="查看业绩"/>
        </header>
        <section>
            <div class="achievement-info">
                <div class="info-hd">
                    <p class="type">佣金单</p>
                    <p class="money">¥ {{achievement.decCommission || 0}}</p>
                    <p class="time">{{achievement.datCommissionSettlement}}</p>
                    <p class="status" v-if="achievement.eumStatus == 0">未申请佣金</p>
                    <p class="status" v-if="achievement.eumStatus == 1">处理中</p>
                    <p class="status" v-if="achievement.eumStatus == 2">已申请佣金</p>
                </div>
                <div class="goods-list">
                    <div class="checkbox-warp shop-car-wrap">
                        <div class="shops_title flex">
                            <p class="shop_title">
                                <img src="../../../assets/images/c_icon_shop.png"/>
                                <span>{{ achievement.strSupplierName}}</span>
                            </p>
                        </div>
                        <div v-for="(item2,thisIndex) in casinMyOrderDetailDtoList" :key='thisIndex'
                             class="goods-item-warp">
                            <van-swipe-cell style="margin-right:0.5rem;">
                                <van-cell-group class="goods-item">
                                    <div class="goods-img">
                                        <img
                                            :src="item2.casinProductImageList&&item2.casinProductImageList[0].strImageAddr"/>
                                    </div>
                                    <div class="goods-info">
                                        <div class="goods-name" v-text="item2.strProductTitleA"></div>
                                        <div class="goods-spec">
                                            <p class="sepcs" v-text="item2.strSpecName"></p>
                                            <span>x{{item2.intProductCnt}}</span>
                                        </div>
                                        <div class="count-choose">
                                            <p class="prices_detail">
                                                <span class="symbol">¥</span>
                                                <span class="big-price"> {{item2.decProductPrice}}</span>
                                                <!--<span class="small-price">.00</span>-->
                                            </p>
                                        </div>
                                    </div>
                                </van-cell-group>
                            </van-swipe-cell>
                        </div>
                    </div>
                    <div class="order-info">
                        <dl>
                            <dt>订单信息</dt>
                            <dd v-if="achievement.intOrderNumber">订单编号：{{achievement.intOrderNumber}}</dd>
                            <dd v-if="achievement.datCreatetime">下单时间：{{achievement.datCreatetime}}</dd>
                            <dd v-if="achievement.datPaytime">付款时间：{{achievement.datPaytime}}</dd>
                            <dd v-if="achievement.datDeliveryTime">发货时间：{{achievement.datDeliveryTime}}</dd>
                            <dd v-if="achievement.datCompletetime">完成时间：{{achievement.datCompletetime}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div class="footers">
                <div class="footer-cont">
                    <button @click="$router.go(-1);">返回</button>
                </div>
                <div class="pb-foot"></div>
            </div>
        </footer>
    </div>
</template>


<script>
    export default{
        data (){
            return {
                achievement: '',
                casinMyOrderDetailDtoList: []
            }
        },
        created(){
            this.getDistributionAchievementDetailInfo();
        },
        methods: {
            /*分销员查看业绩详情*/
            getDistributionAchievementDetailInfo(){
                let t = this;
                t.$axios.postToken(t.$store.state.urlConfig.getDistributionAchievementDetailInfo, {orderId: t.$route.query.oid}).then(res => {
                    t.achievement = res.data.data;
                    t.casinMyOrderDetailDtoList = res.data.data.casinMyOrderDetailDtoList;
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/goods.scss";

    .shops_title {
        padding: 0 $spaceLF !important;
    }

    .goods-list {
        margin: .5rem 0;

        .van-hairline--top-bottom::after {
            border: 0;
        }
        .shop-car-wrap {
            margin: 0;
            border-radius: 0;
            box-shadow: inherit;
        }
        .goods-item-warp {
            padding: 0 0.25rem;
            margin-bottom: 1rem;
        }
        .goods-spec {

        }
    }

    .info-hd {
        height: 10rem;
        background: #fff;
        display: block;
        text-align: center;
        .type {
            font-size: $f7;
            padding-top: 1.35rem;
            color: $titleColor;
            line-height: 1rem;
        }
        .money {
            color: $titleColor;
            margin: 0.2rem 0 0.3rem 0;
            font-size: 1.55rem;
            line-height: 2.2rem;
        }
        .time {
            font-size: $f7;
            color: $fontColor2;
            line-height: 1rem;
        }
        .status {
            font-size: $f65;
            color: $fontColor2;
            line-height: .9rem;
            padding-top: 0.7rem;
        }
    }

    .order-info {
        background: #fff;
        padding-bottom: .95rem;
        dl {
            margin: 0 $spaceLF;
            border-top: $cardBorder;
            dt {
                padding-top: 0.75rem;
                font-size: $f55;
                margin-bottom: 0.45rem;
            }
            dd {
                font-size: $f55;
                color: $fontColor2;
                line-height: .8rem;
                margin-bottom: 0.3rem;
            }
        }
    }

    .footers {
        .pb-foot {
            padding-bottom: 3rem;
        }
        .footer-cont {
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            z-index: 1000;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #fff;
            box-shadow: 0 2px 5px 0 rgba(227, 230, 235, 1);
            button {
                width: 3.7rem;
                height: 1.4rem;
                border: 1px solid rgba(152, 152, 152, 1);
                margin-right: $spaceLF;
                font-size: $f65;
                background: none;
                border-radius: 1.5rem;
                color: $fontColor2;
            }
        }
    }
</style>
