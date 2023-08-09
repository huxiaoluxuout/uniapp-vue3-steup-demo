<template>
  <view class="zshu-upload-images-videos">
    <!--图片-->
    <view class="image-item" v-for="(item,index) in filePathsView" :key="item.url" v-if="type==='image'">
      <view class="img-container">
        <image class="img" :src="item.url" mode="aspectFill" @click="previewImage(index)"/>
        <view class="del" @click.stop="del(index)">
          <uni-icons type="close" color="#ff3c3c" size="22"></uni-icons>
        </view>
        <view class="mask" v-show="!item.hideMask"></view>
      </view>
    </view>

    <!--视频-->
    <view class="image-item" v-for="(item,index) in filePathsView" :key="item.url" v-else-if="type==='video'">
      <view class="img-container">
        <video class="img" :src="item.url" :poster="item.poster"/>
        <view class="del" @click.stop="del(index)">
          <uni-icons type="close" color="#ff3c3c" size="22"></uni-icons>
        </view>
        <view class="mask" v-show="!item.hideMask"></view>
      </view>
    </view>
    <!--图片视频上传-->
    <view class="image-item" @click="chooseFile" v-show="isShowUpload">
      <view class="img-container">
        <slot>
          <image class="img" mode="aspectFill" :src="type==='image'?baseImgURL+'/add-img.png':baseImgURL+'/add-video.png'"/>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import {uploadsFile} from "./utils";
import {computed, defineExpose, nextTick, reactive, watch, watchEffect} from "vue"
import {baseImgURL} from "@/http/request";
// https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230608/feb59186c664c4f3b11acd1d06bd6416.png
// https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230608/00aef3741528faf6e24befddff0f6fd3.mp4

const props = defineProps({
  alwaysShowUpload: {
    type: Boolean,
    default: false
  },
  rowLimit: {
    type: [Number, String],
    default: 3
  },
  defaultFlexItem: {
    type: [Number, String],
    default: 3
  },
  type: {
    type: String,
    default: 'image',// image|video
  }
})

const initUrl = reactive([])

const filePaths = reactive([])
const postUrl = reactive([])

const filePathsView = computed(() => {
  filePaths.forEach((item => item.hideMask = true))
  return [...initUrl, ...filePaths]
})

watchEffect(() => {
  // console.log('watchEffect----initUrl', initUrl)
  postUrl.push(...initUrl)
})

watchEffect(() => {
  // console.log('watchEffect---postUrl', postUrl)
  emits('update:filePaths', postUrl)
})


const flexItem = computed(() => {
  return Number(props.defaultFlexItem)
  // 大小自适应
  /*if (filePathsView.value.length) {
    if (filePathsView.value.length >= props.rowLimit) {
      return props.rowLimit
    } else {
      return props.rowLimit >= filePathsView.value.length + 1 ? filePathsView.value.length + 1 : filePathsView.value.length
    }
  } else {
    return props.defaultFlexItem
  }*/
});
const isShowUpload = computed(() => {
  return props.alwaysShowUpload ? props.alwaysShowUpload : Number(props.rowLimit) > filePathsView.value.length;
});
const chooseCountLimit = computed(() => {
  return props.alwaysShowUpload ? Number(props.rowLimit) : Number(props.rowLimit) - filePathsView.value.length;
});

// 选择
const chooseFile = () => {
  const api = props.type === 'image' ? 'chooseImage' : 'chooseVideo'
  uni[api]({
    count: chooseCountLimit.value,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'],
    success: function (res) {
      console.log('0-chooseFile', res)
      if (res?.errMsg === "chooseImage:ok") {
        const tempFilePaths = res.tempFilePaths.map(item => ({url: item}));
        filePaths.push(...tempFilePaths)
      } else if (res?.errMsg === "chooseVideo:ok") {
        const tempFilePaths = [{poster: res?.thumbTempFilePath, url: res?.tempFilePath}]
        filePaths.push(...tempFilePaths)
      }
      uploadFile(res)
    },
    fail: function (fail) {
      console.warn(fail)
    }
  });

}
const uploadFile = (res) => {
  console.log('1-uploadFile===', res)
  const tempFilePaths = filePaths.map(item => item.url)
  uploads(tempFilePaths)

}
// 上传到后台
const emits = defineEmits(['update:filePaths',])

const uploads = (tempFilePaths) => {
  console.log('uploads----tempFilePaths', tempFilePaths)
  /*const postimg = tempFilePaths.map(item => {
    return {
      url: item + '?=123',
      hideMask: true
    }
  })
  postUrl.push(...postimg)*/

  uploadsFile(tempFilePaths).then(res => {
    const postImg = res.map(item => JSON.parse(item).data)
    postUrl.push(...postImg)
  })
}


const del = (index) => {
  uni.showModal({
    title: '确定删除吗?',
    success: function (res) {
      if (res.confirm) {
        if (initUrl.length && index <= initUrl.length - 1) {
          initUrl.splice(index, 1)
        } else {
          filePaths.splice(index - (initUrl.length), 1)
        }
        postUrl.splice(index, 1)
        emits('update:filePaths', postUrl)
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

defineExpose({
  chooseFile,
  filePaths,
  initUrl,
})
</script>

<style scoped>
.zshu-upload-images-videos {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.image-item {
  height: calc((750rpx - 2 * 30rpx) / v-bind(flexItem));
  width: calc((750rpx - 2 * 30rpx) / v-bind(flexItem));
  position: relative;
}

.del {
  position: absolute;
  top: 15rpx;
  right: 15rpx;
  box-sizing: border-box;
}

.img-container {
  height: 100%;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 10rpx;
  position: relative;
}

.mask {
  position: absolute;
  top: 10rpx;
  bottom: 10rpx;
  left: 10rpx;
  right: 10rpx;
  z-index: 10;
  border-radius: 10rpx;
  background-color: rgba(0, 0, 0, .3);
}

.img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

</style>
