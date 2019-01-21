<template>
    <div>
        <van-popup v-model="show"
                   position="bottom"
                   :overlay="true">
            <van-area :area-list="areaList"
                      :title="title"
                      :columns-num="2"
                      value="4301"
                      @confirm="onConfirm"
                      @cancel="onCancel" />
        </van-popup>
    </div>
</template>
<script>
import { Area, Popup } from 'vant';
import areaList from '@/components/area.js';

let areaObj = {
    province_list: {

    },
    city_list: {

    }
}

for (let idx in areaList) {
    let n = areaList[idx];
    areaObj.province_list[n.i] = n.name;
    n.sub.forEach(m => {
        areaObj.city_list[m.i] = m.name;
    })
}

export default {
    props: {

    },
    components: {
        [Area.name]: Area,
        [Popup.name]: Popup,
    },
    data() {
        return {
            title: '请选择地区',
            show: false,
            loading: false,
            areaList: areaObj,
            nowSelect: false,
        }
    },
    methods: {
        active(itemName) {
            let that = this;
            if (itemName && that.nowSelect !== itemName) {
                that.nowSelect = itemName;
            }
            that.show = true;
        },
        onConfirm(value) {
            let that = this;
            that.show = false;
            that.$emit('confirm', value, that.nowSelect);
        },
        onCancel() {
            let that = this;
            that.show = false;
        },
    }
}
</script>
