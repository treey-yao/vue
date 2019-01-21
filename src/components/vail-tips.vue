<template>
    <div>
        <div class="error"
             :class="[textAlign=='right'?'text-r':'text-l' ]">{{title}}</div>
    </div>
</template>

<script>
import { Popup } from 'vant';
export default {
    props: {
        title: String,
        textAlign: String,
    },
    components: {
        [Popup.name]: Popup,
    },
    data() {
        return {
            defaultIndex: 0
        }
    }

}
</script>

<style scoped>
.error {
    color: #f44;
    font-size: 12px;
}

.text-l {
    text-align: left;
}
.text-r {
    text-align: right;
}
</style>


