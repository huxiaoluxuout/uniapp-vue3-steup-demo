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


      <!--      <zshu-label-text check-label enable checkbox :limit="3"
                             v-model:active-ids="activeIds"
                             :label-list="labelList"
            ></zshu-label-text>-->

      <view class="label-view">
        <text class="label-text" :class="{'active': activeIds.includes(item.id),}" :style="attributeStyler"
              v-for="(item ,index) in labelList" :key="index" @click="chooseLabel(item.id)">{{ item.text }}
        </text>
      </view>

    </view>
    <tabbar :flag="2"></tabbar>
  </view>
</template>

<script setup>
import {attributeStylers} from "@/components/zshu-components/attributeStylers";

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
const attributeStyler = computed(() => {
  return (item, keyMap = []) => attributeStylers(item, keyMap)
});


// 常量定义

const LIMIT_UNLIMITED = -1;     // 表示不受限制
const LIMIT_DEFAULT = 3;        // 表示默认的限制值
const SINGLE_SELECTION = true;  // 表示单选模式


const currentIds = ref([1,4]);
const activeIds = computed(() => currentIds.value)

const labelList = reactive([
  { id: 1, text: '11XXX1-3年经验' },
  { id: 2, text: '22XXX学历不限制' },
  { id: 3, text: '33XXX学历不限制' },
  { id: 4, text: '44XXX学历不限制' },
]);

// 选择标签
const chooseLabel = (ID) => {
  const hasSame = activeIds.value.includes(ID);
  const index = activeIds.value.findIndex(itemId => itemId === ID);

  // 多选
  if (SINGLE_SELECTION) {
    if (hasSame) {
      // 取消
      currentIds.value.splice(index, 1);
    } else {
      if (LIMIT_UNLIMITED !== LIMIT_DEFAULT && LIMIT_DEFAULT <= currentIds.value.length) {
        console.warn(`最多可选${LIMIT_DEFAULT}个`)
        return;
      }
      currentIds.value.push(ID);
    }
  } else {
    // 单选
    if (hasSame) {
      currentIds.value = [];
    } else {
      currentIds.value = [ID];
    }
  }
};
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

//=======================================================================
.label-view {
  display: flex;
  margin-top: 20rpx;
  flex-wrap: wrap;


  .label-text {
    padding: 6rpx 22rpx;
    box-sizing: border-box;
    margin-right: 5px;
    border-radius: 100px;
    font-size: 9px;
    background-color: #fff;
    color: #919199;
    border: 1px solid #F2F2F2;
    margin-top: 20rpx;

    &:last-child {
      margin-right: 0
    }

    &:nth-child(-n +4) {
      margin-top: 0;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

}

.check-label {
  border-radius: 5px !important;
  padding: 16rpx 26rpx !important;
  font-size: 12px !important;
}

.active.active.active {
  background-color: #FFDCCC !important;
  color: #FD814A;
  border: 1px solid #FD814A;
}

//=======================================================================
</style>
