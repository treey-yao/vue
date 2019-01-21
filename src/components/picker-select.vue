<template>
    <div>
        <van-popup :value="show"
                   position="bottom"
                   @click-overlay="$emit('close')">
            <van-picker show-toolbar
            
                        :title="title"
                        :columns="columns"
                        @confirm="confirm"
                        @cancel="close" />
        </van-popup>
    </div>
</template>
<script>
import { Picker, Popup } from 'vant';
export default {
    props: {
        title: String,
        show: Boolean,
        list: Array,
        init: [String, Number]
    },
    components: {
        [Picker.name]: Picker,
        [Popup.name]: Popup,
    },
    data() {
        return {
            // title: '请选择',
            // show: false,
            defaultIndex: 0
        }
    },
    computed: {
        columns() {
            let that = this;
            return [{
                defaultIndex: that.defaultIndex,
                values: that.list
            }]
        }
    },
    methods: {
        setDefaultIndex() {
            let that = this;
            let idx = 0;
            if (that.init || that.init == 0) {
                that.list.forEach((n, i) => {
                    if (that.init == n.value) {
                        idx = i;
                    }
                });
            }
            that.defaultIndex = idx;
        },
        confirm(value) {
            let that = this;
            that.$emit('confirm', value[0]);

            that.close();
        },
        close() {
            this.$emit('close')
        },
    },
    mounted() {
        this.setDefaultIndex();
    }
}
</script>
