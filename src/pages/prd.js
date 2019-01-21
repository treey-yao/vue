/**
 * 案例
 * */
export default [{
    path: '/prd',
    name: 'prd_index',
    meta: {
        title: '案例首页',
    },
    component: () => import('@/views/prd/index.vue')
},
{
    path: '/prd/detail',
    name: 'prd_detail',
    meta: {
        title: '案例详情',
    },
    component: () => import('@/views/prd/detail.vue')
},

]
