<template>
	<div class="">
		<vant-header title="设置" />
		<!--<van-nav-bar title="基本信息" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>-->
		<div class="row_box">
			<p>头像</p>
			<div class="flex f_row f_a_c">
				<div class="avatar_box">
					<img :src="userInfo.str_head" />
					<input type="file" @change="changeAvatar" accept="image/*" multiple />
				</div>
				<img src="../assets/btn_28_next.png" class="next_icon"/>
			</div>

		</div>
		<div class="row_box" @click="$router.push({path: '/UserName'})">
			<p>昵称</p>
			<div class="flex f_a_c">
				<span>{{ userInfo.str_nickname }}</span>
				<img src="../assets/btn_28_next.png" class="next_icon"/>
			</div>
		</div>
		<div class="row_box" @click="$router.push({path: '/UserPhone'})">
			<p>手机号码</p>
			<div class="flex f_a_c">
				<span>{{ userInfo.str_number | phoneXXX }}</span>
				<img src="../assets/btn_28_next.png" class="next_icon"/>
			</div>
		</div>

		<div class="row_box" style="margin-top: 0.5rem;" @click="$router.push({path: '/AddressList'})">
			<p>收货地址</p>
			<div class="flex f_a_c">

				<img src="../assets/btn_28_next.png" class="next_icon"/>
			</div>
		</div>
		
		<button type="button" class="sign_btn" @click="signOut">退出登录</button>
	</div>
</template>

<script>
	import { Dialog } from 'vant';
	import VConsole from 'vconsole'
	export default{
		components:{
			Dialog
		},
		data (){
			return {
				userInfo:{},
			}
		},
		methods:{
			signOut() {
				Dialog.confirm({
				  title: '是否确认退出当前账号？',
				  //message: '是否确认退出当前账号？'
				}).then(() => {
					// 退出token清空
				    localStorage.removeItem('userInfo');
//                  localStorage.removeItem('userInfo');
                    localStorage.removeItem('cartIds');
                    localStorage.removeItem('fxyId');
					this.$router.push({path:'/login'})
				}).catch(() => {
				  // on cancel
				});
			},
			changeAvatar(e){
//				var vConsole = new VConsole();
				var _this=this;
				var uploadImgUrl=_this.$store.state.urlConfig.upload;
				var thisfile=e.target.files[0];//获取文件
				var reader = new FileReader();
				reader.readAsDataURL(thisfile);
				reader.onload = function(e) {//开始上传
					_this.userInfo.str_head = e.target.result;//替换本地头像图片
					var thisdata1=new FormData()
					thisdata1.append('file',thisfile)//图片data
					_this.$axios.postImg(uploadImgUrl,thisdata1).then(res => {//上传到中转平台
						var upAvatarUrl=_this.$store.state.urlConfig.updateHead+'?img_url='+res.data.data.context.fileURL;
						var avatarData={
							'img_url':res.data.data.context.fileURL
						}
						_this.$axios.postImg(upAvatarUrl,'')
						.then(res2 => {//读取图片平台上的URL修改头像
							//修改信息后需要更新token
							var newUserInfo=JSON.parse(localStorage.getItem('userInfo'))
							newUserInfo.token=res2.data.data.token
							localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
							
							_this.$toast('修改成功')
						})
		    		});
				}
			}
		},
		created:function(){
			var _this=this
			var url=_this.$store.state.urlConfig.getUserInfo
			_this.$axios.getToken(url,'')
			.then(res => {
				_this.userInfo=res.data.data
    		});
		},
		filters:{
			phoneXXX(str){
				if(str){
					return str.substr(0,3)+"****"+str.substr(7);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.row_box{
		.avatar_box{
			width: 2.5rem;
			height: 2.5rem;
			position: relative;
			input{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				border-radius: 50%;
				opacity: 0;
			}
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				border: $cardBorder;
			}
		}
	}
	.sign_btn{
		width: 100%;
		height: 2.45rem;
		border: none;
		background-color: #E84947;
		color: #fff;
		font-size: .8rem;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
