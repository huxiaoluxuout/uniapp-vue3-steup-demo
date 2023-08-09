<template>
  <view class="put-time">
   {{timeText}}：{{ time }}
  </view>
</template>

<script setup>
defineProps({
  time:{
    type:String,
    default:'2023-03-16 13:00'
  },
  timeText:{
    type:String,
    default:'发布时间'
  },

})
</script>

<style scoped >
.put-time {
  color: #999999;
  font-size: 12px;
  margin-top: 20rpx;
}
</style>
