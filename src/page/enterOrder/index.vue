<template>
    <div class="cart">
        <header>
            <vant-header title="填写订单"/>
        </header>
        <section>
            <div class="o-address" v-if="!address">
                <div class="oLeft">
                    <img src="../../assets/images/maps-and-flags-1@3x.png" class="address-img"/>
                    <p class="empty">您还没有填写收货地址</p>
                </div>
                <div class="oRight" @click="Jump('/AddressList')">
                    <p class="fillIn">去填写</p>
                    <img src="../../assets/images/btn_28_next@3x.png" class="next_arrow"/>
                </div>
            </div>
            <div class="o-address" @click="Jump('/AddressList')" v-else>
                <div class="oLeft">
                    <img src="../../assets/images/maps-and-flags-1@3x.png" class="address-img"/>
                    <div class="userInfo">
                        <div class="user-name-tel">
                            <span class="u-name" v-text="address.strName"></span>
                            <span class="u-tel" v-text="address.strContact"></span>
                        </div>
                        <div class="long-address" v-text="address.strAddress"></div>
                    </div>
                </div>
                <div class="oRight">
                    <img src="../../assets/images/btn_28_next@3x.png" class="next_arrow"/>
                </div>
            </div>
            <div class="o-payment">
                <p class="tit">默认支付方式</p>
                <div class="paymode">
                    <img src="../../assets/images/wx.png"/>
                    <p>微信支付</p>
                </div>
            </div>
            <div class="goods-list">
                <div class="checkbox-warp shop-car-wrap" v-for="(item,index) in cartList" :key="index">
                    <div class="shops_title flex">
                        <p class="shop_title">
                            <img src="../../assets/images/c_icon_shop.png"/>
                            <span v-text="item.supplierName"></span>
                        </p>
                    </div>
                    <div v-for="item2 in item.list" :key='item2.cartId'>
                        <div class="goods-item-warp">
                            <van-swipe-cell style="margin-right:0.5rem;">
                                <van-cell-group class="goods-item">
                                    <div class="goods-img">
                                        <img v-lazy="item2.productImageAddr"/>
                                    </div>
                                    <div class="goods-info">
                                        <div class="goods-name" v-text="item2.productTitle"></div>
                                        <div class="goods-spec">
                                            <p class="sepcs" v-text="item2.strSpecName"></p>
                                            <span></span>
                                        </div>
                                        <div class="count-choose">
                                            <div
                                                v-html="$options.filters.formatPriceFb(item2.decPrice,'0.5','0.85','0.6')"></div>
                                            <van-stepper
                                                v-model="item2.ingProductAmount"
                                                @plus="handlerGoods(item.supplierId,item2.cartId,'plus')"
                                                @minus="handlerGoods(item.supplierId,item2.cartId,'minus')"
                                                integer
                                                :disabled="isStepper"
                                            />
                                        </div>
                                    </div>
                                </van-cell-group>
                            </van-swipe-cell>
                        </div>
                    </div>
                    <div class="fee-detail">
                        <div class="item">
                            <label>商品金额：</label>
                            <p>￥{{request_param.type == 0 ? productMoney.money : item.totalProductPrice}} </p>
                        </div>
                        <div class="item">
                            <label>运费：</label>
                            <p>￥{{request_param.type == 0 ? productMoney.postage : productMoney.totalPostage || 0}} </p>
                        </div>
                        <div class="item">
                            <label>订单备注：</label>
                            <input type="text" placeholder="选填，建议先与商家进行沟通" v-model="item.remark">
                        </div>
                        <div class="item">
                            <label></label>
                            <div class="totalPrice">
                                <p>共计{{item.list.length}}件</p>
                                <div class="xtotal">
                                    <span class="tit">小计</span>
                                    <div class="product-price">
                                        <span
                                            v-html="$options.filters.goodsDetailPrice(request_param.type == 0 ? productMoney.money : item.totalProductPrice,'0.55','0.65','0.55')"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="fixBarBot checkbox-warp">
            <div class="pt-footer"></div>
            <div class="fixBarCnt">
                <div class="fixBarLeft">
                    <div class="total-price-box">
                        <span>合计：</span>
                        <template v-if="request_param.type == 0">
                            <div v-html="$options.filters.formatPriceFb(productMoney.money,'0','1','0.6')"></div>
                        </template>
                        <template v-else>
                            <div v-html="$options.filters.formatPriceFb(cartList,'0','1','0.6','obj')"></div>
                        </template>
                    </div>
                </div>
                <div class="fixBarRight">
                    <div class="bbtn btn-settle active" type="button" @click="buyOrder">提交订单</div>
                </div>
            </div>
        </div>
        <!--商品下架-->
        <van-popup v-model="isHaltSales">
            <tips
                :popup.sync="isHaltSales"
                :tipsImg="haltSales"
                tipsText="sorry，存在商品已下架！"
                tipsBtnText1="确定"
            />
        </van-popup>
    </div>
