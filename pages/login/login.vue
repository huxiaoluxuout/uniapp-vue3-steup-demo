<template>
  <view class="login-wrapper">

    <view class="avatar-wrapper">
      <!-- #ifdef MP-WEIXIN-->
      <button class="open-type-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar($event)"/>
      <image class="user-avatar" :src="avatarPath" mode="aspectFill"></image>
      <!-- #endif-->

      <!--#ifdef WEB -->
      <zshu-upload-image
          isHiddenIcon
          v-model:srcUrl="imgUrl"
          limit="2" columns-limit="1"
          gap="0px"
          width="80px"
      ></zshu-upload-image>
      <!--#endif-->

    </view>

    <input v-model="nickName" @blur="getNickName($event)"
           type="nickname" class="nickname-input"
           maxlength="14"
           placeholder-style="color: rgba(0,0,0,0.26);font-size: 12px;"
           placeholder="请输入昵称"
    />

    <button class="btn-phone" @getphonenumber="getphonenumber($event)" open-type="getPhoneNumber">获取手机号并登录</button>


  </view>
</template>

<script setup>

import store from '@/store/index.js';


import {ref, watch} from "vue";
import {getApiPhone, registerUser} from "@/Http/apis/login";
import {getLoginCode, uploadImages} from "@/utils/tools";


console.log(store.state.inviteId);


const avatarPath = ref('https://z1.ax1x.com/2023/09/16/pPfel3d.png')
const imgUrl=ref([{url:avatarPath.value}])
watch(()=>imgUrl.value[0].url,(newValUrl)=>{
  console.log('newValUrl',newValUrl)
  avatarPath.value = newValUrl
})

// 临时头像地址转换成真实地址
const onChooseAvatar = (e) => {
  const {avatarUrl} = e.detail
  uploadImages([avatarUrl]).then(res => {
    avatarPath.value = res[0].data?.fullurl
  })
}


// 获取昵称
const nickName = ref('')
const getNickName = (e) => {
  nickName.value = e.detail.value
}

// 向后端换取手机号
const getphonenumber = (e) => {
  const {code} = e.detail
  getApiPhone({code}).then(res => {
    const {phoneNumber} = res.data
    loginIn(phoneNumber)
  })
}

const loginIn = async (phoneNumber) => {
  const {code} = await getLoginCode()
  if (!nickName.value) {
    console.log('昵称必填')
    return
  }

  registerUser({
    code,
    mobile: phoneNumber,
    nickname: nickName.value,
    avatar: avatarPath.value,

  }).then(res => {
    // 注册成功后续处理

  })
}


</script>

<style scoped>
.login-wrapper {
  padding-top: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;

}


.open-type-btn {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.open-type-btn:after {
  border: none;
}

.user-avatar {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}

.nickname-input {
  border: 1px solid #eeeeee;
  padding: 0 10px;
  box-sizing: border-box;
  width: 60%;
  height: 40px;
  margin-top: 100rpx;
}

.btn-phone {
  width: 70%;
  font-size: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
  color: #fff;
  background-color: #4953ef;
  margin-top: 100rpx;

}

.btn-phone:after {
  border: none;
}

</style>

