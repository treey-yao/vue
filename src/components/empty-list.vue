<template>
    <div class="no-box">
        <div class="ui-full-img img-box">
            <slot name="img"><img src="../assets/img/nolist.png"></slot>
        </div>
        <h4 v-if="title != false"
            class="ui-text-center title">{{ title || '暂无内容' }}</h4>
        <p v-if="desc != false"
           class="ui-text-center more-tip">{{ desc || '更多优质资源正在赶来~!' }}</p>
    </div>
</template>
<script>

export default {
    props: {
        title: '',
        desc: ''
    }
}
</script>
<style scoped>
.no-box {
    margin-top: 4rem;
}
.img-box {
    width: 30%;
    margin: auto;
}
.title {
    margin-bottom: 0;
    font-weight: normal;
}
.more-tip {
    color: #999;
}
</style>

