<template>
  <view class="bottom-bgc">
    <view class="text-items">
      <text>需求数量（个）</text>
      <text class="nums">{{leftNum}}</text>
    </view>
    <view class="text-items">
      <text>金额（元）</text>
      <text class="nums">{{rightNum}}</text>
    </view>
  </view>
</template>

<script setup>

const props = defineProps({
  leftNum:{
    type:[Number,String],
    default:0
  },
  rightNum:{
    type:[Number,String],
    default:0
  },
})
</script>

<style scoped lang="scss">

.bottom-bgc {
  background-color: #F5F6F7;
  border-radius: 10rpx;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;

  .text-items {
    color: #999999;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .nums {
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      margin-top: 20rpx;
    }
  }

}

</style>
