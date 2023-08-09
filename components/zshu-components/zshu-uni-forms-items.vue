<template>
  <uni-forms ref="formRef" :rules="rules" :model="formData" label-position="top">
    <uni-forms-item label-width="110px" :label="item.label" :required="item.required" :name="item.name">
      <uni-easyinput  :type="item.type" v-model="item.name" :placeholder="item?.placeholder"/>
    </uni-forms-item>
  </uni-forms>
  <zshu-footer-container>
    <template v-slot>
      <zshu-footer-inner :buttonList="[{id: 3, text: '提交', flex: 2, type: 'releaseOrder'}]" @click="((e)=>submit(formRef))"/>
    </template>
  </zshu-footer-container>
</template>

<script setup>
import {ref} from "vue";

const props=defineProps({
  item:{
    type:Object,
    default:()=>{
      return {

      }
    }
  }
})
const formRef=ref()
const submit = (e) => {
  console.log(e)
}

</script>

<style scoped>

</style>
