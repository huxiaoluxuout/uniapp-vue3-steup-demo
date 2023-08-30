<template>
  <view class="has-custom-tabbar">
    <view class="flex-column-container">

      <zshu-tabs :listLabs="listTabs" v-model:activeId="currentId" cssVar="--gap: 30rpx;--gap-l-r:30rpx"></zshu-tabs>

      <view class="page-gap-margin">
        000Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
        zzz
        <view class="flex-container page-gap foo">
          <view class="flex-item">1</view>
          <view class="flex-item">2</view>
          <view class="flex-item">3</view>
          <view class="flex-item">4</view>
        </view>

        <zshu-flex-container cssVar="--num-columns:3"
                             :dataList=" [ {id: 1, text: 'JS'}, {id: 2, text: 'CSS'}, {id: 3, text: 'VUE'}]">
          <template #default="{item}">
            <view>{{ item.text }}</view>
          </template>
        </zshu-flex-container>

      </view>



    </view>
    <tabbar :flag="0"></tabbar>
  </view>
</template>

<script setup>

import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import {ref, watch} from "vue";

import ZshuFlexContainer from "@/components/zshu-components/zshu-layout-flex-container.vue";
// ------------------------------
const currentId = ref(1);
watch(currentId, (newVale) => {
  console.log('currentId', newVale)
})
// --------------------------------
const listTabs = ref([
  {
    id: 1,
    text: '共享订单',
  }, {
    id: 2,
    text: '共享工厂1',
  }, {
    id: 3,
    text: '共享工厂2',
  }, {
    id: 4,
    text: '共享工厂3',
  }, {
    id: 5,
    text: '共享工厂4',
  },
])

</script>

<style scoped lang="scss">


.foo {
  --num-columns: 2;
  //--gap: 5px;

}

</style>
