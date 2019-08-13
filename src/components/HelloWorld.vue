<template>
	<div class="hello">
		<h1 @click="test" class="test">{{ msg }}</h1>
		<van-area :area-list="areaList" @confirm="ldjg"/>
	</div>
</template>

<script>
	import { Area } from 'vant';
	export default {
		name: 'HelloWorld',
		components: {
			Area
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				areaList: {
					province_list: {
						110000: '北京市',
						120000: '天津市'
					},
					city_list: {
						110100: '北京市',
						110200: '县',
						120100: '天津市',
						120200: '县'
					},
					county_list: {
						110101: '东城区',
						110102: '西城区',
						110105: '朝阳区',
						110106: '丰台区',
						120101: '和平区',
						120102: '河东区',
						120103: '河西区',
						120104: '南开区',
						120105: '河北区',

					}
				}
			}
		},
		methods: {
			test() {
				this.$store.commit('zzz')
				
				this.$axios.get("www.baidu.com")
					.then((res) => {
						alert(res)
						console.log(this.$store.state.showFooter)
					})
			},
			ldjg(res){

				console.log(res)
			}
		}
	}
</script>


<style scoped lang="scss">
	$color: red;
	.test{
		color:$color;
	}
</style>