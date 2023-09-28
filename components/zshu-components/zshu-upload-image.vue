<template>

  <view class="flex-container page-gap"
        :style="{'--num-columns':columnsLimit,'--scale':scale,'--view-width':width,'--gap':gap}">
    <!--图片-->
    <view class="flex-item flex-item__scale image-video-container" :class="{'position-ab':hiddenIcon}"
          v-for="(item,index) in filePathsView" :key="item.url">
      <image class="image-item" :src="item.url" mode="aspectFill" @click.stop="previewImage(index)"/>

      <view v-if="!hiddenIcon" class="del-icon" @click.stop="delImage(index)">
        <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
      </view>

      <!--      <view class="loading-view" v-show="item.isShowLoading">
              &lt;!&ndash;          <zshu-loading></zshu-loading>&ndash;&gt;
            </view>-->
    </view>


    <!--图片 视频 上传-->
    <view v-show="isShowUpload"
          class="flex-item__scale image-video-container upload-icon-position"
          :class="{'upload-icon-ab':hiddenIcon}" @click="chooseFile"
    >
      <slot v-if="!hiddenIcon">
        <image class="image-item" mode="aspectFill" :src="uploadDefaultIcon"/>
      </slot>
    </view>
  </view>

</template>

<script setup>

import {computed, defineExpose, getCurrentInstance, reactive, ref} from "vue"

import {baseImgURL, baseURL} from "@/http/config";


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


  srcUrl: {
    type: Array,
    default: () => {
      return []
    },
  },
  isHiddenIcon: Boolean
})

const hiddenIcon = ref(props.isHiddenIcon)


const isShowUpload = computed(() => {
  return hiddenIcon.value ? hiddenIcon.value : Number(props.limit) > filePathsView.value.length;
});

const chooseCountLimit = computed(() => {
  return Number(props.limit) - filePathsView.value.length;
});

const uploadDefaultIcon = baseImgURL + '/add-img.png';

const viewTempSrcUrl = ref([])
const viewInitSrcUrl = computed(() => props.srcUrl)
const filePathsView = computed(() => viewInitSrcUrl.value.concat(viewTempSrcUrl.value))

const postSrcUrl = computed(() => props.srcUrl)

// 将要上传的临时地址
let tempUploadFilePaths = []

// 选择
const chooseFile = () => {
  uni.chooseImage({
    count: chooseCountLimit.value,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {

      const tempFilePaths = res.tempFilePaths

      // console.log('tempFilePaths', tempFilePaths)

      tempUploadFilePaths = tempFilePaths

      viewTempSrcUrl.value = tempFilePaths.map(item => {
        return {
          url: item,
          isShowLoading: true
        }
      })

      console.log('filePathsView', filePathsView.value)

      getUploadUrl()
      // 点击上传icon和展示view合为一体
      if (hiddenIcon.value) {
        // filePaths.value.length = 0
      }


    },
    fail: function (fail) {
      console.warn(fail)
    }
  });

}

const getUploadUrl = () => {

  let tempFilePaths = tempUploadFilePaths

  uploadImages(tempFilePaths).then(resData => {
    console.log('tempFilePaths-----------', resData)

    tempFilePaths.forEach(tempUrl => {
      let info = resData.find(resDataItem => resDataItem.tempFilePath === tempUrl)
      if (info) {
        postSrcUrl.value.push(info)
      }
    })


  }).catch(error => {
    console.error('部分图片上传失败', error);

    if (error.data && error.data.fail) {

      const failedFilePaths = error.data.fail;

      console.log('上传失败的文件路径：', failedFilePaths);

    }
  });
}


const getFormatUrl = (resData, tempFilePath) => {
  console.log('getFormatUrl', resData, tempFilePath)
  return {
    url: resData?.data.url,
    tempFilePath
  }
}

// 封装图片上传函数
function uploadImages(filePaths, config = {}) {
  if (!Array.isArray(filePaths)) {
    console.warn('filePaths 必须是数组')
    return
  }
  return new Promise((resolve, reject) => {

    const defaultConfig = {
      url: baseURL + '/api/common/upload',
    };
    config = {...defaultConfig, ...config};

    const uploadPromises = filePaths.map(filePath => {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          filePath: filePath,
          name: 'file',
          ...config,
          success: res => {
            resolve(getFormatUrl(JSON.parse(res.data), filePath));
          },
          fail: err => {
            reject(filePath);
          }
        });
      });
    });

    Promise.all(uploadPromises)
        .then(results => {
          console.log('results', results)
          resolve(results);
        })
        .catch(failedFilePaths => {

          const successFiles = filePaths.filter(filePath => !failedFilePaths.includes(filePath));
          reject({
            code: -1,
            msg: '部分图片上传失败',
            data: {
              success: successFiles,
              fail: failedFilePaths
            }
          });
        });
  });
}

// 删除图片
const delImage = (index) => {
  uni.showModal({
    title: '确定删除吗?',
    success: function (res) {
      if (res.confirm) {
        if (viewInitSrcUrl.value.length === 0) {
          viewTempSrcUrl.value.splice(index, 1)
          console.log('1删除新上传')
        } else {
          let initLen = viewInitSrcUrl.value.length
          console.log({initLen, index})
          if (index >= initLen) {
            console.log('2删除新上传')
            viewTempSrcUrl.value.splice(index - initLen, 1)
          } else {
            console.log('删除回显viewInitSrcUrl')
            viewInitSrcUrl.value.splice(index, 1)
          }
        }
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}


// 预览图片
const previewImage = (index) => {
  uni.previewImage({
    urls: filePathsView.value.map(item => item.url),
    current: filePathsView.value[index].url,
  })
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
