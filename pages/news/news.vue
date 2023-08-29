<template>
  <view class="has-tabbar">
    <view class="flex-column-container">

      <zshu-tabs :list-tabs="listTabs" v-model:activeId="currentId"></zshu-tabs>
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




    </view>
    <tabbar :flag="0"></tabbar>
  </view>
</template>

<script setup>

import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import {ref, watch} from "vue";
import {getNoticeList} from "@/http/apis/message";
// ------------------------------
const currentId = ref(1);
watch(currentId,(newVale)=>{
  console.log('currentId',newVale)
})
// --------------------------------
const listTabs=ref([
  {
    id: 1,
    text: '共享订单',
  }, {
    id: 2,
    text: '共享工厂1',
  }/*, {
    id: 3,
    text: '共享工厂2',
  }*//*, {
    id: 4,
    text: '共享工厂3',
  }, {
    id: 5,
    text: '共享工厂4',
  },*/
])

</script>

<style scoped lang="scss">
.flex-column-container {
  background-color: #fafafa;
}

.foo{
  --num-columns: 3;
  --gap: 20px;

}

</style>
