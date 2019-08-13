<template>
    <div class="share">
        <div class="popupMain">
            <div class="popupBody">
                <div class="txt-cont" v-if="userInfo.type==3">朋友通过你分享的页面成功购买后，你可以获得相应的佣金，你可以在“我的-社区合伙人中心”里查看明细</div>
                <div class="share-mode">
                    <div class="item">
                        <img src="../../assets/images/icon_wx.png"/>
                        <p>微信好友</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/icon_pyq.png"/>
                        <p>朋友圈</p>
                    </div>
                    <div class="item" @click="handlePoster" v-if="userInfo.type==3">
                        <img src="../../assets/images/icon_tw.png"/>
                        <p>图文海报</p>
                    </div>
                </div>
            </div>
            <div class="popupFoot" @click="handleCancel"><span>取消</span></div>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk'
    export default{
        data (){
            return {
            	userInfo:[]
            }
        },
        props: {
            share: {},
            goodsInfo:{},
            
        },
        created(){
        	var _this=this
			var url=_this.$store.state.urlConfig.getUserInfo
			_this.$axios.getToken(url,'')
			.then(res => {
				console.log(res.data.data)
				_this.userInfo=res.data.data
				//type3社区合伙人 type4普通 
    		});
        },
        methods: {
            handleCancel(){
                let t = this;
                t.share.isShowsShare = false;
                t.$emit(`update:share`, t.share)
            }
            ,
            handlePoster(){
                let t = this;
                t.share.isShowsShare = false;
                t.share.isShowsPoster = true;
                t.$emit(`update:share`, t.share)
            },
            wxShare() {
                let t = this
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
                wx.config({
                    debug: false, // 开启调试模式,开发时可以开启 
                    appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
                    timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
                    nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
                    signature: Data.signature,   // 必填，签名 由接口返回
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 此处填你所用到的方法
                });
                wx.ready(() => {
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: '您的好友邀请您注册秒单之家', // 分享标题
                        desc: '快来注册秒单之家，一大笔订单等你来拿', // 分享描述
                        link: t.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: window.document.location.protocol + '//' + window.document.location.host + '/kwd/static/img/logo.png', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            t.$router.push({path: '/me', query: {}})
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            // alert('cancel')
                        }
                    })
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: '您的好友邀请您注册秒单之家', // 分享标题
                        link: t.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: window.document.location.protocol + '//' + window.document.location.host + '/kwd/static/img/logo.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            t.$router.push({path: '/me', query: {}})
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .popupMain {
        background: #fff;
        border-radius: 0.5rem 0.5rem 0 0;
        padding: 1.5rem 1.75rem 0 1.75rem;
    }

    .popupBody {
        .txt-cont {
            font-size: $f55;
            color: $fontColor2;
            line-height: 1rem;
        }
        .share-mode {
            padding: 1.8rem 0 2.8rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item {
                text-align: center;
                img {
                    width: 2.5rem;
                    height: 2.5rem;
                    margin-bottom: 0.45rem;
                }
                p {
                    font-size: $f65;
                    color: $fontColor2;
                    font-weight: 400;
                }
            }
        }
    }

    .popupFoot {
        height: 3.05rem;
        margin: 0 -1.75rem;
        color: $fontColor2;
        font-size: $f65;
        text-align: center;
        border-top: 2px solid #e6e6e6;
        span {
            display: block;
            margin-top: 0.75rem;
        }
    }

</style>
