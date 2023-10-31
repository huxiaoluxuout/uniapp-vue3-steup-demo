<template>
  <view>
    <button @click="btn">btn</button>

    AAA
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque eos error fuga! Adipisci corporis dolor
    eius, enim exercitationem inventore ipsam officiis omnis
    quaerat voluptatibus. Aliquam aliquid animi at consectetur cupiditate esse est expedita harum, illum ipsa nesciunt
    non numquam officiis porro provident quasi qui quis, quo
    repellendus repudiandae? Aperiam aut exercitationem inventore nemo nisi quis quo? Accusantium aut dolorem, ea, est
    excepturi iure laboriosam nostrum numquam obcaecati optio
    quos velit voluptas voluptates. Fugiat maiores molestiae quae quibusdam. Commodi cumque facere fuga illum omnis
    perspiciatis vel! Consequatur harum labore odio totam?
    Aspernatur dolore dolores hic itaque, nam placeat soluta voluptatibus. Accusamus enim error eum explicabo harum hic
    nam nulla quos voluptate! Cupiditate ea eveniet facere
    <button @click="btn">btn</button>
    facilis illum, ipsum laudantium minima odit porro quibusdam rerum saepe sit suscipit! A amet asperiores beatae
    corporis cupiditate delectus dignissimos eius et fuga hic id
    impedit ipsa libero nam, non nostrum nulla praesentium quasi quod saepe sed sint voluptas. Accusamus asperiores at
    aut culpa debitis dicta eius enim eum excepturi explicabo
    harum id labore nisi nobis perferendis possimus quibusdam quidem quisquam recusandae sed sint ullam voluptatem,
    voluptatibus! Facere, facilis, id! Ad amet eos, est, in iusto
    nisi non nostrum odio pariatur placeat provident reiciendis voluptates.
    ZZZ

    <zshu-footer-container-inner></zshu-footer-container-inner>

  </view>
</template>

<script setup>


import {onLoad} from "@dcloudio/uni-app";
import {getPageEvent, getPageInfo} from "@/utils/tools";
import bus from "@/utils/bus";


let eventId, pageInfo
onLoad((options) => {
  eventId = options.eventId

  // #ifdef WEB || APP
  console.log(options.eventId)
  getPageEvent(options.eventId, (result) => {
    console.log(result)
    pageInfo = result
  })
  // #endif


  // #ifdef MP
  getPageInfo((resPageInfo) => {
    pageInfo = resPageInfo
  })
  // #endif
})

const btn = () => {

  // #ifdef APP

  // #endif

  // #ifdef WEB
  console.log('WEB', pageInfo);
  // #endif

  // #ifdef MP
  console.log('MP', pageInfo);
  // #endif
  bus.emit('sayHi', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈');

}
// 定义一个打招呼的方法
const sayHi = (msg = 'Hello World!') => {
  console.log('000000000',msg);
}

// 启用监听
bus.on('sayHi', sayHi);

</script>

<style>

</style>
