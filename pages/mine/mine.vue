<template>
  <view class="has-custom-tabbar">
    <zshu-navbar
        ref="refNavbar"
        title="我的"
    >
    </zshu-navbar>

    <view class="flex-column-container">

      <view class="fixed-top" style="border: 1px solid blueviolet;" >
        <view style="padding: 4px; color:red;">{{ dataListView.length }}</view>

      </view>

      bgColor:{{ bgColor }}
      <view style="display:flex;">
        <!--        <button class="button button-custom" :style="attributeStylers(item,item.keyMap)" v-for="(item,index) in buttonList" :key="index">{{ item.text }}</button>-->

      </view>
      <view @click="clickOn">

<!--        checkbox-->
        <zshu-label-text
            stop
            checkbox
            limit="3"
            :label-list="labelList"
            :active-ids="currentIds"

        >

        </zshu-label-text>
      </view>

      currentIds:{{ currentIds }}

      <hr>
      <view v-for="(item,index) in dataListView" :key="index">
        <view style="line-height: 80px;">id:{{ item.id }}---{{ item.msg }}</view>
      </view>
      <hr>


    </view>
    <tabbar :INDEX="2"></tabbar>
  </view>
</template>

<script setup>

import {computed, onMounted, reactive, ref, watch} from "vue"


import {onPageScroll} from "@dcloudio/uni-app";

// ============
const refNavbar = ref(null)
const bgColor = ref('transparent')
onPageScroll((e) => refNavbar.value.handlePageScroll(e))
// ============


const buttonList = reactive([{id: 2, text: '交流', type: 'communication'}, {
  id: 1,
  text: '交流',
  type: 'communication'
}]);

setTimeout(() => {

  const buttonToUpdate = buttonList.find(item => item.id === 1);
  if (buttonToUpdate) {
    buttonToUpdate.color = 'blue';
    buttonToUpdate.backgroundColor = '#b9b9b9';
    buttonToUpdate.fontSize = '20px';
    buttonToUpdate.flex = 3;
    buttonToUpdate.keyMap = ['fontSize', 'backgroundColor', 'color']

  }

}, 2000)


// ======================================================================

const currentIds = ref([1]);

const labelList = reactive([
  {id: 1, text: '1-3年经验'},
  {id: 2, text: '历不限制'},
  {id: 3, text: '学历不限制'},
]);
const clickOn = () => {
  console.log('clickOn')
}
// ======================================================================

// ======================================================================
import usePullDownRefresh from "@/common/hooks/usePullDownRefresh";

const foo = (cc) => {
  console.log('foo', cc)
}
const {pullDownRefreshSetFunctions, pullDownRefreshAddFunctions, onReload} = usePullDownRefresh()

pullDownRefreshSetFunctions(foo, 444)


onReload(() => {
  currentIds.value = [1]
})

// ======================================================================

// ======================================================================

const dataListView = ref([])

import {useNextPageManager} from "@/common/hooks/useNextPageManager";
import {getNoticeList} from "@/Http/apis/message";
// import {attributeStylers} from "@/components/zshu-components/attributeStylers";


const nexPageContext = useNextPageManager;

pullDownRefreshAddFunctions(nexPageContext.reload.bind(nexPageContext))

nexPageContext.onReachBottom()

nexPageContext.onReload(() => {
  dataListView.value = []
  nexPageContext.dataList = []

  getDataListApi()

})


const getDataListApi = () => {

  getNoticeList({
    page: nexPageContext.page,
    page_size: nexPageContext.pageSize
  }).then(res => {
    const resData = res.data?.data;
    dataListView.value = nexPageContext.setDataList(resData).dataList
  })
}


nexPageContext.nexPageSetFunName(getDataListApi).nexPageDoFunQueue()




// ======================================================================


</script>

<style scoped lang="scss">
.button-custom {
  color: #fff;
  font-size: 16px;
  margin-right: 30rpx;
  background-color: #FD5958;
  flex: 1;
}


</style>
