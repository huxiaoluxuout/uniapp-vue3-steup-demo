<template>
  <view class="label-view">
    <text class="label-text" :class="{'active': activeIds.includes(item.id),'check-label':checkLabel}" :style="style"
          v-for="(item ,index) in labelList" :key="index" @click="enable&&chooseLabel(item.id)">{{ item.text }}
    </text>
  </view>
</template>

<script setup>
import {computed} from 'vue'
import {setEmptyData} from "@/utils/tools";

const props = defineProps({
  labelList: {
    type: Array,
    default: () => {
      return [
        {id: 1, text: 'XXX1-3年经验'},
        {id: 2, text: 'XXX学历不限制'},
      ]
    }
  },
  labelStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  color: {
    type: String,
    // default: '#FD814A'
    background: '#F9F9F9'

  },
  bgColor: {
    type: String,
    default: '#fff'
  },
  checkLabel: Boolean,
  // 开启多选
  checkbox: Boolean,
  // 多选限制
  limit: {
    type:[String,Number],
    default:-1
  },
  // 选择功能开启
  enable: Boolean,
  // 选中的id
  currentIds: {
    type: Array,
    default: () => []
  }

})
const style = computed(() => {
  return Object.assign({
    color: props.color,
    background: props.bgColor
  }, props.labelStyle)
  /*{
    color:props.color,
    background:props.bgColor
  }*/
})
const emits = defineEmits(['update:activeIds'])
const activeIds = computed(() => props.currentIds)

// 标签选择
const chooseLabel = (ID) => {
  const hasSame = activeIds.value.some(itemId => itemId === ID);
  const index = activeIds.value.findIndex(itemId => itemId === ID);
  // 多选
  if (props.checkbox) {
    // console.log('多选',hasSame)
    if (hasSame) {
      // 取消
      activeIds.value.splice(index, 1);
      emits('update:activeIds', activeIds.value)
    } else {
      if(Number(props.limit)!==-1&&Number(props.limit)<=activeIds.value.length) return
      activeIds.value.push(ID);
      emits('update:activeIds', activeIds.value)
    }
  } else {
    // 单选
    // console.log('单选')
    setEmptyData(activeIds.value)
    activeIds.value.push(ID)
    emits('update:activeIds', activeIds.value)
  }
}
</script>

<style scoped lang="scss">
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

</style>

