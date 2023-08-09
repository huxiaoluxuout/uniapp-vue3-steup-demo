<script setup>
const props=defineProps({
  messageTitle:{
    type:String,
    default:''
  }
})
</script>

<template>
  <view class="btnBox">
    <view class="" style="position: relative">
      <image src="/static/kefu.png" mode="widthFix"></image>
      <button class="button" open-type="contact" :send-message-title="messageTitle" :show-message-card="true"></button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.btnBox {
  position: fixed;
  right: 0;
  top:50%;
  width: 96rpx;

  image {
    width: 96rpx;
    height: auto;
    display: block;
  }
  button {

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
    padding: 0;
    z-index: 100;
    &::after {
      border: none;
    }
  }
}

</style>
