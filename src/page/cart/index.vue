<template>
    <div class="cart">
        <header>
            <div class="cart-header">
                <div class="cart-header-box">
                    <div class="cart-hd-left">
                        <img src="../../assets/images/nav_02_back@3x.png" @click="$router.go(-1)" v-if="isDetail"/>
                    </div>
                    <div class="cart-hd-title">购物车</div>
                    <div class="cart-hd-right" v-if="cartList.length>0">
                        <p v-text="editTxt ? '完成' : '编辑'" @click="editShopCar"></p>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <template v-if="listIsEmpty">
                <empty emptyText="您的购物车竟然是空的" :emptyImg="cartEmptyImg"/>
            </template>
            <template v-else>
                <div class="goods-list">
                    <div class="checkbox-warp shop-car-wrap" v-for="(item,index) in cartList" :key="index">
                        <div class="shops_title flex">
                            <van-checkbox @click.stop="checkShop(item.supplierId)" v-model="item.isChecked">
                                <img :src="item.isChecked ? checkIcon.icon_choice2:checkIcon.icon_choice1"
                                     class="checkbox-img"/>
                            </van-checkbox>
                            <p class="shop_title">
                                <img src="../../assets/images/c_icon_shop.png"/>
                                <span v-text="item.supplierName"></span>
                            </p>
                        </div>
                        <div v-for="item2 in item.list" :key='item2.cartId' class="goods-item-warp">
                            <van-swipe-cell :right-width="60" :on-close="onClose" style="margin-right:0.5rem;">
                                <van-cell-group class="goods-item">
                                    <van-checkbox
                                        @click.stop="checkGoods(item.supplierId,item2.cartId)"
                                        v-model="item2.isChecked">
                                        <img :src="item2.isChecked ? checkIcon.icon_choice2:checkIcon.icon_choice1"
                                             class="checkbox-img"/>
                                    </van-checkbox>
                                    <div class="goods-img" @click="Jump('detail',item2.intProductId)">
                                        <img v-lazy="item2.productImageAddr"/>
                                    </div>
                                    <div class="goods-info">
                                        <div
                                            class="goods-name"
                                            v-text="item2.productTitle"
                                            @click="Jump('detail',item2.intProductId)">
                                        </div>
                                        <div class="goods-spec" @click="Jump('detail',item2.intProductId)">
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
                                <span slot="right" class="goods-detele" @click="delCart(item2.cartId)">删除</span>
                            </van-swipe-cell>
                        </div>
                    </div>
                </div>
            </template>
            <!--商品下架-->
            <van-popup v-model="isHaltSales">
                <tips
                    :popup.sync="isHaltSales"
                    :tipsImg="haltSales"
                    tipsText="sorry，存在商品已下架！"
                    tipsBtnText1="确定"
                />
            </van-popup>
        </section>
        <div class="fixBarBot checkbox-warp" v-if="!listIsEmpty">
            <div class="pt-footer"></div>
            <div class="fixBarCnt" :style="isDetail?'bottom:0':''">
                <div class="fixBarLeft">
                    <van-checkbox @click="checkAll" v-model="checkAlled">
                        <img
                            :src="checkAlled ? checkIcon.icon_choice2:checkIcon.icon_choice1"
                            class="checkbox-img"
                        />
                    </van-checkbox>
                    <p class="allText">全选</p>
                </div>
                <div class="fixBarRight">
                    <div class="total-price-box" v-if="!editTxt">
                        <span>合计：</span>
                        <div v-html="$options.filters.formatPriceFb(totalPostage,'0','0.85','0.6')"></div>
                    </div>
                    <div
                        class="bbtn btn-settle"
                        :class="totalPostage>0 ? 'active':''"
                        v-if="!editTxt"
                        @click="createOrder"
                    >
                        去结算
                    </div>
                    <div class="bbtn btn-delete" v-else @click="delCartMany">删除</div>
                </div>
            </div>
        </div>
        <vant-footer active="1" v-if="!isDetail"/>
    </div>
</template>


