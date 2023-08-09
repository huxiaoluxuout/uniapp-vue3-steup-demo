<template>
  <view class="flex-wrapper">
    <view class="flex-wrapper-item" @click.stop ="navigateTo(pagePath)">
<!--      @click="navigateTo('pages/equipments/equipments_details'+item.id)">-->

      <view class="flex-wrapper-item-img-wrapper">
        <view class="item-top">
          <image mode="aspectFill" class="img" :src="item.image"></image>
          <view class="dian-zan-wrapper" v-if="item.pv">
            <uni-icons type="eye" color="#fff" size="16"></uni-icons>
            <text>{{ item.pv }}</text>
          </view>
          <!--              <view class="mask-title-wrapper">
                          <text>{{ item.title }}</text>
                        </view>-->
          <image v-if="item.iconPlayer" class="icon__player" :src="baseImgURL+'/icon-play.png'"></image>

        </view>
        <view class="pr-2 pl-2 pb-2  item-bottom">
          <view class="pt-2 pb-2 font text-ellipsis">{{ item.title }}</view>

          <view class="section-wrapper" v-if="item?.user">
            <view class="section-wrapper__left">
              <image class="icon" :src="item?.user?.avatar"></image>
              <view class="left-txt-wrapper">
                <view class="left-txt-wrapper__nikname">{{ item?.user?.nickname }}</view>
<!--                <view class="left-txt-wrapper__time">{{ item?.createtime_text }}</view>-->
              </view>
            </view>
            <view class="section-wrapper__middle section-wrapper__middle-item"></view>
            <view class="section-wrapper__right"></view>
          </view>
        </view>
        <slot name="price">
          <view class="pr-1 pl-1 price" v-if="item.price">
            <text class="price-icon">￥</text>
            <text class="price-num">{{item.price}}</text>
            <slot name="pinyin"></slot>

          </view>
        </slot>

      </view>
      <view class="edit">
        <slot name="edit"></slot>
      </view>
    </view>

  </view>

</template>

<script setup>
import {navigateTo} from "@/utils/tools";
import {baseImgURL} from "@/http/request";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  pagePath: {
    type: String,
    default: ''
  },

})

</script>

<style scoped lang="scss">

.price{
  position: relative;
  margin-bottom: 5px;
  .price-icon{
    font-size: 12px;
    color: #FD5958;
  }
  .price-num{
    color: #FD5958;
    font-size: 18px;
    font-weight: bold;
  }
}

.flex-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex-wrapper-item {
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 30rpx;
  border-radius: 20rpx;
  position: relative;

}


.flex-wrapper-item-img-wrapper {
  width: 100%;
  border-radius: 20rpx 20rpx 0 0;

  .item-top {
    position: relative;
    width: 100%;
    border-radius: 20rpx 20rpx 0 0;

    .img {
      width: 100%;
      height: 400rpx;
      display: flex;
      border-radius: 20rpx 20rpx 0 0;
    }

    .dian-zan-wrapper {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      background-color: rgba(60, 60, 60, .4);
      padding: 0px 6px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8rpx;

      text {
        color: #fff;
        font-size: 12px;
        margin-left: 6px;
      }

      image {
        width: 30rpx;
        height: 30rpx;
        display: block;
        flex-shrink: 0;
        margin-right: 10rpx;
      }
    }

    .mask-title-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(60, 60, 60, .4);
      padding: 6px 4px;

      text {
        color: #fff;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        display: inline-block;
      }
    }

    .icon__player {
      width: 60rpx;
      height: 60rpx;
      display: block;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .item-bottom {

  }


}

.section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.section-wrapper__left {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  .icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    display: block;
    margin-right: 20rpx;
    flex-shrink: 0;
  }

  .left-txt-wrapper {
    line-height: 1.2;
    overflow: hidden;

    > .left-txt-wrapper__nikname {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      display: inline-block;
      font-size: 14px;
      color: #999999;
    }

    > .left-txt-wrapper__time {
      font-size: 12px;
      color: #919199;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      display: inline-block;
    }
  }

}

.section-wrapper__middle {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //border: 1px solid blue;
  flex: 1;
}

.section-wrapper__right {
  align-self: stretch;
  display: flex;
  align-items: center;
}

.edit {
  position: absolute;
  top: 5px;
  left: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: rgba(0,0,0,.4);
  border-radius: 50%;
  z-index: 200;
}
</style>
