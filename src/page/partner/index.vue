<template>
    <div class="partner">
        <header>
            <div class="partner-header">
                <div class="partner-header-box">
                    <div class="partner-hd-left">
                        <img src="../../assets/images/nav_02_back@3x.png" @click="$router.go(-1)"/>
                    </div>
                    <div class="partner-hd-title">社区合伙人中心</div>
                </div>
                <div class="partner-user" @click="$router.push('/perfect')">
                    <div class="puser">
                        <img
                            :src="distributorInfo.str_head ? distributorInfo.str_head : distrbHead"
                            class="pimage"
                        />
                        <p class="puname" v-text="distributorInfo.str_nickname"></p>
                    </div>
                    <img src="../../assets/images/btn_20_next@3x.png" class="arrow_right"/>
                </div>
            </div>
        </header>
        <section>
            <div class="commission cumulative">
                <div class="text-cnt">
                    <div class="tit">当前共累计佣金</div>
                    <p class="money--box"><span class="Symbol">¥</span>
                        <span class="money" v-text="distributorInfo.dec_cumulative_total_commission || 0"></span>
                    </p>
                </div>
                <img src="../../assets/images/cumulative.png" class="right_img" style="height:100%"/>
            </div>
            <div class="commission mayApply">
                <div class="text-cnt">
                    <div class="tit">当前可申请佣金</div>
                    <p class="money--box"><span class="Symbol">¥</span>
                        <span class="money" v-text="dec_commission"></span>
                    </p>
                    <button
                        :disabled="isApplyBtn ? true : false"
                        :class="isApplyBtn ? 'active':''"
                        @click="commissionTips"
                    >
                        申请佣金
                    </button>
                </div>
                <img src="../../assets/images/mayApply.png" class="right_img"/>
            </div>
            <!--商品下架-->
            <van-popup v-model="isApply">
                <tips
                    :popup.sync="isApply"
                    tipsTitle="温馨提示"
                    tipsText="<p style='text-align:left;padding:0 0.5rem;font-size:0.65rem;margin:1rem 0;'>1、欢迎来到社区合伙人中心！<br />
                              2、每月19~24日为可申请佣金时间；<br />
                              3、每月可申请佣金一次<br />
                              4、每次申请的佣金默认为可申请佣金的全部金额。<br />
                              5、申请成功后，会有约5个工作日的处理申请时间，预计25~30日为金额到账日期，实际到账以银行到账时间为准。</p>"
                    tipsBtnText1="我知道了"
                    v-on:confirmFunc="applyCommission"
                />
            </van-popup>
        </section>
        <section>
            <div class="menu-row">
                <div class="item" @click="$router.push('partnerDetail')" style="height: 2.2rem;">
                    <div class="left">
                        <img src="../../assets/images/part_order.png" class="oicon"/>
                        <p>跟踪订单</p>
                    </div>
                    <img src="../../assets/images/btn_15_next@3x.png" class="menu_arrow_right"/>
                </div>
                <div class="item" @click="$router.push('achievement')">
                    <div class="left">
                        <img src="../../assets/images/part_achievement.png" class="aicon"/>
                        <p>查看业绩</p>
                    </div>
                    <img src="../../assets/images/btn_15_next@3x.png" class="menu_arrow_right"/>
                </div>
                <div class="item" @click="$router.push('apply')">
                    <div class="left">
                        <img src="../../assets/images/part_commission.png" class="cicon"/>
                        <p>申请佣金明细</p>
                    </div>
                    <img src="../../assets/images/btn_15_next@3x.png" class="menu_arrow_right"/>
                </div>
                <div class="item" style="height:2.45rem;"></div>
            </div>
        </section>
    </div>
</template>


