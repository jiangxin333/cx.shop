<template>
	<div class="">
		<vant-header title="订单详情" backPath.default="/MyOrder" />
		<!--<van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="$router.push({path: '/MyOrder'})" />-->
		
		<div class="order_state_box flex f_row f_sb f_a_c">
			<div>
				<p>{{ orderTypeText }}</p>
				<p>订单将在xxx点xxx分自动关闭</p>
			</div>
			<img :src="orderTypeImg" />
		</div>
		
		<div class="order_list_box">
			<!--商家名称-->
			<div class="flex f_row f_sb">
				<div class="shop_name flex f_row f_a_c">
					<img src="../../../assets/shop.png" />
					<p>{{ thisOrderList.datCreatetime }}</p>
				</div>
			</div>
			<!--商品信息-->
			<div class="shop_item flex f_row f_a_s" v-for="(item,index) in thisOrderList.casinMyOrderDetailDtoList" :key="index">
				<img :src="item.casinProductImageList[0].strImageAddr" />
				<div class="shop_item_msg flex f_col f_sb">
					<p class="shop_name">{{ item.strProductTitleA }}</p>
					<div class="">
						<p class="shop_type">{{ item.strSpecName }}</p>
						<p class="shop_number">X{{ item.intProductCnt }}</p>
					</div>
					<div class="flex f_row f_sb">
						<p class="shop_price">￥<span>{{ item.decProductPrice }}</span></p>
						<p class="shop_commission">预约佣金<span>￥{{ item.decDistributionAmount }}</span></p>
					</div>

				</div>
			</div>
			<!--金额，运费，总额，备注-->
			<div class="all_price_box">
				<p class="order_msg_title">订单信息</p>
				<div class="order_msg_bottom flex f_row f_sb">
					<p class="copy-order-number">订单编号：{{ thisOrderList.intOrderNumber }} </p>
					<span class="copy_btn"  v-clipboard:copy="thisOrderList.intOrderNumber" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
				</div>
				<div class="order_msg_bottom"><p>下单时间：{{ thisOrderList.datCreatetime }}</p></div>
				
			</div>
			<div class="option_box">
				<button type="button" class="cancel_btn">返回</button>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import OrderItem from "@/components/OrderItem.vue"
	import Clipboard from 'clipboard';
	export default {
		components: {
			OrderItem
		},
		data() {
			return {
				thisOrderList:[],
				orderType:0,
				orderTypeText:'',
				orderTypeImg:require('../../../assets/order_dzf.png'),
			}
		},
		methods: {
			onCopy () {
		    	this.$toast('复制成功')
		    },
		    onError () {
		    	this.$toast('您的手机版本暂不支持复制')
		    },
		},
		created:function(){
			var _this=this
			_this.orderType=_this.$route.query.strStatus
			_this.orderId=_this.$route.query.orderId
			
			var url=_this.$store.state.urlConfig.getDistributionOrderDetailInfo+'?orderId='+_this.orderId;
			_this.$axios.postToken(url,'')
			.then(res => {
				//console.log(res);
				_this.thisOrderList=res.data.data
				console.log(_this.thisOrderList);
    		});
			
			//订单图标
			switch(_this.orderType){
					case 0:
						_this.orderTypeText="待支付";
						_this.orderTypeImg=require('../../../assets/order_dzf.png');
						break;
					case 1:
						_this.orderTypeText="待发货"
						_this.orderTypeImg=require('../../../assets/order_dfh.png');
						break;
					case 2:
						_this.orderTypeText="待收货"
						_this.orderTypeImg=require('../../../assets/order_dsh.png');
						break;
					case 3:
						_this.orderTypeText="交易成功"
						_this.orderTypeImg=require('../../../assets/order_ywc.png');
						break;
					case 4:
						_this.orderTypeText="完成评价"
						_this.orderTypeImg=require('../../../assets/order_ywc.png');
						break;
					case 5:
						_this.orderTypeText="已退款"
						_this.orderTypeImg=require('../../../assets/order_ytk.png');
						break;
					case 6:
						_this.orderTypeText="完成售后"
						_this.orderTypeImg=require('../../../assets/order_ysh.png');
						break;
					case 7:
						_this.orderTypeText="已取消"
						_this.orderTypeImg=require('../../../assets/order_yqx.png');
						break;
					case 8:
						_this.orderTypeText="已过期"
						_this.orderTypeImg=require('../../../assets/order_ygq.png');
						break;
				}
		}
	}
</script>

<style scoped lang="scss">
	.order_state_box{
		background:linear-gradient(90deg,rgba(232,73,71,1) 0%,rgba(236,94,70,1) 100%);
		color: #fff;
		padding: 1.85rem .75rem;
		position: relative;
		img{
			margin-right: 1rem;
			height: 100%;
		}
	}
	
	.order_list_box{
		position: relative;
		top: -1.2rem;
		padding: .5rem;
		margin: 0 .75rem;
		border-radius: 10px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 5px 0px rgba(227,230,235,1);
		.shop_name{
			img{
				margin-right: .25rem;
			}
			p{
				color: #333;
				font-size: .65rem;
			}
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
				width: 100%;
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
				.shop_commission{
					font-size: .65rem;
					span{
						margin-left: .5rem;
						color: #F7431F;
					}
				}
			}
		}
		.all_price_box{
			.order_msg_box{
				display: block;
				/*display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;*/
				padding: .2rem 0;
				font-size: .55rem;
				clear:both;
				p{
					float: left;
				}
				span{
					float: right;
					color: #989898;
				}
				.order_remarks{
					float: left !important;
				}
			}
			.order_msg_title{
				border-top: 1px solid #E3E6EB;
				padding-top: .6rem;
				margin-top: .6rem;
				margin-bottom: .4rem;
			}
			.order_msg_bottom{
				padding: .2rem 0;
				color: #989898;
				.copy_btn{
					color: #333;
				}
			}
		}
		.option_box{
			position: fixed;
			width: calc( 100% - 1.5rem );
			padding: .5rem .75rem;
			bottom: 0;
			left: 0;
			background-color: #fff;
			.cancel_btn{
				float: right;
			}
		}
	}
</style>