<template>
  <view class="address-picker">
    <view class="mask" :class="{'mask-show':isShow}" @click="close">
      <view class="picker-mian" @click.stop="()=>{}">
        <view class="top-title">
          <text class="tit">地区选择</text>
          <text class="confirm" @click="_confirm">确定</text>
        </view>
        <picker-view class="picker-view" @change="addressChange($event)" :value="pickerValue">
          <picker-view-column>
            <view v-for="(item,index) in addressInfo" :key="item.id" class="picker-item">
              <text :class="index===pickerValue[0]&& '_active'">{{ item.name }}</text>
            </view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item,index) in addressInfo[cityIndex]?.children" :key="item.id" class="picker-item"
                  :class="index===pickerValue[1]&& '_active'">
              <text :class="index===pickerValue[1]&& '_active'">{{ item.name }}</text>
            </view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item,index) in addressInfo[cityIndex]?.children[areasIndex]?.children" :key="item.id" class="picker-item"
                  :class="index===pickerValue[2]&& '_active'">
              <text :class="index===pickerValue[2]&& '_active'">{{ item.name }}</text>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {getAllAreaList} from "@/http/apis/common";

const emits = defineEmits(['addressInfo', 'update:isShow'])
import {reactive, ref, defineExpose} from "vue";

const addressInfo = reactive([])

const pickerValue = reactive([0, 0, 0])
const provinceIndex = ref(0)
const cityIndex = ref(0)
const areasIndex = ref(0)
const checkedInit = reactive({
  provinceIndex: 0,
  cityIndex: 0,
  areasIndex: 0
})
const props = defineProps({
  isShow: Boolean
})


getAllAreaList().then(res => {
  console.log('getAllAreaList', res)
  addressInfo.push(...res.data)

})


const close = () => {
  emits('update:isShow', false)
}
const open = () => {
  emits('update:isShow', true)

}

const addressChange = (e) => {
  if (pickerValue[0] !== e.detail.value[0]) {
    pickerValue[0] = e.detail.value[0]
    cityIndex.value = e.detail.value[0]
    pickerValue[1] = 0
    pickerValue[2] = 0
  } else if (pickerValue[1] !== e.detail.value[1]) {
    pickerValue[1] = e.detail.value[1]
    areasIndex.value = e.detail.value[1]
    pickerValue[2] = 0
  } else if (pickerValue[2] !== e.detail.value[2]) {
    pickerValue[2] = e.detail.value[2]
  }

}

function set(index) {
  pickerValue[0] = index;
  cityIndex.value = index;
  return Promise.resolve();
}

function set1(index) {
  pickerValue[1] = index;
  areasIndex.value = index;
  return Promise.resolve();
}

function set2(index) {
  pickerValue[2] = index;
  return Promise.resolve();
}


async function setCheckIndex(provinceIndex, cityIndex, areasIndex) {
  try {
    await set(provinceIndex);
    await set1(cityIndex);
    await set2(areasIndex);
    console.log('ok',pickerValue);
  } catch (error) {
    console.error(error);
  }
}

const setCheckedInit = () => {
  const {provinceId, cityId, areasId}=checkedInit
  console.log({provinceId, cityId, areasId})
  // console.log('addressInfo', addressInfo)

  const provinceIndex = addressInfo.findIndex(item => item.id === provinceId)
  const province = addressInfo[provinceIndex]
  const cities = province.children
  const cityIndex = cities.findIndex(item => item.id === cityId)
  const areasList = cities[cityIndex].children
  const areasIndex = areasList.findIndex(item => item.id === areasId)
  setCheckIndex(provinceIndex, cityIndex, areasIndex)

  // console.log({province})
  // emits('addressInfo', {province, city, area})
  console.log('provinceIndex', provinceIndex)
}
const setInit = (provinceId, cityId, areasId) => {
  checkedInit.provinceId = provinceId
  checkedInit.cityId = cityId
  checkedInit.areasId = areasId
}

function _confirm() {
// 提取省份的属性，忽略 children 属性
  const {children, ...province} = addressInfo[pickerValue[0]];
  const cities = children[pickerValue[1]];
  const {children: cityChildren, ...city} = cities;
  const areas = cityChildren[pickerValue[2]];
  const {children: cc3Children, ...area} = areas;
  emits('addressInfo', {province, city, area})
  close()
}

defineExpose({
  setCheckedInit,
  setInit,
})

</script>

<style scoped lang="scss">
.address-picker {
  z-index: 1000;
}

._active {
  color: #488ee9;
}

.mask {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, .5);
  transition: all 0.3s ease;
  visibility: hidden;
  opacity: 0;
  z-index: 1000;
}

.mask-show {
  visibility: visible;
  opacity: 1;
}

.picker-mian {
  height: 63vh;
  width: 90%;
  box-sizing: border-box;
  padding: 30rpx;
  border-radius: 14rpx;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.top-title {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.tit {
  font-size: 36rpx;
  color: #363636;
  font-weight: 700;
}

.confirm {
  position: absolute;
  right: 0;
  color: #488ee9;
}

.picker-view {
  height: 90%;
  overflow: hidden
}

.picker-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.picker-item text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
