<template>
  <view class="root-zshu-footer" :style="{ '--ios-bottom-height':iosBottomHeight +'px','--rect-height':rectHeight +'px'}">

    <view class="footer__container" :class="{'border__bottom':borderBottom}" :style="{background:bgColor_}">
      <view id="footer-container-inner" class="footer__container__inner">
        <zshu-layout-left-right>
          <template #left>
            <zshu-grid :list="list"></zshu-grid>

          </template>
          <template #right>
            <button class="button button-custom">button</button>

          </template>
        </zshu-layout-left-right>


      </view>
    </view>
    <view :style="{height: rectHeight+'px'}"></view>
  </view>
</template>
<script setup>
import {computed, getCurrentInstance, nextTick, ref} from "vue";
import {getIOSBottomHeight} from '@/utils/tools'
import {onReady} from "@dcloudio/uni-app";
import ZshuFlexContainer from "@/components/zshu-components/zshu-layout-flex-container.vue";
import {attributeStylers} from "@/components/zshu-components/attributeStylers";
import ZshuGrid from "@/components/zshu-components/zshu-grid.vue";
import {getViewInfo} from "@/common/hooks/useGetViewInfo";

const iosBottomHeight = getIOSBottomHeight()

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },
  transparent: Boolean

})
const regex = /^(transparent)|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*0\s*)?\)$/i;
const borderBottom = computed(() => props.transparent ? false : !regex.test(bgColor_));
const bgColor_ = computed(() => props.transparent ? 'transparent' : props.bgColor);

const instance = getCurrentInstance(); // 获取组件实例上下文

const rectHeight = ref(70)

getViewInfo('#footer-container-inner', (rect) => {

  rectHeight.value = Math.ceil(rect?.height);

})


const list = [
  {id: 1, text: '我的', iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',},
  {id: 1, text: '收藏', iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',}
]
</script>


<style lang="scss" scoped>
.root-zshu-footer {

  .footer__container {
    position: fixed;
    bottom: var(--ios-bottom-height);
    left: 0;
    width: 100%;
    min-height: var(--rect-height);
    display: flex;
    flex-direction: row;
    z-index: 999;
    padding: 4px 30rpx calc(4px + var(--ios-bottom-height));
    box-sizing: border-box;
  }
}

.border__bottom {
  border-top: 1px solid #f1f1f1;
}


.footer__container__inner {
  width: 100%;
  display: flex;
  align-items: center;
  //border: 1px solid red;


}


</style>
