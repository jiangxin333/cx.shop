<template>
    <div class="share">
        <div class="poster">
            <img src="../../assets/images/p-close.png" class="p-close" @click="handleCancel"/>
            <div class="posterBody" id="posterBody">
                <img class="goods-img" :src="goodsInfo.imageList.length>0&&goodsInfo.imageList[0].strImageAddr"/>
                <div class="product-price product-price--fb">
                    <div>
                        <span v-html="$options.filters.goodsDetailPrice(goodsInfo.decPrice || 0)"></span>
                        <del class="original-price">市场价：{{goodsInfo.decMarkprice || 0}}</del>
                    </div>
                </div>
                <div class="goods-name">{{goodsInfo.productName}}</div>
                <div class="qrCode" ref="qrCodeDiv"></div>
                <p class="poster-desc">长按识别二维码查看商品详情</p>
            </div>
            <div class="savePhoto" @click="createPoster">保存图片</div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    import html2canvas from 'html2canvas';
    export default{
        data (){
            return {
                posterImg: ''
            }
        },
        props: {
            share: {},
            goodsInfo: {}
        },
        mounted(){
            this.$nextTick(function () {
                this.bindQRCode();
            })
        },
        methods: {
            bindQRCode: function () {
                new QRCode(this.$refs.qrCodeDiv, {
                    text: 'https://www.baidu.com',
                    width: 88,
                    height: 88,
                    colorDark: "#333333", //二维码颜色
                    colorLight: "#ffffff", //二维码背景色
                    correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                })
            },
            createPoster() {
                // 生成海报
                const vm = this;
                const domObj = document.getElementById('posterBody');
                html2canvas(domObj, {
                    useCORS: true,
                    allowTaint: true,
                    onclone(doc) {
                        let e = doc.querySelector('#posterBody');
                        e.style.display = 'block';
                    }
                }).then(function (canvas) {
                    // 在微信里,可长按保存或转发
                    vm.posterImg = canvas.toDataURL('image/png');
                })
            },
            handleCancel(){
                let t = this;
                t.share.isShowsPoster = false;
                t.$emit(`update:share`, t.share);
            },
        }
    }
</script>

<style scoped lang="scss">

    .poster {
        position: relative;
        .p-close {
            width: 1.25rem;
            height: 1.25rem;
            position: absolute;
            right: -0.425rem;
            top: -0.425rem;
        }
        .posterBody {
            width: 13.5rem;
            margin: 0 auto;
            background: #fff;
            border-radius: 0.5rem;
            padding: 1rem 0.9rem 0.8rem 0.9rem;
            .goods-img {
                width: 100%;
                height: 11.95rem;
                object-fit: cover;
            }
            .product-price {
                margin-top: 0.5rem !important;
            }
            .original-price {
                margin-left: 0.5rem !important;
            }
            .goods-name {
                margin-top: 0.2rem;
                font-weight: 600;
                font-size: $f75;
                overflow: hidden;
                height: 1rem;
            }
            .qrCode,
            .qrCode img {
                width: 4.4rem;
                height: 4.4rem;
                display: block;
                margin: 1.35rem auto 0.5rem auto;
            }
            .poster-desc {
                font-size: $f55;
                color: $fontColor2;
                line-height: .8rem;
                text-align: center;
            }
        }

        .savePhoto {
            color: #fff;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0.7rem -0.65rem;
            font-size: $f75;
            font-weight: 500;
            line-height: 1.05rem;
            border-radius: 2rem;
            background: linear-gradient(270deg, rgba(255, 78, 76, 1) 0%, rgba(254, 120, 79, 1) 100%);
        }
    }
</style>
