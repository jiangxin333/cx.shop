<template>
    <div>
        <vant-header title="收货地址"/>
        <!--<van-nav-bar title="收货地址" left-text="返回" left-arrow @click-left="$router.push({path: '/My'})" />-->
        <div class="noaddress flex f_col f_a_c" v-show="addressList.length==0">
            <img src="../assets/address.png" alt=""/>
            <p>您还未设置收货地址</p>
        </div>
        <div class="address_list_wrap" v-show="addressList.length!=0">
            <van-swipe-cell :right-width="item.eumIsdefault!=0? 120 : 60 " v-for="(item,index) in addressList"
                            :key="index">
                <van-cell-group :border="false" style="border-bottom: 1px solid #E6E6E6;">
                    <div class="address_list_item flex f_row f_sb f_ac" @click="JumpOrder(item)">
                        <div class="flex f_col f_j_c" style="width: 90%;">
                            <div class="flex f_row f_j_s">
                                <p class="address_name">{{ item.strName }}</p>
                                <p class="address_phone">{{ item.strContact }}</p>
                            </div>
                            <div class="" style="margin-top: 4px;">
                                <span class="info_icon" v-show="item.eumIsdefault==0">默认</span>
                                <p class="address_address">{{ item.strAddress }}</p>
                            </div>
                        </div>
                        <button type="button" class="edit_address" @click.stop="editAddress(item)">编辑</button>
                    </div>
                </van-cell-group>
                <span slot="right" class="address_right flex f_row f_a_c"
                      :style="{ width: item.eumIsdefault!=0? '120px' : '60px'  }">
					<div class="info_address" v-show="item.eumIsdefault!=0" @click="setDefaultAddress(item.intId)">设置<br/>默认</div>
					<div @click="deleteAddress(item.intId)">删除<br/>地址</div>
				</span>
            </van-swipe-cell>
        </div>
        <div class="btn_box">
            <button type="button" class="big_btn" @click="addAddress">添加收货地址</button>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                addressList: [],
                isClick: false,
            }
        },
        methods: {
            addAddress() {
                this.$router.push({
                    path: '/NewAddress'
                })
            },
            deleteAddress(intId) {
                var _this = this;
                var url = _this.$store.state.urlConfig.deleteCustomerAddress;
                var thisData = {
                    'intId': intId
                }
                _this.$dialog.confirm({
                    title: '删除',
                    message: '是否删除该地址'
                }).then(() => {
                    _this.$axios.postToken(url, thisData)
                    .then(res => {
                        if (res.data.code == 200) {
//                              _this.$store.getters.reflashPage()
							let NewPage = '_empty' + '?time=' + new Date().getTime() / 500;
				            _this.$router.push(NewPage);
				            _this.$router.go(-1);
				            _this.$toast(res.data.msg)
                        }
                    });
                }).catch(() => {
                    // on cancel
                })
            },
            setDefaultAddress(intId){
            	var _this = this;
                var url = _this.$store.state.urlConfig.setDefaultAddress;
                var thisData = {
                    'intId': intId
                }
                _this.$dialog.confirm({
                    title: '删除',
                    message: '是否设置为默认地址'
                }).then(() => {
                    _this.$axios.postToken(url, thisData)
                        .then(res => {
                            if (res.data.code == 200) {
                                let NewPage = '_empty' + '?time=' + new Date().getTime() / 500;
					            _this.$router.push(NewPage);
					            _this.$router.go(-1);
					            _this.$toast(res.data.msg)
                            }
                        });
                }).catch(() => {
                    // on cancel
                })
            },
            /**/
            JumpOrder(address){
                let t = this;
                if (t.isClick) {
                    t.$router.go(-1);
                    localStorage.setItem('address',JSON.stringify(address));
                }
            },
            editAddress(item){
            	this.$router.push({ path:'/editAddress' , query : { item : item}})
            }
        },
        created: function () {
            var _this = this;
            _this.isClick = localStorage.getItem('isClick') || false;
            var url = _this.$store.state.urlConfig.getCustomerAddressList;
            _this.$axios.postToken(url, '')
                .then(res => {
                    //				console.log(res);
                    _this.addressList = res.data.data
                    console.log(_this.addressList)
                });
        }
    }
</script>

<style scoped lang="scss">
    .noaddress {
        height: 100vh;
        img {
            margin: 4rem 0 2.35rem 0;
        }
    }

    .address_list_wrap {
        height: 75vh;
        padding: 0 .75rem;
        background-color: #ffffff;
        box-shadow: 0px 2px 5px 0px rgba(227, 230, 235, 1);
    }

    .address_list_item {
        margin: 0 0.75rem;
        height: 3rem;
        p {
            line-height: 16px;
        }
        .address_name {
            color: #333;
            font-size: .65rem;
            font-weight: 600;
            margin-right: .75rem;
        }
        .address_phone {
            color: #333;
            font-size: .55rem;
            font-weight: 600;
        }
        .address_address {
            color: #989898;
        }
        .info_icon {
            padding: 0 5px;
            background-color: #F7431F;
            border-radius: 10px;
            color: #fff;
            font-size: .55rem;
            margin-right: 2px;
            font-weight: 100;
           	float: left;
        }
        .edit_address {
            background-color: #fff;
            border: none;
            color: #989898;
            font-size: 0.55rem;
            height: 3rem;
            line-height: 3rem;
            width: 10%;
            text-align: right;
        }
    }

    .address_right {
        height: 100%;
        .info_address {
            background: linear-gradient(#FFAD0C, #FF8631) !important;
        }
        div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
        }
    }
</style>
