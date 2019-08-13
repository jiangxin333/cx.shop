<template>
    <div class="achievement">
        <header>
            <vant-header title="申请佣金详情"/>
        </header>
        <section>
            <div class="apply-info">
                <div class="info-hd">
                    <p class="type">提现金额</p>
                    <p class="money">¥ {{apply.str_use_total_amount || 0}}</p>
                    <p class="status">{{apply.eum_status == 0 ? '处理中' : '已处理'}}</p>
                    <div class="initiate-time">
                        <div class="item" v-if="apply.dat_apply_time">
                            <label>发起时间：</label><span>{{apply.dat_apply_time}}</span>
                        </div>
                        <template v-for="(item,index) in apply.amount_detail_by_time">
                            <div class="item" v-if="index == 0">
                                <label>金额明细：</label><span>{{item.time_slot}}</span><b>¥{{item.total}}</b>
                            </div>
                            <div class="item" v-else>
                                <label></label><span>{{item.time_slot}}</span><b>¥{{item.total}}</b>
                            </div>
                        </template>
                        <div class="item" v-if="apply.dat_deal_time">
                            <label>处理时间：</label><span>{{apply.dat_deal_time}}</span>
                        </div>
                    </div>
                </div>
                <div class="apply-tips" v-if="apply.eum_status == 1">申请佣金请求已处理，请注意查看您的到账情况</div>
            </div>
        </section>
    </div>
</template>

<!--int_id: 佣金明细id,-->
<!--dat_apply_time: 申请时间,-->
<!--str_use_total_amount: 申请总金额,-->
<!--eum_status: 处理状态,-->
<!--dat_deal_time: 处理时间,-->
<!--amount_detail_by_time: [-->
<!--time_slot: 时间段,-->
<!--total: 该时间段总计金额-->
<!--]-->
<script>
    export default{
        data (){
            return {
                apply: ''
            }
        },
        created(){
            this.getCommissionDetailById();
        },
        methods: {
            getCommissionDetailById(){
                let t = this;
                t.$axios.postToken(t.$store.state.urlConfig.getCommissionDetailById, {int_id: t.$route.query.id}).then(res => {
                    t.apply = res.data.data;
                });
            },
        }
    }
</script>

<style scoped lang="scss">

    .info-hd {
        padding: 1.35rem 0;
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
        }
    }

    .initiate-time {
        margin-top: 2.4rem;
        padding: 0 $spaceLF;
        .item {
            label {
                color: #989898;
                width: 5rem;
                text-align: left;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 2rem;
            font-size: $f7;
            color: #333;
            b {
                font-weight: 400;
            }
        }
    }

    .apply-tips {
        color: $fontColor2;
        font-size: $f65;
        line-height: 0.9rem;
        margin-top: 2.5rem;
        text-align: center;
    }

</style>
