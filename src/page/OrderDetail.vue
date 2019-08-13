<template>
	<div class="">
		<vant-header title="订单详情" backPath.default="/MyOrder" />
		
		<div class="order_state_box flex f_row f_sb f_a_c">
			<div class="flex f_row f_sb f_a_c" style="width: 100%;">
				<div style="line-height: 1.1rem;color: #fff;">
					<p>{{ orderTypeText }}</p>
					<p v-if="orderType==0">订单将在{{ thisOrderList.datOverdue }}自动关闭</p>
					<p v-if="orderType==2">宝贝正在路上，请您注意查收。</p>
					<p v-if="orderType==1">我们将尽快发货，请您耐心等待。</p>
				</div>
				<img :src="orderTypeImg" />
			</div>
				
			<div class="main">
				<div class="address_box flex f_col">
					<div class="userinfo_card flex f_row">
						<img src="../assets/maps-and-flags-1.png" />
						<div class="address_text_box flex f_col f_sb">
							<p><span style="font-size: .75rem;font-weight:400;">{{ thisOrderList.strConsignee }}</span><span style="color:#989898;margin-left: .25rem;">{{ thisOrderList.strConsigineePhone }}</span></p>
							<p>{{ thisOrderList.strAddress }}</p>
						</div>
					</div>
					<div class="logistics_box userinfo_card flex f_row f_sb f_a_c" v-if="orderType==2 || orderType==3" @click="seeLogistics(orderId)">
						<img src="../assets/order_dfh.png" />
						<div class="address_text_box flex f_col f_sb">
							<p style="color:#0091FF;">{{ context }}</p>
							<p style="color:#989898;">{{ ftime }}</p>
						</div>
						<img src="../assets/images/btn_28_next@3x.png" />
					</div>
				</div>
				<div class="order_list_box">
					<!--商家名称-->
					<div class="shop_name flex f_row f_a_c">
						<img src="../assets/shop.png" />
						<p>{{ thisOrderList.strSupplierName }}</p>
					</div>
					<!--商品信息-->
					<div class="shop_item flex f_row f_a_s" v-for="(item,index) in thisOrderList.casinMyOrderDetailDtoList" :key="index">
						<img :src="item.casinProductImageList[0].strImageAddr" />
						<div class="shop_item_msg flex f_col f_sb">
							<p class="shop_name">{{ item.strProductTitleA }}</p>
							<div class="">
								<p class="shop_type">{{ item.strProductSpec }}</p>
								<p class="shop_number">X{{ item.intProductCnt }}</p>
							</div>
							<p class="shop_price">￥<span>{{ item.decProductPrice }}</span></p>
						</div>
					</div>
					<!--金额，运费，总额，备注-->
					<div class="all_price_box">
						<div class="order_msg_box"><p>商品金额：</p><span>￥{{ thisOrderList.decAmount }}</span></div>
						<div class="order_msg_box"><p>运费：</p><span>￥{{ thisOrderList.decPostage }}</span></div>
						<div class="order_msg_box"><p>订单备注：</p><p class="order_remarks">{{ thisOrderList.strBuyerMessage }}</p></div>
						<div class="order_msg_box"><p>订单总价：</p><span>￥{{ thisOrderList.decAmount }}</span></div>
						<div style="clear: both;"></div>
						
						<p class="order_msg_title">订单信息</p>
						<div class="order_msg_bottom flex f_row f_sb">
							<p class="copy-order-number">订单编号：{{ thisOrderList.orderId }} </p>
							<span class="copy_btn"  v-clipboard:copy="thisOrderList.orderId" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
						</div>
						<div class="order_msg_bottom"><p>下单时间：{{ thisOrderList.datCreatetime }}</p></div>
					</div>
					<div class="option_box flex f_sb f_a_c">
						<img src="../assets/kf.png" />
						<div class="option_btn flex f_row">
							<button type="button" class="cancel_btn" v-show="thisOrderList.strStatus==1" @click="refundOrder(orderId)">申请退款</button>
							<button type="button" class="cancel_btn" v-show="thisOrderList.strStatus==0" @click="cancelOrder(orderId)">取消订单</button>
							<button type="button" class="cancel_btn" v-show="thisOrderList.strStatus==3 || thisOrderList.strStatus==5 || thisOrderList.strStatus==6 || thisOrderList.strStatus==7 || thisOrderList.strStatus==8" @click="deleteOrder(orderId)">删除订单</button>
							<button type="button" class="cancel_btn" v-show="thisOrderList.strStatus==2 || thisOrderList.strStatus==3" @click="seeLogistics(orderId)">查看物流</button>
							<button type="button" class="cancel_btn" v-show="thisOrderList.strStatus==4">已评价</button>
							<button type="button" class="cancel_btn" v-show="thisOrderList.strStatus==3" @click="commentClick(orderId)">去评价</button>
						
							<button type="button" class="next_btn" v-show="thisOrderList.strStatus==3 || thisOrderList.strStatus==4">再来一单</button>
							<button type="button" class="next_btn" v-show="thisOrderList.strStatus==2">确认收货</button>
							<button type="button" class="next_btn" v-show="thisOrderList.strStatus==0">去支付</button>
						</div>
					</div>
				</div>
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
				context:'',
				ftime:'',
				orderType:0,
				orderId:'',
				orderTypeText:'',
				orderTypeImg:require('../assets/order_dzf.png'),
			}
		},
		methods: {
			onCopy () {
		    	this.$toast('复制成功')
		    },
		    onError () {
		    	this.$toast('您的手机版本暂不支持复制')
		    },
			//取消订单
			cancelOrder(orderId){
				var _this=this;
				var url=_this.$store.state.urlConfig.updataCasinOrderStatusToCancel;
				var thisData={
					'casinOrderId':orderId,
				}
				this.$dialog.confirm({
				    title: '确认',
				    message: '是否确认取消该订单'
				}).then(() => {
					_this.$axios.postToken(url,thisData)
					.then(res => {
						console.log(res);
						if(res.data.code==200){
							_this.$toast(res.data.msg)
							_this.$router.push({path : 'MyOrder' , query : { orderType : '0' }})
						}
		    		});
				}).catch(() => {
				  // on cancel
				});
					
			},
			//删除订单
			deleteOrder(orderId){
				var _this=this;
				var url=_this.$store.state.urlConfig.delCasinOrder;
				var thisData={
					'casinOrderId':orderId,
				}
				this.$dialog.confirm({
				    title: '确认',
				    message: '是否确认删除该订单'
				}).then(() => {
					_this.$axios.postToken(url,thisData)
					.then(res => {
						console.log(res);
						if(res.data.code==200){
							_this.$toast(res.data.msg)
							_this.$router.push({path : 'MyOrder' , query : { orderType : 0 }})
						}
		    		});
				}).catch(() => {
				  // on cancel
				});
			},
			//确认收货
			confirmReceipt(orderId){
				var _this=this;
				var url=_this.$store.state.urlConfig.confirmReceipt;
				var thisData={
					'casinOrderId':orderId,
				}
				this.$dialog.confirm({
				    title: '确认',
				    message: '是否确认收货'
				}).then(() => {
					_this.$axios.postToken(url,thisData)
					.then(res => {
						console.log(res);
						if(res.data.code==200){
							_this.$toast(res.data.msg)
							_this.$router.push({path : 'MyOrder' , query : { orderType : 2 }})
						}
		    		});
				}).catch(() => {
				  // on cancel
				});
			},
			//查询物流
			seeLogistics(orderId){
				this.$router.push({ path:'/Logistics' , query : { orderId : orderId}})
			},
			//退款
			refundOrder(orderId){
				var _this=this;
				var url=_this.$store.state.urlConfig.updataCasinOrderStatusToRefunded;
				var thisData={
					'casinOrderId':orderId,
				}
				this.$dialog.confirm({
				    title: '确认',
				    message: '是否确认退款'
				}).then(() => {
					_this.$axios.postToken(url,thisData)
					.then(res => {
						console.log(res);
						if(res.data.code==200){
							_this.$toast(res.data.msg)
							_this.$router.push({path : 'MyOrder' , query : { orderType : 1 }})
						}
		    		});
				}).catch(() => {
				  // on cancel
				});
			},
			//评价
			commentClick(orderId){
				this.$router.push({ path:'/Comment' , query : { orderId : orderId}})
			},
		},
		created:function(){
			var _this=this
			_this.orderType=_this.$route.query.strStatus
			_this.orderId=_this.$route.query.orderId
			
			
			var url=_this.$store.state.urlConfig.getOrderDetailInfoByOrderId+'?orderId='+_this.orderId;
			var thisData={
				'orderId ':_this.orderId,
			}
			_this.$axios.postToken(url,'')
			.then(res => {
//				console.log(res);
				_this.thisOrderList=res.data.data
				if(res.data.data.orderLogisticsDetail){
					_this.context=res.data.data.orderLogisticsDetail.context
					_this.ftime=res.data.data.orderLogisticsDetail.ftime
				}
				console.log(_this.thisOrderList);
    		});
			
			//订单图标
			switch(_this.orderType){
					case '0':
						_this.orderTypeText="待支付";
						_this.orderTypeImg=require('../assets/order_dzf.png');
						break;
					case '1':
						_this.orderTypeText="待发货"
						_this.orderTypeImg=require('../assets/order_dfh.png');
						break;
					case '2':
						_this.orderTypeText="待收货"
						_this.orderTypeImg=require('../assets/order_dsh.png');
						break;
					case '3':
						_this.orderTypeText="交易成功"
						_this.orderTypeImg=require('../assets/order_ywc.png');
						break;
					case '4':
						_this.orderTypeText="完成评价"
						_this.orderTypeImg=require('../assets/order_ywc.png');
						break;
					case '5':
						_this.orderTypeText="已退款"
						_this.orderTypeImg=require('../assets/order_ytk.png');
						break;
					case '6':
						_this.orderTypeText="完成售后"
						_this.orderTypeImg=require('../assets/order_ysh.png');
						break;
					case '7':
						_this.orderTypeText="已取消"
						_this.orderTypeImg=require('../assets/order_yqx.png');
						break;
					case '8':
						_this.orderTypeText="已过期"
						_this.orderTypeImg=require('../assets/order_ygq.png');
						break;
				}

		}
	}
