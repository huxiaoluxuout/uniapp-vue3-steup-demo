<template>

  <view class="flex-container page-gap" style="--num-columns:2;--gap:30rpx">
    <!--图片-->
    <view class="flex-item flex-item__scale" v-for="(item,index) in filePathsView" :key="item.url" v-if="type==='image'">

      <image class="img" mode="aspectFill" :src="type==='image'?baseImgURL+'/add-img.png':baseImgURL+'/add-video.png'"/>

    </view>



    <!--    <view class="flex-item image-item" v-for="(item,index) in filePathsView" :key="item.url" v-if="type==='image'">
      <view class="img-container">
        <image class="img" :src="item.url" mode="aspectFill" @click.stop="previewImage(index)"/>
        <view class="del" @click.stop="delFn(index)">
          <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
        </view>
        <view class="loading-view" v-show="item.isShowLoading">
          <zshu-loading></zshu-loading>
        </view>
      </view>
    </view>
    &lt;!&ndash;图片 视频 上传&ndash;&gt;
    <view class="image-item" @click="chooseFile" v-show="isShowUpload">
      <view class="img-container">
        <slot>
          <image class="img" mode="aspectFill" :src="type==='image'?baseImgURL+'/add-img.png':baseImgURL+'/add-video.png'"/>
        </slot>
      </view>
    </view>-->
  </view>

</template>
<script>
export default {
  options: { styleIsolation: 'shared' }
}
</script>
<script setup>

import {computed, defineExpose, reactive} from "vue"
import {baseImgURL} from "@/http/config";
import {uploadImages} from "@/utils/tools";

const emits = defineEmits(['update:srcUrl',])


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
  },
  srcUrl: {
    type: Array,
    default: () => {
      return []
    },
  }
})

// const initUrl = reactive([])

const filePaths = reactive([...props.srcUrl])


const filePathsView = computed(() => [...filePaths])


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
    /*   success: function (res) {
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
    }*/
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
})
</script>

<style scoped>
.loading-view {
  position: absolute;
  inset: 0;
  border: 1px solid #000;
}

.zshu-upload-images-videos {
//display: flex; //align-items: center; //flex-wrap: wrap;
}

.image-item {

  position: relative;
  border: 1px solid #000;
}

.del {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  box-sizing: border-box;
}

.img-container {
  //height: var(--item-width);

/*  height: 100%;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 10rpx;
  position: relative;*/
}


.img {
  /*display: block;*/
  //height: var(--item-width);
  //width: var(--item-width);
  //border-radius: 5px;
}

</style>
