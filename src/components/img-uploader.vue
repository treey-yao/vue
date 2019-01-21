<template>
    <div class="ui-flex img-list">
        <div v-for="(n, i) in imgs"
             :key="i"
             @click="$emit('click', i)"
             :style="`background-image: url(${n.content || $getImg(n.key, 200)})`"
             class="ui-img-preview">
            <van-progress v-if="!n.loaded"
                          :percentage="n.progress"
                          :show-pivot="showPivot"
                          color="#f00"
                          class="progress" />
            <i v-if="n.progress >= 100"
               @click.stop="delImg(i)"
               class="ui-icon icon-closecircle-fill img-close-btn"></i>
        </div>
        <div v-if="(multiple && !maxNum || (maxNum && imgs.length < maxNum)) ||
                   (!multiple && imgs.length < 1)"
             class="upload-btn">
            <van-uploader :after-read="upimg"
                          :multiple="multiple"
                          class="">
                <i class="ui-icon icon-add ui-font-xl"></i>
            </van-uploader>
        </div>
    </div>
</template>
<script>
import { Uploader, Progress } from 'vant';

export default {
    components: {
        [Uploader.name]: Uploader,
        [Progress.name]: Progress,
    },
    props: {
        multiple: {
            type: [String, Boolean],
            default: false
        },
        maxNum: {
            type: [String, Number],
            default: ''
        },
        init: {
            default: ''
        }
    },
    data() {
        return {
            showPivot: false,
            baseUrl: process.env.NODE_ENV === 'production' ? 'https://up-z2.qbox.me/putb64/' : 'http://upload-z2.qiniu.com/putb64/',
            token: '',
            beforeNum: 0,
            imgs: []
        }
    },
    methods: {
        //生成随机字符串,用在七牛云上传图片的key的生成
        randomString(len) {
            var l = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < l; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        async upimg(files) {
            let that = this;
            that.beforeNum = that.imgs.length;

            if (!that.token) {
                await that.$ajax.post('pro_pub_upload').then((res) => {
                    that.token = res.data.token;
                })
            }

            if (Array.isArray(files)) {
                files.forEach(n => {
                    if (!that.maxNum || (that.maxNum && that.imgs.length < that.maxNum)) {
                        that.addImg(n.content)
                    }
                })
            } else {
                that.addImg(files.content)
            }
        },
        addImg(content) {
            let that = this;
            let imgParam = {
                content: content,
                progress: 0,
                key: '',
                err: false,
                loaded: false
            }

            that.imgs.push(imgParam);
            that.upQiniu(imgParam);
        },
        delImg(idx) {
            let that = this;
            that.$emit('del', idx);
            that.imgs.splice(idx, 1);
        },
        upQiniu(param) {
            let that = this;

            var pic = param.content.split(',')[1];
            var fileSize = atob(pic).length;
            var key = that.randomString(32);
            var url = that.baseUrl + fileSize + '/key/' + btoa(key);

            var xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    var percentComplete = Math.round(e.loaded * 100 / e.total);
                    param.progress = percentComplete;
                    console.log('upprogress:', percentComplete)
                }
            }, false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.responseText && JSON.parse(xhr.responseText).key) {
                        param.key = JSON.parse(xhr.responseText).key;
                    } else {
                        param.key = xhr.responseText.key;
                    }
                    param.loaded = true;
                    that.afterImg();
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + that.token);
            xhr.send(pic);
        },
        afterImg() {
            let that = this;
            let isLoaded = true;
            for (let i = 0; i < that.imgs.length; i++) {
                if (!that.imgs[i].loaded) {
                    isLoaded = false;
                    break;
                }
            }
            if (isLoaded) {
                let keys = that.imgs.map(n => n.key);
                let nowKeys = keys.slice(that.beforeNum);
                that.$emit('after', {
                    keys: keys,
                    nowKeys: nowKeys
                })
            }
        }
    },
    watch: {
        init(a, b) {
            let that = this;
            that.imgs = a.map(n => {
                return {
                    content: '',
                    progress: 100,
                    key: n,
                    err: false,
                    loaded: true
                }
            })
        }
    }
}
</script>
<style scoped>
.progress {
    position: absolute;
    top: 50%;
    width: 100%;
}
.img-list {
    flex-wrap: wrap;
}
/* 上传图片 */
.upload-btn {
    position: relative;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dadbde;
    background: #f3f3f3;
    width: 3rem;
    height: 3rem;
    margin: 0 0.3rem 0.3rem 0;
}
.upload-btn >>> .van-uploader {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    left: 0;
}

.ui-img-preview {
    position: relative;
    display: block;
    width: 3rem;
    height: 3rem;
    background-size: cover;
    background-position: center;
    margin: 0 0.3rem 0.3rem 0;
}
.img-close-btn {
    text-align: center;
    font-size: 0.9rem;
    color: #f55c5c;
    line-height: normal;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
    border-radius: 50%;
}
</style>


