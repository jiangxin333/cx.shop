<template>
    <div class="content">
        <vant-header title="选择城市"/>
        <div class="location">
            <div class="l-title">GPS定位</div>
            <div class="address">
                <div class="item active">
                    <span v-text="cityName"></span>
                </div>
                <div class="item selected" v-if="code == 300">
                    <span>定位失败</span>
                    <div class="tips">
                        <img src="../assets/images/btn_01_location@3x.png"/>
                        <b>重新定位</b>
                    </div>
                </div>
                <div class="item active" v-if="code == 200">
                    <span v-text="cityName"></span>
                    <div class="tips">
                        <img src="../assets/images/icon_01_remind@3x.png"/>
                        <b>暂无该城市业务</b>
                    </div>
                </div>
            </div>
            <div class="l-title">选择城市</div>
            <div class="address">
                <div class="item" v-for="(item,index) in city" :key="index" @click="changeCity(item.ci_name)"><span v-text="item.ci_name"></span></div>
            </div>
            <div class="no-more">已经到底啦</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                code: '',
                cityName: localStorage.getItem('cityName') || '定位失败', /*城市名*/
                city: []
            }
        },
        created(){
            let t = this;
            t.code = t.$route.query.code || '';
            t.getCityList();
        },
        methods: {
            /*获取城市列表*/
            getCityList(){
                let t = this;
                t.$axios.post(t.$store.state.urlConfig.getCityList, '').then(res => {
                    t.city = res.data.data;
                });
            },
            /*切换城市*/
            changeCity(cname){
                let t = this;
                t.cityName = cname;
                localStorage.setItem('cityName', cname);
                t.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="scss">


    .l-title {
        color: $fontColor2;
        font-size: $f7;
        padding: 0.5rem $spaceLF;
    }

    .no-more {
        color: #bbb;
        padding: 0.5rem $spaceLF;
        font-size: $f65;
        text-align: center;
    }

    .address {
        background: #fff;

        .item {
            display: flex;
            align-items: center;
            border-bottom: $cardBorder;
            padding: 0 $spaceLF;
            height: 2.2rem;
            line-height: 2.2rem;
            color: $titleColor;
            font-size: $f75;
            font-weight: 400;
            &.active span {
                height: 1.5rem;
                line-height: 1.5rem;
                padding: 0 1.65rem;
                border: $cardBorder !important;
                border-radius: 1rem;
            }

            &:last-child {
                content: '';
                border: 0 !important;
            }
            &.selected {
                justify-content: space-between;
            }
        }
        .tips {
            display: flex;
            align-items: center;
            font-size: $f6;
            color: $yellowColor;
            margin-left: 0.5rem;
            b {
                font-weight: 400;
            }
            img {
                width: 0.6rem;
                height: 0.6rem;
                margin-right: 0.25rem;
            }
        }
    }
</style>
