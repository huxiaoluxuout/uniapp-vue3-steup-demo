<template>

  <view class="flex-container page-gap"
        :style="{'--num-columns':columnsLimit,'--scale':scale,'--view-width':width,'--gap':gap}">

    <!--图片-->
    <template v-if="uploadType==='image'">
      <view class="flex-item flex-item__scale image-video-container" :class="{'position-ab':hiddenIcon}"
            v-for="(item,index) in filePathsView" :key="item.url">
        <image class="image-item" :src="item.url" mode="aspectFill" @click.stop="previewImage(index)"/>
        <view v-if="!hiddenIcon" class="del-icon" @click.stop="delFn(index)">
          <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
        </view>
        <view class="loading-view" v-show="item.isShowLoading">
          <!--          <zshu-loading></zshu-loading>-->
        </view>

      </view>
    </template>
    <!--视频-->
    <template v-else-if="uploadType==='video'">
      <view class="flex-item flex-item__scale image-video-container"
            v-for="(item,index) in filePathsView" :key="item.url">
        <video id="video" class="video-item"
               :src="item.url"
               @fullscreenchange="fullscreenchange($event)"
               @pause="pauseHandler"
               @play="playHandler"
        />
        <view v-if="!hiddenIcon" class="del-icon" @click.stop="delFn(index)">
          <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
        </view>
        <image v-show="isShowPlayIcon" @click="playVideo" class="icon__play" :src="baseImgURL+'/icon-play.png'"></image>
        <view class="loading-view" v-show="item.isShowLoading">
          <!--          <zshu-loading></zshu-loading>-->
        </view>
      </view>

    </template>

    <!--图片 视频 上传-->
    <view class="flex-item__scale image-video-container upload-icon-position"
          :class="{'upload-icon-ab':hiddenIcon}"
          @click="chooseFile" v-show="isShowUpload">
      <slot v-if="!hiddenIcon">
        <image class="image-item" mode="aspectFill" :src="uploadDefaultIcon"/>
      </slot>
    </view>
  </view>

</template>

<script setup>

import {computed, defineExpose, getCurrentInstance, reactive, ref} from "vue"

import {baseImgURL} from "@/http/config";
import {uploadImages} from "@/utils/tools";

const emits = defineEmits(['update:srcUrl'])

const props = defineProps({
  // 总共允许上传数量
  limit: {
    type: [Number, String],
    default: 6
  },
  // 一行有几列
  columnsLimit: {
    type: [Number, String],
    default: 2
  },
  // 宽高比例
  scale: {
    type: [Number, String],
    default: `calc(${1})`
  },
  // 当前可用总宽度
  width: {
    type: [Number, String],
    default: `calc(750rpx - 30rpx)`
  },
  gap: {
    type: String,
    default: `30rpx`
  },

  uploadType: {
    type: String,
    default: 'image',// image|video
  },

  srcUrl: {
    type: Array,
    default: () => {
      return []
    },
  },

  isHiddenIcon: Boolean
})

const hiddenIcon = ref(props.isHiddenIcon)
console.log(hiddenIcon.value)
const isShowUpload = computed(() => {

  return hiddenIcon.value ? hiddenIcon.value : Number(props.limit) > filePathsView.value.length;
});

const chooseCountLimit = computed(() => {
  return Number(props.limit) - filePathsView.value.length;
});

const uploadDefaultIcon = computed(() => {
  return props.uploadType === 'image' ? baseImgURL + '/add-img.png' : baseImgURL + '/add-video.png'
});

// https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230608/feb59186c664c4f3b11acd1d06bd6416.png
// https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230608/00aef3741528faf6e24befddff0f6fd3.mp4

const filePaths = reactive([...props.srcUrl])
const filePathsView = computed(() => [...filePaths])

