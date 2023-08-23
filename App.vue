<script>

import store from "@/store";

export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function (options) {
    console.log('App onShow', options)
    store.dispatch('updateActionInviteId', {type: 156})
  },
  onHide: function () {
    console.log('App Hide')
  }

}
</script>

<style lang="scss">
@import '@/common/style/app.scss';
@import '@/common/style/free.css';

</style>
