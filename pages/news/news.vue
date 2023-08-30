<template>
  <view class="has-custom-tabbar">
    <view class="flex-column-container">

      <zshu-tabs :list-tabs="listTabs" v-model:activeId="currentId" cssVar="--gap: 30rpx;--gap-l-r:30rpx"></zshu-tabs>
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
      <view class="flex-container foo">
        <view class="flex-item">1</view>
        <view class="flex-item">2</view>
        <view class="flex-item">3</view>
        <view class="flex-item">4</view>
      </view>

      <zshu-flex-container cssVar="--gap: 30rpx;--num-columns:1"
                           :dataList=" [ {id: 1, text: 'JS'}, {id: 2, text: 'CSS'}, {id: 3, text: 'VUE'}]">
        <template #default="{item}">
          <view>{{ item.text }}</view>
        </template>
      </zshu-flex-container>


    </view>
    <tabbar :flag="0"></tabbar>
  </view>
</template>

<script setup>

import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import {ref, watch} from "vue";
import {getNoticeList} from "@/http/apis/message";
import ZshuFlexContainer from "@/components/zshu-components/zshu-flex-container.vue";
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
.flex-column-container {
  background-color: #fafafa;
}

.foo {
  --num-columns: 1;
  //--gap: 5px;

}

</style>
