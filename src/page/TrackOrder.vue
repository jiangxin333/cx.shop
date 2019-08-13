<template>
	<div class="" style="background-color: #fff;">
		<van-nav-bar title="跟踪订单" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>
		<van-tabs v-model="active">
		  <van-tab title="全部">
		  	<div class="order_list flex f_row f_sb f_a_c" v-for="(item,index) in orderList" :key="index">
		  		<div>
		  			<p>订单编号：{{ item.orderNumber }}</p>
			  		<p>下单时间：{{ item.orderTime }}</p>
			  		<p>订单状态：{{ item.orderType }}</p>
		  		</div>
		  		<span @click="$router.push({path:'/TrackOrderDetail'})">查看详情></span>
		  	</div>
		  </van-tab>
		  <van-tab title="待支付"></van-tab>
		  <van-tab title="待发货"></van-tab>
		  <van-tab title="待收货"></van-tab>
		  <van-tab title="已完成"></van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				active:0,
				orderList:[
					{
						orderNumber:'500000000000000000',
						orderTime:'YYYY-MM-DD  H24:mm:ss',
						orderType:'已过期'
					},
					{
						orderNumber:'500000000000000000',
						orderTime:'YYYY-MM-DD  H24:mm:ss',
						orderType:'已过期'
					},
					{
						orderNumber:'500000000000000000',
						orderTime:'YYYY-MM-DD  H24:mm:ss',
						orderType:'已过期'
					},
					{
						orderNumber:'500000000000000000',
						orderTime:'YYYY-MM-DD  H24:mm:ss',
						orderType:'已过期'
					},
					{
						orderNumber:'500000000000000000',
						orderTime:'YYYY-MM-DD  H24:mm:ss',
						orderType:'已过期'
					},
				]
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.order_list{
		padding: 10px 5%;
		border-bottom: $cardBorder;
		span{
			color: #1989FA;
		}
	}
</style>