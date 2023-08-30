<template>
  <view class="list-item-container" @click="navigateTo(item.pagePath)">
    <image class="icon-image" :src="item.iconUrl"></image>
    <text class="list-item-left-text">{{ item.text }}</text>
    <view class="list-item-left-right">
      <view class="right-text" v-if="item.rightText">{{ item.rightText }}</view>
      <uni-icons type="right" :color="color" size="18"></uni-icons>
    </view>

  </view>
</template>

<script setup>

import {baseImgURL} from "@/http/config";
import {navigateTo} from "@/utils/tools";


const props = defineProps({

  color: {
    type: String,
    default: '919199'
  },

  item: {
    type: Object,
    default: () => ({
      iconUrl: baseImgURL + '/mine/icon-list-item-1.png',
      text: '我的收藏',
      rightText: '',
      pagePath: ''
    })
  }
})


</script>

<style scoped lang="scss">

.border__bottom {
  position: relative
}

.border__bottom::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #F2F2F7;
}

.list-item-container {
  margin-left: var(--page-gap);
  margin-right: 30rpx;
  box-sizing: border-box;
  padding: 30rpx;
  display: flex;
  align-items: center;
  background: #ffffff;

  .icon-image {
    display: block;
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx;
  }

  .list-item-left-text {
    font-size: 14px;
    color: #303033;
    font-weight: bold;
  }

  .list-item-left-right {
    margin-left: auto;
    display: flex;
    align-items: center;

    .right-text {
      padding-right: 10rpx;
      font-size: 14px;
      color: #919199;
    }
  }
}
</style>
