<template>
    <div class="ui-content">
        <div class="head-wrap">
            <!-- <div class="head-nav-box">
                <span class="ui-head-back-wrap"
                      @click="$router.back()">
                    <i class="ui-icon icon-back"></i>
                </span>
            </div> -->
            <div class="head-img-wrap">
                <div @click="$router.push(`/member/set`)"
                     class="head-img ui-avatar ui-avatar-radius ">
                    <div :style="{'backgroundImage': `url( ${ userData.headpic })`}"></div>
                </div>
            </div>
            <div class="head-info-wrap">
                <span class="head-info-name">{{userData.nickname}}</span>
            </div>
        </div>
        <!-- 数据 -->
        <div class="data-box">
            <div class="card-container data-card-box">
                <div class="ui-flex ui-flex-between card-title-box">
                    <div class="ui-flex">
                        <span class="ui-icon icon-qiandai ui-icon-tb"></span>
                        <span class="">我的资产</span>
                    </div>
                    <div>
                        <span class="ui-text-orange">￥{{priceToYuan(feeData.totfee)}}</span>
                    </div>
                </div>
                <div class="data-content-box">
                    <ul class="data-items-box">
                        <li>
                            <div class="">
                                <div class="ui-flex ui-flex-between data-cell-box">
                                    <span class="ui-text-gray">充值余额</span>
                                    <router-link :to="{path: `/member/money/charge_list`}"
                                                 class="ui-flex">
                                        明细
                                        <span class="ui-icon icon-go ui-text-gray go-icon"></span>
                                    </router-link>
                                </div>
                                <div class="data-cell-box">
                                    <span>￥{{priceToYuan(feeData.usemon)}}</span>
                                </div>
                                <div class="ui-flex btn-group-box">
                                    <span @click="$router.push('/member/money/charge')"
                                          class="ui-btn">充值</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="">
                                <div class="ui-flex ui-flex-between data-cell-box">
                                    <span class="ui-text-gray">收入余额</span>
                                    <router-link :to="{path: `/member/money/income_list`}"
                                                 class="ui-flex">
                                        明细
                                        <span class="ui-icon icon-go ui-text-gray go-icon"></span>
                                    </router-link>
                                </div>
                                <div class="data-cell-box">
                                    <span>￥{{priceToYuan(feeData.usefee)}}</span>
                                </div>
                                <div class="ui-flex btn-group-box">
                                    <span @click="goLink('/member/money/transfer?money='+feeData.usefee)"
                                          class="ui-btn ui-btn-green"
                                          style="color:#fff">转账</span>
                                    <span @click="goLink('/member/money/cashChoice?money='+feeData.usefee)"
                                          class="ui-btn ">提现</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 我的推广 -->
            <div class="card-container data-card-box">
                <router-link :to="{path: `/member/plat`}"
                             class="ui-flex ui-flex-between card-title-box">
                    <div class="ui-flex ">
                        <span class="ui-icon icon-feiji-sel ui-icon-tb"></span>
                        <span class="">我的推广</span>
                    </div>
                    <div>
                        <span class="ui-icon icon-go ui-text-gray"></span>
                    </div>
                </router-link>
                <div class="data-content-box">
                    <ul class="data-items-box">
                        <li @click="$router.push('/member/plat?tab=1')">
                            <div>
                                <span class="item-title">待支付</span>
                                <span class="item-data">{{tasksData.tasks1}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/plat?tab=2')">
                            <div>
                                <span class="item-title">待审核</span>
                                <span class="item-data">{{tasksData.tasks2}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/plat?tab=3')">
                            <div>
                                <span class="item-title">进行中</span>
                                <span class="item-data">{{tasksData.tasks3}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/plat?tab=4')">
                            <div>
                                <span class="item-title">已结束</span>
                                <span class="item-data">{{tasksData.tasks4}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 我的任务 -->
            <div class="card-container data-card-box">
                <router-link :to="{path: `/member/task`}"
                             class="ui-flex ui-flex-between card-title-box">
                    <div class="ui-flex ">
                        <span class="ui-icon icon-book-sel ui-icon-tb"></span>
                        <span class="">我的任务</span>
                    </div>
                    <div>
                        <span class="ui-icon icon-go ui-text-gray"></span>
                    </div>
                </router-link>
                <div class="data-content-box">
                    <ul class="data-items-box">
                        <li @click="$router.push('/member/task')">
                            <div>
                                <span class="item-title">已领取</span>
                                <span class="item-data">{{mytaskData.mytask1}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/task?tab=2')">
                            <div>
                                <span class="item-title">任务邀请</span>
                                <span class="item-data">{{mytaskData.mytask2}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/task?tab=1')">
                            <div>
                                <span class="item-title">已结束</span>
                                <span class="item-data">{{mytaskData.mytask3}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 我的资源 -->
            <div class="card-container data-card-box">
                <router-link :to="{path: `/member/media`}"
                             class="ui-flex ui-flex-between card-title-box">
                    <div class="ui-flex ">
                        <span class="ui-icon icon-chang ui-icon-tb"></span>
                        <span class="">我的资源</span>
                    </div>
                    <div>
                        <span class="ui-icon icon-go ui-text-gray"></span>
                    </div>
                </router-link>
                <div class="data-content-box">
                    <ul class="data-items-box">
                        <li @click="$router.push('/member/media?tab=1')">
                            <div>
                                <span class="item-title">朋友圈</span>
                                <span class="item-data">{{mediaData.media1}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/media?tab=2')">
                            <div>
                                <span class="item-title">微信群</span>
                                <span class="item-data">{{mediaData.media2}}</span>
                            </div>
                        </li>
                        <li @click="$router.push('/member/media?tab=3')">
                            <div>
                                <span class="item-title">微博</span>
                                <span class="item-data">{{mediaData.media3}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card-container data-card-box">
                <van-cell-group>
                    <van-cell @click="$router.push(`/member/collect`)"
                              :value="collect"
                              is-link>
                        <template slot="title">
                            <span class="ui-icon icon-shoucang list-icon"></span>
                            <span class="text">我的收藏</span>
                        </template>
                    </van-cell>
                    <van-cell @click="$router.push(`/member/draft`)"
                              :value="draft"
                              is-link>
                        <template slot="title">
                            <span class="ui-icon icon-caogaoxiang1 list-icon"></span>
                            <span class="text">草稿箱</span>
                        </template>
                    </van-cell>
                    <van-cell @click="$router.push(`/member/set`)"
                              value=""
                              is-link>
                        <template slot="title">
                            <span class="ui-icon icon-set list-icon"></span>
                            <span class="text">设置</span>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
        <nav-bar :navBarActive="navBarActive"></nav-bar>
        <!-- 个人认证提示-->
        <van-popup v-model="showUserTipsPop"
                   class="sharePop-warp">
            <div class="pop-share-content">
                <div class="pop-share-title">提示</div>
                <div class="pop-share-content">
                    <p class="user-tips">您还未进行个人信息认证</p>
                    <p class="user-tips">请通过认证后，再来操作！</p>
                </div>
                <div @click="goAuth(`/member/auth/personal`)"
                     class="ui-btn ui-btn-orange ui-btn-radius">
                    个人信息认证
                </div>
            </div>
            <span class="pop-close ui-icon icon-closecircle"
                  @click="showUserTipsPop=false"></span>
        </van-popup>

    </div>
</template>
<script>
import { Cell, CellGroup, Popup, Button } from 'vant';
import navBar from "@/components/navbar";
import { priceToYuan } from '@/utils/util.js'
export default {
    components: {
        navBar: navBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Popup.name]: Popup,
        [Button.name]: Button,
    },
    data() {
        return {
            priceToYuan: priceToYuan,
            showUserTipsPop: false,
            navBarActive: 3,
            userData: {}, //基本信息
            feeData: [], //我的资产
            tasksData: [], //我的推广
            mytaskData: [], //我的任务
            mediaData: [], //我的资源
            collect: "",
            draft: ""
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        getTesk() {
            let that = this;
            that.$loading();
            that.$ajax.get('/pro_user_index/indexdata')
                .then(res => {
                    // console.log(res)
                    let data = res.data;
                    that.setData(data);
                    sessionStorage.setItem('memberData', JSON.stringify(data));
                }).then(() => {
                    that.$toast.clear();
                    that.isLoading = false;
                })
        },
        setData(data) {
            let that = this;
            that.userData = data.user;
            that.feeData = data.fee;
            that.tasksData = data.tasks;
            that.mytaskData = data.mytask;
            that.mediaData = data.media;
            that.collect = data.collect;
            that.draft = data.draft;
        },
        goLink(param) {
            let that = this;
            if (that.user.auth == 1) {
                that.$router.push(param);
            } else {
                if (that.user.auth == 2) {
                    that.$dialog.alert({ message: '认证正在审核中，请耐心等待' })
                } else {
                    that.showUserTipsPop = true;
                }
            }
        },
        goAuth(path) {
            let that = this;
            if (!that.userData.mobile) {
                that.$router.push({ path: '/member/set/mobile', query: { goAuth: path } });
            } else {
                that.$router.push(path);
            }
        }

    },
    mounted() {
        let that = this;
        that.getTesk();
        that.$store.dispatch('readUserInfo');
        //显示缓存中的首页数据
        let sessionMemberData = sessionStorage.getItem('memberData');
        if (sessionMemberData) {
            that.setData(JSON.parse(sessionMemberData));
        }
    },
}
</script>
<style scoped>
/* 公共 */
a {
    color: #666;
}
a:hover,
a:active,
a:link {
    color: #666;
}

/** * * * * *顶部 * * * * * * * */
.head-wrap {
    display: block;
    margin: 0;
    padding: 0;
    background-size: 125% 125%;
    background-position: top center;
    background-repeat: no-repeat;
    background-image: url("../../assets/img/member/bg_me.png");
    position: relative;
    padding-top: 1.9rem;
}

.head-nav-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.ui-head-back-wrap {
    padding: 0 0.7rem;
}
.ui-head-back-wrap .ui-icon {
    position: relative;
    z-index: 20;
    padding: 0.5rem 0;
    font-size: 1rem;
    line-height: 1.2rem;
    color: #fff;
}

/* 头像 */
.head-img-wrap {
    margin-top: -1rem;
    text-align: center;
    position: relative;
}
.head-img {
    display: inline-block;
    border: 2px solid #ea5518;
}
.head-info-wrap {
    padding: 0.5rem 0;
}

.head-info-name {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    color: #313131;
    text-align: center;
}

/** * * * * *数据 * * * * * * * */
.data-box {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.data-card-box {
    background: #fff;
    overflow: hidden;
}

.data-card-box .text {
    font-size: 0.8rem;
    color: #666;
}

.card-title-box {
    padding: 0.5rem;
    border-bottom: 1px solid #ececec;
    font-size: 0.8rem;
}

.card-title-box .ui-icon-tb {
    font-size: 0.9rem;
    margin-right: 0.5rem;
    color: #999;
}

.data-content-box {
    padding: 0.7rem 0;
}
.data-items-box {
    display: -webkit-flex;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}
.data-items-box li {
    flex: 1;
    border-right: 1px solid #eaeaea;
    padding: 0 0.5rem;
}
.data-items-box li:last-child {
    border-right: none;
}
.data-cell-box {
    padding-bottom: 0.5rem;
}

.go-icon {
    font-size: 0.45rem;
    margin: 0 0 0 0.2rem;
}

.btn-group-box .ui-btn {
    flex: 1;
    margin: 0;
}
.btn-group-box .ui-btn:nth-child(even) {
    margin-left: 0.5rem;
}
.item-title {
    display: block;
    font-size: 0.7rem;
    text-align: center;
    color: #9b9b9b;
    margin-bottom: 0.3rem;
}
.item-data {
    display: block;
    font-size: 0.8rem;
    text-align: center;
    color: #616161;
}
.list-icon {
    font-size: 0.85rem;
    margin-right: 0.3rem;
    margin-top: -0.1rem;
    color: #999;
}
/* 个人认证提示 */

/* 转发素材 */
.sharePop-warp {
    width: 80%;
    background: transparent;
    padding: 2rem 0 0 0;
}
.pop-share-title {
    display: block;
    height: 2rem;
    line-height: 2rem;
    border: 1px solid #ed6e3e;
    width: 80%;
    margin: -2rem auto 0;
    border-radius: 5rem;
    text-align: center;
    background: #fff;
    color: #ed6e3e;
}
.pop-share-content {
    display: block;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
}
.pop-share-content .user-tips {
    text-align: center;
    margin: 0px;
    padding: 0.3rem 0;
}
.pop-close {
    display: block;
    color: #fff;
    margin: 1rem auto;
    text-align: center;
    font-size: 1.5rem;
}
</style>




