import Vue from 'vue'
import Router from 'vue-router'
import My from '@/page/My'
import CommodityDetail from '@/page/CommodityDetail'
import BasicMessage from '@/page/BasicMessage'
import UserPhone from '@/page/UserPhone'
import UserName from '@/page/UserName'
import AddressList from '@/page/AddressList'
import NewAddress from '@/page/NewAddress'
import Login from '@/page/Login'
import FillOrder from '@/page/FillOrder'
import MyOrder from '@/page/MyOrder'
import OrderDetail from '@/page/OrderDetail'
import AfterSale from '@/page/AfterSale'
import Logistics from '@/page/Logistics'
import Comment from '@/page/Comment'
import MyComment from '@/page/MyComment'
import Extension from '@/page/Extension'
import TrackOrder from '@/page/TrackOrder'
import TrackOrderDetail from '@/page/TrackOrderDetail'
import TransactionRecord from '@/page/TransactionRecord'
import Feedback from '@/page/Feedback'
import EditAddress from '@/page/EditAddress'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: '首页',
            component: () => import('@/page/Index'),
            meta: {keepAlive: true}
        },
        {
            path: '/Detail',
            name: '详情',
            component: () => import('@/page/detail'),
        },
        {
            path: '/Location',
            name: '地址选择',
            component: () => import('@/page/Location'),
            meta: {keepAlive: true}
        },
        {
            path: '/cart',
            name: '购物车',
            component: () => import('@/page/cart'),
            meta: {keepAlive: true}
        },
        {
            path: '/enterOrder',
            name: '提交订单',
            component: () => import('@/page/enterOrder'),
        },
        {
            path: '/partner',
            name: '社区合伙人',
            component: () => import('@/page/partner'),
        },
        {
            path: '/perfect',
            name: '完善信息',
            component: () => import('@/page/partner/perfect'),
        },
        {
            path: '/partnerDetail',
            name: '跟踪订单',
            component: () => import('@/page/partner/partnerDetail'),
        },
        {
            path: '/partnerDetail/detail',
            name: '跟踪订单详情',
            component: () => import('@/page/partner/partnerDetail/detail'),
        },
        {
            path: '/achievement',
            name: '查看业绩',
            component: () => import('@/page/partner/achievement'),
        },
        {
            path: '/achievement/detail',
            name: '查看业绩详情',
            component: () => import('@/page/partner/achievement/detail'),
        },
        {
            path: '/apply',
            name: '申请佣金明细',
            component: () => import('@/page/partner/apply'),
        },
        {
            path: '/apply/detail',
            name: '申请佣金详情',
            component: () => import('@/page/partner/apply/detail'),
        },
        {
            path: '/My',
            name: 'My',
            component: My
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/CommodityDetail',
            name: 'CommodityDetail',
            component: CommodityDetail
        },
        {
            path: '/BasicMessage',
            name: 'BasicMessage',
            component: BasicMessage
        },
        {
            path: '/UserPhone',
            name: 'UserPhone',
            component: UserPhone
        },
        {
            path: '/UserName',
            name: 'UserName',
            component: UserName
        },
        {
            path: '/AddressList',
            name: 'AddressList',
            component: AddressList
        },
        {
            path: '/NewAddress',
            name: 'NewAddress',
            component: NewAddress
        },
        {
            path: '/FillOrder',
            name: 'FillOrder',
            component: FillOrder
        },
        {
            path: '/MyOrder',
            name: 'MyOrder',
            component: MyOrder
        },
        {
            path: '/OrderDetail',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: '/AfterSale',
            name: 'AfterSale',
            component: AfterSale
        },
        {
            path: '/Logistics',
            name: 'Logistics',
            component: Logistics
        },
        {
            path: '/Comment',
            name: 'Comment',
            component: Comment
        },
        {
            path: '/MyComment',
            name: 'MyComment',
            component: MyComment
        },
        {
            path: '/Extension',
            name: 'Extension',
            component: Extension
        },
        {
            path: '/TrackOrder',
            name: 'TrackOrder',
            component: TrackOrder
        },
        {
            path: '/TrackOrderDetail',
            name: 'TrackOrderDetail',
            component: TrackOrderDetail
        },
        {
            path: '/TransactionRecord',
            name: 'TransactionRecord',
            component: TransactionRecord
        },
        {
            path: '/Feedback',
            name: 'Feedback',
            component: Feedback
        },
        {
            path: '/EditAddress',
            name: 'EditAddress',
            component: EditAddress
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})
