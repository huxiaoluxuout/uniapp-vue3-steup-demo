<template>
  <view class="zshu-upload-images-videos">
    <!--图片-->
    <view class="image-item" v-for="(item,index) in filePathsView" :key="item.url" v-if="type==='image'"
    >
      <view class="img-container">
        <image class="img" :src="item.url" mode="aspectFill" @click.stop="previewImage(index)"/>
        <view class="del" @click.stop="del(index)">
          <uni-icons type="close" color="#ff3c3c" size="22"></uni-icons>
        </view>
        <view class="mask-loading" v-show="item.showLoading">
          <view class="ac">
            <uni-icons type="spinner-cycle" color="#fafafa" size="40"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <!--视频-->
    <view class="video-item" v-for="(item,index) in filePathsView" :key="item.url" v-else-if="type==='video'">
      <view class="img-container">
        <video class="img" :src="item.url" :poster="item.poster"/>
        <view class="del" @click.stop="del(index)">
          <uni-icons type="close" color="#ff3c3c" size="22"></uni-icons>
        </view>
        <view class="mask-loading" v-show="item.showLoading">
          <view class="ac">
            <uni-icons type="spinner-cycle" color="#fafafa" size="40"></uni-icons>
          </view>
        </view>
        <!--        <view class="mask-loading" v-if="item.showCompress">
                  <view class="ac2">
                    <view style="position: absolute; font-size: 12px; color: #fff;">视频压缩中</view>
                    <view class="lds-ring">
                      <view></view>
                      <view></view>
                      <view></view>
                      <view></view>
                    </view>
                  </view>
                </view>-->


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

import {computed, defineExpose, reactive, ref, watch} from "vue"
import {baseImgURL} from "@/http/request";
import {getOssSignature} from "@/http/apis/common";
import {$msg} from "@/utils/tools";
import {compressVideoHandler} from "@/components/zshu-components/utils";


const props = defineProps({
  alwaysShowUpload: {
    type: Boolean,
    default: false
  },
  rowLimit: {
    type: [Number, String],
    default: 3
  },

  /*  limitCount:{
      type: [Number, String],
      default: 1
    },*/

  type: {
    type: String,
    validator: function (value) {
      // 这个值必须是 'image' 或 'video'
      return ['image', 'video'].includes(value);
    },
    default: 'image',// image|video
  },
  uploadNow: Boolean
})


const initUrl = reactive([])
const postOssUrl = ref([])
const tempViewUrl = ref([])
const currentTempUrl = ref([])


const filePathsView = computed(() => initUrl.concat(tempViewUrl.value))

const postUrl = computed(() => initUrl.concat(postOssUrl.value))


const emits = defineEmits(['update:filePaths'])


watch(postUrl, (newVal) => {
  console.log('最终提交的 url', newVal)
  emits('update:filePaths', newVal)

})


// 显示上传点击图标
const isShowUpload = computed(() => {
  return props.alwaysShowUpload || Number(props.rowLimit) > filePathsView.value.length;
});

// 计算当前上传可以图片的个数
const chooseCountLimit = computed(() => {
  return props.alwaysShowUpload ? Number(props.rowLimit) : Number(props.rowLimit) - filePathsView.value.length;

});

