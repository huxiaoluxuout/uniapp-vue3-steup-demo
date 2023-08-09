<template>

  <view class="zshu-gird flex flex-column align-center" v-if="stop" @click.stop="clickHandler(slots,emits,pagePath,isNeedLogin)">
    <slot>
      <image class="zshu-gird-icon" :src="iconUrl"></image>
<!--      <view class="zshu-gird-text-box">-->
        <text class="zshu-gird-text mt-1 font">{{ text }}</text>
<!--      </view>-->
    </slot>

  </view>
    <view class="zshu-gird flex flex-column align-center" v-else @click="clickHandler(slots,emits,pagePath,isNeedLogin)">
    <slot>
      <image class="zshu-gird-icon" :src="iconUrl"></image>
<!--      <view class="zshu-gird-text-box">-->
        <text class="zshu-gird-text mt-1 font">{{ text }}</text>
<!--      </view>-->
    </slot>

  </view>


</template>

<script setup>
import {useSlots} from 'vue'

const slots = useSlots()
const emits = defineEmits(['click'])
import {clickHandler} from "@/utils/tools"
import {baseImgURL} from "@/http/request";

const props = defineProps({
  iconUrl: {
    type: String,
    default: baseImgURL+'/avatar.png'
  },
  text: {
    type: String,
    default: '张天师'
  },
  pagePath: {
    type: String,
    default: ''
  },
  isNeedLogin:Boolean,
  stop:Boolean,
})


</script>

<style scoped lang="scss">
.zshu-gird {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

// #ifdef MP-WEIXIN
::v-deep > view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

// #endif


.zshu-gird-icon {
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
}


.zshu-gird-text {
  font-size: 13px;
  margin-top: 5px;
  color: #6a6a6a;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-align: center;

}
</style>