<script>
    import {Toast} from 'vant';
    import tips from '@/components/tips';
    export default{
        components: {
            Toast,
            tips
        },
        data (){
            return {
                isApplyBtn: true,
                isApply: false,
                distributorInfo: '',
                dec_commission: 0,
                distrbHead: require("../../assets/images/head.png")
            }
        },
        created(){
            this.getMyDistributionInfo();
        },
        methods: {
            /*获取分销员信息*/
            getMyDistributionInfo(){
                let t = this;
                t.$axios.postToken(t.$store.state.urlConfig.getMyDistributionInfo, {}).then(res => {
                    /*如果不是分销员，做处理--暂无-*/
                    res = res.data.data;
                    if (!res) {
                        t.$router.push('/');
                    }
                    t.distributorInfo = res;
                    t.dec_commission = res.dec_total_commission_not_applied || 0;
                    t.isApplyBtn = t.dec_commission > 0 ? false : true;
                });
            },
            commissionTips(){
                this.isApply = true;
            },
            applyCommission(){
                let t = this;
                let day = new Date().getDate();
                if (day <= 19 || day >= 24) {
                    Toast('未在指定日期申请佣金！');
                    return false;
                }
                if (!t.distributorInfo.str_bank) {
                    t.$dialog.alert({
                        message: '您还没有完善您的银行卡等信息？'
                    }).then(() => {
                        t.$router.push('/perfect');
                    }).catch();
                    return false;
                }
                if (t.dec_commission <= 0) {
                    Toast('申请佣金必须大于0！');
                    return false;
                }
                t.isApplyBtn = true;
                t.$axios.postToken(t.$store.state.urlConfig.applyCommission, {dec_commission: t.dec_commission}).then(res => {
                    res = res.data.data;
                    if (res.status == 0) {
                        t.dec_commission = 0;
                        Toast(res.message);
                    } else {
                        Toast(res.message);
                    }
                    t.isApplyBtn = false;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .partner-header {
        width: 100%;
        height: 6.65rem;
        background: linear-gradient(90deg, rgba(232, 73, 71, 1) 0%, rgba(236, 94, 70, 1) 100%);
        position: relative;
        .partner-header-box {
            height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            z-index: 1000;
            width: 100%;
            left: 0;
            top: 0;
            background: linear-gradient(90deg, rgba(232, 73, 71, 1) 0%, rgba(236, 94, 70, 1) 100%);

            .partner-hd-left {
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
            .partner-hd-title {
                width: 100%;
                position: absolute;
                z-index: 1;
                text-align: center;
                font-size: $f85;
                color: #fff;
            }
            .partner-hd-right {
                position: relative;
                z-index: 2;
                margin-right: $spaceLF;
                p {
                    color: #fff;
                    font-size: $f65;
                }
            }
        }
        .partner-user {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: calc(6.65rem - 2.2rem);
            padding: 1.45rem 0.5rem 0 0.5rem;
            .puser {
                display: flex;
                align-items: center;
                .pimage {
                    width: 2.45rem;
                    height: 2.45rem;
                    margin-right: 0.6rem;
                    border: 1px solid #fff;
                    border-radius: 50%;
                }
                .puname {
                    color: #fff;
                    font-size: $f85;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
            .arrow_right {
                width: 0.4rem;
                height: 0.7rem;
            }
        }
    }

    .commission {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 5px 0 rgba(227, 230, 235, 1);
        border-radius: 0.5rem;
        margin: 0 $spaceLF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 1.55rem;
        overflow: hidden;

        .tit {
            font-size: $f65;
            font-weight: 400;
            color: rgba(152, 152, 152, 1);
        }
        .text-cnt {
            .money--box {
                margin-top: 0.25rem;
                color: rgba(247, 67, 31, 1);
                .Symbol {
                    font-size: 1rem;
                    margin-right: 0.2rem;
                }
                .money {
                    font-size: 1.4rem;
                    font-weight: 400;
                    line-height: 2rem;
                }
            }
            button {
                width: 4.55rem;
                height: 1.55rem;
                border: none;
                color: #fff;
                font-size: $f65;
                background: linear-gradient(270deg, rgba(232, 73, 71, 1) 0%, rgba(247, 67, 31, 1) 100%);
                border-radius: 1.25rem;
                margin-top: 0.45rem;
                &.active {
                    opacity: 0.5;
                }
            }
        }

        .right_img {
            width: 6.8rem;
            height: 6.8rem;
            margin-right: 0.45rem;
        }
    }

    .commission.mayApply {
        margin: 0.5rem $spaceLF;
    }

    .commission.cumulative {
        position: relative;
        height: 5.65rem;
        margin-top: -0.95rem;
    }

    .menu-row {
        background: #fff;
        .left,
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .item {
            border-bottom: $cardBorder;
            height: 2.1rem;
            padding: 0 $spaceLF;
            &:last-child {
                border-bottom: 0;
            }
            p {
                font-size: $f65;
            }
        }
        .menu_arrow_right {
            width: 0.4rem;
            height: 0.6rem;
        }
        .oicon {
            width: 0.8rem;
            height: 0.9rem;
            margin-right: 0.5rem;
        }
        .aicon {
            width: 0.85rem;
            height: 0.8rem;
            margin-right: 0.45rem;
        }
        .cicon {
            width: 0.85rem;
            height: 1.05rem;
            margin-right: 0.45rem;
        }
    }

</style>
