<template>
  <view class="nav-list border_bottom_padding" @click="navigateTo(item.pagePath)">
    <zshu-layout-left-right :cssVar="cssVar">
      <template #left>
        <view class="nav-list__left">
          <image class="left-icon-image" v-if="item.iconUrl" :src="item.iconUrl"></image>
          <text class="left-text">{{ item.text }}</text>
        </view>
      </template>
<!--      <template #middle></template>-->
      <template #right>
        <view class="nav-list__right" >
          <view class="right-text" v-if="item.rightText">{{ item.rightText }}</view>
          <uni-icons type="right" :color="color" size="18"></uni-icons>
        </view>
      </template>
    </zshu-layout-left-right>


  </view>

</template>

<script setup>


import {navigateTo} from "@/utils/tools";

const cssVar = `--flex-left:${1};--flex-right:${0};`

const props = defineProps({

  color: {
    type: String,
    default: '#919199'
  },

  item: {
    type: Object,
    default: () => ({
      iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',
      text: '我的收藏',
      rightText: '',
      pagePath: ''
    })
  }

})


</script>
<style scoped lang="scss">

.border_bottom_padding:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 1px;
  width: calc(100% - (2 * var(--padding)));
  background-color: #f5f5f5;
}

.nav-list {
  --padding: 20rpx;

  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx var(--padding);
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}

.nav-list__left {
  display: flex;
  align-items: center;
  position: relative;
  gap: 20rpx;

  .left-icon-image {
    display: block;
    width: 80rpx;
    height: 80rpx;
  }

  .left-text {
    font-size: 14px;
    color: #303033;

  }
}

.nav-list__right {
  //border: 1px solid red;
}

</style>

