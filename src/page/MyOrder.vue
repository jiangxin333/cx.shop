<template>
	<div class="">
		<vant-header title="我的订单" :backPath="'My'" />
		<!--<van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>-->
		
		<div class="order_tab flex f_row f_sb">
			<div v-for="(item,index) in orderTab" @click="orderTabChange(index)">
				<p :style="{'border-bottom': item.tabState ? '0.15rem solid #F7431F' : 'none' , 'color' : item.tabState ? '#222222' : '#989898' , 'font-weight' : item.tabState ? '800' : '100'}">{{ item.tabName }}</p>
			</div>
		</div>
		
		<empty :emptyImg="emptyImg" emptyText="你还没有相关订单" v-if="myOrderList.length==0"/>
		
		<van-list v-model="isLoading" :finished="isFinished" @load="onLoad">
		
			<div class="order_list_box" v-for="(item,index) in myOrderList" :key="index">
				<div class="flex f_row f_sb" @click="orderDetail(item.strStatus,item.orderId)">
					<div class="shop_name flex f_row f_a_c">
						<img src="../assets/shop.png" />
						<p>{{ item.strSupplierName }}啊{{ index+1 }}</p>
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
				<div class="shop_item flex f_row f_a_s" v-for="(item2,index2) in item.casinMyOrderDetailDtoList" :key="index2" @click="$router.push({path: 'detail', query: {pid: item2.intProductId}})">
					<img :src="item2.casinProductImageList[0].strImageAddr" />
					<div class="shop_item_msg flex f_col f_sb">
						<p class="shop_name">{{ item2.strProductTitleA }}</p>
						<div class="">
							<p class="shop_type">{{ item2.strSpecName }}</p>
							<p class="shop_number">X{{ item2.intProductCnt }}</p>
						</div>
						<p class="shop_price">￥<span>{{ item2.decProductPrice }}</span></p>
					</div>
				</div>
				<div class="option_box flex f_sb f_a_c">
					<p class="total_price">合计：￥<span>{{ item.decAmount }}</span></p>
					<div class="option_btn flex f_row f_sb">
						<button type="button" class="next_btn" v-show="item.strStatus==3 || item.strStatus==4">再来一单</button>
						<button type="button" class="next_btn" v-show="item.strStatus==2" @click="confirmReceipt(item.orderId)">确认收货</button>
						<button type="button" class="next_btn" v-show="item.strStatus==0">去支付</button>
						<button type="button" class="next_btn" v-show="item.strStatus==1">查看详情</button>
	

						<button type="button" class="cancel_btn" v-show="item.strStatus==1" @click="refundOrder(item.orderId)">申请退款1</button>
						<button type="button" class="cancel_btn" v-show="item.strStatus==0" @click="cancelOrder(item.orderId)">取消订单</button>
						<button type="button" class="cancel_btn" v-show="item.strStatus==2" @click="seeLogistics(item.orderId)">查看物流</button>
						<button type="button" class="cancel_btn" v-show="item.strStatus==5 || item.strStatus==6 || item.strStatus==7 || item.strStatus==8" @click="deleteOrder(item.orderId)">删除订单</button>
						<button type="button" class="cancel_btn" v-show="item.strStatus==4">已评价</button>
						<button type="button" class="cancel_btn" v-show="item.strStatus==3" @click="commentClick(item.orderId)">去评价</button>
					</div>
				</div>
			</div>
			
			<!--<div @click="onLoad" v-if="isFinished!=true">加载更多</div>-->
		
		</van-list>
			
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
				orderTab:[
					{tabName:'全部',tabState:true},
					{tabName:'待支付',tabState:false},
					{tabName:'待发货',tabState:false},
					{tabName:'待收货',tabState:false},
					{tabName:'已完成',tabState:false},
				],
				myOrderList:[],
				emptyImg:require("@/assets/no_order.png"),
				pageTotal:0,
				thisData:{
					'pageNum':1,
					'pageSize':10,
					'strStatus':'',
					'total':0
				},
				isLoading: false,
     			isFinished: false
			}
		},
		methods:{
			onLoad(){
				var _this=this
				var url=_this.$store.state.urlConfig.getCasinMyOrder;
				_this.$store.state.loading = true;
				setTimeout(() => {
					//每次load页数+1
					_this.thisData.pageNum=_this.thisData.pageNum+1
					_this.$axios.postToken(url,_this.thisData)
					.then(res => {
						console.log(_this.thisData.pageNum)
						_this.pageTotal=res.data.data.total
						res.data.data.list.map(val => {
							_this.myOrderList.push(val)
							
						})
						//
						_this.$store.state.loading = false;
						_this.isLoading = false;
						if (_this.myOrderList.length>=_this.pageTotal) {
				          _this.isFinished = true;
				        }
		    		});
				}, 1000);
					
			},
			orderTabChange(index){
				var _this=this
				for(var i=0;i<_this.orderTab.length;i++){
					_this.orderTab[i].tabState=false
				}
				_this.orderTab[index].tabState=true
				var url=_this.$store.state.urlConfig.getCasinMyOrder;
				switch(index){
					case 0:
						_this.thisData.strStatus=''//全部
						break;
					case 1:
						_this.thisData.strStatus=0 //待支付
						break;
					case 2:
						_this.thisData.strStatus=1 //待发货
						break;
					case 3:
						_this.thisData.strStatus=2 //待收货
						break;
					case 4:
						_this.thisData.strStatus='3,4' //已完成
						break;
				}
				_this.thisData.pageNum=1
				console.log(_this.thisData.strStatus)
				var thisData={
					'pageNum':1,
					'pageSize':10,
					'strStatus':'',
					'total':0
				};
				_this.$axios.postToken(url,_this.thisData)
				.then(res => {
					console.log(res)
					_this.pageTotal=res.data.data.total;
					_this.myOrderList=res.data.data.list;
					//切换tab关闭数据全部加载完成flag
					_this.isFinished = false;
					//console.log(_this.myOrderList)
	    		});
			},
			orderDetail(strStatus,orderId){
				this.$router.push({ path:'/orderDetail' , query : { strStatus : strStatus , orderId : orderId}})
			},
			
			logisticsSee(){
				this.$router.push({ path:'/Logistics' })
			},
			commentClick(orderId){
				this.$router.push({ path:'/Comment' , query : { orderId : orderId}})
			},
			seeLogistics(orderId){
				this.$router.push({ path:'/Logistics' , query : { orderId : orderId}})
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
							_this.$router.go({name : 'MyOrder' , query : { orderType : 1 }})
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
							this.$router.go({name : 'MyOrder' , query : { orderType : "" }})
//				            _this.$router.push({path : 'MyOrder' , query : { orderType : "" }});
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
							_this.$router.go({name : 'MyOrder' , query : { orderType : 3 }})
						}
		    		});
				}).catch(() => {
				  // on cancel
				});
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
							let NewPage = '_empty' + '?time=' + new Date().getTime() / 500;
				            _this.$router.push(NewPage);
				            _this.$router.push({path : 'MyOrder' , query : { orderType : 2 }});
						}
		    		});
				}).catch(() => {
				  // on cancel
				});
			},
		},
		created:function(){
			var _this=this;
			for(var i=0;i<_this.orderTab.length;i++){
				_this.orderTab[i].tabState=false
			}
			var createdTab=0
			switch(_this.$route.query.orderType){
				case '':
					createdTab=0//全部
					break;
				case 0:
					createdTab=1 //待支付
					break;
				case 1:
					createdTab=2 //待发货
					break;
				case 2:
					createdTab=3 //待收货
					break;
				case 3:
					createdTab='3,4' //已完成
					break;
			}
			console.log(createdTab)
			_this.orderTab[createdTab].tabState=true
			var url=_this.$store.state.urlConfig.getCasinMyOrder;
			_this.thisData.strStatus=_this.$route.query.orderType
			_this.$axios.postToken(url,_this.thisData)
			.then(res => {
				_this.pageTotal=res.data.data.total
				_this.myOrderList=res.data.data.list;
				//console.log(_this.myOrderList)
    		});
		},
	}
</script>

<style scoped lang="scss">
	.order_tab{
		padding: .75rem .75rem 0 .75rem; 
		font-size: .65rem;
	    /*position: fixed;
	    top: 2.2rem;
	    left: 0;
	    width: calc( 100% - 1.5rem );
	    background-color: #fff;*/
	}
	/*.van-list{
		margin-top: 1.2rem;
	}*/
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