<template>
	<div class="">
		<vant-header title="退款/售后" />
		
		<empty :emptyImg="emptyImg" emptyText="你还没有相关订单" v-if="myOrderList.length==0"/>
		
		<div class="order_list_box" v-for="(item,index) in myOrderList" :key="index">
			<div class="flex f_row f_sb" @click="orderDetail(item.strStatus,item.orderId)">
				<div class="shop_name flex f_row f_a_c">
					<img src="../assets/shop.png" />
					<p>{{ item.strSupplierName }}</p>
				</div>
				<div class="order_state"> 
					<p v-if="item.strStatus==0">待支付</p>
					<p v-if="item.strStatus==1">待发货</p>
					<p v-if="item.strStatus==2">待收货</p>
					<p v-if="item.strStatus==3">交易成功</p>
					<p v-if="item.strStatus==4">完成评价</p>
					<p v-if="item.strStatus==5">已退款</p>
					<p v-if="item.strStatus==6">完成售后</p>
					<p v-if="item.strStatus==7">已取消</p>
					<p v-if="item.strStatus==8">已过期</p>
				</div>
			</div>
			<div class="shop_item flex f_row f_a_s" v-for="(item2,index2) in item.casinMyOrderDetailDtoList" :key="index2">
				<img :src="item2.casinProductImageList[0].strImageAddr" />
				<div class="shop_item_msg flex f_col f_sb">
					<p class="shop_name">{{ item2.strProductTitleA }}</p>
					<div class="">
						<p class="shop_type">{{ item2.strProductSpec }}</p>
						<p class="shop_number">X{{ item2.intProductCnt }}</p>
					</div>
					<p class="shop_price">￥<span>{{ item2.decProductPrice }}</span></p>
				</div>
			</div>
			<div class="option_box flex f_sb f_a_c">
				<p class="total_price">合计：￥<span>{{ item.decAmount }}</span>.00</p>
				<div class="option_btn flex f_row f_sb">
					<button type="button" class="next_btn" v-show="item.strStatus==3 || item.strStatus==4">再来一单</button>
					<button type="button" class="next_btn" v-show="item.strStatus==2">确认收货</button>
					<button type="button" class="next_btn" v-show="item.strStatus==0">去支付</button>


					<button type="button" class="cancel_btn" v-show="item.strStatus==0">取消订单</button>
					<button type="button" class="cancel_btn" v-show="item.strStatus==2" @click="$router.push({ path:'/Logistics' })">查看物流</button>
					<button type="button" class="cancel_btn" v-show="item.strStatus==5 || item.strStatus==6 || item.strStatus==7 || item.strStatus==8">删除订单</button>
					<button type="button" class="cancel_btn" v-show="item.strStatus==4">已评价</button>
					<button type="button" class="cancel_btn" v-show="item.strStatus==3" @click="$router.push({ path:'/Comment' })">去评价</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import empty from '@/components/empty';
	export default{
		components:{
			empty
		},
		data (){
			return {
				myOrderList:[],
				emptyImg:require("@/assets/no_order.png"),
			}
		},
		methods:{
			
		},
		created:function(){
			var _this=this;
			var url=_this.$store.state.urlConfig.getCasinMyOrder;
			var thisData={
				'pageNum':1,
				'pageSize':10,
				'strStatus':'5,6',
				'total':0
			}
			_this.$axios.postToken(url,thisData)
			.then(res => {
//				console.log(res.data.data.list);
				_this.myOrderList=res.data.data.list;
				console.log(_this.myOrderList)
    		});
		}
	}
</script>

<style scoped lang="scss">
	.order_list_box{
		margin: .5rem .75rem;
		padding: .5rem;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 5px 0px rgba(227,230,235,1);
		border-radius:10px;
		.shop_name{
			img{
				margin-right: .25rem;
			}
			p{
				color: #333;
				font-size: .65rem;
			}
		}
		.order_state{
			color:#FF4E4C;
			font-size: 0.65rem;
			font-weight: 500;
		}
		.shop_item {
			padding:.5rem 0;
			img {
				width: 5.5rem;
				height: 4.75rem;
				flex-shrink: 0;
				margin-right: .5rem;
			}
			.shop_item_msg {
				width: 10.5rem;
				height: 4.75rem;
				.shop_name{
					color: #333;
					font-size: .65rem;
					line-height: 1.1rem;
				}
				.shop_type{
					font-size: .55rem;
					color: #989898;
					padding: 0 .75rem;
					background:rgba(246,246,246,1);
					border-radius:9px;
					line-height: 1.1rem;
					float: left;
				}
				.shop_number{
					color: #989898;
					font-size: .6rem;
					line-height: 1.1rem;
					float: right;
				}
				.shop_price{
					font-size: .55rem;
					span{
						font-size: .65rem;
					}
				}
			}
		}
		.option_box{
			margin-top: .75rem;
			.total_price{
				color:#333333;
				font-size: .55rem;
				span{
						font-size: .65rem;
					}
			}
			.option_btn{
				flex-direction: row-reverse;
				width: 8.5rem;
			}
		}
	}
</style>