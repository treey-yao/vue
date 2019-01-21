<template>
    <div>
        <van-popup :value="show"
                   position="bottom"
                   @click-overlay="$emit('close')"
                   :overlay="true">
            <van-datetime-picker v-model="currentDate"
                                 :type="type"
                                 :min-date="minDate"
                                 :max-date="maxDate"
                                 :formatter="formatter"
                                 show-toolbar
                                 :title="s_title"
                                 @confirm="confirm"
                                 @cancel="close" />
        </van-popup>
    </div>
</template>
<script>
import { Popup, DatetimePicker } from 'vant';
import { getFormatDate } from '@/utils/util.js'
export default {
    props: {
        title: String,
        type: String,
        show: Boolean,
        start: Date,
        end: Date
    },
    components: {
        [Popup.name]: Popup,
        [DatetimePicker.name]: DatetimePicker,
    },
    data() {
        return {
            // s_show: false,
            s_title: this.title || '请选择时间',
            minDate: this.start || new Date(),
            maxDate: this.end,
            currentDate: new Date()
        }
    },
    methods: {
        formatter(type, value) {
            if (type === 'year') {
                return `${value} 年`;
            } else if (type === 'month') {
                return `${value} 月`
            } else if (type === 'day') {
                return `${value} 日`
            } else if (type === 'hour') {
                return `${value} 时`
            } else if (type === 'minute') {
                return `${value} 分`
            }
            return value;
        },
        close() {
            this.$emit('close')
        },
        confirm(date) {
            let that = this;

            let d = getFormatDate(date)

            let show = `${d.Y}-${d.M}-${d.D} ${d.h}:${d.m}`;
            let selectDate = {
                show: show,
                ...d
            }
            console.log(selectDate);
            that.close();
            that.$emit('confirm', selectDate);
        }
    }
}
</script>
