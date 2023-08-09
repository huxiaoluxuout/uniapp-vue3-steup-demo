
<script>
export default {
  options: {styleIsolation: 'shared'}
}
</script>

<script setup>

import {getChooseLocation} from "@/utils/tools";
import {reactive} from "vue";

const props = defineProps({
  label: {
    type: String,
    default: '详细地址'
  },
  placeholder: {
    type: String,
    default: '请选择您工厂的详细地址'
  },
  name: {
    type: String,
    default: 'addressDetails'
  },
  value: {
    type: String,
    default: ''
  },

})


const addressDetails = reactive({})

const emits = defineEmits(['update:addressDetails'])

const chooseAddress = () => {
  getChooseLocation().then(res => {
    emits('update:addressDetails', res)
  })
}
</script>

<template>
  <view style="position:relative;">
    <uni-forms-item label-width="110px" required :label="props.label" :name="props.name">
      <uni-easyinput type="textarea" auto-height v-model="props.value" suffixIcon="location"
                     @iconClick="chooseAddress"
                     :placeholder="props.placeholder"/>
    </uni-forms-item>
<!--    <view class="mask" @click="chooseAddress"></view>-->
  </view>
</template>

<style scoped lang="scss">
.mask {
  z-index: 20;
  position: absolute;
  height: 35px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
}

::v-deep .is-textarea {
  box-sizing: border-box;
  min-height: 38px;
}

::v-deep .uni-easyinput__content-textarea {
  min-height: 100%;
  box-sizing: border-box;
  line-height: 1.4;
}
</style>
