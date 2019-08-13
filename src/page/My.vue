<template>
	<div class="">
		<!--<van-nav-bar title="久邻邻" left-text="返回" left-arrow @click-left="$router.go(-1)" />-->
		<div class="user_msg_wrap flex f_row f_sb">
			<div class="user_msg_box flex f_row ">
				<img class="avatar_img" :src="userInfo.str_head" @click="$router.push({path:'/BasicMessage'})"/>
				<div class="user_msg_right flex f_col f_sa">
					<p alt="123123123">{{ userInfo.str_nickname }}</p>
					<span>{{ userInfo.str_number | phoneXXX }}</span>
				</div>
			</div>
			<img class="set_icon" src="../assets/nav_08_set.png" @click="$router.push({path:'/BasicMessage'})" />
		</div>

		<div class="my_main_box">
			<div class="my_menu_wrap">
				<div class="my_menu_title flex f_row f_sb f_a_c">
					<p>我的订单</p>
					<span @click="$router.push({path : 'MyOrder' , query : { orderType : '' }})" class="flex f_row f_a_c">查看更多订单<img :src="nextIcon" style="margin-left: 10px;"/></span>
				</div>
				<div class="my_menu_item_wrap flex f_row f_sb">
					<div class="my_menu_item" v-for="(item,index) in orderMenu" @click="$router.push({path: '/' + item.path , query : { orderType : item.orderType }})">
						<div class="my_menu_item_img_box">
							<img :src="item.icon" />
							<div class="check_point" v-if="item.checkPoint"></div>
						</div>
						
						<span>{{ item.txt }}</span>
					</div>
				</div>
			</div>

			<!--<div class="my_menu_wrap">
				<div class="my_menu_title flex f_row f_sb f_a_c">
					<p>我的房屋</p>
					<span class="flex f_row f_a_c">查看全部<img :src="nextIcon" style="margin-left: 10px;"/></span>
				</div>
				<div class="house_box flex f_row f_j_c f_sb">
					<p>添加/绑定 房屋信息</p>
				</div>
			</div>-->

			<div class="my_menu_wrap">
				<div class="my_menu_title flex f_row f_sb f_a_c">
					<p>更多</p>
				</div>
				<div class="my_menu_item_wrap flex f_row f_sb">
					<div class="my_menu_item" v-for="(item,index) in myMenu1" @click="$router.push({path: '/' + item.path})" v-if="item.isSHow">
						<img :src="item.icon" />
						<span>{{ item.txt }}</span>
					</div>
				</div>
			</div>
			<!--<MyMenuItem v-for="(item,index) in myMenu1" :key="index" @click.native='myMenuPath(item.path)' :itemIcon='item.icon' :itemTxt='item.txt'></MyMenuItem>-->
		</div>

        <vant-footer active="2"/>
	</div>
</template>

<script>
	import MyMenuItem from '@/components/MyMenuItem.vue';
	import { Dialog } from 'vant';
	export default {
		components: {
			MyMenuItem,
			Dialog
		},
		data() {
			return {
				//tabbar参数变量
				TabarActive: 2,
				userInfo:{},
				icon: {
					normal: '//img.yzcdn.cn/icon-normal.png',
					active: '//img.yzcdn.cn/icon-active.png'
				},
				nextIcon: require("../assets/btn_28_next.png"),
				orderMenu: [
					{
						icon: require("../assets/btn_23.png"),
						txt: '待支付',
						path: 'MyOrder',
						orderType:0,
						checkPoint:false
					},
					{
						icon: require("../assets/btn_24.png"),
						txt: '待发货',
						path: 'MyOrder',
						orderType:1,
						checkPoint:false
					},
					{
						icon: require("../assets/btn_25.png"),
						txt: '待收货',
						path: 'MyOrder',
						orderType:2,
						checkPoint:false
					},
					{
						icon: require("../assets/btn_26.png"),
						txt: '已完成',
						path: 'MyOrder',
						orderType:'3,4',
						checkPoint:false
					},
					{
						icon: require("../assets/btn_27.png"),
						txt: '退款/售后',
						path: 'AfterSale',
						checkPoint:false
					},

				],
				myMenu1: [
					{
						icon: require("../assets/btn_30.png"),
						txt: '我的评价',
						path: 'MyComment',
						isSHow: true
					},
					{
						icon: require("../assets/btn_31.png"),
						txt: '社区合伙人',
						path: 'partner',
						isSHow: false
					},
					{
						icon: require("../assets/btn_32.png"),
						txt: '交易记录',
						path: 'TransactionRecord',
						isSHow: true
					},
					{
						icon: require("../assets/btn_33.png"),
						txt: '意见反馈',
						path: 'Feedback',
						isSHow: true
					},
				],
			}
		},
		methods: {
		},
		created:function(){
			var _this=this
			var url=_this.$store.state.urlConfig.getUserInfo
			_this.$axios.getToken(url,'')
			.then(res => {
				console.log(res.data.data)
				_this.userInfo=res.data.data
				if(_this.userInfo.type==3){//type3社区合伙人 type4普通 
					_this.myMenu1[1].isSHow=true
				}
    		});
    		
    		var url2=_this.$store.state.urlConfig.getNotCheckNumber;
    		console.log(url2)
    		_this.$axios.postToken(url2,'')
			.then(res => {
				_this.orderMenu[0].checkPoint=res.data.data.check_unpaid
				_this.orderMenu[1].checkPoint=res.data.data.check_unshipments
				_this.orderMenu[2].checkPoint=res.data.data.check_unreceived
				_this.orderMenu[3].checkPoint=res.data.data.check_completed
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
	/*用户信息*/
	.user_msg_wrap {
		background: url(../assets/my_usermsg.png) no-repeat 0 0;
		background-size: 100% 100%;
		height: 7.25rem;
		color: #fff;
		padding: 0 1rem;
		.user_msg_box{
			margin-top: 2.125rem;
			.avatar_img {
				border: 2px solid #fff;
				border-radius: 50%;
				margin-right: 15px;
				width: 2.75rem;
				height: 2.75rem;
			}
			.user_msg_right{
				height: 2.75rem;
			}
			p {
				color: #FFFFFF;
				font-size: 1rem;
			}
			span{
				color: #FEFEFE;
				font-size: .55rem;
			}
		}
		.set_icon{
			width: 1rem;
			height: 1rem;
			margin-top: 1.5rem;
		}
	}

	/*订单menu*/

	.my_menu_wrap {
		background-color: #fff;
		margin: 20px 20px;
		border-radius: $cardRadius;
		.my_menu_title {
			padding: 0 .5rem;
			border-bottom: $cardBorder;
			p {
				font-size: 0.7rem;
				padding: 0.75rem 0;
				color: $titleColor;
			}
			span {
				font-size: 0.55rem;
				color: $grayColor;
			}
		}
		.my_menu_item_wrap{

		}
		.my_menu_item {
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: .75rem 0;
			
			.my_menu_item_img_box{
				position: relative;
				.check_point{
					position: absolute;
					right: -1px;
					top: -3px;
					width: .35rem;
					height: .35rem;
					background:rgba(255,0,0,1);
					border:2px solid rgba(255, 255, 255, 1);
					border-radius: 50%;
				}
				img {
					
				}
			}
			span {
				margin-top: 0.45rem;
			}
		}
		.house_box{
			padding: 1rem 0;
			p{
				color: #E84947;
				font-size: .6rem;
			}
		}
	}
	/*选项菜单*/

	.my_menu_top {
		margin-bottom: 10px;
	}
</style>
