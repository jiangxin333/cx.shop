<template>
	<div class="" style="background-color: #fff;">
		<van-nav-bar title="社区合伙人" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>
		<div class="user_msg flex f_row f_sb f_a_c">
			<div class="flex f_row f_a_c">
				<img :src="icon" />
				<p>{{ userName }}</p>
			</div>
			<span>完善信息></span>
		</div>
		<div class=" flex f_col f_a_c">
			<p>当前累计佣金</p>
			<p>￥{{ cumulative }}</p>
		</div>
		<div class="money_box flex f_row f_sb">
			<p>可申请佣金：{{ cash }}</p>
			<span>申请佣金></span>
		</div>
		<div class="extension_menu flex f_col f_a_c" v-for="(item,index) in extensionMenu" :key="index" @click="extensionMenuPath(item.path)">
			<p>{{ item.name }}></p>
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				icon: require('../assets/icon.png'),
				userName:'用户昵称111111',
				cumulative:9999,
				cash:8888,
				extensionMenu:[
					{
						name:'跟踪订单',
						path:'TrackOrder'
					},
					{
						name:'查看业绩',
						path:''
					},
					{
						name:'申请佣金明细',
						path:''
					},
				]
			}
		},
		methods:{
			extensionMenuPath(path){
				this.$router.push({path : "/"+path})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user_msg{
		padding: 30px 5%;
		img{
			border-radius: 50%;
		}
		span{
			color: #1989FA;
		}
	}
	
	.money_box{
		border: $cardBorder;
		padding: 15px 5%;
		span{
			color: #1989FA;
		}
	}
	
	.extension_menu{
		p{
			width: 100%;
			text-align: center;
			border: $cardBorder;
			padding: 15px 0;
		}
	}
</style>e