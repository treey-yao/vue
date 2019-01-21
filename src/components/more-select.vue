<template>
    <div>
        <van-popup :value="show"
                   position="bottom"
                   :overlay="true"
                   @click-overlay="$emit('close')"
                   class="pop-wrap">
            <div class="picker-toolbar">
                <span class="picker-btn ui-text-gray"
                      @click="cancel">取消</span>
                <div class="van-ellipsis picker-title">{{ title }}
                    <span class="picker-title-number"><i class="ui-text-orange">{{ checkedNum }}</i> <i class="ui-text-gray">/{{ maxNum }}</i></span>
                </div>
                <span @click="confirm"
                      class="picker-btn ui-text-orange">确定</span>
            </div>

            <div v-if="data && list.length > 0"
                 class="picker-body ">
                <!-- 左边 -->
                <div ref="scrollBar"
                     class="left-wrap">
                    <div class="ui-cells">
                        <div @click="selectNone"
                             class="ui-cell"><span class="ui-flex-1 left-title-text">不限</span></div>
                        <div v-for="(n, i) in list"
                             :key="i"
                             :class="{'left-actve': nowIdx == i}"
                             @click="changeTab(i)"
                             class="ui-cell"
                             ref="tabitem">
                            <span class="ui-flex-1 left-title-text">{{n.title}}</span>
                            <span class="ui-icon icon-go ui-font-s"></span>
                        </div>
                    </div>
                </div>
                <!-- 右边 -->
                <div class="right-wrap">
                    <div class="option-wrap">
                        <span v-for="(n, i) in list[nowIdx].sub"
                              :key="i"
                              @click="checked(n)"
                              :class="{'current': n.checked}"
                              class="item">{{n.title}}</span>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Popup, Cell, CellGroup, Toast } from 'vant';
export default {
    props: {
        title: String,
        maxNum: Number,
        show: Boolean,
        data: Array,
        init: [String, Number]
    },
    components: {
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
    },
    /**
     * 数据格式
     * data1: [{
                title: '分类1',
                id: '1',
                sub: [{
                    title: '标签1',
                    id: '11',
                    checked: false
                },
                {
                    title: '标签2',
                    id: '22',
                    checked: false
                }]
            },
            {
                title: '分类2',
                id: '2',
                sub: [{
                    title: '标签3',
                    id: '33',
                    checked: false
                },
                {
                    title: '标签4',
                    id: '44',
                    checked: false
                }]
            }]
     */
    data() {
        return {
            // title: '请选择地区',
            // show: false,
            nowIdx: 0,
            checkedNum: 0,
            // maxNum: 2,
            list: [...this.data],
        }
    },
    methods: {
        changeTab(idx) {
            let that = this;
            that.nowIdx = idx;
        },
        scrollTo() {
            let that = this;
            let firstTab = 0;
            let initTab = null;

            that.list.forEach((n, i) => {
                n.sub.forEach(m => {
                    //已经选择的tab
                    if (!firstTab && m.checked) {
                        firstTab = i;
                    }
                })

                //默认tab
                if (that.init && !initTab && (that.init == n.id || that.init == n.title)) {
                    initTab = i;
                }
            });
            that.nowIdx = firstTab || initTab || 0;

            that.$nextTick(() => {
                let scrollBar = that.$refs.scrollBar;
                let itemHeight = that.$refs.tabitem[0].offsetHeight;

                scrollBar.scrollTop = (that.nowIdx * itemHeight) - (scrollBar.offsetHeight / 2 - itemHeight);
            })

        },
        getCheckNum() {
            let that = this;
            let checkNum = 0;
            that.list.forEach(n => {
                n.sub.forEach(m => {
                    if (m.checked) {
                        checkNum += 1
                    }
                })
            });
            that.checkedNum = checkNum;
            return checkNum;
        },
        checked(node) {
            let that = this;
            if (node.checked) {
                node.checked = false;
            } else {
                if (that.checkedNum >= that.maxNum) {
                    Toast(`最多可选择${that.maxNum}个哦！`)
                    return;
                }
                node.checked = true;
            }

            that.getCheckNum();
        },
        cancel() {
            //取消
            this.$emit('close');
        },
        selectNone() {
            let that = this;
            that.list.forEach(n => {
                n.sub.forEach(m => {
                    m.checked = false;
                })
            });
            that.checkedNum = 0;
            that.$emit('close');
            that.$emit('confirm', []);
        },
        confirm() {
            let that = this;
            let checkeds = [];
            that.list.forEach(n => {
                n.sub.forEach(m => {
                    if (m.checked) {
                        checkeds.push(m)
                    }
                })
            });
            // if (checkeds.length <= 0) {
            //     Toast('您没有选择哦！');
            //     return;
            // }
            that.$emit('close');
            that.$emit('confirm', checkeds);
            console.log(checkeds)
        },
        initData() {
            let that = this;
            that.list.forEach(n => {
                n.sub.forEach(m => {
                    m.checked = false;
                })
            });
        }
    },
    watch: {
        show(a) {
            if (a) {
                this.scrollTo();
            }
        }
    },
    mounted() {
        // this.getCheckNum();
        this.initData();
    }
}
</script>

<style scoped>
.pop-wrap {
    background: #f2f2f2;
}

/* 标题 框 */
.picker-toolbar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 44px;
    line-height: 44px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: #fff;
    margin-bottom: 0.3rem;
}

.picker-btn {
    padding: 0 15px;
    font-size: 14px;
}
.picker-title {
    max-width: 50%;
    font-size: 0.7rem;
    font-weight: 500;
    text-align: center;
}
.picker-title i {
    font-style: normal;
}

.picker-title .picker-title-number {
    margin: 0 0.5rem;
}
/* 标题 框  end*/

/* body */
.picker-body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

/* 左边 */
.left-wrap {
    min-height: 10rem;
    max-height: 15rem;
    overflow-y: auto;
    flex: 1;
    background: #fff;
    border-right: 1px solid #e4e4e4;
}
.left-title-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333;
    font-size: 0.7rem;
}
.left-actve .ui-icon,
.left-actve .left-title-text {
    color: #eb5a20;
}
/* 右边 */
.right-wrap {
    min-height: 10rem;
    max-height: 15rem;
    width: 60%;
    overflow-y: auto;
    padding: 0 0.5rem;
}
.option-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
}
.option-wrap .item {
    min-width: 4.5rem;
    text-align: center;
    margin: 0.2rem;
    padding: 0.2rem 0.5rem;
    background: #fff;
    border-radius: 2rem;
    border: 1px solid #e4e4e4;
}
.option-wrap .current {
    border: 1px solid #eb5a20;
    color: #eb5a20;
}

/* body */
</style>


