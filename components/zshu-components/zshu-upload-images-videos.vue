<template>

  <view class="flex-container page-gap"
        style=" --view-width:calc(750rpx - 30rpx); --scale:calc(1);" :style="{'--num-columns':columnsLimit}">

    <!--图片-->
    <template v-if="uploadType==='image'">
      <view class="flex-item flex-item__scale image-container "
            v-for="(item,index) in filePathsView" :key="item.url">
        <view class=item_container>
          <image class="container-item" :src="item.url" mode="aspectFill" @click.stop="previewImage(index)"/>
          <view class="del" @click.stop="delFn(index)">
            <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
          </view>
          <view class="loading-view" v-show="item.isShowLoading">
            <zshu-loading></zshu-loading>
          </view>
        </view>
      </view>
    </template>
    <template v-else-if="uploadType==='video'">
      <view class="flex-item flex-item__scale image-container "
            v-for="(item,index) in filePathsView" :key="item.url">
        <view class=item_container>
          <image class="container-item" :src="item.url" mode="aspectFill" />
          <view class="del" @click.stop="delFn(index)">
            <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
          </view>
          <view class="loading-view" v-show="item.isShowLoading">
            <zshu-loading></zshu-loading>
          </view>
        </view>
      </view>
    </template>

    <!--图片 视频 上传-->
    <view class="image-container flex-item__scale image-container" @click="chooseFile" v-show="isShowUpload">
      <view class="item_container">
        <slot>
          <image class="container-item" mode="aspectFill" :src="uploadDefaultIcon"/>
        </slot>
      </view>
    </view>
  </view>

</template>

<script setup>

import {computed, defineExpose, reactive} from "vue"

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

  uploadType: {
    type: String,
    default: 'image',// image|video
  },

  srcUrl: {
    type: Array,
    default: () => {
      return []
    },
  }
})

const isShowUpload = computed(() => {
  return Number(props.limit) > filePathsView.value.length;
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
        filePaths.push(...tempUrl)
        console.log('tempUrl', tempUrl)
        console.log('filePaths', filePaths)
        /*   setTimeout(()=>{
             filePaths.forEach(item=>{
               item.isShowLoading= Math.floor(Math.random() * (2 - 1 + 1) + 1) <2;
             })
           },5000)*/

        uploadImages(tempFilePaths).then(res => {
          if (res.length === tempFilePaths.length) {
            res.forEach((item, index) => {
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

defineExpose({})
</script>

<style scoped>
.loading-view {
  position: absolute;
  inset: 0;
  border: 1px solid #000;
}

.image-container {
  position: relative;
}

.item_container {
}

.del {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  box-sizing: border-box;
}

.container-item {
  display: block;
  height: var(--item-height-scale);
  width: var(--item-width);
  border-radius: 5px;
}

</style>
