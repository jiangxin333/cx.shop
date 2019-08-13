<template>
    <div>
        <img src="../assets/images/login_bag.png" class="login_bag"/>
        <div class="login-warp">
            <div class="login-title">你好，请登录</div>
            <div class="item">
                <div class="tit">
                    <img src="../assets/images/login_tel.png" class="tel"/>
                    <p>手机</p>
                </div>
                <div class="cont">
                    <input type="number" placeholder="请输入您的手机号码"  oninput="if(value.length > 11)value = value.slice(0, 11)" v-model="form.username"
                           @keyup.prevent="handleInput"/>
                    <button
                        type="button"
                        class="getCode"
                        :class="form.username.length != 11 ? 'disabled' : ''"
                        :disabled="isGetCode ? true : false"
                        @click="getCode"
                        v-text="codeBtn"
                    >
                    </button>
                </div>
            </div>
            <div class="item">
                <div class="tit">
                    <img src="../assets/images/login_code.png" class="code"/>
                    <p>验证码</p>
                </div>
                <div class="cont">
                    <input type="text" placeholder="请输入验证码" v-model="form.password"/>
                </div>
            </div>
            <button
                type="button"
                class="login-btn"
                :class="!form.username || !form.password? 'disabled' : ''"
                :disabled="!form.username || !form.password? true : false"
                @click="loginBtn">
                登录
            </button>
        </div>
        <div class="login-choose">
            <div class="line left"></div>
            <span>第三方登录</span>
            <div class="line right"></div>
        </div>
        <img src="../assets/images/icon_wx.png" class="icon_wx"/>
    </div>
</template>


<script>
	// 614504
    import {Toast} from 'vant';
    import Encrypt from 'jsencrypt'
    //import Encrypt from '@/utils/jsencrypt.min.js';
    export default{
        components: {
            Toast
        },
        data (){
            return {
                isGetCode: true,
                codeBtn: '获取验证码',
                codetime: 59,
                id:'',
                form: {
//                    13102379289 分销员 18723334414普通用户
                    username: '13102379289',
                    mark:''
                }
            }
        },
        methods: {
            loginBtn(){
                let _this = this;
                let thisData = _this.form;
                _this.$axios.post(_this.$store.state.urlConfig.login, thisData).then(res => {
                	  console.log(res)
	                    
	                    if(res.data.code==200){
	                    var token = res.data.data.token;
	                    var token = token.replace(/\r\n/g,"");
                		localStorage.setItem('token', token);
	                    localStorage.setItem('RefreshHome', true);
	                    localStorage.setItem('RefreshCart', true);
	                    
	                    console.log(_this.form.mark)
	                    let getid = localStorage.getItem('setid')
                        console.log(token)
                        console.log(_this.id)
                        
//	                    var geturl = _this.$store.state.urlConfig.login
//	                    var tourl = token + geturl
//	                   	
////	                    var sss = _this.$getCode(token)
//	                    
//	                    //var qwer = new asdff();
//	                    var Encrypt = new JSEncrypt();
//	                    var sss = Encrypt.encryptLong(token);
//	                    //实例化加密对象
//      
//	                    console.log(sss)
	                    if(localStorage.getItem('fxyId')){
	                    	console.log(localStorage.getItem('fxyId'))
	                    	console.log('为分享链接')
			            	var url=_this.$store.state.urlConfig.getUserInfo
							_this.$axios.getToken(url,'')
							.then(res => {
								console.log(res.data.data)
								if(res.data.data.type==4){//type3社区合伙人 type4普通 
									console.log('非分销员')
									var url2 = _this.$store.state.urlConfig.addDistributionToUser;
					            	_this.$axios.postToken(url2,{distributionId:localStorage.getItem('fxyId')})
					                .then(res => {
										console.log(res)
										if(res.data.code==200){
//											_this.$toast(res.data.msg)
//											_this.$toast('绑定分销员成功')
										}
					                });
								}
				    		});
	                    }
	                    Toast(res.data.msg);
	                    _this.$router.push({path: "/"})
                	}else{
                		Toast(res.data.msg);
                	}
	                    
                });
            },
            handleInput(){
                let t = this;
                if (t.form.username.length == 11) {
                    t.isGetCode = false;
                } else {
                    t.isGetCode = true;
                }
                if(t.codetime<59){
                    t.isGetCode = true;
                }
            },
            getCode() {
                let t = this;
                t.isGetCode = true;
                t.$axios.get(t.$store.state.urlConfig.getCode + '/' + t.form.username, {}).then(res => {
                    t.form.password = res.data.data;
                    console.log(res)
                    let timer = window.setInterval(function () {
                        t.codeBtn = t.codetime + "s";
                        t.codetime--;
                        if (t.codetime == 0) {
                            clearInterval(timer);
                            t.isGetCode = false;
                            t.codeBtn = "发送验证码";
                            t.codetime = 59;
                            return false;
                        }
                    }, 1000)
                    
                });
            },
            
        },
        created() {
        	// 用户ip
            const urlStr = window.location.href.toString().substring(0,window.location.href.toString().lastIndexOf("/"))
            const urlStr2 = urlStr.substring(0,urlStr.lastIndexOf("/"))
            console.log(urlStr2)
            
            // 生成10位随机数
            const randomNum = Math.floor(Math.random()*10000000000)
            
            // 生成用户唯一标识
            const id = randomNum
            
            this.id = id
            
            // 唯一标识存在cookie中
//          this.setCookie('setid',this.id,365);
            
            // 唯一标识存在本地中
            localStorage.setItem('setid', this.id);
//          var getid = localStorage.getItem('setid', this.id)
            
            let uuid = localStorage.getItem('setid')
            console.log(uuid)
            
            //加密
            var Encrypt = new JSEncrypt();
		Encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjTNfZA2HVz4qtcj" +
            "Y1bYhynp5T2AF0TE60MpYEpYs8dbsMvQhFbN+7KLea1HkzEM1I5a+c" +
            "gdWIF8iwuQE58aMy428f2cC0LRabdaKLhcOV4jxNLGK4mVcWMtq8g8" +
            "2sOnXZK8MG124RrrGLyWwksAvxrkGrk7JukHr2lMpxhFBy6wIDAQAB");
            var mark = Encrypt.encryptLong(uuid)
            var mark = mark.replace(/\r\n/g,"");
            console.log(mark)
            this.form.mark = mark
            
            localStorage.setItem('mark', mark);
            
            // 拿到后台需要的token+url拼接的字符串
	                   
        }
    }
