<script>

import store from "@/store";

export default {
  onLaunch: function (options) {

    // console.log('App Launch')
    uni.getSystemInfo({
      success(res) {
        // #ifdef MP
        if (res.brand && res.brand !== "devtools" && process.env.NODE_ENV === 'development') {
          // 打开调试
          uni.setEnableDebug({
            enableDebug: options.query?.isDebugger === '1'
          })
        }
        // #endif

      }
    })

  },
  onShow: function (options) {
    // console.log('App onShow', options)
    // store.dispatch('updateActionInviteId', {type: 156})

  },
  onHide: function () {
    // console.log('App Hide')
  }

}
</script>

<style lang="scss">
@import '@/common/style/app.scss';
@import '@/common/style/free.css';

</style>
