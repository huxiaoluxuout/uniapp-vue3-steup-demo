<script setup>

</script>

<template>
  <view class="loading">

  </view>
</template>
<style>
.loading {
  width: 100%;
  height: 100%;
  scale: .5;
  border-radius: 50%;
  border: 4px solid #999;
  border-top-color: #fff;
  animation: loading 0.8s infinite linear;
}
@keyframes loading {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/*.loading {
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
  //scale: 2;
}

.loading::before {
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 100%;
  color: rgba(0, 0, 0, .4);
  box-shadow: 0 -10px rgba(0,0,0,.9),    !* top *!
  10px 0px,                  !* right *!
  0 10px,                    !* bottom *!
  -10px 0 rgba(0,0,0,.7),    !* left *!

  -7px -7px rgba(0,0,0,.8),  !* left-top *!
  7px -7px rgba(0,0,0,1),    !* right-top *!
  7px 7px,                   !* right-bottom *!
  -7px 7px;                  !* left-bottom *!
  animation: spin 1s steps(8) infinite;
  !* center *!
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
}
@keyframes spin{
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}*/
</style>


