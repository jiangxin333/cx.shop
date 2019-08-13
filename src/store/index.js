import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router'
Vue.use(Vuex);

const apiUrl = 'http://192.168.1.164:8081/' //后台地址     192.168.1.164:8081   wangyuewy.vicp.net:58122

const state = { //全局变量
    loading: false,
    //userInfo:{},
    urlConfig: {
        login: apiUrl + "sso/login",
        getCode: apiUrl + "sso/getCode", /*获取短信验证码*/
        getUserInfo: apiUrl + "sso/getUserInfo",
        upload: apiUrl + "fastdfs/fdfs/upload", //上传图片
        updateHead: apiUrl + "sso/updateHead", //修改用户头像接口
        updateNickName: apiUrl + "sso/updateNickName", //修改昵称
        updateNumber: apiUrl + "sso/updateNumber", //更新手机
        getCasinMyOrder: apiUrl + "order/casinOrder/getCasinMyOrder", //订单列表
        updataCasinOrderStatusToCancel: apiUrl + "/order/casinOrder/updataCasinOrderStatusToCancel",//取消订单
        delCasinOrder: apiUrl + "order/casinOrder/delCasinOrder",//删除订单
        updataCasinOrderStatusToRefunded: apiUrl + "order/casinOrderPay/updataCasinOrderStatusToRefunded", //申请退款
        confirmReceipt: apiUrl + "order/casinOrder/confirmReceipt",//确认收货
        getCustomerAddressList: apiUrl + "sso/CustomerAddress/getCustomerAddressList", //收货地址列表
        getOrderDetailInfoByOrderId: apiUrl + "order/casinOrder/getOrderDetailInfoByOrderId", //订单详情
        addCasinCustomerAddress: apiUrl + "sso/CustomerAddress/addCasinCustomerAddress", //新增收货地址
        deleteCustomerAddress: apiUrl + "sso/CustomerAddress/deleteCustomerAddress", //删除收货地址
        modifyCustomerAddress: apiUrl + "sso/CustomerAddress/modifyCustomerAddress",//修改收货地址
        getEvaluateByCustomerId: apiUrl + "product/evaluateManagement/getEvaluateByCustomerId", //我的评价
        addEvaluate: apiUrl + "order/casinEvaluate/addEvaluate",  //发表评价
        getLogisticsInfoById: apiUrl + "order/casinOrder/getLogisticsInfoById", //查案物流
        getDistributionOrderList: apiUrl + "sso/distribution/getDistributionOrderList", //分销员跟踪订单
        getDistributionOrderDetailInfo: apiUrl + "sso/distribution/getDistributionOrderDetailInfo",  //分销员订单详情
		getCasinPaymentDetailList: apiUrl + "order/casinOrder/getCasinPaymentDetailList", //查看交易记录
		getNotCheckNumber: apiUrl + "order/casinOrder/getNotCheckNumber",  //个人中心未查看小圆点
		setDefaultAddress: apiUrl + "sso/CustomerAddress/setDefaultAddress",   //设置默认地址
		deleteH5EvaluateById: apiUrl + "/product/evaluateManagement/deleteH5EvaluateById",  //删除评价
		updateCart: apiUrl + "cart/casinOrderCart/updateCart",//更新购物车
		addDistributionToUser: apiUrl + "/sso/Customer/addDistributionToUser",   //添加该合伙人信息到该用户(每次分享链接点开调用该接口)
       	submitOrder: apiUrl + "/order/casinOrder/submitOrder",   //提交订单
       /*----------*/
        getCustomerDefaultAddressList: apiUrl + "sso/CustomerAddress/getIndividualCustomerAddress", //提交订单获取收货地址
        checkProductShelf: apiUrl + "product/product/checkProductShelf", //验证商品以及商品规格是否下架
        getMyDistributionInfo: apiUrl + "sso/distribution/getMyDistributionInfo", //查看分销员信息接口
        updateDistributionBankInfo: apiUrl + "sso/distribution/updateDistributionBankInfo", //完善分销员信息-银行信息
        getDistributionAchievement: apiUrl + "sso/distribution/getDistributionAchievement", //移动端-分销员查看业绩信息
        getDistributionAchievementDetailInfo: apiUrl + "sso/distribution/getDistributionAchievementDetailInfo", //移动端-获取分销员业绩订单详情信息
        getCommissionDetail: apiUrl + "sso/distribution/getCommissionDetail", //移动端-查看申请佣金明细
        getCommissionDetailById: apiUrl + "sso/distribution/getCommissionDetailById", //移动端-查看申请佣金明细详情
        applyCommission: apiUrl + "sso/distribution/applyCommission", //申请佣金
        getCityList: apiUrl + "sso/Area/getCityList", //获取业务城市列表
        findBanner: apiUrl + "product/bannerConfigure/findBanner", //获取业务城市列表
        getProductList: apiUrl + "product/product/getProductList", //根据定位区域获取商品列表
        findWindowConfigure: apiUrl + "product/windowConfigure/findWindowConfigure", //根据用户首页定位地址查询橱窗信息
        getProductDetail: apiUrl + "product/product/getProductDetail", //根据商品ID获取商品详情
        productEvaluateList: apiUrl + "/product/evaluateManagement/productEvaluateList", //根据商品ID获取商品评论
        addCart: apiUrl + "cart/casinOrderCart/addCart", //添加购物车
        getCartList: apiUrl + "cart/casinOrderCart/getCartList", //获取用户购物车接口
        changeNum: apiUrl + "cart/casinOrderCart/changeNum", //修改购物车中单个商品数量接口
        delCartById: apiUrl + "cart/casinOrderCart/delCartById", //删除购物车接口
        getSettlementData: apiUrl + "cart/casinOrderCart/getSettlementData", //获取结算商品信息
    }
};

const store = new Vuex.Store({
    state,
    getters: {
        //      userInfo(){
        //          return JSON.parse(localStorage.getItem('userInfo'))
        //      },
        reflashPage() { //路由刷新页面
            let NewPage = '_empty' + '?time=' + new Date().getTime() / 500;
            router.push(NewPage);
            router.go(-1);
        }
    },
    mutations: {}
});

export default store;
