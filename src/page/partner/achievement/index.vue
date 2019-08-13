<template>
    <div class="achievement">
        <header>
            <vant-header title="查看业绩"/>
            <div class="fiexd">
                <div class="choice-time">
                    <p class="time">{{choiceTime}}</p>
                    <p class="choice" @click="isShowTime = true">选择时间</p>
                </div>
                <div class="pb-fiexd"></div>
            </div>
        </header>
        <section>
            <template v-if="listIsEmpty">
                <empty :emptyImg="emptyImg" emptyText="当前月您还没有相关业绩"/>
            </template>
            <template v-else>
                <van-list
                    v-model="isDownLoading"
                    :finished="isFinished"
                    finished-text=""
                    @load="getDistributionAchievement"
                    class="noLoading"
                >
                    <div class="achievement-list">
                        <div class="item" v-for="(item,index) in achievementList" :key="index"
                             @click="$router.push({path: '/achievement/detail', query: {oid: item.intOrderId}})">
                            <div class="text-cont">
                                <p><label>订单编号：</label><span v-text="item.intOrderNumber"></span></p>
                                <p><label>结算时间：</label><span v-text="item.datCommissionSettlement"></span></p>
                            </div>
                            <div class="item-right">
                                <div
                                    v-html="$options.filters.formatPriceFb(item.dec_commission || 0,'0','0.85','0.6')"></div>
                                <img src="../../../assets/images/btn_15_next@3x.png" class="arrow_right"/>
                            </div>
                        </div>
                    </div>
                </van-list>
            </template>
        </section>
        <footer>
            <div class="achievement-footer">
                <div class="pt-fiexd"></div>
                <div class="achievement-footer-fiexd">
                    <div class="item">
                        <label>当月佣金总额：</label>
                        <div
                            v-html="$options.filters.formatPriceFb(achievement.total_monthly_commission || 0,'0','0.85','0.6')"></div>
                    </div>
                    <div class="item">
                        <label>当月可申请佣金总额：</label>
                        <div
                            v-html="$options.filters.formatPriceFb(achievement.can_apply_monthly_commission || 0,'0','0.85','0.6')"></div>
                    </div>
                </div>
            </div>
        </footer>

        <van-popup v-model="isShowTime" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                :min-date="new Date(1900, 1, 1)"
                :max-date="new Date()"
                type="year-month"
                @confirm="handlerChoiceTime"
                @cancel="isShowTime = false"
            />
        </van-popup>
    </div>
</template>


<script>
    import empty from '@/components/empty';
    export default{
        components: {
            empty,
        },
        data (){
            return {
                isShowTime: false,
                isDownLoading: false,
                isFinished: false,
                currentDate: new Date(),/*当前时间*/
                choiceTime: '全部',/*选择时间*/
                listIsEmpty: false, /*业绩记录是否为空*/
                isSel: false,/*是否重新选择时间查询*/
                achievement: '',
                achievementList: [],
                emptyImg: require("@/assets/images/tips8.png"),
                pageBox: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    totalPage: ''
                },
            }
        },
        created(){
        },
        methods: {
            handlerChoiceTime(value){
                let t = this;
                t.isShowTime = false;
                t.choiceTime = t.getFormatDate(value);
                t.isSel = true;
                t.pageBox.pageNum=1;
                t.getDistributionAchievement();
            },
            /*分销员查看业绩信息*/
            getDistributionAchievement(){
                let t = this,
                    param = t.pageBox;
                if (t.choiceTime != '全部') {
                    param.choiceTime = t.choiceTime;
                }
                t.$axios.postToken(t.$store.state.urlConfig.getDistributionAchievement, param).then(res => {
                    t.isDownLoading = false;
                    if (t.isSel) {
                        t.achievement = ''
                        t.achievementList = []
                    }
                    res = res.data && res.data.data;
                    if (!res) {
                        t.listIsEmpty = true;
                        return;
                    }
                    t.achievement = res;
                    t.achievementList = t.achievementList.concat(res.list);
                    t.listIsEmpty = t.achievementList.length > 0 ? false : true;
                    t.pageBox.totalPage = res.totalPage;
                    t.pageBox.pageNum += 1;
                    if (t.pageBox.pageNum >= t.pageBox.totalPage) {
                        t.isFinished = true;
                    }
                });
            },
            getFormatDate(date){
                date = new Date(date);
                return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-01';
            },
        }
    }
</script>

<style scoped lang="scss">
    .fiexd {
        .pb-fiexd {
            padding-bottom: 2rem;
        }
    }

    .choice-time {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        z-index: 1000;
        width: calc(100% - 1.5rem);
        padding: .65rem $spaceLF .45rem $spaceLF;
        p {
            font-size: $f65;
            line-height: .9rem;
        }
        .time {
            color: $fontColor2;
        }
        .choice {
            color: $titleColor;
        }
    }

    .achievement-list {
        .item {
            background: #fff;
            height: 4.5rem;
            box-shadow: 0 2px 4px 0 rgba(227, 230, 235, 1);
            border-radius: 0.5rem;
            margin: 0.5rem $spaceLF;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.6rem;
            p {
                line-height: 1.5rem;
                font-size: $f65;
                span {
                    color: $fontColor2;
                }
            }
            .item-right {
                display: flex;
                align-items: center;
            }
            .arrow_right {
                width: 0.4rem;
                height: 0.6rem;
                margin-left: 0.55rem;
            }
        }
    }

    .achievement-footer {
        .achievement-footer-fiexd {
            box-shadow: 0 2px 5px 0 rgba(227, 230, 235, 1);
            height: 2.45rem;
            display: flex;
            align-items: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: calc(100% - 1rem);
            padding: 0 0.5rem;
            background: #fff;

            .item {
                display: flex;
                align-items: center;
                label {
                    font-size: 0.65rem;
                }
                &:first-child {
                    margin-right: 1rem;
                }
            }
        }
        .pt-fiexd {
            padding-top: 2.45rem;
        }
    }
</style>
