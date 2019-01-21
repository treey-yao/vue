<template>
    <div>

    </div>
</template>
<script>
import cookie from "js-cookie";

export default {
    data() {
        return {
            fromUrl: cookie.get('pre_wxauth_url') || location.origin,
            bname: "burl",
            code: '',
            saveData: 7, //天
        };
    },
    methods: {
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        goPage() {
            let that = this;
            cookie.remove('pre_wxauth_url');
            cookie.remove('authtype');
            cookie.remove(that.bname);
            that.$router.replace(that.fromUrl);
            // location.href = that.fromUrl;
        },
        authSuccess(d) {
            console.log("auth msg:", d);
            let that = this;
            cookie.set("token", d.token, {
                expires: 1 / 12
            });
            localStorage.setItem('wxUserInfo', JSON.stringify(d.data));
            that.$ajax.defaults.headers.common['token'] = d.token;
            that.goPage();
        },
        getAuth() {
            let that = this;
            that.$ajax
                .get(that.$apis.wxAuthUrl + "api_wlogin_windex/wxuser/code/" + that.code, {
                    params: {
                        wxtype: that.fromUrl.indexOf('/req') > -1 ? 2 : 1
                    }
                })
                .then((res) => {
                    console.log('强授权:', res)
                    that.authSuccess(res)
                }).catch((e) => {
                    console.log('强授权授权失败!', e)
                    cookie.set(that.bname, location.origin + location.pathname, { expires: that.saveData });
                });
        },
        getAuthBase() {
            let that = this;
            that.$ajax
                .get(that.$apis.wxAuthUrl + "api_wlogin_windex/wxuserb/code/" + that.code, {
                    params: {
                        wxtype: that.fromUrl.indexOf('/req') > -1 ? 2 : 1
                    }
                })
                .then((res) => {
                    console.log('静默:', res)
                    if (!res.data || res.data.length <= 0) {
                        console.log('静默授权失败!')
                        cookie.set('authtype', 'force');
                        cookie.set(that.bname, location.origin + location.pathname, { expires: that.saveData });
                        location.href = that.$apis.wxAuthUrl + "api_wlogin_windex/wurl/bname/" + that.bname + "/scope/snsapi_userinfo.html";
                    } else {
                        that.authSuccess(res)
                    }
                });
        },
        getCode() {
            let that = this;
            that.code = that.getQueryString("code");
            let authType = cookie.get("authtype");
            if (that.code !== null) {
                if (authType && authType == 'force') {
                    that.getAuth();
                } else {
                    that.getAuthBase();
                }
            } else {
                if (authType && authType == 'force') {
                    location.href = that.$apis.wxAuthUrl + "api_wlogin_windex/wurl/bname/" + that.bname + "/scope/snsapi_userinfo.html";
                } else {
                    location.href = that.$apis.wxAuthUrl + "api_wlogin_windex/wurl/bname/" + that.bname + "/scope/snsapi_base.html";
                }
            }
        },
        init() {
            let that = this;
            let token = cookie.get("token");
            // if (token != null) {
            //     that.goPage();
            // } else {
            let burl = location.href; //获取当前url
            cookie.set(that.bname, burl, { expires: that.saveData });
            that.getCode();
            // }
        }
    },
    mounted() {
        var that = this;
        that.init();
    }
};
</script>
