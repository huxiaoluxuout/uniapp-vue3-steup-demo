<script setup>
import {ref,defineExpose} from "vue";
import {toChat} from "@/common/TUIKit/toChat";

const refSelectToChat = ref(null)

const closePopupFriedCard = () => refSelectToChat.value.close();
const openPopupFriedCard = () => refSelectToChat.value.open('center');

/*const props=defineProps({
  dataList:{
    type:Array,
    default:()=>{
      return []
    }
  }
})*/
const dataList=ref([])
const options=ref({})
defineExpose({
  closePopupFriedCard,
  openPopupFriedCard,
  dataList,
  options,
})
</script>

<template>
<view>
  <uni-popup ref="refSelectToChat">
    <view class="popup-content">

      <view class="mt-2" v-for="item in dataList" :key="item.id">

        <zshu-layout
            :leftUrl="item.avatar"
            :title="item.nickname"
        >
          <template #labelTitle>
          </template>
          <template #right>
            <view class="right-view" @click="toChat(item.id, options)">交流</view>
          </template>

        </zshu-layout>


      </view>
    </view>
  </uni-popup>
</view>
</template>

<style scoped lang="scss">
.popup-content {
  background-color: #fff;
  border-radius: 8px;

  width: 575rpx;
  padding: 25rpx;

  box-sizing: border-box;
  position: relative;
  //transform: translateY(-44px);
}
.right-view {
  font-size: 14px;
  color: #ffffff;
  padding: 6rpx 22rpx;
  background-color: #FD814A;
  border-radius: 100px;
}

.card ::v-deep .section-wrapper__right {
  //align-self: unset;
}
</style>