// 获取上传地址
const chooseFile = () => {

  const api = props.type === "image" ? "chooseImage" : "chooseVideo";
  const config = props.type === "image" ? {count: chooseCountLimit.value, sizeType: ["compressed","original"]} : {compressed: false};


  uni[api]({
    ...config,
    success: function (res) {
      if (res.errMsg === "chooseImage:ok") {

        currentTempUrl.value = res.tempFilePaths.map((item) => ({url: item, urlId: item}));
        tempViewUrl.value.push(...currentTempUrl.value);

        getOssSig()

      } else if (res.errMsg === "chooseVideo:ok") {

        currentTempUrl.value = [
          {
            urlId: res.tempFilePath,
            url: res.tempFilePath,
            showLoading: false,
            showCompress: true,
          },
        ];
        tempViewUrl.value.push(...currentTempUrl.value);

        /*currentTempUrl.value.forEach(item=>{
          compressVideoHandler(item.url).then(res=>{
            // tempViewUrl.value.find(item=>item.urlId===res.tempFilePath).showCompress=false
            tempViewUrl.value.find(item=>item.urlId===res.tempFilePath).urlId=item.url

            currentTempUrl.value.length = 0
            currentTempUrl.value.push(
                {
                  urlId:res.tempFilePath,
                  url: res.tempFilePath,
                }
            )
            console.log('currentTempUrl',currentTempUrl.value);

            getOssSig()
            resolve()
          })
        })*/


        /*currentTempUrl.value = [
          {
            poster: res.thumbTempFilePath,
            urlId: res.tempFilePath,
            url: res.tempFilePath,
            showLoading: false,
            showCompress: true
          }
        ]
        tempViewUrl.value.push(...currentTempUrl.value)

        let startTime = new Date()
        console.log('压缩中...')

        uni.compressVideo({
          src: res.tempFilePath,
          quality: 'medium',
          bitrate: 1268,
          fps: 24,
          resolution: 1,
          success(success) {


            console.log('压缩成功',(success.size / 1024)+'Mb', ((new Date() - startTime) / 1000) + 's')
            console.log('compressVideo-success', success)

            tempViewUrl.value.find(item=>item.urlId===res.tempFilePath).showCompress=false
            tempViewUrl.value.find(item=>item.urlId===res.tempFilePath).urlId=success.tempFilePath

            currentTempUrl.value.length = 0
            currentTempUrl.value.push(
              {
                poster: success.tempFilePath,
                urlId:success.tempFilePath,
                url: success.tempFilePath,
              }
            )

            getOssSig()
          },
          complete(complete) {
            console.log(complete)
          }
        })*/
      }

    },

    fail: function (fail) {
      console.warn(fail)
    }
  });

}

let resultFormData = []

const getOssSig = async () => {
  for (const tempItem of currentTempUrl.value) {
    const index = tempItem.url.lastIndexOf(".");
    const ext = tempItem.url.substr(index + 1);
    await ossSignature(tempItem.url, ext);
  }
};


const ossSignature = async (itemFilePath, ext) => {
  try {
    const result = await getOssSignature({ext: ext});
    resultFormData.push({
      itemFilePath: itemFilePath,
      formData: result.data,
    });



    if(props.type==='image'){
      console.log("开始立即上传");
      toUploadsOss().then()
      console.log("开始立即上传1111111");

    }

  } catch (error) {
    console.error("Error getting OSS signature:", error);
  }
};


// 上传到阿里云OSS
const toUploadsOss = async () => {


  return new Promise(async resolve => {

    if(props.type!=='image'){
      // 防止不是立即上传如果手动调用报错
      if (!props.uploadNow) {
        resolve(true)
        return
      }
    }


    if (props.type === 'video') {
      await updateVideoFilePath();
    }

    if (!currentTempUrl.value.length) {
      resolve(true)
      return
    }

    let startTime = new Date()
    console.log('上传中...')

    filePathsView.value.forEach(tempItem => {
      if (typeof tempItem.showLoading !== 'undefined') {
        tempItem.showLoading = true
      }
    });


    let uploadPromises = resultFormData.map(resultFormItem => {

      return new Promise((resolve, reject) => {

        uni.uploadFile({
          url: resultFormItem.formData.host,
          filePath: resultFormItem.itemFilePath,
          fileType: props.type,
          name: 'file',
          formData: {
            key: resultFormItem.formData.key,
            policy: resultFormItem.formData.policy,
            OSSAccessKeyId: resultFormItem.formData.accessKeyId,
            signature: resultFormItem.formData.signature,
            success_action_status: '200'
          },
          success: (successRes) => {
            if (successRes.statusCode === 200) {
              postOssUrl.value.push({urlId: resultFormItem.itemFilePath, fullurl: resultFormItem.formData.url, url: resultFormItem.formData.url})
              console.log('上传成功', ((new Date() - startTime) / 1000) + 's');
              resolve(successRes);
            }
          },
          fail: err => {
            reject(err);
            console.warn('fail', err);
          }
        });
      });
    });
    Promise.all(uploadPromises).then(() => {
      tempViewUrl.value.forEach(tempItem => {
        const hasSame = postOssUrl.value.find(item => tempItem.urlId === item.urlId);
        if (hasSame) {
          tempItem.showLoading = false
        }
      });
      resultFormData = []
      currentTempUrl.value = []
      resolve(true)
    }).catch((err) => {
      console.log('Some files failed to upload', err);
    });

  })
}

