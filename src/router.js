import Vue from 'vue'
import Router from 'vue-router'
import config from './config/index'
import pages from './pages/index'
import wxauth from './utils/wxauth'
import wbauth from './utils/wbauth'
import wxshare from '@/assets/js/wxshare'

Vue.use(Router)

var route = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: "/index"
        },
        ...pages,
        {
            path: "*", // 此处需特别注意置于最底部
            redirect: "/404"
        }
    ],
    //设置初始化页面滚动位置
    // scrollBehavior(to, from, savedPosition) {
    //     // console.log('savedPosition:', savedPosition)
    //     if (to.meta.keepAlive) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // }
});

//全局路由前置守卫
route.beforeEach((to, from, next) => {
    // console.log(to, from)
    document.title = to.meta.title ? to.meta.title : config.title; //设置标题


    next();
});

//全局路由后置守卫
route.afterEach((to, from) => {
    // console.log(to, from)

})

export default route;
