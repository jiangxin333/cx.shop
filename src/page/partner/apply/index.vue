<template>
    <div class="achievement">
        <header>
            <vant-header title="申请佣金明细">
                <div slot="rights">
                    <p class="choice-time" @click="isShowTime = true">选择时间</p>
                </div>
            </vant-header>
        </header>
        <section>
            <div class="eum-status">
                <div class="eum-status-box">
                    <p :class="eum_status==='' ? 'active':''" @click="changeEumStatus('')">全部</p>
                    <p :class="eum_status===0 ? 'active':''" @click="changeEumStatus(0)">处理中</p>
                    <p :class="eum_status===1 ? 'active':''" @click="changeEumStatus(1)">已处理</p>
                </div>
                <div class="pb-eum-status"></div>
            </div>
            <template v-if="listIsEmpty">
                <empty :emptyImg="emptyImg" emptyText="您还没有相关佣金明细"/>
            </template>
            <template v-else>
                <van-list
                    v-model="isDownLoading"
                    :finished="isFinished"
                    finished-text="我是有底线的"
                    @load="getCommissionDetail"
                    class="noLoading"
                >
                    <div class="apply-list">
                        <div class="item-cont" v-for="(item,index) in achievementList" :key="index">
                            <div class="tit">{{item.dat_apply_time | ftime}}</div>
                            <div class="item"
                                 @click="$router.push({path: '/apply/detail', query: {id: item.int_id}})">
                                <div class="text-cont">
                                    <p class="times"><label>发起时间：</label><span v-text="item.dat_apply_time"></span></p>
                                    <p><label>提现金额：</label>¥ <span v-text="item.str_use_total_amount"></span></p>
                                    <p>
                                        <label>提现结果：</label>
                                        <span v-if="item.eum_status == 0" class="active">处理中</span>
                                        <span v-if="item.eum_status == 1">已处理</span>
                                    </p>
                                </div>
                                <div class="item-right">
                                    <div>查看详情</div>
                                    <img src="../../../assets/images/btn_15_next@3x.png" class="arrow_right"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </template>
        </section>
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
                currentDate: new Date(), /*当前时间*/
                choiceTime: '', /*选择时间*/
                listIsEmpty: false, /*业绩记录是否为空*/
                isSel: false, /*是否重新选择时间查询*/
                eum_status: '', /*申请状态*/
                emptyImg: require("@/assets/images/tips8.png"),
                achievement: '',
                achievementList: [],
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
        filters: {
            ftime(value) {
                let date = new Date(value);
                let year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate();
                month = month < 10 ? "0" + month : month;
                day = day < 10 ? "0" + day : day;
                return year + "年" + month + "月";
            }
        },
        methods: {
            handlerChoiceTime(value){
                let t = this;
                t.isShowTime = false;
                t.choiceTime = t.getFormatDate(value);
                t.isSel = true;
                t.pageBox.pageNum = 1;
                t.getCommissionDetail();
            },
            /*切换状态*/
            changeEumStatus(s){
                let t = this;
                t.eum_status = s;
                t.isSel = true;
                t.pageBox.pageNum = 1;
                t.getCommissionDetail();
            },
            /*查看申请佣金明细*/
            getCommissionDetail(){
                let t = this,
                    param = t.pageBox;
                if (t.choiceTime) {
                    param.query_apply_time = t.choiceTime;
                }
                param.eum_status = t.eum_status;
                t.$axios.postToken(t.$store.state.urlConfig.getCommissionDetail, param).then(res => {
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
        color: $titleColor;
        font-size: $f75;
    }

    .pb-eum-status {
        padding-bottom: 2.4rem;
    }

    .eum-status-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 $spaceLF;
        height: 2.4rem;
        background: #f8f8f8;
        position: fixed;
        top: 2.2rem;
        left: 0;
        width: calc(100% - 1.5rem);
        p {
            font-size: $f65;
            color: $fontColor2;
            line-height: .9rem;
            border-bottom: .15rem solid #f8f8f8;
            &.active {
                color: $titleColor;
                font-weight: 500;
                border-bottom: .15rem solid rgb(247, 67, 31);
            }
        }
    }

    .apply-list {
        .item-cont {
            background: #fff;
            box-shadow: 0 2px 4px 0 rgba(227, 230, 235, 1);
            border-radius: 0.5rem;
            margin: 0 $spaceLF 0.5rem $spaceLF;
            padding: 0 0.6rem;
            .tit {
                padding: 0.55rem 0.6rem;
                margin: 0 -0.6rem;
                border-bottom: 1px solid #e6e6e6;
                font-size: $f65;
                color: $fontColor2;
            }
        }
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 0;
            p {
                line-height: 1.2rem;
                font-size: $f65;
                span {
                    color: $titleColor;
                    &.active {
                        color: #FF4E4C;
                    }
                }
                &.times {
                    span {
                        color: $fontColor2;
                    }
                }
            }
            .item-right {
                div {
                    font-size: $f65;
                }
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

</style>
