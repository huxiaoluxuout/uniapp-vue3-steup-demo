<template>

  <view class="map-container" :style="{height:height}">

    <map class="map" show-location :scale="16"
         :markers="covers"
         @markertap="getcic"
         @regionchange="regionChangeHandler"
         :longitude="longitude"
         :latitude="latitude"
    >
      <view class="pointer">
        <uni-icons type="plusempty" color="#7b7b7b" size="24"></uni-icons>
      </view>

    </map>

  </view>

</template>

<script setup>
import {defineExpose} from "vue";

import {checkAndGuideLocationAuth, getCurrentPgePath, navigateTo} from "@/utils/tools";

const props = defineProps({
  longitude: {
    type: Number,
    default: 0
  },
  latitude: {
    type: Number,
    default: 0
  },

  height: {
    type: String,
    default: '180px'
  },

  covers: {
    type: Array,
    default: () => {
      return []
    }
  },
})

const emits = defineEmits(['update:markerId', 'getMarkerId', 'searchNearby'])
const getcic = (event) => {
  console.log('======getcic', event.markerId)
  emits('update:markerId', event.markerId)
  emits('getMarkerId', event.markerId)
}
const regionChangeHandler = (e) => {

  if (e.type === 'end' && e.causedBy === 'drag') {
    console.log('end', e)
    const {latitude, longitude} = e.detail.centerLocation
    // console.log(latitude, longitude)
    emits('searchNearby', {latitude, longitude})


  }
}

defineExpose({})

</script>

<style scoped lang="scss">
.map-container {
  background-color: #fff;
  width: 100%;
  height: 180px;
}

map {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;

  .pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>
