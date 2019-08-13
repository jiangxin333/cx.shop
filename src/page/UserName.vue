<template>
	<div class="">
		<vant-header title="修改昵称" />
		<input type="text" class="change_name_input" placeholder="请输入您的昵称，1-20个字" v-model="userName"/>
		<div class="btn_box">
			<button class="big_btn" type="button" @click="userNameChange" :style="{ 'opacity':userName ? '1' : '0.5' ,'pointer-events':userName ? 'auto' : 'none'}">确认修改</button>
		</div>

	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				userName:''
			}
		},
		methods:{
			userNameChange(){
				var _this=this
				console.log(_this.userName)
				if(_this.userName == ''){
					_this.$toast('昵称不能为空')
					return;
				}
				var token = localStorage.getItem('token');
//				var url=_this.$store.state.urlConfig.updateNickName+'?str_nick_name='+_this.userName;
				
				var url  = _this.$store.state.urlConfig.updateNickName
				var data = {
					'str_nick_name': _this.userName
				}
				
				_this.$axios.postToken(url, data)
				.then(res => {
					console.log(res.data)
					if(res.data.code==200){
						console.log(_this.userName)
						//修改信息后需要更新tokenyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
						var newUserInfo=JSON.parse(localStorage.getItem('userInfo'))
						newUserInfo.token=res.data.data.token
						localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
						
						_this.$toast('修改成功')
						this.$router.go(-1)
					}
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.change_name_input{
		display: block;
		width: calc( 100% - 1.5rem );
		border: none;
		padding: 0 .75rem;
		line-height: 2.5rem;
	}
	
</style>