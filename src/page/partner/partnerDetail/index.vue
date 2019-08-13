<template>
	<div class="">
		<vant-header title="跟踪订单" />
		<!--<van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>-->
		
		<div class="order_tab flex f_row f_sb">
			<div v-for="(item,index) in orderTab" @click="orderTabChange(index)">
				<p :style="{'border-bottom': item.tabState ? '0.15rem solid #F7431F' : 'none' , 'color' : item.tabState ? '#222222' : '#989898' , 'font-weight' : item.tabState ? '800' : '100'}">{{ item.tabName }}</p>
			</div>
		</div>
		
		<div class="choice-time">
            <p class="time">{{choiceTime}}</p>
            <p class="choice" @click="isShowTime = true">选择时间</p>
        </div>
		
		<empty :emptyImg="emptyImg" emptyText="你还没有相关订单" v-if="myOrderList.length==0"/>
		
		<div>
			<div class="order_list_box" v-for="(item,index) in myOrderList" :key="index">
				<div class="flex f_row f_sb" @click="orderDetail(item.strStatus,item.intOrderId)">
					<div class="shop_name flex f_row f_a_c">
						<img src="../../../assets/shop.png" />
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
							<p class="shop_type">{{ item2.strSpecName }}</p>
							<p class="shop_number">X{{ item2.intProductCnt }}</p>
						</div>
						<div class="flex f_row f_sb">
							<p class="shop_price">￥<span>{{ item2.decProductPriceCount }}</span></p>
							<p class="shop_commission">预计佣金<span>￥{{ item2.decDistributionAmount }}</span></p>
						</div>
						
					</div>
				</div>
				<div class="option_box flex f_sb f_a_c">
					<p class="order_time">下单时间：<span>{{ item.datOrderTime }}</span></p>
				</div>
			</div>
		</div>
		<van-popup v-model="isShowTime" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                :min-date="new Date(1900, 1, 1)"
                :max-date="new Date(2099, 12, 31)"
                type="year-month"
                @confirm="timeSearch"
                @cancel="isShowTime = false"
            />
        </van-popup>
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
				currentDate: new Date(),/*当前时间*/
                choiceTime: '全部',/*选择时间*/
                isShowTime:false,
				orderTab:[
					{tabName:'全部',tabState:true},
					{tabName:'待支付',tabState:false},
					{tabName:'待发货',tabState:false},
					{tabName:'待收货',tabState:false},
					{tabName:'已完成',tabState:false},
				],
				myOrderList:[],
				emptyImg:require("@/assets/no_order.png"),
				thisData:{
					'pageNum':1,
					'pageSize':10,
					'total':0,
					'strStatus':'',
					'datOrderTime':'',
				}
			}
		},
		methods:{
            getFormatDate(date){
                date = new Date(date);
                return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-01';
            },
            timeSearch(value){
            	var _this=this
            	_this.isShowTime=false
            	_this.choiceTime = _this.getFormatDate(value);
				var url=_this.$store.state.urlConfig.getDistributionOrderList;
				if(_this.choiceTime != '全部'){
					_this.thisData.datOrderTime=_this.choiceTime
				}
				_this.$axios.postToken(url,_this.thisData)
				.then(res => {
					console.log(res);
					_this.myOrderList=res.data.data.list
	    		});
            },
			orderTabChange(index){
				var _this=this
				for(var i=0;i<_this.orderTab.length;i++){
					_this.orderTab[i].tabState=false
				}
				_this.orderTab[index].tabState=true
				var url=_this.$store.state.urlConfig.getDistributionOrderList;
				var orderType=''
				switch(index){
					case 0:
						orderType=''//全部
						break;
					case 1:
						orderType=0 //待支付
						break;
					case 2:
						orderType=1 //待发货
						break;
					case 3:
						orderType=2 //待收货
						break;
					case 4:
						orderType=3 //已完成
						break;
				}
				_this.thisData.strStatus=orderType
				if(_this.choiceTime != '全部'){
					_this.thisData.datOrderTime=_this.choiceTime
				}
				_this.$axios.postToken(url,_this.thisData)
				.then(res => {
					console.log(res);
					_this.myOrderList=res.data.data.list
	    		});
			},
			orderDetail(strStatus,orderId){
				console.log(strStatus,orderId)
				this.$router.push({ path:'/partnerDetail/detail' , query : { strStatus : strStatus , orderId : orderId}})
			},
			logisticsSee(){
				this.$router.push({ path:'/Logistics' })
			},
		},
		created:function(){
			var _this=this;
			var url=_this.$store.state.urlConfig.getDistributionOrderList;
			var thisData={
				'pageNum':1,
				'pageSize':10,
				'total':0,
				'strStatus':'',
				'datOrderTime':'',
			}
			_this.$axios.postToken(url,thisData)
			.then(res => {
				console.log(res);
				_this.myOrderList=res.data.data.list
    		});
		}
	}
</script>

<style scoped lang="scss">
	.order_tab{
		padding: .75rem .75rem 0 .75rem; 
		font-size: .65rem;
	}
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
				.shop_commission{
					font-size: .65rem;
					span{
						margin-left: .5rem;
						color: #F7431F;
					}
				}
			}
		}
		.option_box{
			margin-top: .75rem;
			.order_time{
				color:#333333;
				font-size: .55rem;
				span{
						color: #989898;
						font-size: .65rem;
					}
			}
		}
	}
	
	
	.choice-time {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /*position: fixed;
        z-index: 1000;*/
        width: calc(100% - 1.5rem);
        padding: .65rem $spaceLF .45rem $spaceLF;
        /*margin-bottom: .5rem;*/
        p {
            font-size: $f65;
            line-height: .9rem;
        }
        .time {
            color: $fontColor2;
        }
        .choice {
            color: $titleColor;
        }
    }
	
</style>