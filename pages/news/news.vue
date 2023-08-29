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
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      zzz




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

<style scoped>
.flex-column-container {
  background-color: #fafafa;
}
</style>