</script>

<style scoped lang="scss">
    .login_bag {
        width: 100%;
        height: 13.75rem;
    }

    .login-choose {
        position: relative;
        text-align: center;
        font-size: $f65;
        width: 16rem;
        margin: 1.5rem auto 0 auto;
        color: $fontColor2;
    }

    .login-choose .line {
        position: absolute;
        width: 5.85rem;
        height: 1px;
        background: #DADADA
    }

    .login-choose .left {
        left: 0
    }

    .login-choose .right {
        right: 0
    }

    .login-choose .line {
        top: 0.45rem
    }

    .icon_wx {
        width: 2.25rem;
        height: 2.25rem;
        display: block;
        margin: .65rem auto 0 auto;
    }

    .login-warp {
        width: 13.6rem;
        background: #fff;
        position: relative;
        margin: -6.05rem auto 0 auto;
        border-radius: 0.5rem;
        background: rgba(255, 255, 255, 1);
        padding: 1.1rem 1.2rem 1.45rem 1.2rem;
        box-shadow: 0 .2rem .22rem 0 rgba(203, 207, 215, 1);
        .login-title {
            font-size: 1rem;
            color: $fontColor2;
            margin-bottom: 1.65rem;
        }
        .item {
            margin-bottom: 2.2rem;
            .getCode {
                border: none;
                width: 4.2rem;
                height: 1.35rem;
                background: linear-gradient(-90deg, rgba(232, 73, 71, 1) 0%, rgba(247, 67, 31, 1) 100%);
                border-radius: 1rem;
                color: #fff;
                font-size: $f6;
                &.disabled {
                    opacity: 0.5;
                }
            }
            img.tel {
                width: .85rem;
                height: .85rem;
            }
            img.code {
                width: .85rem;
                height: .95rem;
            }
            .tit {
                display: flex;
                align-items: center;
                margin-bottom: 0.15rem;
                p {
                    font-size: $f75;
                    color: $titleColor;
                    margin-left: 0.55rem;
                }
            }
            .cont {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: $cardBorder;
                padding: .4rem 0;
                input {
                    border: 0;
                    font-size: $f7;
                }
            }
        }
        .login-btn {
            border: none;
            width: 100%;
            height: 2.25rem;
            margin: .45rem 0 0 0;
            font-size: $f75;
            border-radius: 2rem;
            color: #fff;
            background: linear-gradient(to right, #FE784F, #FF4E4C);
            &.disabled {
                opacity: 0.5;
            }
        }
    }
</style>
