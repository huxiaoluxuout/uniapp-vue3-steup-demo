<template>
  <view class="has-tabbar">
    <zshu-navbar
        ref="refNavbar"
        title="我的"
    >
    </zshu-navbar>

    <view class="flex-column-container">
      bgColor:{{ bgColor }}
      000Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
      <!--      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laboriosam?-->
      zzz


      <button class="button button-custom" :style="AttributeStyler(item,item.keyMap)" v-for="(item,index) in buttonList" :key="index">{{ item.text }}</button>


    </view>
    <tabbar :flag="2"></tabbar>
  </view>
</template>

<script setup>

import {computed, onMounted, reactive, ref} from "vue"

import {onPageScroll} from "@dcloudio/uni-app";

// ============
const refNavbar = ref(null)
const bgColor = ref('transparent')
onPageScroll((e) => refNavbar.value.handlePageScroll(e))
// ============


const buttonList = reactive([{id: 2, text: '交流', type: 'communication'}, {id: 1, text: '交流', type: 'communication'}]);

setTimeout(() => {

  const buttonToUpdate = buttonList.find(item => item.id === 1);
  if (buttonToUpdate) {
    buttonToUpdate.color = 'blue';
    buttonToUpdate.backgroundColor = '#b9b9b9';
    buttonToUpdate.fontSize = '20px';
    buttonToUpdate.keyMap = ['fontSize', 'backgroundColor', 'color']

  }

}, 2000)


const AttributeStyler = computed(() => {
  return (item, keyMap = []) => {
    const originalArray = ['flex', 'backgroundColor', 'filter', 'color']
    const keyMaps = [...new Set(originalArray.concat(keyMap))]
    return keyMaps.reduce((acc, key) => {
      const value = item[key];
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };
});

</script>

<style>
.button-custom {
  color: #fff;
  font-size: 16px;
  margin-right: 30rpx;
  background-color: #FD5958;
  flex: 1;
}
</style>
