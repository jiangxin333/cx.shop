<template>
    <div class="skus">
        <div class="popupMain">
            <img src="../../assets/images/close_x.png" class="close-icon" @click="handleCancel">
            <div class="popupHead">
                <img :src="goodsInfo.imageList[0].strImageAddr"
                     class="popupImg"/>
                <div class="popupInfo">
                    <div class="goods-name" v-text="goodsInfo.productName"></div>
                    <div class="product-price product-price--fb">
                        <span v-html="$options.filters.goodsDetailPrice(decPrice || 0)"></span>
                    </div>
                </div>
            </div>
            <div class="popupBody">
                <div class="tit">商品规格</div>
                <div class="sku-choose">
                    <div
                        v-for="(item,index) in goodsInfo.casinProductSpec"
                        :key="index"
                    >
                        <div class="item"
                             v-if="item.ingStock != 0"
                             :class="item.productSpecId == productSpecId ? 'active' : ''"
                             @click="changeSpec(item)"
                        >
                            {{item.strSpecName}}
                        </div>
                        <div class="item disabled" v-if="item.ingStock == 0">{{item.strSpecName}}</div>
                    </div>
                </div>
                <div class="count-choose">
                    <div class="tit">购买数量</div>
                    <van-stepper v-model="sku.skuNumber"/>
                </div>
            </div>
            <div class="popupFoot">
                <div class="btn-groups">
                    <div class="bbtn btn-cart" @click="addCart">加入购物车</div>
                    <div class="bbtn btn-buy" @click="addCart(true)">立即购买</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    export default{
        components: {
            Toast
        },
        props: {
            sku: {},
            goodsInfo: {}
        },
        data (){
            return {
                productSpecId: '',
                decPrice: ''
            }
        },
        created(){
            let t = this;
            t.decPrice = t.goodsInfo.decPrice;
            console.log(t.goodsInfo.imageList[0].strImageAddr)
//            t.changeSpec(t.goodsInfo.casinProductSpec[0]);
        },
        methods: {
            /*切换规格*/
            changeSpec(product){
                let t = this;
                t.productSpecId = product.productSpecId;
                t.decPrice = product.decPrice;
                t.sku.strSpecName = product.strSpecName;
                t.$emit(`update:sku`, t.sku);
                t.sku.skuNumber=1
            },
            /*取消*/
            handleCancel(){
                let t = this;
                t.sku.isShowskus = false;
                t.$emit(`update:sku`, t.sku);
            },
            /*加入购物车、立即购买*/
            addCart(type){
                let t = this,
                    param = {};
                if (t.productSpecId == '') {
                    Toast('请选择规格');
                    return false;
                }
                param.addNum = t.sku.skuNumber;
                param.productId = t.goodsInfo.productId;
                param.productSpecId = t.productSpecId || '';
                t.$axios.postToken(t.$store.state.urlConfig.checkProductShelf, {ids: t.goodsInfo.productId + '-' + t.productSpecId}).then(result => {
                    if (result.data.data.status == 0) {
                        if (type == true) {
                            t.$router.push({
                                path: '/enterOrder',
                                query: {
                                    goodsId: t.goodsInfo.productId,
                                    spec_id: t.productSpecId,
                                    stock: t.sku.skuNumber,
                                    type: 0
                                }
                            });
                        } else {
                            t.$axios.postToken(t.$store.state.urlConfig.addCart, param).then(res => {
                                Toast('加入购物车成功');
                                localStorage.setItem('RefreshCart', true);
                                t.handleCancel();
                            });
                        }
                    } else {
                        t.sku.isShowPopup = true;
                        t.$emit(`update:sku`, t.sku);
                        t.handleCancel();
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .popupMain {
        background: #fff;
        border-radius: 0.5rem 0.5rem 0 0;
        padding: 1.15rem $spaceLF 1.55rem $spaceLF;
    }

    .close-icon {
        position: absolute;
        width: 0.75rem;
        height: 0.75rem;
        top: 0.35rem;
        right: 0.35rem;
    }

    .popupHead {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;
        .popupImg {
            width: 4rem;
            height: 3.6rem;
            background: rgba(216, 216, 216, 1);
            border-radius: 10px;
            object-fit: cover;
            margin-right: 0.65rem;

        }
        .popupInfo {
            .goods-name {
                font-size: $f55;
                color: $titleColor;
                margin-bottom: 0.15rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }

    .popupBody {
        .tit {
            color: $titleColor;
            font-size: $f65;
            margin-bottom: 0.4rem;
        }
        .sku-choose {
            margin-bottom: 1.15rem;
            .item {
                float: left;
                font-size: $f55;
                height: 1.15rem;
                background: rgba(246, 246, 246, 1);
                border-radius: 0.6rem;
                padding: 0 1.25rem;
                margin-right: 0.75rem;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                &.active {
                    background: linear-gradient(270deg, rgba(255, 78, 76, 1) 0%, rgba(254, 120, 79, 1) 100%);
                    color: #fff;
                }
                &.disabled {
                    color:rgba(218,218,218,1);
                }
            }
            &:after {
                content: '';
                display: block;
                clear: both;
            }
        }
        .count-choose {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tit {
                margin-bottom: 0;
            }
        }
    }

    .popupFoot {
        .btn-groups {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 4rem 0 0 0;
            .bbtn {
                width: 50%;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: $f65;
            }
            .btn-cart {
                border-radius: 1.25rem 0 0 1.25rem;
                background: linear-gradient(90deg, rgba(255, 187, 0, 1) 0%, rgba(255, 132, 49, 1) 100%);
            }
            .btn-buy {
                background: rgba(255, 78, 76, 1);
                border-radius: 0 1.25rem 1.25rem 0;
            }
        }
    }

</style>
