<template>
    <div class="vs-footer">
        <div class="pt-footer"></div>
        <div class="vs-footer-box">
            <div class="item" @click="$router.push('/')">
                <img :src="active == 0 ? icon_home_active : icon_home"/>
                <span :class="active == 0 ? 'active' : ''">首页</span>
            </div>
            <div class="item" @click="$router.push('/cart')">
                <img :src="active == 1 ? icon_cart_active : icon_cart"/>
                <span :class="active == 1 ? 'active' : ''">购物车</span>
            </div>
            <div class="item" @click="$router.push('/my')">
                <img :src="active == 2 ? icon_user_active : icon_user"/>
                <span :class="active == 2 ? 'active' : ''">我的</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
            active: {
                default: 0
            }
        },
        data() {
            return {
                icon_home: require('../../assets/images/icon_home.png'),
                icon_home_active: require('../../assets/images/icon_home_active.png'),
                icon_cart: require('../../assets/images/icon_cart.png'),
                icon_cart_active: require('../../assets/images/icon_cart_active.png'),
                icon_user: require('../../assets/images/icon_user.png'),
                icon_user_active: require('../../assets/images/icon_user_active.png'),
            }
        },
        methods: {}
    }
</script>


<style scoped lang="scss">
    .vs-footer-box {
        width: 100%;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1001;
        background: #fff;
        .item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                display: block;
                width: 1.05rem;
                height: 1.05rem;
                margin-bottom: 0.2rem;
            }
            span {
                font-size: 0.5rem;
                &.active {
                    color: #E84947;
                }
            }
        }
    }

    .pt-footer {
        padding-top: 50px;
    }
</style>
