<script setup>
import {inject} from "vue";
const { isEdit,btnClick} = inject('provideBtnKey')
const { buttonList,buttonEditList} = inject('provideBtnListKey')

</script>

<template>
  <zshu-footer-container>
    <template v-slot>
      <zshu-footer-inner :buttonList="isEdit?buttonEditList:buttonList" @click="btnClick">
        <template #addBtn>
          <zshu-icon-all-checked v-if="isEdit"></zshu-icon-all-checked>
        </template>
      </zshu-footer-inner>
    </template>
  </zshu-footer-container>
</template>

<style scoped lang="scss">

</style>
