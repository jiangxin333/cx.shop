<template>
	<div class="" style="background-color: #fff;">
		<div class="order_list_box" v-for="(item,index) in thisOrderList" :key="index">
			<div class="shop_item flex f_row f_a_s" v-for="(item2,index2) in item.shopItem" :key="index2">
				<img :src="item2.shopItemImg" />
				<div class="shop_item_msg flex f_col f_sb">
					<p class="shop_name">{{ item2.shopItemName }}</p>
					<div class="">
						<p class="shop_type">{{ item2.shopItemType }}</p>
						<p class="shop_number">X{{ item2.shopItemNumber }}</p>
					</div>
					<p class="shop_price">￥<span>{{ item2.shopItemPrice }}</span>.00</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				thisOrderList: [
					{
						shopName: '供应商1',
						orderType:0,
						allPrice: 1009,
						shopItem:[
							{
								shopItemImg: require('../assets/test.png'),
								shopItemName:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
								shopItemType: '款式2',
								shopItemNumber: 1,
								shopItemPrice :65
							},
							{
								shopItemImg: require('../assets/test.png'),
								shopItemName:'啊啊啊啊',
								shopItemType: '款式2',
								shopItemNumber: 1,
								shopItemPrice :85
							},
						]
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.order_list_box{
		padding: .5rem;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 5px 0px rgba(227,230,235,1);
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
	}
	
</style>