<script>
    import {Toast} from 'vant';
    import tips from '@/components/tips';
    import empty from '@/components/empty';
    export default{
        components: {
            empty,
            tips,
            Toast
        },
        data (){
            return {
                isDetail: false,
                isStepper: false, /*商品加减禁用*/
                editTxt: false,
                checkAlled: false,
                totalPostage: 0, /*商品总价*/
                cartEmptyImg: require("@/assets/images/tips5.png"),
                checkIcon: {
                    icon_choice1: require('@/assets/images/icon_choice1.png'),
                    icon_choice2: require('@/assets/images/icon_choice2.png'),
                },
                cartList: [], /*商品集合*/
                listIsEmpty: false, /*商品是否为空*/
                cartIds: JSON.parse(localStorage.getItem('cartIds')) || [], /*选中的商品购物车ID*/
                isHaltSales: false, /*用于验证商品是否下架*/
                haltSales: require("../../assets/images/tips4.png"), /*商品是否下架图片*/
                productId_SpecId: '', /*拼接商品id+商品规格验证是否下架*/
            }
        },
        created(){
        	var _this=this
            this.getCartList();
            var url=_this.$store.state.urlConfig.updateCart;
            _this.$axios.postToken(url,'')
			.then(res => {
				console.log(res)
    		});
        },
        activated(){
            let t = this;
            t.isDetail = t.$route.query.detail;
            t.editTxt = false;
            if (localStorage.getItem('RefreshCart')) {
                t.getCartList();
                localStorage.removeItem('RefreshCart')
            }
        },
        watch: {
            'cartList': function (newval, oldval) {
                let t = this;
                t.listIsEmpty = t.cartList.length > 0 ? false : true;
            }
        },
        methods: {
            /*获取购物车列表*/
            getCartList(){
                let t = this;
                return t.$axios.postToken(t.$store.state.urlConfig.getCartList, {}).then(res => {
                    t.cartList = res.data && res.data.data;
                    t.getInitCart();
                });
            },
            /*初始化购物车*/
            getInitCart(){
                let t = this;
                t.cartIds.map((arr_item) => {
                    t.cartList.map((item) => {
                        item.list.map((gitem) => {
                            if (gitem.cartId == arr_item) {
                                gitem.isChecked = true;
                            }
                        });
                    });
                });
                t.computePrice();
                localStorage.removeItem('cartList');
            },
            /*获取选中商品、商品总价格*/
            computePrice(){
                let t = this,
                    newArrayCart = [],
                    /*记录选中多少商品*/
                    checkeNumAll = 0,
                    /*记录购物车总共多少商品*/
                    goodsNum = 0;
                t.totalPostage = 0;
                t.productId_SpecId = '';
                t.cartList.map((item) => {
                    /*记录选中供应商商品数量*/
                    let checkeNum = 0;
                    goodsNum += item.list.length;
                    item.list.map((gitem) => {
                        if (gitem.isChecked) {
                            t.totalPostage += parseFloat(gitem.decPrice).toFixed(2) * gitem.ingProductAmount;
                            newArrayCart.push(gitem.cartId);
                            checkeNum++;
                            checkeNumAll++;
                            t.productId_SpecId += gitem.intProductId + '-' + gitem.intProductSpecId + ','
                        }
                    });
                    checkeNum == item.list.length ? item.isChecked = true : item.isChecked = false;
                });
                checkeNumAll == goodsNum ? t.checkAlled = true : t.checkAlled = false;
                t.cartIds = newArrayCart;
                localStorage.setItem('cartIds', JSON.stringify(newArrayCart));
            },
            /*商铺选择*/
            checkShop(sid){
                let t = this;
                let shopList = t.cartList.find(item => item.supplierId == sid);
                shopList.isChecked = shopList.isChecked == true ? true : false;
                shopList.list.map((item) => {
                    item.isChecked = shopList.isChecked;
                });
                t.computePrice();
            },
            /*商品单选*/
            checkGoods(sid, cid) {
                let t = this;
                let shopList = t.cartList.find(item => item.supplierId == sid);
                shopList.list.map((item) => {
                    if (cid == item.cartId) {
                        item.isChecked = item.isChecked == true ? true : false;
                    }
                });
                t.computePrice();
            },
            /*全选*/
            checkAll(){
                let t = this;
                t.checkAlled = t.checkAlled == true ? true : false;
                t.cartList.map((item) => {
                    item.isChecked = t.checkAlled;
                    item.list.map((gitem) => {
                        gitem.isChecked = t.checkAlled;
                    });
                });
                t.computePrice();
            },
            /*商品加减*/
            handlerGoods(sid, cid, type){
                let t = this,
                    goods,
                    param = {};
                let shopList = t.cartList.find(item => item.supplierId == sid);
                t.isStepper = true;
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
                        /*没有下架商品*/
                        t.$axios.postToken(t.$store.state.urlConfig.changeNum, param).then(res => {
                            t.isStepper = false;
                            t.getCartList();
                        });
                    } else {
                        /*存在下架商品*/
                        t.isHaltSales = true;
                        t.isStepper = false;
                        t.getCartList();
                    }
                });
            },
            /*编辑购物车*/
            editShopCar(){
                this.editTxt = this.editTxt === false ? true : false;
            },
            /*多选删除*/
            delCartMany(){
                this.computePrice();
                this.delCart();
            },
            /*删除购物车商品*/
            delCart(cid){
                let t = this,
                    param = {};
                t.$dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    if (cid) {
                        t.cartIds = [];
                        t.cartIds.push(cid);
                    }
                    let ids = '';
                    t.cartIds.map((item) => {
                        ids += item += ',';
                    });
                    param.ids = ids.substr(0, ids.length - 1);
                    t.$axios.postToken(t.$store.state.urlConfig.delCartById, param).then(res => {
                        if (!res.data) {
                            return false;
                        }
                        t.cartIds.map((arr_item) => {
                            t.cartList.map((item, index) => {
                                item.list.map((gitem, i) => {
                                    if (gitem.cartId == arr_item) {
                                        item.list.splice(i, 1);
                                        if (item.list.length == 0) {
                                            t.cartList.splice(index, 1);
                                        }
                                    }
                                });
                            });
                        });
                    });
                });
            },
            /*跳转订单信息*/
            createOrder(){
                let t = this;
                if (t.totalPostage == 0) {
                    Toast('请选择商品进行结算');
                    return false;
                }
                t.$axios.postToken(t.$store.state.urlConfig.checkProductShelf, {ids: t.productId_SpecId.substr(0, t.productId_SpecId.length - 1)}).then(result => {
                    if (result.data.data.status == 0) {
                        /*没有下架商品*/
                        t.$router.push({path: '/enterOrder', query: {cartIds: t.cartIds, type: 1}});
                    } else {
                        /*存在下架商品*/
                        t.isHaltSales = true;
                    }
                });
            },
            /*跳转事件*/
            Jump(path, param){
                this.$router.push({path: path, query: {pid: param}});
            },
            onClose(clickPosition, instance) {
                switch (clickPosition) {
                    case 'outside':
                        instance.close();
                        break;
                    case 'right':
                        break;
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/goods.scss";

    .van-swipe-cell__right {
        border-radius: 10px !important;
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
                line-height: 2.2rem;
                font-size: $f85;
                left:0;
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

    .fixBarBot {
        .pt-footer {
            padding-top: 2.45rem;
        }
        .fixBarCnt {
            background: rgba(249, 249, 249, 1);
            box-shadow: 0 0 4px 0 rgba(227, 230, 235, 1);
            position: fixed;
            bottom: 2.5rem;
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
        .fixBarRight {
            .total-price-box {
                display: flex;
                align-items: center;
                span {
                    font-size: $f7;
                }
            }
            .bbtn {
                border: 0;
                width: 5rem;
                height: 2rem;
                display: flex;
                align-items: center;
                border-radius: 5rem;
                color: #fff;
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
