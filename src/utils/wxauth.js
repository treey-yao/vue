/**
 * 微信授权管理
 * @param toPage {object} 将要前往的页面
 * @method next {function} 进行管道中的下一个钩子，next(false)中断当前的导航
 *  */

import cookie from "js-cookie";

export default function (toPage, next) {
    let token = cookie.get("token");

    if (process.env.NODE_ENV === 'production' && !toPage.meta.notWxauth) {
        let userInfo = localStorage.getItem('wxUserInfo');
        if (!token || toPage.path != '/req' && (!JSON.parse(userInfo).identify)) {
            cookie.set('pre_wxauth_url', toPage.fullPath);
            next({
                path: '/wxauth',
                replace: true
            });
        }
    }

}
