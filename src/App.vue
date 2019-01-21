<template>
    <div id="app"
         @click="clicks">
        <router-view />
    </div>
</template>
<script>

export default {
    methods: {
        //修复 IOS12，微信 6.7.4+ 键盘不回弹的问题
        clicks(e) {
            let that = this;
            let target = e.target;
            let targetName = target.tagName.toLocaleLowerCase();
            if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && (targetName == 'input' || targetName == 'textarea' || targetName == 'select')) {
                let blurHandle = (e) => {
                    target.removeEventListener('blur', blurHandle);
                    setTimeout(() => {
                        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                    }, 100);
                }
                target.addEventListener('blur', blurHandle);
            }
        }
    },
    mounted() {
        if (!vConsole && localStorage.getItem('debug')) {
            let VConsole = require('vconsole')
            var vConsole = new VConsole({
                defaultPlugins: ['system', 'network', 'storage']
            });
        }
    },
};
</script>

<style>
/* .ui-page,
.ui-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
} */
/* 页面跳转效果 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.slide-left-enter-active {
    transition: all 0.3s ease;
}
.slide-left-leave-active {
    transition: all 0.3s ease;
}
.slide-left-enter,
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100%);
    opacity: 0;
}
.slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-right-enter-active {
    transition: all 0.3s ease;
}
.slide-right-leave-active {
    transition: all 0.3s ease;
}
.slide-right-enter,
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
