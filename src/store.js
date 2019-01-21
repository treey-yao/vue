import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {

        }
    },
    getters: {
        // 是否认证，个人
        isAuth(state) {
            if (state.user.auth && state.user.auth == 1) {
                return true;
            }
            return false;
        },
        // 是否认证，企业
        comAuth(state) {
            if (state.user.comAuth && state.user.comAuth == 1) {
                return true;
            }
            return false;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        authGo(context) {
            return new Promise(async (success, reject) => {
                if (context.getters.isAuth || context.getters.comAuth) {
                    // console.log('已认证')
                    success();
                    return;
                }

                let user = context.state.user;
                if ((user.auth || user.auth == 0) && user.auth != 1 && (user.comAuth || user.comAuth == 0) && user.comAuth != 1) {
                    console.log('未认证')
                    reject(user);
                    return;
                }

                await context.dispatch('getUserInfo');

                if (context.getters.isAuth) {
                    console.log('查询已认证')
                    success();
                } else {
                    console.log('查询未认证')
                    reject(user);
                }
            })
        },
        //获取用户信息，优先返回本地缓存
        readUserInfo(context) {
            return new Promise(async (success, reject) => {
                if (context.state.user.authid) {
                    success(context.state.user)
                } else {
                    await context.dispatch('getUserInfo');
                    success(context.state.user)
                }
            })
        },
        //获取用户信息，永远通过请求
        getUserInfo(context) {
            return axios.get('/pro_user_user/my')
                .then(res => {
                    console.log(res)
                    let data = res.data;
                    context.commit('setUser', data);
                    return context.state.user;
                })
        }
    }
})
