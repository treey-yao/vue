<template>
    <div></div>
</template>
<script>
import cookie from "js-cookie";
export default {
    data() {
        return {
            fromUrl: cookie.get('pre_wbauth_url') || location.origin,
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
            cookie.remove('pre_wbauth_url');
            cookie.remove(that.bname);
            that.$router.replace(that.fromUrl)
            // location.href = that.fromUrl;
        },
        authSuccess(d) {
            console.log("auth msg:", d);
            let that = this;
            cookie.set("wbtoken", d.token, {
                expires: 1 / 12
            });
            localStorage.setItem('wbUserInfo', JSON.stringify(d.data));
            that.$ajax.defaults.headers.common['token'] = d.token;
            that.goPage();
        },
        getCode() {
            let that = this;
            that.code = that.getQueryString("code");
            if (that.code !== null) {
                console.log(that.code)
                that.$ajax
                    .get(that.$apis.wxAuthUrl + "api_wlogin_wb/wbuser/code/" + that.code, {
                        params: {
                            wxtype: that.fromUrl.indexOf('/req') > -1 ? 2 : 1
                        }
                    })
                    .then((res) => {
                        console.log('授权成功:', res)
                        that.authSuccess(res)
                    }).catch((e) => {
                        console.log('权授权失败!', e)
                    });
            } else {
                location.href = that.$apis.wxAuthUrl + "api_wlogin_wb/wburl/bname/" + that.bname + ".html?wxtype=1";
            }
        },
        init() {
            var that = this;
            let token = cookie.get("wbtoken");
            if (token != null) {
                // that.goPage();
            } else {
                let burl = location.href; //获取当前url
                cookie.set(that.bname, burl, { expires: that.saveData });
                that.getCode();
            }
        }
    },
    mounted() {
        var that = this;
        that.init();
    }
}
</script>
