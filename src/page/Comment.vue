<template>
	<div class="">
		<vant-header title="发表评论" />
		<!--<van-nav-bar title="发表评论" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})"/>-->
		<div v-for="(item,index) in shopItem" class="comment_wrap">
			<div class="shop_item flex f_row f_a_c">
				<img :src="item.shopImg" />
				<p>{{ item.shopTitle }}</p>
			</div>
			<div class="text_box">
				<textarea placeholder="宝贝满足您的期待吗？我们期待您的评价" v-model="item.commentWrod" @input="buttonChange(item.commentWrod)"></textarea>
				<span>{{ computedByteLen(item.commentWrod) }}/1000</span>
			</div>
		</div>
		<button type="button" class="big_btn" @click="addEvaluateBtn">发布</button>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				buttonOpacity:false,
				shopItem:[],
				orderId:'',
			}
		},
		methods:{
			computedByteLen(word) {
				return word.replace(/[^\x00-\xff]/g, '01').length
			},
			buttonChange(){
				let _this=this
			},
			addEvaluateBtn(){
				var _this=this
				var url=_this.$store.state.urlConfig.addEvaluate
				var wrodMap={}
				_this.shopItem.map( val => {
					wrodMap[val.orderDetailId]=val.commentWrod
				})
				console.log(JSON.stringify(wrodMap))
				var thisData={
					'casinOrderId':_this.orderId,
					'strEvaluateMap':JSON.stringify(wrodMap)
				}
				if(intEvaluateId!=null){
					_this.$toast('已评价过')
					return;
				}
				_this.$axios.postToken(url,thisData)
				.then(res => {
					console.log(res)
					if(res.data.code==200){
						_this.$toast('评价成功')
						_this.$router.go(-1)
					}
	    		});
			}
		},
		created(){
			var _this=this
			_this.orderId=_this.$route.query.orderId
			var url=_this.$store.state.urlConfig.getOrderDetailInfoByOrderId+'?orderId='+_this.orderId;
			var thisData={
				'orderId ':_this.orderId,
			}
			_this.$axios.postToken(url,'')
			.then(res => {
				//console.log(res);
				res.data.data.casinMyOrderDetailDtoList.map( val => {
					//console.log(val)
					let obj={}
					obj.shopImg=val.casinProductImageList[0].strImageAddr;
					obj.shopTitle=val.strProductTitleA;
					obj.orderDetailId=val.orderDetailId
					obj.commentWrod=''
					_this.shopItem.push(obj)
				})
    		});
		}
	}
</script>

<style scoped lang="scss">
	.comment_wrap{
		background-color: #fff;
		width: calc( 100% - 1.5rem);
		padding: 1rem .75rem .75rem .75rem;
		color: #333;
		font-size: .65rem;
		box-shadow:0px 2px 4px 0px rgba(227,230,235,1);
		margin-bottom: .5rem;
		.shop_item{
			margin-bottom: .5rem;
			img{
				width: 3.8rem;
				height: 2.6rem;
				margin-right: .75rem;
			}
		}
		.text_box {
			width: 100%;
			position: relative;
			textarea {
				width: calc( 100% - 1.5rem);
				height: calc( 7rem - 1.5rem);
				padding: .75rem;
				background-color: #FAFAFA;
				border: 1px solid #E6E6E6;
				resize: none;
			}
			span {
				position: absolute;
				right: .2rem;
				bottom: .2rem;
				color: #BBBBBB;
				font-size: .65rem;
			}
		}
	}
		
</style>