const updateVideoFilePath = () => {
  return new Promise((resolve) => {
    if (currentTempUrl.value.length === 0) {
      resolve()
      return
    }

    let urlItem = currentTempUrl.value[0]
    filePathsView.value.find(itemView => itemView.url === urlItem.url).showLoading = true
    compressVideoHandler(urlItem.url).then((res) => {
      tempViewUrl.value.find(itemView => itemView.url === urlItem.url).urlId = res.tempFilePath
      currentTempUrl.value.length = 0;
      currentTempUrl.value.push({
        urlId: urlItem.url,
        url: res.tempFilePath,
      });
      return getOssSig()

    }).then(() => {
      resolve()
    })

  });
};

const del = (index) => {
  uni.showModal({
    title: '确定删除吗?',
    success: function (res) {
      if (res.confirm) {

        if (initUrl.length === 0) {

          tempViewUrl.value.splice(index, 1)
          postOssUrl.value.splice(index, 1)

        } else {
          let initLen = initUrl.length
          console.log({initLen, index})

          if (index >= initLen) {
            console.log('删除新上传')
            postOssUrl.value.splice(index - initLen, 1)
            tempViewUrl.value.splice(index - initLen, 1)

          } else {
            console.log('删除回显initUrl')
            initUrl.splice(index, 1)

          }
        }
        /*console.log('initUrl', initUrl)
        console.log('postOssUrl', postOssUrl.value)
        console.log('postUrl', postUrl.value)
        console.log('tempFilePaths', tempViewUrl.value)
*/


      } else if (res.cancel) {


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

defineExpose({
  chooseFile,
  filePaths: tempViewUrl,
  initUrl,
  toUploadsOss,
})
</script>

<style scoped>


.zshu-upload-images-videos {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.image-item {
  --item-num: 3;
  height: calc((750rpx - 2 * 30rpx) / var(--item-num));
  width: calc((750rpx - 2 * 30rpx) / var(--item-num));
  position: relative;
}

.video-item {
  --scale-video: calc(16 / 9);
  --video-width: calc((750rpx - 2 * 30rpx));

  width: var(--video-width);
  height: calc(var(--video-width) / var(--scale-video));

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


.img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.mask-loading {
  position: absolute;
  inset: 10rpx;
  z-index: 100;
  background-color: rgba(134, 134, 134, .6);
  border-radius: 10rpx;
  /*display: flex;
  align-items: center;
  justify-content: center;*/

}

/*.mask-loading:after {
  position: absolute;
  content: '';
  inset: 0;
  scale: .5;

  border-radius: 50%;
  border: 6px solid #999;
  border-top-color: #fff;
  animation: loading 0.8s infinite linear;
}*/

.ac {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  animation: loading 0.8s infinite linear;

}


@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ac2 {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 200rpx;
  height: 200rpx;
}

.lds-ring view {
  box-sizing: border-box;
  position: absolute;
  border-radius: 50%;
  border-top: 0.3rem solid #f8f8f8;
  border-right: 0.3rem solid transparent;
  border-bottom: 0.3rem solid transparent;
  border-left: 0.3rem solid transparent;

  width: 200rpx;
  height: 200rpx;
  animation: lds-ring 1.2s cubic-bezier(.5, 0, .5, 1) infinite;
}

.lds-ring view:nth-child(1) {
  animation-delay: -.45s;
}

.lds-ring view:nth-child(2) {
  animation-delay: -.3s;
}

.lds-ring view:nth-child(3) {
  animation-delay: -.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0)
  }

  to {
    transform: rotate(360deg)
  }
}
</style>
