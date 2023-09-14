<script setup>

const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  stop: Boolean,
})

const emits = defineEmits(['update:checked'])

const toggleChecked = () => {

  emits('update:checked', !props.checked)
}


</script>

<template>
  <view class="edit" v-if="!props.stop" @click.stop="toggleChecked">
    <uni-icons v-show="!checked" type="circle" color="#929292" size="26"></uni-icons>
    <uni-icons v-show="checked" type="checkbox" color="#FD814A" size="26"></uni-icons>
  </view>
  <view class="edit" v-if="props.stop" @click="toggleChecked">
    <uni-icons v-show="!checked" type="circle" color="#929292" size="26"></uni-icons>
    <uni-icons v-show="checked" type="checkbox" color="#FD814A" size="26"></uni-icons>
  </view>


</template>

<style scoped lang="scss">

</style>
