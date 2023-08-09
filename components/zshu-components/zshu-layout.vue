<template>
  <view class="section-wrapper" @click="navigateTo(pagePath)">
    <view class="section-wrapper__left" @click="emits('leftClick')">
      <image class="image" v-if="leftUrl" :src="leftUrl" />
      <view class="status" v-if="statusText">{{statusText}}</view>
    </view>

    <view class="section-wrapper__middle">
      <slot name="middle">
        <text class="title" v-if="title">{{ title }}</text>
        <slot name="labelTitle"></slot>
        <view class="title-desc" v-if="subtitle">{{ subtitle }}</view>
      </slot>

    </view>

    <view class="section-wrapper__right">
      <slot name="right"></slot>
    </view>
  </view>

</template>

<script setup>
import {useSlots} from 'vue'

const props = defineProps({
  statusText: {
    type: String,
    default: ''

  },
  leftUrl: {
    type: String,
    default: ''
    // default: baseImgURL+'gonsi-loge.png'
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  layoutStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pagePath: {
    type: String,
    default: ''
  },

})
const slots = useSlots()
const emits = defineEmits(['click','leftClick'])
import {navigateTo} from "@/utils/tools"
</script>

<style scoped lang="scss">

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
  flex-shrink: 0;
  justify-content: center;
  margin-right: 20rpx;


  > .image {
    display: block;
    width: 55px;
    height: 55px;
  }

  .status {

    position: absolute;
    font-size: 10px;
    color: #e82c2c;
    background: #FFF1E2;
    padding: 0 4px;
    box-sizing: border-box;
    border-radius: 100px;
    margin-top: 10px;

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
  margin-left: 10rpx;
}


</style>

