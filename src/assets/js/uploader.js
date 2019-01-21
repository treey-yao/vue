import lrz from 'lrz';
import axios from 'axios';

let baseUrl = 'http://upload-z2.qiniu.com/putb64/';

if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://up-z2.qbox.me/putb64/';
}
let token = '';

//生成随机字符串,用在七牛云上传图片的key的生成
function randomString(len) {
    var l = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < l; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function lrzip(file, func) {
    lrz(file.content)
        .then(function (rst) {
            // 处理成功会执行
            upQiniu(rst, func);
        })
        .catch(function (err) {
            // 处理失败会执行
            console.log('压缩错误');
        })
        .always(function () {
            // 不管是成功失败，都会执行
        });
}

async function upQiniu(rst, func) {

    if (!token) {
        await axios.post('pro_pub_upload').then((res) => {
            token = res.data.token;
        })
    }

    var pic = rst.content.split(',')[1];
    var fileSize = atob(pic).length;
    var key = randomString(32);
    var url = baseUrl + fileSize + '/key/' + btoa(key);

    var xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable) {
            var percentComplete = Math.round(e.loaded * 100 / e.total);
            console.log('upprogress:', percentComplete)
        }
    }, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.responseText && JSON.parse(xhr.responseText).key) {
                func(JSON.parse(xhr.responseText), rst);
            } else {
                func(xhr.responseText, rst)
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken " + token);
    xhr.send(pic);

}


export function upload(files, func) {
    if (Array.isArray(files)) {
        files.forEach(n => {
            upQiniu(n, func)
        })
    } else {
        upQiniu(files, func)
    }
}
