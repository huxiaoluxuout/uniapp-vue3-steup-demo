<template>
  <view class="has-tabbar navbar-img"
        :style="{
          backgroundImage:'url('+baseImgURL+'/p9Ivd56.png'+')',
        }"
  >
    <zshu-navbar
        title="首页"
        :navbarStyle="{
          backgroundImage: 'url('+baseImgURL+'/p9Ivd56.png'+')',
        }"
    ></zshu-navbar>
    <view class="flex-column-container container">
      <button @click="navigateTo('pages/page1/page1')">page1</button>
      <button @click="navigateTo('pages/pages2/pages2')">page2</button>
      <button @click="navigateTo('pages/pages3/pages3')">page3</button>
      <!--      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!-->
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste!
      z!
    </view>
    <tabbar :flag="1"></tabbar>
  </view>
</template>

<script setup>
import {navigateTo} from "@/utils/tools";

const baseURL = 'https://xcx.jxgxsmt.com'
const baseImgURL = baseURL + '/static/images'

</script>

<style scoped lang="scss">

.container {
  margin-top: 30px;
  background-color: #faecd8;
  border-radius: 20rpx 20rpx 0 0;

}
</style>
