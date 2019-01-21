<template>
    <div>
        <!-- <div class="ui-flex marg-lr marg-t vali-wrap">
            <div class="from-group ui-flex-1">
                <input v-model="verity"
                       @input="$emit('input', $event.target.value)"
                       type="number"
                       placeholder="请输入验证码"
                       class="" />
            </div>
            <span @click="sendSms"
                  :class="{'ui-btn-disabled': !sendAble}"
                  class="ui-btn ui-btn-red">{{ verityShowTime }}发送验证码</span>

        </div> -->
        <van-field v-if="label"
                   v-model="verity"
                   @input="onKey"
                   center
                   clearable
                   :label="label"
                   placeholder="请输入短信验证码">
            <van-button slot="button"
                        :size="btn.size"
                        :round="btn.round"
                        :square="btn.square"
                        class="smsbtn"
                        @click="sendSms"
                        :disabled="!sendAble">{{ verityShowTime }} 发送验证码</van-button>
        </van-field>
        <van-field v-else
                   v-model="verity"
                   @input="onKey"
                   center
                   clearable
                   placeholder="请输入短信验证码">
            <van-button slot="button"
                        :size="btn.size"
                        :round="btn.round"
                        :square="btn.square"
                        class="smsbtn"
                        @click="sendSms"
                        :disabled="!sendAble">{{ verityShowTime }} 发送验证码</van-button>
        </van-field>
    </div>

</template>
<script>
import { Toast, Field, Button } from 'vant';
export default {
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
    },
    props: {
        label: [String],
        mobile: [Number, String]
    },
    data() {
        return {
            verity: '',
            verityInfo: false,
            verityShowTime: '',
            sendIng: false,
            btn: {
                size: "small",
                type: "danger",
                round: true,
                square: false,
            }
        }
    },
    methods: {
        onKey(val) {
            this.$emit('input', val)
        },
        sendSms() {
            let that = this;
            if (!that.sendAble) return false;
            that.sendIng = true;
            let verityTime = 60;
            that.verityShowTime = verityTime;

            Toast('验证码发送成功！')
            let verityTimer = setInterval(() => {
                if (that.verityShowTime <= 0) {
                    that.verityShowTime = '';
                    clearInterval(verityTimer);
                    that.sendIng = false;
                } else {
                    that.verityShowTime -= 1;
                }
            }, 1000)

            that.$ajax.post('pro_pub_message', {
                phone: that.mobile
            }).then(res => {
                if (res.code == 1) {

                }
            }).catch(e => {
                that.verityShowTime = '';
            })
        },
        checkMobile(mobile) {
            let a = this.mobile;
            let that = this;
            if (a && a.length == 11) {
                that.verityInfo = true;
            } else {
                that.verityInfo = false;
            }
        }

    },
    computed: {
        sendAble() {
            let that = this;
            if (that.verityInfo && !that.sendIng) {
                return true;
            }
            return false;
        }
    },
    watch: {
        mobile(a) {
            this.checkMobile(a)
        }
    },
    mounted() {
        this.checkMobile()
    }
}
</script>

<style scoped>
.from-group {
    display: block;
    border: 1px solid #ffffff;
    background: #fff;
    border-radius: 0.3rem;
    position: relative;
}

.from-group input[type="number"] {
    display: block;
    width: 100%;
    padding: 0.5rem 0.3rem;
    line-height: 1.2;
    background: transparent;
    border: none;
}
.smsbtn {
    background: #ea5518;
    color: #fff;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
}
</style>
