<template>
	<div class="" style="background-color: #fff;">
		<van-nav-bar title="填写订单" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>
		<div class="address_box">
			<div>
				
			</div>
			<div class="body_padding">
				<div class="flex f_row">
					<p>收货人名称</p>
					<p>138888888888</p>
				</div>
				<p>重庆市渝中区渝中区渝中区渝中区</p>
			</div>
		</div>
		<div class="flex f_row f_sb f_a_c body_padding">
			<p>支付方式</p>
			<div class="flex f_row f_a_c">
				<img :src="test" style="width: 20px;height: 20px;"/>
				<p>微信支付</p>
			</div>
		</div>
		
		<OrderItem></OrderItem>
		
		<div class="flex f_row f_sb f_a_c" style="padding: 10px 5%;">
			<p>￥2038.18</p>
			<button type="button" class="small_btn">提交订单</button>
		</div>
		
		
		
	</div>
</template>

<script>
	import OrderItem from "@/components/OrderItem.vue"
	export default{
		components:{
			OrderItem
		},
		data (){
			return {
				test:require("../assets/icon.png"),
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.order_list_box{
		border-bottom: $cardBorder;
	}
	.shop_item{
		width: 100%;
		margin: 10px 0;
		img{
			width: 30%;
		}
		.shop_item_right{
			width: 60%;
		}
	}
</style>