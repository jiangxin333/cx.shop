<template>
	<div class="">
		<vant-header title="物流信息"/>
		<!--<van-nav-bar title="物流信息" left-text="返回" left-arrow @click-left="$router.push({path: '/MyOrder'})"/>-->
		<div class="express_card top_card">
			<div>
				<p>已出库</p>
				<p>如有疑问请联系商家</p>
			</div>
		</div>
		<div class="express_card bottom_card flex f_row f_a_c">
			<img src="../assets/order_dfh.png" />
			<div>
				<p>快递公司：{{ expressName }}</p>
				<p>官方电话：{{ expressNumber }}</p>
			</div>
		</div>
		<div class="express_detail">
			<ul>
				<li v-for="(item,index) in expressData" class="flex f_row f_a_c">
					<div>
						<p>{{ item.date }}</p>
						<p>{{ item.time }}</p>
					</div>
					<div class="line_box">
						<div></div>
					</div>
					<p>{{ item.context }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				orderId:'',
				expressName:'顺丰快递',
				expressNumber:'95338',
				expressData:[
//					{state:'已揽收',date:'05-15',time:'12:22'},
				]
			}
		},
		methods:{
			
		},
		created(){
			var _this=this
			_this.orderId=_this.$route.query.orderId
			var url=_this.$store.state.urlConfig.getLogisticsInfoById;
			var thisData={
				'casinOrderId':_this.orderId,
			}
			_this.$axios.postToken(url,thisData)
			.then(res => {
				var resData=JSON.parse(res.data.data).data.data
				console.log(resData);
				resData.map( val => {
					let obj={}
					obj.context=val.context
//					obj.date=val.AcceptTime.Substring(0,10)
					_this.expressData.push(obj)
				})
    		});
		}
	}
</script>

<style scoped lang="scss">
	.express_card{
		width: calc( 100% - 3.3rem );
		margin: 0 .75rem .5rem .75rem;
		padding: .7rem .9rem;
		border-radius: .5rem;
		img{
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
			margin-right: .6rem;
		}
		p{
			line-height: 1.1rem;
		}
		p:nth-child(1){
			font-size: 0.65rem;
		}
		p:nth-child(2){
			font-size: 0.55rem;
		}
	}
	.top_card{
		background:linear-gradient(90deg,rgba(232,73,71,1) 0%,rgba(236,93,70,1) 100%);
		color: #fff;
	}
	.bottom_card{
		background:#fff;
		color: #333;
	}
	.express_detail{
		background-color: #fff;
		width: calc( 100% - 3rem );
		margin: 0 .75rem;
		padding: .75rem;
		border-radius: .5rem;
		color: #989898;
		font-size: .65rem;
		.line_box{
				width: 1px;
				background-color: #E6E6E6;
				height: 2.75rem;
				position: relative;
				z-index: 1;
				margin:0 1rem;
			div{
				width: 1rem;
				height: 1rem;
				background-color: #FFFFFF;
				border: 1px solid #E6E6E6;
				border-radius: 50%;
				position:absolute;
				z-index:2;
				left: -0.55rem;
				top: 0.75rem;
				background: url(../assets/checked.png) no-repeat #FFFFFF;
				background-size: cover;
			}
		}
	}
</style>