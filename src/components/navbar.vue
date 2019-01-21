<template>
    <div class="main-nav">
        <van-tabbar v-if="show"
                    :value="navBarActive"
                    :fixed="fixed">
            <van-tabbar-item to="/"
                             icon="mater ui-icon">任务大厅
            </van-tabbar-item>
            <van-tabbar-item to="/mater"
                             icon="task ui-icon">我要推广
            </van-tabbar-item>
            <van-tabbar-item to="/media"
                             icon="media ui-icon">媒介资源
            </van-tabbar-item>
            <van-tabbar-item to="/member"
                             icon="my ui-icon">个人中心
            </van-tabbar-item>
        </van-tabbar>
        <div v-if="show"
             style="height: 50px;"></div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
    name: "navBar",
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    props: ["navBarActive"],
    data() {
        return {
            active: 0,
            show: true,
            fixed: true
        };
    }
};
</script>
<style>
.main-nav .van-tabbar {
    max-width: 640px;
    margin: auto;
    left: 0;
    right: 0;
}
.main-nav .van-tabbar-item--active {
    color: #ea5518;
}
.main-nav .van-tabbar-item--active .ui-icon {
    background-color: #ea5518;
    color: #fff;
    border-radius: 50%;
    padding: 0.15rem;
    /* font-size: 0.8rem; */
}
.van-icon-task:before {
    content: "\e673";
}
.van-icon-mater:before {
    content: "\e670";
}
.van-icon-media:before {
    content: "\e677";
}
.van-icon-my:before {
    content: "\e679";
}
</style>

