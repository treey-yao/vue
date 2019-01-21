<template>
    <div id="root">
        <h1>404</h1>
        <h2>
            <router-link to="/"
                         replace
                         class="ui-btn ui-btn-default">回到主页</router-link>
        </h2>
        <h2>
            <a class="ui-btn"
               @click="goBack">返回上页</a>
        </h2>
    </div>
</template>
<script>
export default {
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push({ path: "/", replace: true });
        }
    },
    mounted() {
        let that = this;
        // setTimeout(() => {
        //     that.goBack();
        // }, 3000)
    }
};
</script>
<style scoped>
#root {
    text-align: center;
}
h1 {
    margin-top: 6rem;
    font-size: 4rem;
}
</style>


