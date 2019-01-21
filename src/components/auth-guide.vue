<template>
    <van-popup :value="show"
               class="pop-t">
        <div class="act-pop-b">
            <div class="pop-title-box">提示</div>
            <div class="pop-text-box">
                <slot name="content">
                    <p>海量媒介资源为你推广,</p>
                    <p>认证账号信息</p>
                    <p>马上开始流量营销！</p>
                </slot>
            </div>
            <div class="ui-flex-center">
                <div class="pop-btn-box pop-btn-1"
                     @click="goAuth('/member/auth/personal')">
                    <span class="ui-icon icon-wode-nor"></span>
                    <span class="">个人账号</span>
                </div>
                <div v-if="!user.comAuth"
                     class="pop-btn-box pop-btn-2"
                     @click="goAuth('/member/auth/company')">
                    <span class="ui-icon icon-qiye"></span>
                    <span class="">企业账号</span>
                </div>
            </div>
        </div>

        <div class="pop-close-box">
            <span class="ui-icon icon-closecircle"
                  @click="$emit('close')"></span>
        </div>
    </van-popup>
</template>
<script>
import { Popup } from 'vant';
export default {
    props: {
        show: Boolean
    },
    components: {
        [Popup.name]: Popup,
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        goAuth(path) {
            let that = this;
            if (!that.user.mobile) {
                that.$router.push({ path: '/member/set/mobile', query: { goAuth: path } });
            } else {
                that.$router.push(path);
            }
        }
    },
    mounted() {
        this.$store.dispatch('readUserInfo')
    }
}
</script>
<style scoped>
/* 弹窗 */
.pop-t {
    padding: 1rem 0 0;
}
.act-pop-b {
    padding: 1rem 1rem 1.5rem;
}
.pop-title-box {
    margin: -2rem auto 0;
    width: 80%;
    height: 2rem;
    line-height: 2rem;
    color: #ea5518;
    text-align: center;
    border: 1px solid #ea5518;
    border-radius: 5rem;
    background: #fff;
}
.pop-text-box {
    display: block;
    text-align: center;
    margin: 1rem 0;
}
.pop-text-box p {
    margin: 0;
    padding: 0.2rem 0;
    font-size: 0.75rem;
}
.pop-btn-box {
    padding: 0.5rem 0 0.8rem;
    text-align: center;
    /* flex: 1; */
    margin-right: 0.5rem;
    border-radius: 1rem;
    width: 50%;
}
.pop-btn-box .ui-icon {
    display: block;
    padding: 0.1rem 0;
    margin-bottom: 0.2rem;
    font-size: 1.5rem;
}
.pop-btn-box:last-child {
    margin: 0;
}
.pop-btn-1 {
    background: #eb7e51;
    color: #fff;
}
.pop-btn-2 {
    background: #4999f0;
    color: #fff;
}
</style>
