<template>
	<div class="shop_car_item_wrap">
		<div class="shop_title flex f_row f_a_c">
			<van-checkbox @click="bigCheck" v-model="bigChecked" checked-color="#f7b500"></van-checkbox>
			<p>{{ shopCarItem.type }}</p>
		</div>

		<div v-for="(item,index) in shopCarItem.commodity" :key='index'>
			<van-swipe-cell :right-width="65" :on-close="onClose">
				<van-cell-group class="commodity_item_wrap flex f_row f_sb">
					<div class="commodity_item_check flex f_row f_a_c">
						<van-checkbox @click="commodityCheck(index)" v-model="item.thisCheck" checked-color="#f7b500"></van-checkbox>
					</div>
					<div class="commodity_item_img">
						<img :src="item.img" />
					</div>
					<div class="commodity_item_msg flex f_col f_sb">
						<div>{{ item.title }}</div>
						<div>{{ item.subtitle }}</div>
						<div class="flex f_row f_sb f_a_c">
							<p>￥{{ item.price }}.00</p>
							<div>
								<van-stepper v-model="item.shopNumber" />
							</div>
						</div>
					</div>
				</van-cell-group>
				<span slot="right">删除</span>
			</van-swipe-cell>
		</div>
	</div>
</template>

<script>
	import { Checkbox, CheckboxGroup } from 'vant';
	import { Stepper } from 'vant';
	import { SwipeCell } from 'vant';
	import { Dialog } from 'vant';
	export default {
		components: {
			Checkbox,
			CheckboxGroup,
			Stepper,
			SwipeCell,
			Dialog
		},
		props: {
			shopCarItem: "",
			allCheck:""
		},
		data() {
			return {
				bigChecked: true,
			}
		},
		methods: {
			commodityCheck(thisIndex) {
				for(let i = 0; i < this.shopCarItem.commodity.length; i++) {
					if(this.shopCarItem.commodity[i].thisCheck == true) {
						this.bigChecked = true
					} else {
						this.bigChecked = false
					}
				}
			},
			bigCheck() {
				for(let i = 0; i < this.shopCarItem.commodity.length; i++) {
					if(this.bigChecked == false) {
						this.shopCarItem.commodity[i].thisCheck = false
					} else {
						this.shopCarItem.commodity[i].thisCheck = true
					}

				}
			},
			onClose(clickPosition, instance) {
				switch(clickPosition) {
					case 'left':
					case 'cell':
					case 'outside':
						instance.close();
						break;
					case 'right':
						Dialog.confirm({
							message: '确定删除吗？'
						}).then(() => {
							instance.close();
						});
						break;
				}
			},
			allPirce(){
				for (let i=0;i<this.shopCarItem.commodity.length; i++) {
					console.log(this.shopCarItem.commodity[i])
				}
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped lang="scss">
	
</style>