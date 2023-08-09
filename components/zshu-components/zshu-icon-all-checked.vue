<script setup>
import {inject } from "vue";
const { allChecked,toggleAllChecked} = inject('provideAllCheckedKey')
</script>

<template>
  <button class="button btn" @click.stop="toggleAllChecked">
    <uni-icons v-show="!allChecked" type="circle" color="#929292" size="22"></uni-icons>
    <uni-icons v-show="allChecked" type="checkbox" color="#FD814A" size="22"></uni-icons>
    <text class="all-checked">全选</text>
  </button>
</template>

<style scoped lang="scss">
.btn {
  ::v-deep [is$="uni-icons"], .uni-icons {
    height: 1em;
    display: flex;
    align-items: center;
    margin-right: 10rpx;
  }

  background-color: #fff;
  color: #999999;
  border: 1px solid #999999;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 30rpx;

  .all-checked {

    font-size: 16px;
  }
}
</style>
