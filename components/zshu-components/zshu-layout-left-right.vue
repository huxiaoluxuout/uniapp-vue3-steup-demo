<template>
  <view class="root-zshu-layout-left-right">

    <view class="section-wrapper" :style="cssVar">

      <view class="section-wrapper__left">
        <slot name="left"></slot>

      </view>

      <view class="section-wrapper__middle">
        <slot name="middle"></slot>

      </view>

      <view class="section-wrapper__right">
        <slot name="right"></slot>
      </view>
    </view>

  </view>


</template>

<script setup>


import {cssVar as cssVar_} from "@/components/zshu-components/cssVar";

const props = defineProps({
  cssVar: cssVar_,

})
</script>
<style scoped lang="scss">

.root-zshu-layout-left-right {
  width: 100%;
  --bdrs: 6px;
  --flex-left: 1;
  --flex-middle: 1;
  --flex-right: 2

}

.section-wrapper {
  display: flex;
  align-items: center;
  box-sizing: content-box;
  gap: 10px;
}

.section-wrapper__left {
  display: flex;
  align-items: center;
  position: relative;
  flex: var(--flex-left);

}

.section-wrapper__middle {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: var(--flex-middle);


}

.section-wrapper__right {
  display: flex;
  align-items: center;
  flex: var(--flex-right);

}

.section-wrapper__left.section-wrapper__left:empty,
.section-wrapper__middle.section-wrapper__middle:empty,
.section-wrapper__right.section-wrapper__right:empty {
  display: none;
}


</style>
