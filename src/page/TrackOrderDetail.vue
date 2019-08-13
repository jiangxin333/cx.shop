<template>
	<div class="" style="background-color: #fff;">
		<van-nav-bar title="跟踪订单详情" left-text="返回" left-arrow @click-left="$router.push({path: '/MyOrder'})" />
		<div class="flex f_row f_sb f_a_c">
			<div>
				<p>待支付</p>
				<p>订单将在xxx点xxx分自动关闭</p>
			</div>
			<img :src="icon" />
		</div>
		<div>
			<div>

			</div>
		</div>
		<div>
			<p>商品信息</p>
			<OrderItem></OrderItem>
		</div>
		<div class="flex f_row f_sb">
			<p>预计佣金总额：</p>
			<p>￥{{ extensionMoney }}</p>
		</div>		
		<div>
			<p>订单信息</p>
			<p>订单编号：{{ orderNumber }} </p>
			<p>下单时间：{{ orderTime }}</p>
		</div>
		<button type="button">返回</button>
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
				icon: require("../assets/icon.png"),
				orderNumber: "500000000000000000",
				orderTime: "yyyy-mm-dd  h24:mm:ss",
				extensionMoney:"99.00"
				
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">

</style>