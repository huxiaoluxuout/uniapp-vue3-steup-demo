<template>
  <view class="label-view">
    <template v-if="stop">
      <text class="label-text" style="" :class="{'active': activeIds.includes(item.id)}" :style="attributeStyler"
            v-for="(item ,index) in labelList" :key="index" @click.stop="chooseLabel(item.id)">{{ item.text }}
      </text>
    </template>
    <template v-else>
      <text class="label-text" style="" :class="{'active': activeIds.includes(item.id)}" :style="attributeStyler"
            v-for="(item ,index) in labelList" :key="index" @click="chooseLabel(item.id)">{{ item.text }}
      </text>
    </template>

  </view>
</template>

<script setup>
import {computed} from 'vue';
import {attributeStylers} from "@/components/zshu-components/attributeStylers";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  labelList: {
    type: Array,
    default: () => []

  },
  activeIds: {
    type: Array,
    default: () => []

  },
  checkbox: Boolean, // 多选选模式
  disabled: Boolean, // 禁用选择
  stop: Boolean, // 阻止事件冒泡

  limit: {
    type: [Number, String],
    default: Number.MAX_SAFE_INTEGER    // 示默认的限制值
  },


})
const attributeStyler = computed(() => {
  return (item, keyMap = []) => attributeStylers(item, keyMap)
});

// 选择标签
// const event = 'click'
const event = 'click.stop'
const chooseLabel = (ID) => {
  if (props.disabled) {
    return;
  }

  const hasSame = props.activeIds.includes(ID);
  const index = props.activeIds.findIndex(itemId => itemId === ID);

  // 多选
  if (props.checkbox) {
    if (hasSame) {
      // 取消
      props.activeIds.splice(index, 1);
    } else {
      if (props.limit && props.limit <= props.activeIds.length) {
        console.warn(`最多可选${props.limit}个`)
        return;
      }
      props.activeIds.push(ID);
    }
  } else {
    // 单选
    if (hasSame) {
      props.activeIds = []
    } else {
      props.activeIds = [ID];
    }
  }
};

</script>

<style scoped lang="scss">

.label-view {
  display: flex;
  margin-top: 20rpx;
  flex-wrap: wrap;


  .label-text {
    padding: 6px 10px;
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


.active.active.active {
  background-color: #FFDCCC;
  color: #FD814A;
  border: 1px solid #FD814A;
}

</style>

