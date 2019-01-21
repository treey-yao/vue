<template>
    <div>
        <van-nav-bar title="调试开关"
                     left-text="返回"
                     right-text="首页"
                     left-arrow
                     @click-left="$router.back()"
                     @click-right="$router.push('/')" />
        <div class="group">
            <van-cell-group>
                <van-switch-cell v-model="debug"
                                 title="console" />
            </van-cell-group>
        </div>

    </div>
</template>
<script>
import { NavBar, CellGroup, SwitchCell } from 'vant';
export default {
    components: {
        [NavBar.name]: NavBar,
        [CellGroup.name]: CellGroup,
        [SwitchCell.name]: SwitchCell,
    },
    data() {
        return {
            debug: false
        }
    },
    watch: {
        debug(a) {
            if (a) {
                localStorage.setItem('debug', 'debug')
            } else {
                localStorage.removeItem('debug')
            }
        }
    },
    mounted() {
        let that = this;
        let debug = localStorage.getItem('debug');
        if (debug) {
            that.debug = true;
        }
    }
}
</script>

<style scoped>
.group {
    margin-top: 5px;
}
</style>
