<template>
  <view class="has-custom-tabbar">
    <zshu-navbar
        ref="refNavbar"
        title="我的"
    >
    </zshu-navbar>

    <view class="flex-column-container">

      <view class="fixed-top" style="border: 1px solid blueviolet;" @click="updateDate">
        <view style="padding: 4px; color:red;">{{ dataListView.length }}</view>
        <view>isUpdate:{{ isUpdate }}</view>
      </view>

      bgColor:{{ bgColor }}
            <view style="display:flex;">
              <button class="button button-custom" :style="attributeStylers(item,item.keyMap)" v-for="(item,index) in buttonList" :key="index">{{ item.text }}</button>

            </view>
      <view @click="clickOn">


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
    <tabbar :flag="2"></tabbar>
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
    buttonToUpdate.flex =3;
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
/*import useDataReady from "@/common/hooks/useDataReady";

const {dataReady, callData} = useDataReady();
const loadData = []
// 模拟异步数据加载
setTimeout(() => {
  // 加载完成后调用数据就绪回调
  loadData.push({name: 'xl'})
  callData();
}, 1000);


// 当数据准备好时的回调函数
dataReady(() => {
  console.log('数据已经准备好，可以执行相应操作');
  // 在这里执行数据就绪后的操作
  console.log('loadData', loadData)
});*/

// ======================================================================


// ======================================================================
import usePullDownRefresh from "@/common/hooks/usePullDownRefresh";

const foo = (cc) => {
  console.log('foo', cc)
}
const {pullDownRefreshSetFunctions, pullDownRefreshAddFunctions, pullDownRefreshReload} = usePullDownRefresh()

pullDownRefreshSetFunctions(foo, 444)


pullDownRefreshReload(() => {
  currentIds.value = [1]
})

// ======================================================================

// ======================================================================

const dataListView = ref([])

import {nextPageManager} from "@/common/hooks/nextPageManager";
import {getNoticeList} from "@/http/apis/message";
import {attributeStylers} from "@/components/zshu-components/attributeStylers";

const nexPageContext = nextPageManager;

nexPageContext.reachBottomHandler();

nexPageContext.nexPageReload(() => {
  dataListView.value = []
  nexPageContext.dataList = []
  isUpdate.value = false

  getDataListApi()

})
const isUpdate = ref(false);
const updateDate = () => {
  isUpdate.value = true
}

const getDataListApi = () => {

  getNoticeList({
    page: nexPageContext.page,
    page_size: nexPageContext.pageSize
  }).then(res => {
    let arr = [
      {
        add_time: 1692261328,
        add_time_text: "08-17 16:35",
        extra: null,
        factory_id: 0,
        id: 1000,
        is_del: 0,
        is_read: 1,
        msg: "模拟数据新数据1",
        notice_status: 1,
        notice_type: "factory",
        read_time: 1692346045,
        title: "新数据1",
        user_id: 6,
      },


    ]

    let resData = res.data?.data;

    if (isUpdate.value) {
      resData.push(...arr)
    }

    nexPageContext.setDataList(resData)

    dataListView.value = nexPageContext.dataList
  })
}

getDataListApi()

nexPageContext.nexPageSetFunctions(getDataListApi)

pullDownRefreshAddFunctions(nexPageContext.reload.bind(nexPageContext))

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
