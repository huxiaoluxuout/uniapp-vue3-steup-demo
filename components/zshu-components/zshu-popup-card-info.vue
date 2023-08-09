<script setup>

// ========================
import {defineExpose, defineProps, reactive} from "vue";
import {getMyUserInfo} from "@/utils/customMethods";
import {agreeSwapCard, applySwapCard, refuseSwapCard} from "@/http/apis/message";
import store from "@/pages/TUIKit/TUICore/store";
import {getCarInfo, getMineCallCard} from "@/http/apis/mine";
import {$msg} from "@/utils/tools";


const props = defineProps({

  statusType: {
    type: Number,
    default: 0,//0.申请 1.同意 2.拒绝 3.同意 拒绝 4.查看
  },
  cardInfoItem: {
    type: Object,
    default: () => {
    },
  },
  isShowBtn: {
    type: Boolean,
    default: true
  },

})
const emits = defineEmits(['closePopupFriedCard'])


const {id} = getMyUserInfo()
// console.log('cardInfo', cardInfo)
const timStore = store.state.timStore;
const toChatId = timStore.conversationID.slice(3)

const cardInfo = reactive({})
console.log('props', props.statusType)
const getMineCardInfo = (callback) => {

  getMineCallCard().then(res => {
    Object.assign(cardInfo, res.data)

    const isRole = [res.data.is_agent, res.data.is_engineer, res.data.is_factory, res.data.is_scheme].some(item => item === 1)
    // const isRole=[0].some(item=>item===1)
    console.log(isRole)
    if (!isRole) {
      $msg('还没认证角色')
      return
    }
    callback && callback()
  })
}

if (props.statusType === 3 || props.statusType === 2 || props.statusType === 1) {
  Object.assign(cardInfo, props.cardInfoItem)
}


// 申请交换名片
const applySwapCardHandle = () => {
  console.log('toChatId', toChatId)

  applySwapCard({user_id: toChatId}).then(res => {
    getMineCardInfo(() => {
      sendMessage(3, cardInfo) // 发送自己的卡片信息，拒绝、同意按钮（可点击）
    })
    emits('closePopupFriedCard')

  })
};
//
const reject = () => {
  console.log('reject')// 发送对方的卡片信息、已拒绝状态
  refuseSwapCard({user_id: toChatId}).then(res => {
    console.log('res', res)
    sendMessage(2, props.cardInfoItem)

  })


}
const agree = () => {
  console.log('agree')// 发送自己的卡片信息 申请
  agreeSwapCard({user_id: toChatId}).then(res => {
    console.log('res', res)
    getMineCardInfo(() => {
      sendMessage(1, cardInfo)

    })
  })

}

//
const sendMessage = (statusType, data) => {
  console.log('data', data)
  const sendData = {
    type: 'SWAP_CARD',
    applyTypeId: 'C2C' + id,
    ...data,
    statusType

  }

  console.log('statusType', statusType)

  // 2. 创建消息实例，接口返回的实例可以上屏
  let message = uni.$TUIKit.createCustomMessage({
    to: toChatId,
    conversationType: uni.$TIM.TYPES.CONV_C2C,

    payload: {
      data: JSON.stringify(sendData),
      description: '交换名片',
      extension: ''
    }
  });

  // 3. 发送消息

  const timStore = store.state.timStore;
  const promise = uni.$TUIKit.sendMessage(message);
  promise.then(function (imResponse) {
    // 发送成功
    console.log('发送成功', imResponse.data.message);
    timStore.messageList.push(imResponse.data.message)

  }).catch(function (imError) {
    // 发送失败
    console.warn('sendMessage error:', imError);
  });

}

// ========================

//查看名片信息（双方已交换后）
/**
 *
 * @param toChatId
 */
const getCarInfoHandler = (toChatId, callback) => {
  getCarInfo({user_id: toChatId}).then(res => {
    Object.assign(cardInfo, res.data)
    callback && callback()
  })
}
defineExpose({
  getMineCardInfo,
  getCarInfoHandler,

})

</script>