// 选择
const chooseFile = () => {
  const api = props.uploadType === 'image' ? 'chooseImage' : 'chooseVideo'
  uni[api]({
    count: chooseCountLimit.value,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'],
    success: function (res) {
      if (res?.errMsg === "chooseImage:ok") {
        const tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths)
        let tempUrl = tempFilePaths.map(item => {
          return {
            url: item,
            urlId: item,
            isShowLoading: true
          }
        })
        // 上传icon和展示view合为一体
        if (hiddenIcon.value) {
          filePaths.length = 0
        }
        filePaths.push(...tempUrl)
        console.log('tempUrl', tempUrl)
        console.log('filePaths', filePaths)
        console.log('filePathsView', filePathsView)

        emits('update:srcUrl', [{
          url:'https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230916/d0f33e02ee176dd572b153a1f23cf209.png'

        }])


        let resUrlList=['https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230916/d0f33e02ee176dd572b153a1f23cf209.png']
        setTimeout(() => {

          filePaths.forEach(item => {
            // item.isShowLoading = Math.floor(Math.random() * (2 - 1 + 1) + 1) < 2;
          })


        }, 2000)


        return

        uploadImages(tempFilePaths).then(res => {
          if (res.length === tempFilePaths.length) {
            res.forEach((item, index) => {
              filePaths[index].url = item.data?.fullurl
              filePaths[index].urlId = item.data?.fullurl
              filePaths[index].isShowLoading = false
            })
          }

          emits('update:srcUrl', filePaths)

        }).catch(error => {
          console.error('部分图片上传失败', error);

          if (error.data && error.data.fail) {
            const failedFilePaths = error.data.fail;
            console.log('上传失败的文件路径：', failedFilePaths);
          }
        });
      } else if (res?.errMsg === "chooseVideo:ok") {

      }

    },
    fail: function (fail) {
      console.warn(fail)
    }
  });

}

// 删除
const delFn = (index) => {
  uni.showModal({
    title: '确定删除吗?',
    success: function (res) {
      if (res.confirm) {
        filePaths.splice(index, 1)
        emits('update:srcUrl', filePaths)
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}


// 预览图片
const previewImage = (index) => {
  uni.previewImage({
    urls: filePaths.map(item => item.url),
    current: filePaths[index].url,
  })
}


// 视频

const instance = getCurrentInstance();

const isFullScreen = ref(false)
const isShowPlayIcon = ref(true)
const videoContext = ref(null)

videoContext.value = uni.createVideoContext('video', instance.proxy)

// 点击播放
function playVideo() {
  videoContext.value.play()
  isShowPlayIcon.value = false

}


//退出全屏时停止
function fullscreenchange() {
  if (isFullScreen.value) {
    videoContext.value.pause() //暂停播放
    isFullScreen.value = false
    isShowPlayIcon.value = true

  } else {
    isFullScreen.value = true
    isShowPlayIcon.value = false

  }

}

function pauseHandler() {
  // isFullScreen.value = false
  isShowPlayIcon.value = true
}

function playHandler() {
  // isFullScreen.value = false
  isShowPlayIcon.value = false
}


defineExpose({})
</script>

<style scoped>

.loading-view {
  position: absolute;
  z-index: 2;
  border-radius: 5px;
  background-color: rgba(130, 130, 130, .5);
  inset: 0;
}

.loading-view:after {
  content: '';
  position: absolute;
  z-index: 2;
  inset: 0;
  background: url("/static/loading.svg") no-repeat;
  animation: uni-loading 1s steps(12) infinite;
  background-size: 100%;
  scale: .5;


}

.page-gap {
  position: relative;
}

.image-video-container {
  position: relative;
}

.del-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  box-sizing: border-box;
  z-index: 1;
}

.icon__play {
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  z-index: 1;
}


.image-item {
  display: block;
  height: var(--item-height-scale);
  width: var(--item-width);
  border-radius: 5px;
}

.video-item {
  display: block;
  height: var(--item-height-scale);
  width: var(--item-width);
  border-radius: 5px;
}

.upload-icon-position {

}

.upload-icon-ab {
  position: absolute;
  left: 0;
  bottom: calc(-1 * var(--item-height-scale));
  right: calc(-1 * var(--gap));
  z-index: 4;
  height: calc(var(--item-height-scale) / 2 - 30rpx);
  background-color: rgba(45, 45, 45, .6);
}

.position-ab {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: calc(-1 * var(--gap));

}

</style>
