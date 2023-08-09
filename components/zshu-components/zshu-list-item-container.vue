<template>
  <view class="list-item-container" @click="clickHandler(slots,emits,pagePath)">
    <slot>
      <image class="icon-image" :src="iconUrl"></image>
      <text class="list-item-left-text">{{ text }}</text>
      <view class="list-item-left-right">
        <view class="right-text" v-if="rightText">{{ rightText }}</view>
        <uni-icons type="right" :color="color" size="18"></uni-icons>
      </view>
    </slot>
  </view>
</template>

<script setup>
import {useSlots ,computed ,defineExpose } from 'vue'

const slots = useSlots()
const emits = defineEmits(['click'])
import {clickHandler} from "@/utils/tools"
import {baseImgURL} from "@/http/request";

const props = defineProps({

  color: {
    type: String,
    default: '919199'
  },
  iconUrl: {
    type: String,
    default: baseImgURL+'/mine/icon-list-item-1.png'
  },
  text: {
    type: String,
    default: '我的收藏'
  },
  rightText: {
    type: String,
    default: ''
  },
  pagePath: {
    type: String,
    default: ''
  },
})
const iconUrl_=computed(()=>{
  return props.iconUrl
})


// 将组件中的属性暴露出去，这样父组件可以获取
defineExpose({
    sex:'男'

})


</script>

<style scoped lang="scss">
//======
//底部边框
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
  margin-left: 30rpx;
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

//======
</style>
