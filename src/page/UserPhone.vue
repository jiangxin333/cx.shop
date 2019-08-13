<template>
	<div class="" style="padding-bottom: 10px;">
		<vant-header title="更换手机号码" />
		
		<div class="phone_form_wrap">
			<input type="text" placeholder="请输入您的手机号码" maxlength="11" v-model="userPhone"/>
		</div>
		<div class="phone_form_wrap">
			<input type="text" placeholder="请输入验证码" v-model="phoneCode"/>
			<button type="button" :disabled="isGetCode ? true : false" @click="getCode" v-text="codeBtn">获取验证码</button>
		</div>
		<div class="tips_box">
			<p>更换手机号码后，下次登录可使用新手机号码登录。</p>
			<p>您当前的电话号码为：{{ beforeUserPhone }}</p>
		</div>
		<div class="btn_box">
			<button class="big_btn" type="button" @click="changePhone">确认修改</button>
		</div>

	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				userPhone:'',
				beforeUserPhone:'',
				phoneCode:'',
				isGetCode: false,
                codeBtn: '获取验证码',
                codetime: 59,
			}
		},
		methods:{
			changePhone(){
				var _this=this;
				var url=_this.$store.state.urlConfig.updateNumber
				var thisData={
					'number':_this.userPhone,
					'code':_this.phoneCode
				}
				_this.$axios.postToken(url,thisData).then(res=>{
					if(res.data.code==200){
						//修改信息后需要更新token
						var newUserInfo=JSON.parse(localStorage.getItem('userInfo'))
						newUserInfo.token=res.data.data.token
						localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
						
						_this.$toast(res.data.msg)
						this.$router.go(-1)
					}else{
						_this.$toast(res.data.msg)
					}
				})
			},
			getCode() {
                let t = this;
                t.isGetCode = true;
                t.$axios.get(t.$store.state.urlConfig.getCode + '/' + t.userPhone, {}).then(res => {
                    t.phoneCode = res.data.data;
                    console.log(t.phoneCode)
                    let timer = window.setInterval(function () {
                        t.codeBtn = t.codetime + "s";
                        t.codetime--;
                        if (t.codetime == 0) {
                            clearInterval(timer);
                            t.isGetCode = false;
                            t.codeBtn = "发送验证码";
                            t.codetime = 59;
                            return false;
                        }
                    }, 1000)
                });
            }
		},
		created(){
			var _this=this
			var url=_this.$store.state.urlConfig.getUserInfo
			_this.$axios.getToken(url,'')
			.then(res => {
				console.log(res.data.data)
				_this.beforeUserPhone=res.data.data.str_number
    		});
		}
	}
</script>

<style scoped lang="scss">
	.user_phone_wrap{
		background-color: #Fff;
	}
	
	.phone_form_wrap{
		border-bottom: $cardBorder;
		display: flex;
		font-size: .75rem;
		input{
			display: block;
			width: 100%;
			border: none;
			padding: 0 .75rem;
			line-height: 2.5rem;
		}
		input::-webkit-input-placeholder{
			color: #989898;
		}
		button{
			color: #4184E1;
			border: none;
			background-color: #fff;
			width: 40%;
		}
	}
	
	.tips_box{
		margin: 1rem 0 0 1rem;
		font-size: .65rem;
		color: #989898;
		line-height: 1.15rem;
	}
</style>