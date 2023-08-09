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
    </view>
    <tabbar :flag="2"></tabbar>
  </view>
</template>

<script setup>

import {onMounted, ref} from "vue"

import {onPageScroll} from "@dcloudio/uni-app";

// ============
const refNavbar = ref(null)
const bgColor = ref('transparent')
onPageScroll((e) => refNavbar.value.handlePageScroll(e))
// ============

</script>

<style>

</style>
