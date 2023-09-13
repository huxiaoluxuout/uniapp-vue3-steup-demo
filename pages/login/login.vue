<template>
  <view class="login-wrapper">

    <view class="avatar-wrapper">
      <button class="open-type-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar($event)"/>
      <image class="user-avatar" :src="avatarPath" mode="aspectFill"></image>
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


import {ref} from "vue";
import {getApiPhone, registerUser} from "@/http/apis/login";
import {getLoginCode, uploadImages} from "@/utils/tools";



console.log(store.state.inviteId);



const avatarPath = ref('https://xcx.jxgxsmt.com/static/images/defat.png')

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
  if(!nickName.value){
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
  margin-top: 100px;
}

.avatar-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  margin: 50px auto;
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
  margin: 50px auto;
  height: 40px;
}

.btn-phone {
  width: 70%;
  font-size: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
  color: #fff;
  background-color: #4953ef;
}

.btn-phone:after {
  border: none;
}

</style>

