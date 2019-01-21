import axios from 'axios';
const jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'];

export default {
    init(func) {
        let that = this;
        let url = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? window.$entryPage : location.href;
        axios.post('api_wlogin_share', {
            url: url
        }).then(res => {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: jsApiList
            });
            if (func) { func() }
        })
    },
    hideAll(func) {
        wx.ready(function () {
            wx.hideMenuItems({
                menuList: [
                    'menuItem:readMode', // 阅读模式
                    'menuItem:share:timeline', // 分享到朋友圈
                    'menuItem:share:appMessage', // 分享给朋友
                    'menuItem:share:qq', // 分享到QQ
                    'menuItem:share:QZone', // 分享到QQ空间
                    'menuItem:share:weiboApp', // 分享到Weibo
                    'menuItem:share:facebook', // 分享到FB
                    'menuItem:copyUrl', // 复制链接
                    'menuItem:share:brand', // 一些特殊企业号
                    'menuItem:openWithQQBrowser', //在QQ浏览器中打开
                    'menuItem:openWithSafari', //在Safari中打开
                    'menuItem:favorite', //收藏
                    'menuItem:share:email', //邮件
                    'menuItem:exposeArticle', //举报
                    "menuItem:setFont",//调整字体
                ],
                success: function (res) {
                    console.log('hide all success');
                    if (func) { func() }
                },
                fail: function (res) {
                    console.log(res);
                }
            });
        })
    },
    //分享朋友圈
    shareTimeLine(shareData, func) {
        wx.ready(function () {
            wx.showMenuItems({
                menuList: ['menuItem:share:timeline'] // 要显示的菜单项
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function (res) {
                    console.log('分享到朋友圈ok');
                    if (func) { func(res) }
                }
            });
        });
    },
    //分享好友
    shareAppMsg(shareData, func) {
        wx.ready(function () {
            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage'] // 要显示的菜单项
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function (res) {
                    console.log('分享给朋友OK');
                    if (func) { func(res) }
                }
            });
        });
    },
    //分享默认信息
    share(shareData, func) {
        wx.ready(function () {
            wx.showMenuItems({
                menuList: ['menuItem:share:timeline', 'menuItem:share:appMessage'] // 要显示的菜单项
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function (res) {
                    console.log('分享到朋友圈ok');
                    if (func) { func(res) }
                }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function (res) {
                    console.log('分享给朋友OK');
                    if (func) { func(res) }
                }
            });
        });
    }
}
