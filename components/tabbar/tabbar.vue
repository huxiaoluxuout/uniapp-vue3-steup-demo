<template>
  <view class="tabbar-root-view" :style="{ '--ios-bottom-height':iosBottomHeight +'px','--tabbar-height': 56+'px'}">
    <view class="tabbar-container">
      <view class="item-wrapper" v-for="(item, index) in list" :key="item.text"
            @click="clickHandler(navigateTo,item.pagePath)">
        <image v-if="flag ===index" mode="widthFix" class="icon-item" :class="{'icon-item-big':index===1}"
               :src="filterPath(item.selectedIconPath)"/>
        <image v-else mode="widthFix" class="icon-item" :class="{'icon-item-big':index===1}"
               :src="filterPath(item.iconPath)"/>
        <view class="foot-text" :style="{color:flag === index?selectedColor:color}">{{ item.text }}</view>
      </view>
    </view>
    <view class="ios__bottom-tabbar__height"></view>
  </view>
</template>
<script setup>
import {onMounted} from "vue";

import {onHide, onShow,} from "@dcloudio/uni-app";


import {getIOSBottomHeight, navigateTo, filterPath} from '@/utils/tools';


import pagesConfig from "@/pages.json";


const {tabBar: {list, color, selectedColor}} = pagesConfig

const iosBottomHeight = getIOSBottomHeight()

// 隐藏原生TabBar
uni.hideTabBar()


defineProps({
  flag: {
    type: Number,
    default: 1,
  }
})
import {getAllAreaList, webConfig} from "@/http/apis/common";


const emits = defineEmits(['click'])
const clickHandler = (fun, pagePath) => {
  fun(pagePath)
/*  webConfig().then(res => {
    console.log('webConfig', res)
  })
  getAllAreaList().then(res => {
    console.log('getAllAreaList', res)
  })*/
}


onMounted(() => {

})

onShow(() => {


})

onHide(() => {

})

</script>


<style lang="scss" scoped>
.notice {
  position: absolute;
  top: -2px;
  right: 0;
  background-color: #fd5958;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  box-sizing: border-box;
  width: 2em;
  height: 2em;
  text-align: center;
  line-height: 2em;
}

.tabbar-root-view {
}

.ios__bottom-tabbar__height {
  height: calc(var(--tabbar-height) + var(--ios-bottom-height));
}

.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--tabbar-height) + var(--ios-bottom-height));
  background: #fff;
  display: flex;
  flex-direction: row;
  z-index: 1000;
  padding: 4px 4px calc(4px + var(--ios-bottom-height));
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
}

.item-wrapper {
  display: flex;
  flex: 1;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
}

.foot-text {
  margin-top: 5px;
  font-size: 14px;
}

.icon-item {
  width: 26px;
  height: 26px;
  display: block;
}

.icon-item-big {
  width: 46px;
  height: 46px;
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translateX(-50%);
}

.icon-item-big + .foot-text {
  position: absolute;
  bottom: 0;
}


</style>
