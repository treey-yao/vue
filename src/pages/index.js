/**
 * 路由页面配置
 * @param path 请求的路径
 * @param name 根据命名来导航
 * @param meta 页面参数配置
 * @param meta.title 页面的标题，默认为项目名
 * @param meta.keepAlive 是否缓存页面，单独设置无效，需要在页面中配合使用。默认不缓存
 * @param meta.notWxauth 正式环境下，是否关闭微信授权。默认所有页面开启
 * @param component 模板文件路径
*/

import prd from './prd'
import member from './member'
export default [
    ...prd,
    ...member,

    /**
     * 公共
     * */
    {
        path: '/wxauth',
        name: 'wxauth',
        meta: {
            // title: '微信授权',
            notWxauth: true
        },
        component: () => import('@/views/pub/wxauth.vue')
    },
    {
        path: '/wbauth',
        name: 'wbauth',
        meta: {
            // title: '微博授权',
            notWbauth: true
        },
        component: () => import('@/views/pub/wbauth.vue')
    },
    //微信分享统计中转页
    {
        path: '/req',
        name: 'req',
        meta: {
            title: '跳转中…',
        },
        component: () => import('@/views/pub/req.vue')
    },
    //微博分享统计中转页
    {
        path: '/wbreq',
        name: 'wbreq',
        meta: {
            title: '跳转中…',
        },
        component: () => import('@/views/pub/req.vue')
    },
    {
        path: "/debug",
        name: "调试",
        meta: {
            notWxauth: true,
            notWbauth: true
        },
        component: () => import('@/views/pub/debug.vue')
    },
    {
        path: "/404",
        name: "404",
        meta: {
            notWxauth: true,
            notWbauth: true
        },
        component: () => import('@/views/pub/404.vue')
    }
]
