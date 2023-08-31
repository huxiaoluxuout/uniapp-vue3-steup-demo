<template>
  <view class="root-zshu-layout-left-right">

    <view class="section-wrapper">

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


const props = defineProps({})
</script>
<style>
// #ifdef  MP
[is$='zshu-layout-left-right'] {
  width: 100%;
}

// #endif

</style>

<style scoped lang="scss">

.root-zshu-layout-left-right {
  --bdrs: 6px;

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
  border: 1px solid blueviolet;
  flex: 1;
}

.section-wrapper__middle {
  align-self: stretch;
  display: flex;
  flex-direction: column;


}

.section-wrapper__right {
  align-self: flex-start;
  display: flex;
  align-items: center;
  flex: 2;
  border: 1px solid blue;
}

.section-wrapper__right.section-wrapper__right:empty {
  display: none;
}

</style>