</template>


<script>
    import tips from '@/components/tips';
    export default{
        components: {
            tips,
        },
        data (){
            return {
                isStepper: false, /*商品加减禁用*/
                address: '', /*地址*/
                cartList: [], /*商品集合*/
                isHaltSales: false, /*用于验证商品是否下架*/
                haltSales: require("../../assets/images/tips4.png"), /*商品是否下架图片*/
                request_param: {},
                productMoney: {
                    money: 0.00,
                    postage: 0
                }
            }
        },
        destroyed: function () {
            localStorage.removeItem('address');
        },
        created(){
            let t = this,
                param = {},
                type = this.$route.query.type;
            /*
             type 0为立即购买 1为购物车结算
             cart_data: '', 购物车Id集合
             goodsId: '', 商品Id
             spec_id: '', 商品规格Id
             stock: '', 商品数量
             */
            param.type = type;
            let ids = '',
                cartIds = t.$route.query.cartIds && new Array(t.$route.query.cartIds) || '';
            cartIds && cartIds.map((item) => {
                ids += item += ',';
            });
            param.cart_data = ids && ids.substr(0, ids.length - 1) || '';
            t.request_param = param;
            param.goodsId = t.$route.query.goodsId;
            param.spec_id = t.$route.query.spec_id;
            param.stock = t.$route.query.stock;
            t.request_param = param;
            let Local_address = localStorage.getItem('address') || '';
            if (Local_address) {
                t.address = JSON.parse(Local_address);
                localStorage.removeItem('isClick');
            } else {
                t.getCustomerDefaultAddressList();
            }
            t.getSettlementData(t.request_param);
        },
        methods: {
        	buyOrder(){
        		var _this = this;
                var url = _this.$store.state.urlConfig.submitOrder;
                console.log(url)
                var thisData = {
                    "addressId": _this.address.intId,
                    "buyerMessageMap": {
					    'this.cartListsupplierId' : this.cartList.remark, 
					},
					"list":[],
					"strOrderArea": "",
					"cartIdList": this.request_param.cart_data,
					"distributionId": localStorage.getItem('fxyId'),
					"type":'Wap',
					"wapUrl":'http://www.webtek.com.cn', // WAP网站URL地址(app不传,只H5支付状态下传入)
					"wapName":'财信', //网站名(app不传,只H5支付状态下传入)
                }
                //支付
                function onBridgeReady(){
				   WeixinJSBridge.invoke(
				      'getBrandWCPayRequest', {
				         "appId":"wxca456c1be2ea65dc",     //公众号名称，由商户传入     
				         "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
				         "nonceStr":"a619c59695ba4ee298d691b090c881c1", //随机串     
				         "package":"prepay_id=u802345jgfjsdfgsdg888",     
				         "signType":"MD5",         //微信签名方式：     
				         "paySign":"2530bac10fbba701e8787814b32b3791" //微信签名 
				      },
				      function(res){
				      if(res.err_msg == "get_brand_wcpay_request:ok" ){
				      // 使用以上方式判断前端返回,微信团队郑重提示：
				            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				      } 
				   }); 
				}
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				   }
				}else{
				   onBridgeReady();
				}
                //商品信息
                _this.cartList[0].list.map(val=>{
                	let list={}
                	list.intProductId=val.intProductId
                	list.intProductSpecId=val.intProductSpecId
                	list.ingProductAmount=val.ingProductAmount
                	thisData.list.push(list)
                })
                //下单地址
                _this.util.getMap().then((res) => {
                    thisData.strOrderArea=res.cityName
                });
                
        	},
            /*获取结算商品信息*/
            getSettlementData(param){
                let t = this;
                t.$axios.postToken(t.$store.state.urlConfig.getSettlementData, param).then(res => {
                    t.cartList = res.data && res.data.data;
                    let clist = t.cartList[0].list[0];
                    t.productMoney.unitPrice = clist.decPrice;
                    t.productMoney.money = parseFloat(clist.ingProductAmount * clist.decPrice).toFixed(2);
                    t.productMoney.postage = clist.postage || 0;
                });
            },
            /*获取地址*/
            getCustomerDefaultAddressList(){
                let t = this;
                t.$axios.postToken(t.$store.state.urlConfig.getCustomerDefaultAddressList, {}).then(res => {
                    t.address = res.data.data;
                });
            },
            /*商品加减*/
            handlerGoods(sid, cid, type){
                let t = this,
                    param = {};
                t.isStepper = true;
                let shopList = t.cartList.find(item => item.supplierId == sid);
                shopList.list.map((item) => {
                    if (cid == item.cartId) {
                        let pnum = parseInt(item.ingProductAmount);
                        type == 'plus' ? item.ingProductAmount = pnum + 1 : item.ingProductAmount = pnum - 1;
                        param.num = item.ingProductAmount;
                        param.productId = item.intProductId;
                        param.productSpecId = item.intProductSpecId;
                    }
                });
                t.$axios.postToken(t.$store.state.urlConfig.checkProductShelf, {ids: param.productId + '-' + param.productSpecId}).then(result => {
                    if (result.data.data.status == 0) {
                        if (t.request_param.type != 0) {
                            /*没有下架商品*/
                            t.$axios.postToken(t.$store.state.urlConfig.changeNum, param).then(res => {
                                t.getSettlementData(t.request_param);
                                localStorage.setItem('RefreshCart', true);
                            });
                        } else {
                            t.productMoney.money = (t.productMoney.unitPrice * param.num).toFixed(2);
                        }
                        t.isStepper = false;
                    } else {
                        /*存在下架商品*/
                        t.isHaltSales = true;
                        t.isStepper = false;
                        t.getSettlementData(t.request_param);
                    }
                });
            },
            /*跳转事件*/
            Jump(path){
                this.$router.push({path: path});
                localStorage.setItem('isClick', true);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/goods.scss";

    .goods-list {
        margin-top: 0;
    }

    .van-swipe-cell__right {
        border-radius: 10px !important;
    }

    .goods-item {
        margin-bottom: 1.4rem;
    }

    .cart-header {
        width: 100%;
        height: 4.65rem;
        background: linear-gradient(90deg, rgba(232, 73, 71, 1) 0%, rgba(236, 94, 70, 1) 100%);
        position: relative;
        .cart-header-box {
            height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            z-index: 1000;
            width: 100%;
            left: 0;
            top: 0;
            background: linear-gradient(90deg, rgba(232, 73, 71, 1) 0%, rgba(236, 94, 70, 1) 100%);

            .cart-hd-left {
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
            .cart-hd-title {
                width: 100%;
                position: absolute;
                z-index: 1;
                text-align: center;
                font-size: $f85;
                line-height: 2.2rem;
                color: #fff;
            }
            .cart-hd-right {
                position: relative;
                z-index: 2;
                margin-right: $spaceLF;
                p {
                    color: #fff;
                    font-size: $f65;
                }
            }
        }
    }

    .van-hairline--top-bottom::after {
        border: 0;
    }

    .o-address {
        height: 3.5rem;
        background-color: #fff;
        margin: 0.55rem $spaceLF 0.6rem $spaceLF;
        padding: 0 0.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.1rem 0.25rem 0 rgba(227, 230, 235, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .oLeft {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .address-img {
                width: 2rem;
                height: 2rem;
            }
            .empty {
                font-size: $f65;
                color: $fontColor2;
                margin-left: 0.75rem;
            }
            .userInfo {
                margin-left: 1.3rem;
                .user-name-tel {
                    display: flex;
                    align-items: flex-end;
                    .u-name {
                        font-size: $f75;
                        color: $titleColor;
                        margin-right: 0.25rem;
                        max-width: 6rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .u-tel {
                        font-size: $f55;
                        color: $fontColor2;
                    }
                }
                .long-address {
                    margin-top: 0.2rem;
                    font-size: $f55;
                    color: $titleColor;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .oRight {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .next_arrow {
                width: 0.4rem;
                height: 0.7rem;
                margin-left: 0.35rem;
            }
            .fillIn {
                font-size: $f65;
                color: $titleColor;
            }
        }
    }

    .o-payment {
        height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        margin: 0.55rem $spaceLF 0.6rem $spaceLF;
        padding: 0 0.5rem;
        border-radius: 0.5rem;
        .tit {
            color: $fontColor2;
            font-size: $f65;
        }
        .paymode {
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                width: 0.75rem;
                height: 0.7rem;
                margin-right: 0.2rem;
            }
            p {
                font-size: $f65;
            }
        }
    }

    .shop-car-wrap {
        padding-bottom: 0 !important;
    }

    .fee-detail {
        padding: 0.65rem 0 0.4rem 0;
        border: $cardBorder;
        .item {
            padding: 0 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: $f55;
            margin-bottom: 0.6rem;
            line-height: 0.8rem;
            label {
                color: $titleColor;
            }
            p {
                flex: 1;
                text-align: right;
                color: $fontColor2;
            }
            input {
                flex: 1;
                border: 0;
                text-align: left;
                line-height: 0.8rem;
            }
            .xtotal,
            .totalPrice {
                margin-top: 0.1rem;
                display: flex;
                align-items: center;
                .tit {
                    margin: 0 0.45rem;
                }
                .product-price {
                    margin-top: 0 !important;
                }
            }
        }
    }

    .fixBarBot {
        .pt-footer {
            padding-top: 2.45rem;
        }
        .fixBarCnt {
            background: #fff;
            box-shadow: 0 0 4px 0 rgba(227, 230, 235, 1);
            position: fixed;
            bottom: 0;
            z-index: 1000;
            width: calc(100% - 1.5rem);
            height: 2.45rem;
            padding: 0 $spaceLF;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .fixBarLeft,
        .fixBarRight {
            display: flex;
            align-items: center;
        }
        .fixBarLeft {
            .allText {
                color: $fontColor2;
                font-size: $f7;
            }
        }
        .total-price-box {
            display: flex;
            align-items: center;
            span {
                font-size: $f7;
            }
        }
        .fixBarRight {
            .bbtn {
                border: 0;
                width: 5rem;
                height: 2rem;
                border-radius: 5rem;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 2.25rem;
                font-size: $f75;
                text-align: center;
                &.btn-settle {
                    background: linear-gradient(-90deg, rgba(255, 78, 76, 1) 0%, rgba(254, 120, 79, 1) 100%);
                    opacity: 0.5;
                    &.active {
                        opacity: 1;
                    }
                }
                &.btn-delete {
                    color: #FF4E4C;
                    background: none;
                    border: 1px solid rgba(255, 78, 76, 1);
                }
            }
        }
    }

</style>
