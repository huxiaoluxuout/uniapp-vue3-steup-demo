<template>
  <view class="has-tabbar">
    <view class="flex-column-container">

      <zshu-tabs v-model:activeId="currentId"></zshu-tabs>
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


</script>

<style scoped>
.flex-column-container {
  background-color: #fafafa;
}
</style>
