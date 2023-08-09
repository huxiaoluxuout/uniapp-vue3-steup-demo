<template>
  <view id="zshu-tabs" class="flex zshu-tabs" :style="positionStyle" v-if="listTabs.length">
    <scroll-view :scroll-x="true" scroll-with-animation :scroll-into-view="'id-'+viewId" class="scroll-row">
      <view class="flex tabs">
        <view :id="'id-'+item.id" class="tabs-container" v-for="item in listTabs" :key="item.id" @click="toggleId(item.id)">
          <view class="item-text" :class="{'active-opacity':item.id===currentId,'item-num-text':countNum}">{{ item.text }}
            <text v-if="item.type==='item-num'&&count" :class="{'item-num':count}">{{ count > 9 ? '9+' : count }}</text>

          </view>
<!--          <text class="active-item" v-show="item.id===currentId"></text>-->
        </view>
      </view>

    </scroll-view>
  </view>
  <view v-if="listTabs.length&&position==='fixed'" :style="{height: rectHeight+'px'}"></view>
</template>
<script setup>
import {computed, ref, nextTick, getCurrentInstance} from "vue";
import {onReady} from "@dcloudio/uni-app";
import {debounce, throttle} from "@/utils/tools";

const instance = getCurrentInstance(); // 获取组件实例上下文
const rectHeight = ref(44)
const rectTop = ref(44)


const props = defineProps({
  configNavBar: {
    type: Object,
    default: () => {
      return {}
    }
  },
  count: {
    type: Number,
    default: 0,
  },
  countNum: Boolean,
  currentId: {
    type: Number,
    default: 1,
  },
  position: {
    type: String,
    default: 'fixed',// fixed|relative
  },
  listTabs: {
    type: Array,
    default: () => {
      return [
        /*  {
            id: 1,
            text: '共享订单',
            check: true
          }, {
            id: 2,
            text: '共享工厂',
            check: false
          },*/

      ]
    }
  },
})
const viewId = ref('')
const emits = defineEmits(['changeTabId'])
onReady(() => {
  nextTick(() => {
    props.listTabs.length && uni.createSelectorQuery()
        .in(instance.proxy)
        .select('#zshu-tabs')
        .boundingClientRect((rect) => {
          // console.log('rect', rect)
          rectTop.value = Math.ceil(rect?.top)
          rectHeight.value = Math.ceil(rect?.height)
        })
        .exec()
  });
})

const toggleId = (id => {
  // emits('changeTabId', id)
  viewId.value = id
  props.currentId !== id && emits('changeTabId', id)
});
const positionStyle = computed(() => {
  if (props.position === 'fixed') {
    return {
      position: 'fixed',
      borderBottom: `1px solid #f9f9f9`,
      top: 'var(--window-top)'
    }
  }
});


</script>
<style scoped lang="scss">
.scroll-row {
  white-space: nowrap;
  overflow-x: auto;

}
.scroll-view::-webkit-scrollbar-horizontal {
  display: none;
}
.tabs{

}
.zshu-tabs {
  justify-content: space-around;
  background-color: #fff;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  width: 100%;
  right: 0;
  z-index: 1000;


  .tabs-container {
    display: flex;
    align-content: center;
    margin-left: 30rpx;
    margin-right: 30rpx;
    position: relative;
    justify-content: center;
  }

  .tabs-item {

    position: relative;

  }

  .item-text {
    color: #666666;
    font-size: 14px;
    position: relative;
  }
  .item-text:after {
    content:'';
    height: 6px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 2px;
    background-color: #FD814A;
    border-radius: 100rpx;
    opacity: 0;
  }

  .active-opacity{
    font-size: 16px;
    font-weight: bold;
    color: #FD814A;
  }
  .active-opacity:after{
    opacity: .4;
  }
  .item-num-text{
    margin-top: 16rpx;
    font-size: 20px;
  }
  .item-num{
    position: absolute;
    right: -40rpx;
    top: -14rpx;
    background-color: #fd5958;
    color: #fff;
    border-radius: 50%;
    font-size: 9px;
    box-sizing: border-box;
    width: 2em;
    height: 2em;
    text-align: center;
    line-height: 2;
  }

 /* .active-item {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #FD814A;
    height: 6px;
    border-radius: 100rpx;
    opacity: .4;
  }

  .active-item-text {
    color: #FD814A;
    font-size: 16px;
    font-weight: bold;
  }*/
}

</style>
