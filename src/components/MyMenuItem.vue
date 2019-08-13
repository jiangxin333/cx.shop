 <template>
	<div class="my_menu_item_wrap flex f_col f_a_c f_sb">
		<img :src="itemIcon" alt="" />
		<span>{{ itemTxt }}</span>
	</div>
</template>

<script>
	export default{
		components:{

		},
		props:{
			itemIcon:'',
			itemTxt:'',

		},
		data (){
			return {

			}
		},
		methods:{

		}
	}
</script>

<style scoped lang="scss">
	.my_menu_item_wrap{
		background-color: #fff;
		padding: 10px 5%;
		height: 20px;
		line-height: 20px;
		div{
			height: 100%;
		}
		img{
			height: 100%;
		}
		span{
			font-size: 0.55rem;
		}
	}
</style>
