<template>
    <div>
        <van-popup v-model="show"
                   position="bottom"
                   :overlay="true">
            <van-picker show-toolbar
                        :title="title"
                        :columns="columns"
                        :loading="loading"
                        @active="active"
                        @confirm="onConfirm"
                        @cancel="onCancel" />
        </van-popup>
    </div>
</template>
<script>
import { Picker, Popup } from 'vant';
export default {
    props: {

    },
    components: {
        [Picker.name]: Picker,
        [Popup.name]: Popup,
    },
    data() {
        return {
            title: '请选择',
            show: false,
            loading: false,
            columns: [],
            nowSelect: false,
        }
    },
    methods: {
        active(items, itemName) {
            let that = this;
            if (that.nowSelect !== itemName) {
                that.nowSelect = itemName;
                let nowSelect = items[itemName];
                that.title = nowSelect.title;
                that.columns = nowSelect.list;
            }
            that.show = true;
        },
        onConfirm(value, index) {
            let that = this;
            that.show = false;
            that.$emit('confirm', value, that.nowSelect, index);
        },
        onCancel() {
            let that = this;
            that.show = false;
        },
    }
}
</script>
