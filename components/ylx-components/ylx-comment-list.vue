<template>
  <view class="comment-item border__bottom" :class="{inner:isInner,'border__top':isInner}">
    <view class="section-wrapper">
      <view class="section-wrapper__left">
        <image class="icon" :class="{'avatar-inner':isInner}" :src="item.user_avatar"></image>
        <view class="left-txt-wrapper">
          <view class="left-txt-wrapper__nikname">{{ item?.user_name }}</view>
          <view class="left-txt-wrapper__time">{{ item?.create_time }}</view>
        </view>
      </view>
      <view class="section-wrapper__middle section-wrapper__middle-item"></view>
      <view class="section-wrapper__right" @click="reply(item)" v-if="!isInner">回复</view>
    </view>
    <view class="txt-content-wrapper">{{ item?.content }}</view>
    <view v-if="isInner" :class="{'get-more':isInner}">
      <text @click.stop="getMore(item)">查看更多</text>
    </view>

    <ylx-comment-list v-for="(iitem,index) in item.below"
                      :item="iitem" :key="iitem.id"
                      :isInner="true"
                      :Index="Index"
                      :index="index"

    ></ylx-comment-list>

  </view>

</template>

<script>

export default {}
</script>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  Index: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: 0
  },
  isInner: {
    type: Boolean,
    default: false
  },
  moreLength: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
});


const emits = defineEmits(['replyContent'])

const reply = (item) => {
  emits('replyContent', item)
}
// 查看更多
const getMore = (item) => {
  uni.$emit('getComments', {item, Index: props.Index})
}


</script>
<style lang="scss" scoped>
$page-padding: 20rpx;
::v-deep ylx-comment-list:last-of-type .get-more {
  display: block;
}

//底部边框
.border__bottom {
  position: relative
}

.border__bottom::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: -10rpx;
  left: 0;
  background-color: #F2F2F7;
}

.border__top::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  top: 5px;
  left: 0;
  background-color: #F2F2F7;
}

.inner {
  //margin-left: 40rpx;
  //background-color: #919199;
  margin-left: 40rpx;
  background: #F5F5F7;
  margin-top: 20rpx;
  border-radius: 16rpx;
  padding-left: 14rpx;
}

.comment-item {
  //border-bottom: 1px solid #ededed;
  padding-top: 10rpx;
  padding-bottom: 10rpx;

}

.get-more {
  font-size: 10px;
  color: #4a4848;
  text-align: right;
  display: none;
}


.section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10rpx;
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

  .avatar-inner {
    width: 50rpx;
    height: 50rpx;
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
      color: #4a4848;
    }

    > .left-txt-wrapper__time {
      font-size: 11px;
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
  font-size: 12px;
  color: #4a4848;
  flex-shrink: 0;
}

.txt-content-wrapper {
  font-size: 14px;
  color: #4e4e4e;
  padding-left: 80rpx;
  box-sizing: border-box;
  word-break: break-all;
}


</style>
