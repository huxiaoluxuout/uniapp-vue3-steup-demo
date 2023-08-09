<template>

  <zshu-grid stop @click="iconClick(item)" v-for="(item,index) in gridList" :key="index">
    <template v-slot>
      <uni-icons :type="item.type" :color="item.color" size="26"></uni-icons>
      <text class="zshu-grid-text">{{ item.text }}</text>
      <button class="share" :open-type="item.openType"></button>
    </template>
  </zshu-grid>

  <slot name="addBtn"></slot>
  <button class="button button-custom" :style="style(item)" v-if="stop" @click.stop="btnClick(item)" v-for="(item,index) in buttonList" :key="index">{{ item.text }}</button>
  <button class="button button-custom" :style="style(item)" v-else @click="btnClick(item)" v-for="(item,index) in buttonList" :key="index">{{ item.text }}</button>

</template>

<script setup>
import {computed} from "vue";
import {navigateTo} from "@/utils/tools"




const props = defineProps({
  gridList: {
    type: Array,
    default: () => {
      return [];
      // return [{type: 'heart', text: '收藏'}, {type: 'redo', text: '分享'}];
    }
  },
  buttonList: {
    type: Array,
    default: () => {
      return []
      // return [{id: 1, text: '打电话'}, {id: 2, text: '交流'}]
    }
  },
  stop:Boolean
})

const style = computed(() => {
  return (item) => {
    const {flex, backgroundColor, filter} = item
    const keys = {flex, backgroundColor, filter}
    return Object.keys(keys)
        .filter((key) => keys[key] !== null && keys[key] !== undefined)
        .reduce((acc, key) => ({...acc, [key]: keys[key]}), {});
  }
})
const emits = defineEmits(['click', 'iconClick']);
const iconClick = (item) => {
  // console.log('iconClick', item)
  if (item.pagePath) {
    navigateTo(item.pagePath)
    return
  }
  emits('iconClick', item)

}
const btnClick = (item) => {
  console.log('btnClick', item)
  if (item.pagePath) {
    navigateTo(item.pagePath)
    return
  }
  emits('click', item)

}

</script>

<style scoped lang="scss">
[is$="zshu-grid"], .zshu-gird {
  width: 14%;
  margin-right: 20rpx;
  align-items: flex-start;
}


.zshu-grid-text {
  color: #333333;
  font-size: 12px;
}

.button-custom {
  color: #fff;
  font-size: 16px;
  margin-right: 30rpx;
  background-color: #FD5958;
  flex: 1;
}

.button-custom:last-child {
  margin-right: 0;
  background-color: #FD814A;
}

.share {
  background-color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;

  &:after {
    border: none;
  }
}
</style>
