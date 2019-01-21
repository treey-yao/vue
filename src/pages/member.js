/**
 * 个人中心
 * */
export default [{
    path: '/member',
    name: 'member',
    meta: {
        title: '个人中心',
    },
    component: () => import('@/views/member/index.vue')
},

]
