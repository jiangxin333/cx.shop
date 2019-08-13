<template>
	<div class="">
        <!--<vant-header title="交易记录"/>-->
        <div class="vs-header">
	        <div class="vs-header-box">
	            <div class="vs-header-left">
	                <img src="../assets/images/nav_02_back@3x.png" @click="$router.go(-1)"/>
	            </div>
	            <div class="vs-header-title">交易记录</div>
	            <div class="vs-header-right" @click="showDate=true">自定义时间</div>
	        </div>
	    </div>
	    
		<div class="tab_box flex f_row f_a_c f_sa">
			<div v-for="(item,index) in transactionTab"  @click="transactionTabChange(index)">
				<p :style="{'border-bottom': item.tabState ? '3px solid #F7431F' : 'none' , 'color' : item.tabState ? '#222222' : '#989898' , 'font-weight' : item.tabState ? '800' : '100'}">{{ item.tabName }}</p>
			</div>
		</div>
		<div class="record_list">
			<p class="record_title">{{ recordTitle }}</p>
			<empty :emptyImg="emptyImg" emptyText="无缴费记录" v-if="transationList.length==0"/>
			<van-list v-model="isLoading" :finished="isFinished" @load="onLoad">
				<div v-for="(item2,index2) in transationList" class="record_item flex f_row f_a_c f_sb">
					<img :src="item2.recordImg" />
					<div class="record_right">
						<div class="record_msg flex f_row f_sb">
							<p>{{ item2.recordType }}</p>
							<span>{{ item2.recordPrice }}</span>
						</div>
						<p  class="record_date">{{ item2.recordDate }}</p>
					</div>
				</div>
			</van-list>
		</div>
		<van-popup v-model="showDate" position="bottom">
			<van-datetime-picker
			  v-model="currentDate"
			  type="year-month"
			  @confirm="changeDate"
			  @cancel="cancelDate"
			/>
		</van-popup>
	</div>
</template>

<script>
	import empty from '@/components/empty';
	import { DatetimePicker } from 'vant';
	export default{
		components:{
			empty,
			DatetimePicker
		},
		data (){
			return {
				showDate:false,
				currentDate: new Date(),
				emptyImg:require("@/assets/no_order.png"),
				isLoading: false,
     			isFinished: false,
				transactionTab:[
					{tabName:'缴费',tabState:true},
					{tabName:'购物',tabState:false},
				],
				recordTitle:'',
				transationList:[
					//{recordImg: require("../assets/icon_18.png"),recordType:'购买商品',recordPrice:'-￥24.09',recordDate:'2019.04.01 20:56:02'},
					//{recordImg: require("../assets/icon_20.png"),recordType:'商品退款',recordPrice:'+￥24.09',recordDate:'2019.04.01 20:56:02'}
				],
				pageTotal:0,
				thisData:{
					datPaymentTime:'',
					pageNum:1,
					pageSize:10,
					total:0
				}
			}
		},
		methods:{
			changeDate(value){
				var month=value.getMonth()+1
				this.thisData.datPaymentTime=value.getFullYear()+'-'+ month +'-01'
				this.dataListAxios()
			},
			cancelDate(){
				this.showDate=false
			},
			onLoad(){
				var _this=this
				var url=_this.$store.state.urlConfig.getCasinPaymentDetailList;
				_this.$store.state.loading = true;
				setTimeout(() => {
					//每次load页数+1
					_this.thisData.pageNum=_this.thisData.pageNum+1
					_this.$axios.postToken(url,_this.thisData)
					.then(res => {
						console.log(_this.thisData.pageNum,res)
						_this.pageTotal=res.data.data.total
						res.data.data.list.map(val => {
							if(val.decPaymentAmount!=null){
								let obj={}
								obj.recordPrice='-￥'+val.decPaymentAmount
								obj.recordType='购买商品'
								obj.recordImg=require("../assets/icon_18.png")
								obj.recordDate=val.datPaymentTime
								_this.transationList.push(obj)
							}else{
								let obj={}
								obj.recordPrice='+￥'+val.decReturnPaymentAmount
								obj.recordType='商品退款'
								obj.recordImg=require("../assets/icon_20.png")
								obj.recordDate=val.datPaymentTime
								_this.transationList.push(obj)
							}
						})
						//
						_this.$store.state.loading = false;
						_this.isLoading = false;
						if (_this.transationList.length>=_this.pageTotal) {
				          _this.isFinished = true;
				        }
		    		});
				}, 1000);
					
			},
			transactionTabChange(index){
				var _this=this
				for(var i=0;i<_this.transactionTab.length;i++){
					_this.transactionTab[i].tabState=false
				}
				_this.transactionTab[index].tabState=true
			},
			dataListAxios(){
				var _this=this;
				var url=_this.$store.state.urlConfig.getCasinPaymentDetailList;
				_this.$axios.postToken(url,_this.thisData)
				.then(res => {
					console.log(res.data.data)
					_this.recordTitle=res.data.data.datPaymentTime
					res.data.data.list.map(val => {
						if(val.decPaymentAmount!=null){
							let obj={}
							obj.recordPrice='-￥'+val.decPaymentAmount
							obj.recordType='购买商品'
							obj.recordImg=require("../assets/icon_18.png")
							obj.recordDate=val.datPaymentTime
							_this.transationList.push(obj)
						}else{
							let obj={}
							obj.recordPrice='+￥'+val.decReturnPaymentAmount
							obj.recordType='商品退款'
							obj.recordImg=require("../assets/icon_20.png")
							obj.recordDate=val.datPaymentTime
							_this.transationList.push(obj)
						}
					})
					console.log(_this.transationList)
	    		});
			}
		},
		created(){
			var month=new Date().getMonth()+1
			var imaDate=new Date().getFullYear()+'-'+ month +'-01'
			this.thisData.datPaymentTime=imaDate
			console.log(this.thisData)
			this.dataListAxios()
		}
	}
</script>

<style scoped lang="scss">
	.tab_box{
		height: 2.85rem;
		background-color: #fff;
		border-radius: 10px 10px 0 0 ;
		p{
			font-size: .75rem;
			padding-bottom: .5rem;
		}
	}

	.record_list{
		.record_title{
			height: 2rem;
			line-height: 2rem;
			font-size: .6rem;
			color: #989898;
			padding-left: .75rem;
		}
		.record_item{
			background-color: #fff;
			img{
				margin: 0 .75rem;
				padding: .75rem 0 1rem 0;
			}
			.record_right{
				width: 100%;
				border-bottom: 1px solid #E6E6E6;
				padding: .75rem .75rem 1rem 0;
				.record_msg{
					color: #333;
					p{
						font-size: .8rem;
					}
					span{
						font-size: 1.05rem;
					}
				}
				.record_date{
					color: #989898;
					font-size: .7rem;
				}
			}
		}
	}
	
	.vs-header {
        .vs-header-box {
            width: 100%;
            height: 2.2rem;
            background: #E84947;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            &.vs-fiexd {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1000;
            }

            .vs-header-left {
                width: 0.6rem;
                height: 1.1rem;
                margin-left: 0.45rem;
                position: relative;
                z-index: 2;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .vs-header-title {
                width: 100%;
                position: absolute;
                z-index: 1;
                text-align: center;
                font-size: $f85;
                color: #fff;
            }
            .vs-header-right {
                margin-right: 0.45rem;
                position: relative;
                z-index: 2;
                color: #fff;
            }
        }

        .pb-header {
            padding-bottom: 2.2rem;
        }
    }
</style>
