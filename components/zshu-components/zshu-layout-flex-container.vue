<script setup>
import {cssVar as cssVar_} from "@/components/zshu-components/cssVar"

const props = defineProps({
  // css 变量
  cssVar: cssVar_,

  dataList: {
    type: Array,
    default: () => (
        [
          {id: 1, text: 'js'},
          {id: 2, text: 'css'},
          {id: 3, text: 'vue'},
        ])
  }

})

</script>

<template>
  <view class="root-flex-container">
    <view class=" flex-container" :style="cssVar">
      <view class="flex-item" v-for="(slotItem,index) in dataList" :key="slotItem.id">
        <slot :item="slotItem"></slot>
      </view>
    </view>
  </view>

</template>

<style scoped lang="scss">

.root-flex-container {
  --gap: var(--page-gap);
  --num-columns: 2;
  --item-width: calc(100% / var(--num-columns) - var(--gap));
  overflow-x: hidden;
}

/*.flex-container {
  display: flex;
  flex-wrap: wrap;

  gap: var(--gap);
  margin-right: calc(-1 * var(--gap));
  box-sizing: border-box;
  padding: var(--gap);
  border: 1px solid red;

  .flex-item {
    width: var(--item-width);
    box-sizing: border-box;
    position: relative;
    border: 1px solid #000;
  }

}*/

</style>
