<template>
  <view class="zshu-layout-left-right" @click="navigateTo(pagePath)">

    <view class="section-wrapper">

      <view class="section-wrapper__left">
        <image class="left-image" mode="aspectFill" :src="item.image"></image>
      </view>

      <view class="section-wrapper__middle">
        <view class="title">{{ item.title }}</view>
        <view class="subtitle">{{ item.desc }}</view>
<!--        <view class="label-wrapper">
          <view v-if="item.cate_name">{{ item.cate_name }}</view>
          <view v-if="item.brand_name">{{ item.brand_name }}</view>
          <view v-if="item.type_name">{{ item.type_name }}</view>
        </view>-->
        <view class="factory">
          <image class="factory-imag" :src="item.factory_avatar"/>
          <view class="factory-name">{{ item.factory_name }}</view>
        </view>

        <view class="put-time">{{ item.add_time_text }}</view>
      </view>

      <view class="section-wrapper__right"></view>
    </view>

  </view>


</template>

<script setup>


import {navigateTo} from "@/utils/tools";
import ZshuPuttime from "@/components/zshu-components/zshu-puttime.vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  pagePath: {
    type: String,
    default: ''
  },


})
</script>

<style scoped lang="scss">

.zshu-layout-left-right {
  --bdrs: 6px;

  margin-top: 30rpx;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: var(--bdrs);
}

.section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-right: 20rpx;
  box-sizing: content-box;
  gap: 10px;
}

.section-wrapper__left {
  align-self: flex-start;
  display: flex;
  align-items: center;
  position: relative;


  > .left-image {
    display: block;
    width: 120px;
    height: 90px;
    border-radius: var(--bdrs);


  }
}

.section-wrapper__middle {
  align-self: stretch;
  display: flex;
  flex-direction: column;

  flex: 1;

  .title {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
  }

  .subtitle {
    margin-top: 10rpx;
    font-size: 12px;
    color: #a2a2a2;
    line-height: 1.5;
  }

  .factory {
    margin-top: 10rpx;
    display: flex;
    align-items: center;

    gap: 20rpx;

    .factory-imag {
      display: block;
      border-radius: 50px;
      width: 24px;
      height: 24px;
    }

    .factory-name {
      font-size: 12px;
      color: #737373;

    }
  }
  .label-wrapper {
    display: flex;
    align-items: center;
    font-size: 10px;
    gap: 4px;
    margin-top: 10rpx;
    view {
      padding: 6rpx 18rpx;
      box-sizing: border-box;
      border: 1px solid #e8e8e8;
      color: #626262;
      border-radius: 10rpx;
      background-color: #fafafa;

    }
  }

  .put-time {
    color: #8f8f8f;
    font-size: 10px;
    margin-top: 10rpx;

  }
}

.section-wrapper__right {
  align-self: flex-start;
  display: flex;
  align-items: center;
}

.section-wrapper__right:empty {
  display: none;
}

</style>
