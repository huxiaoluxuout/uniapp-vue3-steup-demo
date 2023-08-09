<template>
  <uni-forms ref="formRef" :rules="rules" :model="formData" label-position="top">
    <uni-forms-item label-width="110px" :label="item.label" :required="item.required" :name="item.name" v-for="item in formsList">
      <uni-easyinput v-if="!item.slotNme" :type="item.type" v-model="formData[item.name]" :placeholder="item.placeholder"/>

      <zshu-upload-images-videos v-if="item.slotNme==='upImages'"
                                 v-model:filePaths="filePaths" v-model="formData[item.name]" >
      </zshu-upload-images-videos>
<!--      <uni-data-select v-if="item.slotNme==='select'"
                       v-model="formData[item.name].value"
                       :localdata="formData[item.name].range"
                        @change="change"
      ></uni-data-select>-->
      <slot name="select"></slot>
    </uni-forms-item>
  </uni-forms>
  <zshu-footer-container>
    <template v-slot>
      <zshu-footer-inner :buttonList="[{id: 3, text: '提交', flex: 2, type: 'releaseOrder'}]" @click="((e)=>submit(formRef))"/>
    </template>
  </zshu-footer-container>
</template>

<script setup>
import {defineExpose, reactive, ref, watch} from "vue"

const emits = defineEmits(['submit'])

const formRef = ref()
const filePaths = ref('');
watch(filePaths, (newValue) => {
  console.log('newValue',newValue)
  props.formData.imgs=newValue
})
const submit = async (e) => {
  await e.validate((valid, fields) => {
    console.log(valid, fields)
    if (valid) {
      // 验证成功
      emits('submit', fields)
    }
  })
}
defineExpose({submit})

const props = defineProps({
  formsList: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 表单数据
  formData: {
    type: Object,
    default: () => {
      return {}
    }
  },

  // 校验规则
  rules: {
    type: Object,
    default: () => {
      return {}
    }
  },

})


</script>

<style scoped>

</style>
