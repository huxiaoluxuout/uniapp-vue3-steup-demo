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


      <zshu-nav-list v-for="item in navList" :item="item" :key="item.id"/>


      <zshu-grid v-model:gridId="gridId" :list="listGrid"></zshu-grid>
      <button @click="toggleIsHide">Toggle isHide</button>

      <!--      <button @click="navigateTo('pages/page1/page1')">page1</button>-->
      <!--      <button @click="navigateTo('pages/pages2/pages2')">page2</button>-->
      <button @click="eventHandler(navigateTo,'pages/pages3/pages3')">page3</button>
      <view>
        111111
      </view>

    </view>
    <tabbar :flag="1"></tabbar>
  </view>
</template>

<script setup>
import {eventHandler, navigateTo} from "@/utils/tools";
import {baseImgURL} from "@/http/config";
import ZshuGrid from "@/components/zshu-components/zshu-grid.vue";
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";

const navList = [
  {id: 1, iconUrl: baseImgURL + '/mine/icon-list-item-1.png', text: '我的收藏', pagePath: 'pages/pages3/pages3'},
  // {id: 2, iconUrl: baseImgURL + '/mine/icon-list-item-2.png', text: '浏览记录', pagePath: 'subpages_mine/browse_records'},
  // {id: 3, iconUrl: baseImgURL + '/mine/icon-list-item-3.png', text: '我的名片', pagePath: 'subpages_mine/roles'},
  // {id: 4, iconUrl: baseImgURL + '/mine/icon-list-item-4.png', text: '名片记录', pagePath: 'subpages_mine/business_card_record'},
  // {id: 6, iconUrl: baseImgURL + '/mine/icon-list-item-6.png', text: '我的订单', pagePath: 'subpages_mine/my_orders'},
  // {id: 7, iconUrl: baseImgURL + '/mine/icon-list-item-7.png', text: '推广申请', pagePath: 'subpages_mine/promotion_request'},
  // {id: 8, iconUrl: baseImgURL + '/mine/icon-list-item-8.png', text: '联系平台', pagePath: 'subpages_mine/contact_platform'},
]

const gridId = ref(0)
const foo = (item) => {
  console.log('foo',item)
  item.text='XIXI'
}

const listGrid= ref([
  {
    id: 1,
    text: '111我的收藏',
    // isHide: true,
    handler:foo,
    iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',
  }, {
    id: 2,
    text: '222我的收藏',
    iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-2.png',
  }, {
    id: 3,
    text: '333我的收藏',
    iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-3.png',
    isShare:true,
    handler:f
  }
])
function f() {
  console.log('f')
}

const toggleIsHide = () => {
  // 随机选择一个项并切换 isHide 属性
  const randomIndex = Math.floor(Math.random() * listGrid.value.length);
  listGrid.value[randomIndex]['isHide'] = !listGrid.value[randomIndex]['isHide'];
};

watch(gridId, (newID) => {
  console.log(newID)
})


</script>

<style scoped lang="scss">

.container {
  margin-top: 30px;
  background-color: #faecd8;
  border-radius: 20rpx 20rpx 0 0;

}

</style>
