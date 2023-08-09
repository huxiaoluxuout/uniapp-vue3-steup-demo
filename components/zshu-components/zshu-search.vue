<template>
  <view class="zshu-search-wrapper ">
    <view id="search" class="flex justify-between container-tb container-lr fixed-top shadow">
      <view class="flex align-center container-lr zshu-search-left ">
        <uni-icons type="search" size="26" color="#666666"></uni-icons>
        <input class="flex-1 search-input" placeholder-class="input-plc" placeholder="搜索"
               @confirm="confirmSearch()" confirm-type="search" v-model.trim="keyWord"
        />
      </view>
      <view class="zshu-search-right" @touchstart="streamRecord" @touchend="endStreamRecord">
        <image class="icon-micoff" :src="baseImgURL+'/icon-micoff.png'"/>
      </view>
    </view>
    <view class="temp-view-height"></view>

    <view class="parltxt" v-if="isShow">
      <view class="poral">
        <view class="longyin">
          对准麦克风说话
        </view>
        <image class="yugif" src="https://haerbin.ryg365.com/images/yu.gif" mode="aspectFit"></image>
      </view>

    </view>
  </view>
</template>
<script setup>
import {onMounted, ref, watch,} from 'vue'
import {baseImgURL} from "@/http/request";
import {$msg, checkAndGuideRecordAuth,} from "@/utils/tools";

const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()
const emits = defineEmits(['confirmSearch', 'micoff', 'update:searchVal'])


onMounted(() => {
  initRecord()
})

const isShow = ref(false)
const keyWord = ref('')
const confirmSearch = () => {
  console.log('  keyWord.value', keyWord.value)
  emits('confirmSearch');

}


watch(keyWord, (newVal) => {
  emits('update:searchVal', keyWord.value)
  emits('confirmSearch',);

  if (isShow.value && newVal) {
    isShow.value = false
  }
})
const clearKeyWord = () => {
  keyWord.value = ''
}

// 调用函数进行授权判断和引导

const recordAuth=ref(false)
async function checkAndGuideAuth(callback) {
  try {
    const granted = await checkAndGuideRecordAuth();
    if (granted) {
      console.log('语音授权已获取');
      recordAuth.value=true


    } else {
      console.log('语音授权未获取');
      recordAuth.value=false

    }
  } catch (error) {
    console.error('授权处理失败', error);
  }
}


const streamRecord = () => {
  checkAndGuideAuth();
  if (recordAuth.value) {
    isShow.value = true
    manager.start({
      duration: 30000,
      lang: "zh_CN"
    })
  }

}
const endStreamRecord = (e) => {

  console.log('endStreamRecord',e)
  manager.stop();
  if(!keyWord.value){
    isShow.value = false

  }

}
const initRecord = () => {
  //有新的识别内容返回，则会调用此事件
  manager.onRecognize = (res) => {
    let text = res.result
    text = text.slice(0, text.length - 1)
    keyWord.value = text

  }
  // 识别结束事件
  manager.onStop = (res) => {
    console.log('res.result',res.result)

    let text = res.result

    text = text.slice(0, text.length - 1)

    if (text == '') {
      isShow.value = false

      return
    }
    keyWord.value = text
  }
}


</script>
<style scoped lang="scss">
.temp-view-height {
  // #ifdef APP-PLUS
  height: 135px;
  // #endif
  // #ifndef APP-PLUS
  height: calc(40px + 40rpx);
  //  #endif
}

.zshu-search-wrapper {
  background-color: #fff;
  z-index: 8000;

  .fixed-top {
    background-color: #fff;
  }

  .zshu-search-left {
    background-color: #F6F6F6;
    border-radius: 100px;
    //height: 40px;
    flex: 1;
    //padding: 30rpx;
    font-size: 14px;

    .search-input {
      color: #333333;
      margin-left: 4rpx;
    }

    .input-plc {
      color: #666666;
    }
  }

  .icon-micoff {
    width: 36px;
    height: 36px;
    margin-left: 20rpx;

  }
}

//============

.parltxt {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;
  padding-bottom: 120rpx;
  box-sizing: border-box;

  .poral {
    position: relative;
  }

  .longyin {
    font-size: 30rpx;
    color: #CD0000;
    text-align: center;
    position: absolute;
    font-weight: bold;
    top: 90rpx;
    left: 0;
    width: 600rpx;
  }

  .yugif {
    display: block;
    width: 600rpx;
    height: 400rpx;
  }
}

</style>
