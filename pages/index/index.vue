<template>
  <view class="has-custom-tabbar navbar-img"
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


      <zshu-list-item-container v-for="item in list" :item="item" :key="item.id" />



      <button @click="navigateTo('pages/page1/page1')">page1</button>
      <button @click="navigateTo('pages/pages2/pages2')">page2</button>
      <button @click="navigateTo('pages/pages3/pages3')">page3</button>







    </view>
    <tabbar :flag="1"></tabbar>
  </view>
</template>

<script setup>
import {navigateTo} from "@/utils/tools";
import {baseImgURL} from "@/http/config";

const list = [
  {id: 1, iconUrl: baseImgURL + '/mine/icon-list-item-1.png', text: '我的收藏', pagePath: 'subpages_mine/my_collections'},
  {id: 2, iconUrl: baseImgURL + '/mine/icon-list-item-2.png', text: '浏览记录', pagePath: 'subpages_mine/browse_records'},
  {id: 3, iconUrl: baseImgURL + '/mine/icon-list-item-3.png', text: '我的名片', pagePath: 'subpages_mine/roles'},
  {id: 4, iconUrl: baseImgURL + '/mine/icon-list-item-4.png', text: '名片记录', pagePath: 'subpages_mine/business_card_record'},
  {id: 6, iconUrl: baseImgURL + '/mine/icon-list-item-6.png', text: '我的订单', pagePath: 'subpages_mine/my_orders'},
  {id: 7, iconUrl: baseImgURL + '/mine/icon-list-item-7.png', text: '推广申请', pagePath: 'subpages_mine/promotion_request'},
  {id: 8, iconUrl: baseImgURL + '/mine/icon-list-item-8.png', text: '联系平台', pagePath: 'subpages_mine/contact_platform'},
]

</script>

<style scoped lang="scss">

.container {
  margin-top: 30px;
  background-color: #faecd8;
  border-radius: 20rpx 20rpx 0 0;

}
</style>
