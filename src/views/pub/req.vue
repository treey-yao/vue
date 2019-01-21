<template>
    <div></div>
</template>
<script>
export default {
    computed: {
        uid() {
            let that = this;
            let uid = ''
            if (that.$route.name == 'req') {
                uid = JSON.parse(localStorage.getItem('wxUserInfo')).authid;
            } else if (that.$route.name == 'wbreq') {
                uid = JSON.parse(localStorage.getItem('wbUserInfo')).authid;
            }
            return uid;
        }
    },
    methods: {
        postData(d) {
            let that = this;
            that.$ajax.get(that.$apis.numAjaxUrl + 'pro_num_index.html', {
                params: {
                    gid: d.gid,
                    gtype: d.gtype,
                    sid: d.sid,
                    uid: that.uid,
                    tid: d.tid
                }
            }).then(res => {
                if (res.code == 1) {
                    location.href = decodeURIComponent(d.path);
                }
            })
        }
    },
    mounted() {
        console.log(this.$route)
        this.postData(this.$route.query);
    }
}
</script>

