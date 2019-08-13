<template>
	<div class="commodit_detail_wrap">
		<van-nav-bar title="久邻邻" left-text="返回" left-arrow @click-left="$router.go(-1)" />
		<div class="detail_swiper flex f_row f_j_c f_a_c">
			<img :src="icon" alt="" />
		</div>
		
		<div>
			<p class="detail_title">这里展示商品的标题，若商品的标题过长，则展示多行，商品的标题全部展示完全</p>
			<p class="detail_subtitle">这里展示商品的副标题，若商品的副标题过长，则展示多行，商品的副标题全部展示完全，若没有副标题，则下方内容向上移，不展示副标题</p>
			<div class="price_wrap flex f_row f_sb">
				<div>
					<span>￥</span>
					<p>999.00</p>
				</div>
				<div>
					<span>市场价：</span>
					<p>￥1299.00</p>
				</div>
				<div>
					<span>邮费：</span>
					<p>￥10.00</p>
				</div>
			</div>
		</div>
		
		<div class="detail_tab flex f_row f_sb">
			<p>详情</p>
			<p>评价</p>
		</div>
		<div>
			<p>商品详情</p>
		</div>
		<div>
			<CommodityDetailEvaluateItem v-for='(item,index) in evaluateItem' :key='index' :userAvatar='item.userAvatar' :userName='item.userName' :evaluateTime='item.evaluateTime' :evaluateMsg='item.evaluateMsg'></CommodityDetailEvaluateItem>
			<p class="last_msg">已经到底啦</p>
		</div>
		
		<div class="buy_box flex f_row f_sb">
			<div class="shopcar_box flex f_col f_a_c">
				<img :src="icon" alt="" />
				<p>客服</p>
			</div>
			<div class="shopcar_box flex f_col f_a_c">
				<img :src="icon" alt="" />
				<p>购物车</p>
			</div>
			<div class="buy_button_box flex f_row f_sb f_a_c">
				<button type="button">加入购物车</button>
				<button type="button">立即购买</button>
			</div>
		</div>
		
		<div class="zhuan">赚</div>
	</div>
</template>

<script>
	import CommodityDetailEvaluateItem from '@/components/CommodityDetailEvaluateItem.vue'
	import { NavBar } from 'vant';
	export default{
		components:{
			CommodityDetailEvaluateItem,
			NavBar
		},
		data (){		
			return {
				icon:require("../assets/icon.png"),
				evaluateItem:[
					{
						userAvatar:require("../assets/icon.png"),
						userName:'啊啊啊',
						evaluateTime:'2019-1-1',
						evaluateMsg:'好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好',
					},
					{
						userAvatar:require("../assets/icon.png"),
						userName:'啊啊啊',
						evaluateTime:'2019-1-1',
						evaluateMsg:'好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好',
					},
					{
						userAvatar:require("../assets/icon.png"),
						userName:'啊啊啊',
						evaluateTime:'2019-1-1',
						evaluateMsg:'好好好好好好好好好好好好好好好好好好好好好好好好',
					},
				]
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.commodit_detail_wrap{
		background-color: #fff;
		margin-bottom: 80px;
	}
	.detail_swiper{
		width: 100%;
		height: 50vh;
		background-color: $grayColor;
		img{
		}
	}
	
	.price_wrap{
		div{
			display: flex;
			flex-direction: row;
		}
	}
	
	.detail_tab{
		p{
			width: 50%;
			text-align: center;
			border: 1px solid red;
		}
	}
	
	
	
	.buy_box{
		background-color: #fff;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		border: 1px solid red;
		.shopcar_box{
			width: 15%;
			border-right: 1px solid red;
			img{
				width: 60%;
			}
		}
		.buy_button_box{
			width: 70%;
			button{
				border: none;
				border-radius: 10px;
				width:100%;
				padding:10px 0;
				background-color: $redColor;
				color: #fff;
				margin-right: 5px;
				
			}
			button:nth-child(1){
				background-color: $yellowColor;
				margin-left: 5px;
			}
		}
	}
	
	.zhuan{
		position: fixed;
		right: 5px;
		bottom: 30vh;
		background-color: $redColor;
		color: #fff;
		font-size: 1rem;
		padding: 3px;
		border-radius: 5px;
	}
</style>