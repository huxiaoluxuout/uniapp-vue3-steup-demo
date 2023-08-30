<template>
  <view class="root-zshu-tabs" :style="cssVar" v-show="listTabs.length">
    <view id="zshu-tabs" class="zshu-tabs" :style="zshuTabStyle">
      <scroll-view class="scroll-row" :scroll-x="true" scroll-with-animation :scroll-into-view="'id-'+viewId">
        <view class="tabs">
          <view :id="'id-'+item.id" class="tabs-container" v-for="item in listTabs" :key="item.id" @click="clickId(item.id)">
            <view class="item-text" :class="{'active-opacity':item.id===activeId}">{{ item.text }}</view>
          </view>
        </view>

      </scroll-view>

    </view>

    <view v-show="!isRelative" :style="{height: rectHeight+'px'}"></view>

  </view>

</template>
<script setup>

import {computed, ref, nextTick, getCurrentInstance} from "vue";
import {onReady} from "@dcloudio/uni-app";


const instance = getCurrentInstance(); // 获取组件实例上下文
const rectHeight = ref(44)
const rectTop = ref(44)

import {cssVar as cssVar_} from "@/components/zshu-components/cssVar"

const props = defineProps({
  listTabs: {
    type: Array,
    default: () => {
      return [
        {
          id: 1,
          text: '共享订单',
        }, {
          id: 2,
          text: '共享工厂1',
        }, {
          id: 3,
          text: '共享工厂2',
        }, {
          id: 4,
          text: '共享工厂3',
        }, {
          id: 5,
          text: '共享工厂4',
        },

      ]
    }
  },

  activeId: {
    type: Number,
    default: 1,
  },

  // isFixed: Boolean,
  isRelative: Boolean,

  // css 变量
  cssVar:cssVar_

})

const viewId = ref('1')
const emits = defineEmits(['update:activeId'])

onReady(() => {
  nextTick(() => {
    props.listTabs.length && uni.createSelectorQuery()
        .in(instance.proxy)
        .select('#zshu-tabs')
        .boundingClientRect((rect) => {
          console.log('rect', rect)
          rectTop.value = Math.ceil(rect?.top)
          rectHeight.value = Math.ceil(rect?.height)
        })
        .exec()
  });
})


const clickId = (id) => {
  viewId.value = id
  props.activeId !== id && emits('update:activeId', id)

}

const zshuTabStyle = computed(() => {

  if (!props.isRelative) {
    return {
      position: 'fixed',
      borderBottom: `1px solid #f4f4f4`,
      top: `calc(var(--window-top))`
    }
  }
});


</script>
<style scoped lang="scss">

.root-zshu-tabs {

  --gap-l-r: var(--page-gap);
  --gap: 34rpx;
  //margin:0  calc(-1 * var(--gap));
}

.zshu-tabs {

  background-color: #fff;

  z-index: 1000;
  position: relative;
  width: 100%;

  .scroll-row {
    white-space: nowrap;
    overflow-x: auto;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
  }
}


.tabs {
  display: flex;

  gap: var(--gap);

  .tabs-container:first-child:before, .tabs-container:last-child:after {
    content: '';
    height: 100%;
    width: var(--gap-l-r);

  }


  .tabs-container {
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    flex: 1;
  }


  .item-text {
    color: #666666;
    font-size: 14px;
    position: relative;
  }

  .item-text:after {
    content: '';
    height: 6px;
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2px;
    background-color: #FD814A;
    border-radius: 100rpx;
    opacity: 0;
  }

  .active-opacity {

    font-weight: bold;
    color: #FD814A;
  }

  .active-opacity:after {
    opacity: .4;
  }
}

</style>
