<template>
    <div class="perfect">
        <header>
            <vant-header title="完善信息"/>
        </header>
        <section>
            <div class="perfect-box">
                <div class="title">为了您能准确收到佣金，需要您完善以下信息：</div>
                <div class="field-group">
                    <div class="item">
                        <label>开户银行</label>
                        <input
                            type="text"
                            placeholder="请输入开户银行"
                            v-model="form.str_bank"
                            @blur.prevent="handleInput"/>
                    </div>
                    <div class="item">
                        <label>银行卡号</label>
                        <input
                            type="tel"
                            placeholder="请输入正确的银行卡号"
                            v-model="form.str_bank_card"
                            @blur.prevent="handleInput"
                            maxlength="19"/>
                    </div>
                    <div class="item">
                        <label>账户名</label>
                        <input
                            type="text"
                            placeholder="输入正确的开户银行账户名"
                            v-model="form.str_bank_name"
                            @blur.prevent="handleInput"
                            maxlength="20"
                        />
                    </div>
                </div>
                <p class="tips">
                    <img src="../../assets/images/icon_tips.png"/>在申请佣金流程期间，不允许修改银行账户信息，若有改动，请在未申请佣金期间修改您的银行账户信息。
                </p>
            </div>
            <button
                class="submit-btn"
                :class="isSubmit ? 'disabled' : ''"
                :disabled="isSubmit ? true : false"
                @click="updateDistributionBankInfo"
            >提交
            </button>
        </section>
    </div>
</template>


<script>
    import {Toast} from 'vant';
    export default{
        components: {
            Toast
        },
        data (){
            return {
                form: {},
                isSubmit: true
            }
        },
        created(){
        },
        methods: {
            handleInput(){
                let t = this;
                if (t.form.str_bank && t.form.str_bank_card && t.form.str_bank_name) {
                    t.isSubmit = false;
                } else {
                    t.isSubmit = true;
                }
            },
            updateDistributionBankInfo(){
                let t = this;
                t.isSubmit = true;
                t.$axios.postToken(t.$store.state.urlConfig.updateDistributionBankInfo, t.form).then(res => {
                    t.isSubmit = false;
                    if(res.data.status == 0){
                    	t.$router.go(-1);                    	
                    }                   
                });
            }
        },
        created:function(){
        	var _this=this
			var url=_this.$store.state.urlConfig.getMyDistributionInfo
			_this.$axios.postToken(url,'')
			.then(res => {
				console.log(res)
				_this.form.str_bank=res.data.str_bank
				_this.form.str_bank_card=res.data.str_bank_card
				_this.form.str_bank_name=res.data.str_bank_name
    		});
        }
    }
</script>

<style scoped lang="scss">
    .tips {
        color: $fontColor2;
        font-size: $f55;
        margin: 1.05rem $spaceLF;
        img {
            width: 0.6rem;
            height: 0.6rem;
            display: inline-block;
            vertical-align: text-top;
        }
    }

    .submit-btn {
        border: none;
        height: 2.25rem;
        font-size: $f75;
        border-radius: 2rem;
        color: #fff;
        background: linear-gradient(to right, #FE784F, #FF4E4C);
        margin: 0 1.25rem;
        width: calc(100% - 2.5rem);
        position: absolute;
        bottom: 2rem;
        &.disabled {
            opacity: 0.5;
        }
    }

    .perfect-box {
        .title {
            font-size: $f65;
            color: $titleColor;
            text-align: center;
            padding: 1rem 0;
        }
        .field-group {
            background: #fff;
            padding: 0 $spaceLF;
            .item {
                height: 2.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: $cardBorder;
                &:last-child {
                    border: none;
                }
                input,
                label {
                    width: 2.6rem;
                    font-size: $f65;
                    color: $titleColor;
                    margin-right: 0.9rem;
                }
                input {
                    border: none;
                    flex: 1;
                    margin-right: 0;
                }
            }
        }
    }
</style>
