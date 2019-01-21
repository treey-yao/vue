import { Dialog } from 'vant';
import cookie from "js-cookie";

export default {
    request: {
        common(config) {
            // console.log('axios req config:', config)
            if (process.env.NODE_ENV === 'development') {
                if (config.method == 'get') {
                    let params = {
                        ...config.params,
                        tokenType: 'test'
                    }
                    config.params = params;
                } else {
                    let data = {
                        ...config.data,
                        tokenType: 'test'
                    }
                    config.data = data;
                }
            }
            return config;
        }
    },
    response: {
        common(res) {
            // console.log('axios res:', res)
            if (res.status !== 200) {
                Dialog.alert({ message: '网络请求异常！' });
            } else {
                switch (res.data.code) {
                    case 1:
                        return res.data;
                        break;
                    case -2:
                    case -3:
                    case -4:
                        Dialog.alert({ message: '接口错误：' + res.data.msg })
                            .then(() => {
                                cookie.remove('token');
                                location.reload();
                            });
                        return Promise.reject(res.data.msg);
                        break;
                    default:
                        Dialog.alert({ message: '请求错误：' + res.data.msg });
                        return Promise.reject(res.data.msg);
                }
            }
        }
    }
}
