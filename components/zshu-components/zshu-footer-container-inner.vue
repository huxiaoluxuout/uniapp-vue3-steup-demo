<template>
  <zshu-footer-container :cssVar="cssVar">
    <template #default>
      <zshu-layout-left-right>
        <template #left>
          <zshu-grid :list="gridList" v-model:gridId="gridId"></zshu-grid>

        </template>
        <template #right>

          <button class="button button-custom" :style="attributeStylers({})">交流</button>

        </template>
      </zshu-layout-left-right>
    </template>

  </zshu-footer-container>
</template>
<script setup>

import {computed, ref, watch, watchEffect} from "vue";
import {attributeStylers} from "@/components/zshu-components/attributeStylers";

const cssVar = `--flex-left:${1};--flex-right:${2};`

const gridList = [
  // {id: 1, text: '我的', iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',},
  {id: 2, text: '收藏', iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',},
  {id: 3, text: '分享', isShare: true, iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',},
];

const gridId = ref(0);

const selectedItem = computed(() => {
  return gridList.find(item => item.id === gridId.value);
});

watch(selectedItem, (newItem) => {
  console.log('newItem', newItem)
})

</script>


<style lang="scss" scoped>


.button-custom {
  color: #fff;
  font-size: 16px;
  background-color: #FD5958;
  flex: 1;
}

</style>
