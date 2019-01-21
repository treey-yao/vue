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
            name: 'home',
            redirect: "/prd"
        },
        ...pages,
        {
            path: "*", // 此处需特别注意置于最底部
            redirect: "/404"
        }
    ],
    //设置初始化页面滚动位置
    scrollBehavior(to, from, savedPosition) {
        // console.log('savedPosition:', savedPosition)
        if (to.meta.keepAlive) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

//全局路由前置守卫
route.beforeEach((to, from, next) => {
    // console.log(to, from)
    document.title = to.meta.title ? to.meta.title : config.title; //设置标题

    //进入应用的落地页，入口页。history 模式下ios与安卓的location.href表现不一致,ios为落地页，跳转不会变化。安卓为当前显示页面，跳转链接会变
    if (location.pathname == '/' && !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        location.assign('/prd')
        // location.href = location.origin + '/task';
        next(false);
    }
    if (!window.$entryPage) {
        window.$entryPage = location.href;
    }

    //是否在微信中打开
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        wxauth(to, next);
    } else {
        wbauth(to, next);
    }

    next();
});

//全局路由后置守卫
route.afterEach((to, from) => {
    // console.log(to, from)
    if (process.env.NODE_ENV === 'production' && /micromessenger/.test(navigator.userAgent.toLowerCase())) {
        let shareData = {
            title: '家居商城',
            desc: '定制家居商城',
            link: location.origin,
            imgUrl: 'http://ydkimimg.kuaizhuan123.com/default.png'
        }

        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            //ios 只需要拿一次签名
            if (!window._wx_init) {
                window._wx_init = true;
                // wxshare.init(wxshare.hideAll);
                wxshare.init(wxshare.share(shareData));
            } else {
                wxshare.share(shareData)
            }
        } else {
            //安卓链接需要异步获取
            Promise.resolve().then(() => {
                // wxshare.init(wxshare.hideAll);
                wxshare.init(wxshare.share(shareData));
            })
        }
    }
})

export default route;
