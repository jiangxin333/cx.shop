<template>
	<div class="">
		<vant-header title="新增收货地址" />
		<!--<van-nav-bar title="新增收货地址" left-text="" left-arrow @click-left="$router.push({path: '/AddressList'})"/>-->
		<div class="row_box">
			<label>收货人</label>
			<input type="text" v-model="name" placeholder="必填，请输入1-20个字" maxlength="20"/>
		</div>
		<div class="row_box">
			<label>手机号码</label>
			<input type="text" v-model="phone" placeholder="必填，请输入正确的联系方式" maxlength="20" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
		</div>
		<div class="row_box">
			<label>所在地区</label>
			<div class="city_select_box" @click="cityShow=true">{{ cityTxt_1 + cityTxt_2 + cityTxt_3 + cityTxt_4}}</div>
			<img src="../assets/btn_28_next.png" class="next_icon"/>
		</div>
		<div class="row_box">
			<label>详细地址</label>
			<input type="text" v-model="detalAddress" maxlength="100"/>
			<!--<img src="../assets/btn_28_next.png" class="next_icon"/>-->
		</div>
		
		<van-popup v-model="cityShow"  position="bottom">
			<div class="city_box">
				<p class="city_box_title">配送至</p>
				<div class="selected_city flex f_row">
					<p @click="resetCity(1)" :style="{ color : cityStage==1 ? '#F7431F' : '#333' , border : cityStage==1 ? 'none' : ''}">{{ cityStage==1 ? '请选择' : cityTxt_1 }}</p>
					<p @click="resetCity(2)" :style="{ color : cityStage==2 ? '#F7431F' : '#333' , border : cityStage==2 ? 'none' : ''}">{{ cityStage==2 ? '请选择' : cityTxt_2 }}</p>
					<p @click="resetCity(3)" :style="{ color : cityStage==3 ? '#F7431F' : '#333' , border : cityStage==3 ? 'none' : ''}">{{ cityStage==3 ? '请选择' : cityTxt_3 }}</p>
					<p @click="resetCity(4)" :style="{ color : cityStage==4 ? '#F7431F' : '#333' , border : cityStage==4 ? 'none' : ''}">{{ cityStage==4 ? '请选择' : cityTxt_4 }}</p>
				</div>
				<div>
					<div class="city_1" v-for="(item,index) in cityJSON" v-if="cityTxt_1==''">
						<p @click="city1Click(item.region_name,item.region_id,item.city)">{{ item.region_name }}</p>
					</div>
					<div class="city_2" v-for="(item2,index2) in city2JSON" v-if="cityTxt_2==''">
						<p @click="city2Click(item2.region_name,item2.region_id,item2.dict)">{{ item2.region_name }}</p>
					</div>
					<div class="city_3" v-for="(item3,index3) in city3JSON" v-if="cityTxt_3==''">
						<p @click="city3Click(item3.region_name,item3.region_id,item3.dict)">{{ item3.region_name }}</p>
					</div>
					<div class="city_4" v-for="(item4,index4) in city4JSON" v-if="cityTxt_4==''">
						<p @click="city4Click(item4.region_name)">{{ item4.region_name }}</p>
					</div>
				</div>
			</div>
		</van-popup>
			
		<van-checkbox v-model="defaultAddress" checked-color="#FF4E4C" class="checkbox">是否设为默认收货地址</van-checkbox>
		
		<div class="btn_box">
			<button type="button" class="big_btn" @click="saveBtn">保存并使用</button>
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			
		},
		data (){
			return {
				defaultAddress:true,
				cityJSON:require('../../static/city_pc.json'),
				name:'',
				phone:'',
				cityShow:false,
				cityStage:1,
				cityTxt_1:'',
				cityTxt_2:'',
				cityTxt_3:'',
				cityTxt_4:'',
				city2JSON:[],
				city3JSON:[],
				city4JSON:[],
				detalAddress:''
			}
		},
		methods:{
			saveBtn(){
				var _this=this
				var url=_this.$store.state.urlConfig.addCasinCustomerAddress
				var thisData={
					'eumIsdefault':_this.defaultAddress ? 0 : 1,
					'strAddress':_this.cityTxt_1+_this.cityTxt_2+_this.cityTxt_3+_this.detalAddress,
					'strProName':_this.cityTxt_1,
					'strCiName':_this.cityTxt_2,
					'strCouName':_this.cityTxt_3,
					'strStreetName':_this.cityTxt_4,
					'strName':_this.name,
					'strContact':_this.phone
				}
				_this.$axios.postToken(url,thisData)
				.then(res=>{
					console.log(res)
					if(res.data.code==200){
						this.$toast('添加成功');
						this.$router.go(-1)
					}
				})
			},
			//城市联动
			city1Click(name,id,city){
				let _this=this
				_this.cityTxt_1=name
				_this.city2JSON=city
				_this.cityStage=2
			},
			city2Click(name,id,dict){
				let _this=this
				_this.cityTxt_2=name
				_this.city3JSON=dict
				_this.cityStage=3
			},
			city3Click(name,id,dict){
				let _this=this
				_this.cityTxt_3=name
				_this.city4JSON=dict
				_this.cityStage=4
			},
			city4Click(name,id,dict){
				let _this=this
				_this.cityTxt_4=name
				_this.cityShow=false
				_this.cityStage=5
			},
			resetCity(stage){
				switch (stage){
					case 1:
						this.cityStage=1
						this.cityTxt_1=''
						this.cityTxt_2=''
						this.cityTxt_3=''
						this.cityTxt_4=''
						this.city2JSON=[]
						this.city3JSON=[]
						this.city4JSON=[]
						break;
					case 2:
						this.cityStage=2
						this.cityTxt_2=''
						this.cityTxt_3=''
						this.cityTxt_4=''
						this.city3JSON=[]
						this.city4JSON=[]
						break;
					case 3:
						this.cityStage=3
						this.cityTxt_3=''
						this.cityTxt_4=''
						this.city4JSON=[]
						break;
					case 4:
						this.cityStage=4
						this.cityTxt_4=''
						break;
						
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.city_box{
		background-color: #fff;
		width: calc( 100% - 1.5rem );
		height: 80vh;
		overflow-y: scroll;
		position: relative;
		color: #333;
		padding: 0 .75rem;
		.city_box_title{
			font-size: .75rem;
			font-weight: 600;
			margin: .25rem 0 1rem 0;
		}
		.selected_city{
			height: 1rem;
			line-height: 1rem;
			font-size: .65rem;
			p{
				margin: 0 1rem 0 0;
				border-bottom: 1px solid #F7431F;
				padding-bottom: .3rem;
			}
		}
	}
	.city_1, .city_2, .city_3, .city_4{
		line-height: 1rem;
		padding: .5rem 0;
	}
	.row_box{
		justify-content: flex-start;
		line-height: .8rem;
		label{
			width: 20%;
		}
		input{
			border: none;
			width: 80%;
		}
		.next_icon{
			margin-left: 0.45rem;
		}
		div{
			text-align: right;
		}
		.city_select_box{
			width: 80%;
			height: .8rem;
			line-height: .8rem;
			text-align: left;
		}
	}
	.checkbox{
		line-height: 32px;
		margin: 27px .75rem;
	}
</style>