</script>

<style scoped lang="scss">
	.order_state_box{
		background:linear-gradient(90deg,rgba(232,73,71,1) 0%,rgba(236,94,70,1) 100%);
		/*color: #fff;*/
		padding: 1.85rem .75rem;
		position: relative;
		margin-bottom: 2.75rem;
		.main{
			position: absolute;
		    top: 5.5rem;
			left: 0;
			width: 100%;
			.address_box{
				border-radius:10px;
				background-color: #fff;
				color: #333;
				font-size: .55rem;
				width: calc( 100% - 1.5rem );
				margin: 0 .75rem;
				.userinfo_card{
					padding: .75rem;
					line-height:.9rem;
					.address_text_box {
						margin:0 1rem;
					}
				}
				.logistics_box{
					border-top: 1px solid #E6E6E6;
				}
			}
		}
		
	}
	
	.order_list_box{
		padding: .75rem;
		margin-top: .5rem;
		margin-bottom: 5rem;
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
			}
		}
		.all_price_box{
			padding-top: .6rem;
			margin-top: .6rem;
			border-top: 1px solid #E3E6EB;
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
					line-height: .8rem;
					float: left;
				}
				span{
					line-height: .8rem;
					float: right;
					color: #989898;
				}
				.order_remarks{
					line-height: .8rem;
					color: #989898;
					float: left !important;
					margin-left: .5rem;
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
			width: calc( 100% - .75rem );
			padding: .5rem 0 .5rem .75rem;
			bottom: 0;
			left: 0;
			background-color: #fff;
			.option_btn{
				button{
					margin-right: .4rem;
				}
			}
		}
	}
</style>