<template>
  <!--  <uni-popup ref="popupCardInfo">-->
  <view class="shadow popup-content" :style="{width:statusType===0||statusType===4&&'78vw'}">
    <!--        <view class="popup-title">名片信息</view>-->
    <view class="section-wrapper">
      <view class="section-wrapper__left">
        <image :src="cardInfo.avatar"/>
      </view>
      <view class="section-wrapper__middle">
        <view class="flex-column">
          <text class="label-text">姓名：</text>
          <text class="name">{{ cardInfo.name }}</text>
        </view>
        <view class="flex-column">
          <text class="label-text">手机：</text>
          <text class="name">{{ cardInfo.mobile }}</text>
        </view>
        <view class="label-view">
          <text class="label-text" v-for="(item,index) in cardInfo.role_text_arr" :key="index">{{ item }}</text>
        </view>


      </view>
      <view class="section-wrapper__right">

      </view>
    </view>
    <view class="company flex-column">
      <text class="label-text">公司：</text>
      <text class="company-name">{{ cardInfo.company }}</text>
    </view>
    <view class="address">
      <text class="label-text">地址：</text>
      <text class="address-info">{{ cardInfo.address }}</text>
    </view>
    <view class="btns" v-if="statusType===0">
      <button class="btn-r" style="margin: unset;" @click="applySwapCardHandle">申请交换</button>
    </view>
    <view class="btns" v-else-if="statusType===1">
      <!--      <button class="btn-r" style="margin: unset;">已同意</button>-->
    </view>
    <view class="btns" v-else-if="statusType===2">
      <button class="btn-l" style="margin: unset;">已拒绝</button>
    </view>
    <view class="btns" v-else-if="statusType===3&&isShowBtn">
      <button class="btn-l" @click="reject">拒绝</button>
      <button class="btn-r" @click="agree">同意</button>

    </view>


  </view>

  <!--  </uni-popup>-->

</template>

<style scoped lang="scss">
//=========
.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .btn-l, .btn-r {
    border-radius: 5px;
    line-height: 1.8;
    flex: 1;
  }

  .btn-l:after, .btn-r:after {
    border: none;
  }

  .btn-l {
    color: #fff;
    background-color: #999999;
    margin-right: 8px;
  }

  .btn-r {
    color: #fff;
    background-color: #FD814A;
    margin-left: 8px;
  }

}

//=========
//==========
.popup-content {
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  padding: 30rpx;
  margin: -10px;
  //width: 80vw;

}

.popup-title {

  font-weight: 700;
  font-size: 18px;
  color: #333333;
  text-align: center;
  margin-bottom: 20rpx;

}

.section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 20rpx;
}

.section-wrapper__left {
  display: flex;
  align-items: center;
  position: relative;

  margin-right: 20rpx;

  > image {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: block;
  }
}

.section-wrapper__middle {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.6;
  flex: 1;

  .label-text {
    font-size: 14px;
    color: #333333;
  }

  .name {
    font-size: 14px;
    color: #333333;
  }

  .company-name {
    font-size: 14px;
    color: #333333;
  }

  .label-view {
    display: flex;
    margin-top: 2px;
    flex-wrap: wrap;


    .label-text {
      padding: 2px 8px;
      box-sizing: border-box;
      margin-right: 4px;
      border-radius: 4px;
      font-size: 9px;
      border: 1px solid #FFF1E2;
      color: #FD8301;
      background: #FFF1E2;
      margin-bottom: 4px;

      &:last-child {
        margin-right: 0
      }

      &:nth-child(-n +4) {
        margin-top: 0;
      }

      &:nth-child(4n) {
        margin-right: 0;
      }
    }

  }

}

.section-wrapper__right {
  align-self: stretch;
  display: flex;
  align-items: center;
}

.company {
  margin-top: 10px;
  line-height: 1.5;
  font-size: 12px;
  color: #333333;

}

.address {

  line-height: 1.5;
  font-size: 12px;
  color: #333333;

  .address-info {
    font-size: 12px;
    color: #333333;
  }
}

//==========
</style>
