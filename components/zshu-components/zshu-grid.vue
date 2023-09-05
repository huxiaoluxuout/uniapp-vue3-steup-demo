<template>
  <view class="root-zshu-grid">

    <zshu-flex-container :cssVar="`--num-columns:${list?.length}`" :dataList="list">
      <template #default="{item}">
        <view class="zshu-grid__container" @click="clickHandler(item?.id)">

          <view class="container__up">

            <image class="up-icon" :src="item?.iconUrl"/>

          </view>
          <view class="container__down">

            <text class="down-text">{{ item?.text }}</text>

          </view>
          <!--分享-->
          <button v-if="item?.isShare" class="share" open-type="share" @click.stop="()=>{}"></button>

        </view>
      </template>
    </zshu-flex-container>

  </view>

</template>

<script setup>


import ZshuFlexContainer from "@/components/zshu-components/zshu-layout-flex-container.vue";

const emits = defineEmits(['update:gridId', 'clickGrid',])

const props = defineProps({

  list: {

    type: Array,
    default: () => ([
      {
        id: 1,
        text: '我的收藏',
        iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',
      }, {
        id: 2,
        text: '我的收藏',
        iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-2.png',
      }, {
        id: 3,
        text: '我的收藏',
        iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-3.png',
      }, {
        id: 4,
        text: '我的收藏',
        iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',
      }
    ])
  }

})


const clickHandler = (ID) => {
  console.log('clickHandler', ID)
  emits('update:gridId', ID)
  emits('clickGrid', ID)
}
</script>


<style scoped lang="scss">

.root-zshu-grid {
  width: 100%;
  display: flex;
  gap: 20rpx;
  background-color: #fff;

}

.zshu-grid__container {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  align-items: center;
  padding: 8rpx;
  box-sizing: border-box;
  position: relative;

  .container__up {


    .up-icon {
      width: 30px;
      height: 30px;
      display: block;
    }
  }

  .container__down {
    display: inline-flex;

    .down-text {
      font-size: 12px;
      color: #3a3a3a;
      text-align: center;
    }

  }
}

.share {
  background-color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;

  &:after {
    border: none;
  }
}

</style>

