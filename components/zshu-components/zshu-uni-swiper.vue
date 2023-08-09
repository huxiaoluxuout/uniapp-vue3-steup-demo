<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
import {onReady} from "@dcloudio/uni-app";


const instance = getCurrentInstance(); // 获取组件实例上下文
console.log('instance', instance)
const swiperDotIndex = ref(0)
const current = ref(0)
const dotsStyles = reactive({})
const mode = ref('default')


const clickItem = (e) => {
  swiperDotIndex.value = e
}
const change = (e) => {
  /*  console.log('21231',e)
    console.log(props.detailsDataImages[e.detail.current]);*/

  current.value = e.detail.current
}

const props = defineProps({
  detailsDataImages: {
    type: Array,
    default: () => {
      return []
    }
  }
})


const videoContext = ref(null)
// 播放时进入全屏
onReady(() => {
  console.log('播放时进入全屏')
  videoContext.value = uni.createVideoContext('myVideo', instance.proxy);

})

function play() {

  console.log('play', videoContext.value)
  videoContext.value.play()
  videoContext.value.requestFullScreen()
}


//退出全屏时停止
function fullscreenchange(e) {
  console.log('fullscreenchange', e)


}

function fullscreenclick(e) {
  console.log('fullscreenclick', e)

}

const isFullScreen = ref(false)
const toggleFullScreen = () => {
  if (isFullScreen.value) {
    // 退出全屏
    videoContext.value.exitFullScreen();
    isFullScreen.value = false;
    videoContext.value.pause()

  } else {
    // 进入全屏
    videoContext.value.requestFullScreen();
    videoContext.value.play()

    isFullScreen.value = true;
  }
}

// 图片预览

const previewImg = (index) => {

  const imageUrls = props.detailsDataImages
      .filter(item => item.type === 'image')
      .map(imageItem => imageItem.url);

  console.log('imageUrls', imageUrls);

  if (index >= 0 && index < imageUrls.length) {
    uni.previewImage({
      urls: imageUrls,
      current: imageUrls[index]
    });
  } else {
    console.log('Invalid image index');
  }
}


</script>

<template>
  <view class="zhshu-uni-swiper">
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :current="current" :mode="mode"
                    :dots-styles="dotsStyles" field="content">
      <swiper class="swiper-box" @change="change($event)" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in detailsDataImages" :key="index">
          <view class="swiper-item">
            <image v-if="item.type==='image'" class="image" :src="item.url" mode="aspectFit" />
            <!--            <image v-if="item.type==='image'" class="image" :src="item.url" mode="scaleToFill"/>-->
            <!--            <image v-if="item.type==='image'" class="image" :src="item.url" mode="aspectFill"/>-->
            <video v-else-if="item.type==='video'" id="myVideo"
                   class="video"
                   @click="toggleFullScreen"
                   @fullscreenchange="fullscreenchange($event)"
                   @fullscreenclick="fullscreenclick($event)"
                   :controls="false" :src="item.url"/>
            <!--            <image v-if="!isFullScreen&&item.type==='video'" @click="play" class="icon__player" :src="baseImgURL+'/icon-play.png'"></image>-->

          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<style scoped lang="scss">
.uni-swiper-dot-box {
  margin-top: 30rpx;
}

.swiper-box {
  height: 750rpx;
  background-color: #fff;
}

.swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 750rpx;
  position: relative;

  .icon__player {
    width: 60rpx;
    height: 60rpx;
    display: block;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.image {
  width: 750rpx;
  height: 750rpx;
}

.video {
  width: 750rpx;
  height: 750rpx;

}

</style>
