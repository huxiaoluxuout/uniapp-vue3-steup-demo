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


      <!--      <button class="button button-custom" :style="AttributeStyler(item,item.keyMap)" v-for="(item,index) in buttonList" :key="index">{{ item.text }}</button>-->
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
import useDataReady from "@/common/hooks/useDataReady";

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
});

// ======================================================================


// ======================================================================
import usePullDownRefresh from "@/common/hooks/usePullDownRefresh";
const foo = (cc) => {
  console.log('foo',cc)
}
const {setFunctions,addFunctions} = usePullDownRefresh()
setFunctions(foo,666)
addFunctions(foo,444)
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
