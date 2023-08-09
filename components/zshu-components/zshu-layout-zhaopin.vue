<template>
  <view class="flex zhao-pin">
    <view class="card-container" @click="navigateTo(pagePath)">
      <view class="section-wrapper">
        <view class="section-wrapper__left"></view>
        <view class="section-wrapper__middle">
          <text class="title">{{ item.title }}</text>
          <slot name="subtitle"></slot>
          <view class="title-desc">{{ item.desc }}</view>
        </view>
        <view class="section-wrapper__right">
          <view class="right-status">{{ item.rightText }}</view>
        </view>
      </view>

      <slot name="label">
        <zshu-label-text :labelList="item?.labelList"></zshu-label-text>
      </slot>

      <zshu-puttime :time="item.time"></zshu-puttime>
    </view>
    <view class="slot-right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup>

import {navigateTo} from "@/utils/tools"

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      title: '优深圳电子科技有限公司',
      desc: '公司简介深圳科探电子科技有限公司于2016年04月28日成立公司以来。',
      rightText: '8千-1万/月',
      time: '2023-05-26  13:00'
    })
  },
  pagePath: {
    type: String,
    default: 'subpages/recruiting_details/recruiting_details'
  },
  params: {
    type: String,
    default: ''
  },

})
</script>

<style scoped lang="scss">
.zhao-pin {
  margin: 30rpx 30rpx 0;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 20rpx;

}
.slot-right:not(:empty){
  margin-left: 20rpx
}

.card-container {
  box-sizing: border-box;
  border-radius: 20rpx;
  flex: 1;
}

.section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-right: 20rpx;
  box-sizing: content-box;
}

.section-wrapper__left {
  align-self: flex-start;
  display: flex;
  align-items: center;
  position: relative;

  > image {
    display: block;
    width: 48px;
    height: 48px;
  }
}

.section-wrapper__middle {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;

  .title {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
  }

  .title-desc {
    margin-top: 10rpx;
    font-size: 12px;
    color: #666666;
    line-height: 1.5;
  }
}

.section-wrapper__right {
  align-self: flex-start;
  display: flex;
  align-items: center;
}

.right-status {
  font-size: 16px;
  font-weight: bold;
  color: #FD814A;
}


</style>
