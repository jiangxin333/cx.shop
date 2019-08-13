<template>
	<div>
		<vant-header title="我的评价" />
		<!--<van-nav-bar title="我的评价" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})" />-->
		<empty :emptyImg="emptyImg" emptyText="暂无评价内容" v-if="commentList.length==0"/>
		<div class="comment_wrap">
			<div v-for="(item,index) in commentList.list" :key="index">
				<van-swipe-cell :right-width="65" class="cell_box">
					<van-cell-group :border="false">
						<div class="comment_box">
							<div class="user_box flex f_row f_a_c">
								<img :src="item.customerHead" />
								<div class="user_box_right flex f_col">
									<p>{{ item.nickName }}</p>
									<div class="flex f_row f_sb">
										<p>{{ item.datCreatetime }}</p>
										<p>{{ item.commentDate }}</p>
									</div>
								</div>
							</div>
							<p class="comment_text">{{ item.strEvaluateContent }}</p>
							<div class="shop_item_box flex f_row f_a_c" @click="$router.push({path: 'detail', query: {pid: item.intProductId}})">
								<img :src="item.casinProductImageList[0].strImageAddr" v-if="item.casinProductImageList.length>0"/>
								<p>{{ item.productName }}</p>
							</div>
						</div>
	
					</van-cell-group>
					<span slot="right" style="width: 65px;text-align:center;" @click="deleteH5EvaluateById(item.evaluateManageId)">删除</span>
				</van-swipe-cell>
			</div>
		</div>
	</div>
</template>

<script>
	import empty from '@/components/empty';
	export default {
		components: {
			empty
		},
		data() {
			return {
				emptyImg:require("@/assets/no_comment.png"),
				commentList:[],
			}
		},
		methods: {
			deleteH5EvaluateById(id){
				console.log(id)
				var _this=this
				var url=_this.$store.state.urlConfig.deleteH5EvaluateById
				_this.$axios.postToken(url,{'evaluateManageId':id})
				.then(res => {
					if(res.data.code==200){
						let NewPage = '_empty' + '?time=' + new Date().getTime() / 500;
			            _this.$router.push(NewPage);
			            _this.$router.go(-1);
						_this.$toast(res.data.msg)
					}
	    		});
			}
		},
		created(){
			var _this=this
			var url=_this.$store.state.urlConfig.getEvaluateByCustomerId
			var thisData={
				'pageNum':1,
				'pageSize':10,
				'total':0
			}
			_this.$axios.postToken(url,thisData)
			.then(res => {
//				console.log(res);
				_this.commentList=res.data.data
				console.log(_this.commentList.list)
				_this.commentList.list.map(val => {
					console.log(val.casinProductImageList.length)
				})
    		});
		}
	}
</script>

<style scoped lang="scss">
	.van-swipe-cell__right{
		border-radius: .5rem !important;
	}
	.comment_wrap{
		background-color: #fff;
	    padding: 0 0.75rem;
		width: calc( 100% - 1.5rem );
	}
	.cell_box{
		padding: 1.1rem 0 1.35rem 0;
		border-bottom: 1px solid #E6E6E6;
	}
	.comment_box {
		color: #333;
		.user_box {
			img {
				width: 1.6rem;
				height: 1.6rem;
				border-radius: 50%;
				margin-right: .65rem;
			}
			.user_box_right{
				line-height: 1.1rem;
				div{
					color: #989898;
				}
			}
		}
		.comment_text{
			line-height: 1rem;
			font-size: 0.65‬rem;
			padding: .4rem 0 .6rem 0;
		}
		.shop_item_box {
			background-color: #F6F6F6;
			padding: .5rem;
			img {
				width: 3rem;
				height: 2.5rem;
				margin-right: 1.1rem;
			}
		}
	}
</style>