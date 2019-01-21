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

export default [
    ...prd,
    ...member,

    /**
     * 公共
     * */
    {
        path: "/index",
        name: "index",
        meta: {
            notWxauth: true,
            notWbauth: true
        },
        component: () => import('@/views/index/index.vue')
    }

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
