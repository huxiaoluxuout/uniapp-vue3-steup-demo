<template>
  <view class="dian-zan-wrapper" >
    <uni-icons type="eye" color="#fff" size="16"></uni-icons>
    <text>{{ pvNum }}</text>
  </view>
</template>

<script setup>


const props = defineProps({
  pvNum: '0'
})






</script>

<style scoped lang="scss">
.dian-zan-wrapper {
  position: absolute;
  bottom:  20rpx;
  left: 20rpx;
  background-color: rgba(60, 60, 60, .4);
  padding: 0px 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;

  text {
    color: #fff;
    font-size: 12px;
    margin-left: 6px;
  }


}

</style>
