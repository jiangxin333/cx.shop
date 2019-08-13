<template>
	<div class="Index_item_wrap flex f_row">
		<div class="item_img"><slot name="item_img"></slot></div>
		<div class="item_detail">
			<div class="flex f_row f_a_c">
				<span v-text="itemType" class="item_type"></span>
				<p v-text="titleTxt"></p>
			</div>
			<p v-text="subtitleTxt" class="subtitle_txt"></p>
			<div class="flex f_row f_sb f_a_c">
				<div>
					<div class="current_price flex f_row f_a_b">
						<span>￥</span>
						<p>{{ currentPrice }}</p>
						<span>.00</span>
					</div>
					<p v-text="beforePrice+'.00'" class="before_price"></p>
				</div>
				<div class="flex f_row">
					<button type="button" class="zyj">赚佣金</button>
					<button type="button" class="qkk">去看看</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		props:{
			itemType:'',
			titleTxt:'',
			subtitleTxt:'',
			currentPrice:'',
			beforePrice:''
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
	.index_button{
	    padding:5px 10px;
	    border-radius: 50px;
	    border:0;
	    color: #fff;
	    font-size:0.6rem;
	}
	.Index_item_wrap{
		background-color: #fff;
		padding: 1.5rem 1rem;
		box-shadow: 0px 10px 5px $shadowColor;
		margin:0 0 1rem 0;
	}
	.item_img{
		width: 40%;
		margin-right:3%;
		img{
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
	.item_detail{
		width: 57%;
	}
	.item_type{
		border:1px solid $yellowColor;
		border-radius: 50px;
		padding: 0px 6px;
		color: $yellowColor;
	}
	.subtitle_txt{
		color: $grayColor;
		margin:0.5rem 0;
	}
	.current_price{
		color: $redColor;
		p{
			font-size: 1rem;
		}
		span{

		}
	}
	.before_price{
		text-decoration: line-through;
		color: $grayColor;
	}
	.zyj{
		@extend .index_button;
		background: linear-gradient(to right,#fa6400,#f7b500);
	}
	.qkk{
		margin-left:5px;
		@extend .index_button;
		background-color:$redColor;;
	}
</style>