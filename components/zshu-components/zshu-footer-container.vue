<template>
  <view class="tabbar-root-view" :style="{ '--ios-bottom-height':iosBottomHeight +'px','--footer-height':56 +'px'}">
    <view class="footer-wrapper" :class="{'border-bottom':borderBottom}" :style="{background:bgColor_}">
      <view class="footer-inner">
        <slot></slot>
      </view>
    </view>
    <view class="temp-height"></view>
  </view>
</template>
<script setup>
import {computed} from "vue";
import {getIOSBottomHeight} from '@/utils/tools'

const iosBottomHeight = getIOSBottomHeight()

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },
  transparent:Boolean

})
const regex = /^(transparent)|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*0\s*)?\)$/i;
const borderBottom = computed(() => props.transparent ? false : !regex.test(bgColor_));
const bgColor_ = computed(() => props.transparent ? 'transparent' : props.bgColor);

</script>


<style lang="scss" scoped>
.tabbar-root-view {

}

.temp-height {
  height: calc(var(--ios-bottom-height) + var(--window-top) + var(--footer-height));

}

.footer-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--tabbar-height) + var(--ios-bottom-height));
  display: flex;
  flex-direction: row;
  z-index: 999;
  padding: 4px 30rpx calc(4px + var(--ios-bottom-height));
  box-sizing: border-box;
}

.border-bottom {
  border-top: 1px solid #f1f1f1;

}


.footer-inner {
  display: flex;
  flex: 1;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  width: 100%;
}

// #ifdef MP-WEIXIN
::v-deep > view {
  @extend .footer-inner
}

::v-deep > view [is$="zshu-footer-inner"] {
  @extend .footer-inner
}

// #endif

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

.foot-text {
  margin-top: 5px;
  font-size: 14px;
  color: #D0D4DD;
}

.foot-text-on {
  color: #FD814A;
}
</style>
