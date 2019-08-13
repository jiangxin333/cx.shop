<template>
	<div class="evaluate_wrap flex f_row f_sb f_a_c">
		<div class="evaluate_left">
			<img :src="userAvatar" />
		</div>
		<div class="evaluate_right">
			<div class="flex f_row f_sb">
				<p>{{ userName }}</p>
				<span>{{ evaluateTime }}</span>
			</div>
			<span>{{ evaluateMsg }}</span>
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		props:{
			userAvatar:'',
			userName:'',
			evaluateTime:'',
			evaluateMsg:'',
		},
		data (){		
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>e

<style scoped lang="scss">
	.evaluate_wrap{
		padding: 0 3%;
		border-bottom:$cardBorder;
	}
	.evaluate_left{
		width: 20%;
		img{
			border: $cardBorder;
			border-radius: 50%;
		}
	}
	.evaluate_right{
		width: 80%;
	}
</style>