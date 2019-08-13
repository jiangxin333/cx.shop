<template>
	<div class="">
		<vant-header title="意见反馈"/>
		<!--<van-nav-bar title="意见反馈" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})" />-->
		<div class="feedback_box">
			<p>*<span>意见 </span></p>
			<div class="text_box">
				<textarea placeholder="请输入意见" v-model="feedbackWrod"></textarea>
				<span>{{ computedByteLen }}/1000</span>
			</div>
		</div>
		
		<div class="img_box">
			<p class="img_box_title">图片<span>(如有需要，请上传图片) </span></p>
			<ul>
				<li class="file_li"><input type="file" /></li>
			</ul>
			<div class="tips_box flex f_row f_a_c">
				<img src="../assets/icon_12_remind.png" />
				<p>最多上传9张图片</p>
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
				feedbackWrod: '',
			}
		},
		methods: {

		},
		computed: {
			computedByteLen() {
				return this.feedbackWrod.replace(/[^\x00-\xff]/g, '01').length
			}
		}
	}
</script>

<style scoped lang="scss">
	.feedback_box {
		width: calc( 100% - 1.5rem);
		background-color: #fff;
		padding: 0 .75rem 1rem .75rem;
		p {
			font-size: .75rem;
			padding: .75rem 0;
			color: #FF0000;
			span {
				margin-left: .2rem;
				color: #333333;
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
	
	.img_box{
		width: calc( 100% - 1.5rem);
		background-color: #fff; 
		padding: 0 .75rem 1rem .75rem;
		margin-top: .5rem;
		.img_box_title {
			font-size: .75rem;
			padding: .75rem 0;
			color: #333333;
			span {
				font-size: 0.65‬rem;
				margin-left: .2rem;
				color: #989898;
			}
		}
		ul{
			overflow-x: scroll;
			white-space:nowrap;
			li{
				display: inline-block;
				width: 5.4rem;
				height: 4rem;
				margin-right: .5rem;
				background: url(../assets/btn_21_upload.png) no-repeat #F8F8F8 center;
			}
			.file_li{
				position: relative;
				input{
					width: 100%;
					height: 100%;
					opacity: 0;
					border: 1px solid red;
					position: absolute;
				}
			}
		}
		.tips_box{
			font-size: .6rem;
			color: #BBBBBB;
			margin-top: .75rem;
			img{
				margin-right: .175rem;
			}
		}
	}
</style>