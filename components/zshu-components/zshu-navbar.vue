<template>
  <view class="ylx-navbar" :style="{'--navbar-height':zshuBavbarHeight+'px'}">
    <view class="ylx-navbar-wrap" :style="zshuNavbarStyle">
      <view class="navbar-content__container">
        <view class="ylx-navbar-container" :style="zahuNavbarContainerStyle">
          <view class="ylx-navbar-container__left" v-if="configNavBar_.isTabBarPage">
            <slot name="left"></slot>
          </view>
          <view class="ylx-navbar-container__left" v-else>
            <template v-if="isTabBarPage">
              <slot name="left_back_home"></slot>
            </template>
            <template v-else>
              <template v-if="!showHomeIcon&&pageHierarchy>1">
                <slot name="left_back">
                  <uni-icons type="back" :color="iconColor" size="24" @click="leftIconClick"></uni-icons>
                </slot>
              </template>
              <template v-else-if="showHomeIcon||pageHierarchy===1">
                <slot name="left_back">
                  <uni-icons type="home-filled" :color="iconColor" size="24" @click="leftIconClick"></uni-icons>
                </slot>
              </template>
            </template>
          </view>

          <view class="ylx-navbar-container__center">
            <view class="ylx-navbar-content-title">
              <view class="title" :style="{color:iconColor}">{{ configNavBar_.title }}</view>
              <slot name="center"></slot>
            </view>
          </view>
          <view class="ylx-navbar-container__right" v-if="configNavBar_.right">
            <slot name="right"></slot>
          </view>
        </view>
      </view>
    </view>
    <view class="temp-view" :style="zshuNavbarTempViewStyle"></view>
  </view>
</template>
<script setup>
import {computed, defineExpose, onMounted, ref} from "vue"


const props = defineProps({
  configNavBar: {
    type: Object,
    default: () => {
      return {}
    }
  },
  navbarStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: 'transparent'
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  opacity: {
    type: [String, Number],
    default: 0
  },

  isTabBarPage: {
    type: Boolean,
    default: false
  },
  // 显示跳转首页icon
  showHomeIcon: {
    type: Boolean,
    default: false
  },
})
const configNavBar_ = computed(() => {
  return Object.assign({
    title: props.title,//标题名称
    isTabBarPage: props.isTabBarPage,
    right: false,
  }, props.configNavBar);
})


let menuButtonWidth = ref(0), menuButtonTop = ref(10),
    menuButtonHeight = ref(20), statusBarHeight = ref(0);
let pageHierarchy = ref(1), zshuBavbarHeight = ref(44);
// navbar 高度
const emits = defineEmits(['update:navbarHeight', 'update:bgColor', 'update:opacity'])
const zshuNavbarTempViewStyle = computed(() => {
  zshuBavbarHeight.value = (menuButtonHeight.value + menuButtonTop.value + statusBarHeight.value + 12)
  emits('update:navbarHeight', zshuBavbarHeight.value)
  return {
    height: zshuBavbarHeight.value + 'px'
  }
})

// 页面上下滚动
const handlePageScroll = (e) => {
  emits('update:bgColor', `rgba(255,255,255,${Math.ceil(e.scrollTop / zshuBavbarHeight.value)})`)
  emits('update:opacity', `${Math.ceil(e.scrollTop / zshuBavbarHeight.value)}`)
};
//

const iconColor = computed(() => {
  // console.log('props.navbarStyle',props.navbarStyle)
  const cssKey = {background: 'linear-gradient', backgroundImage: 'url',}
  if (!!Object.keys(props.navbarStyle).length) {
    for (const navbarStyleKey in props.navbarStyle) {
      for (const cssKeyKey in cssKey) {
        if (navbarStyleKey === cssKeyKey) {
          return props.navbarStyle[navbarStyleKey].indexOf(cssKey[cssKeyKey]) !== -1 ? '#fff' : '#333'
        }
      }
    }
  } else {
    return '#333'
  }
})
const zahuNavbarContainerStyle = computed(() => {
  return {
    minHeight: menuButtonHeight.value + 'px',
    right: menuButtonWidth.value + 'px',
    top: menuButtonTop.value + statusBarHeight.value + 'px',
  }
})
// navbar背景色
const zshuNavbarStyle = computed(() => {
  return Object.assign({
    ...zshuNavbarTempViewStyle.value,
    background: props.bgColor,
    backgroundPosition: 'top',
    backgroundSize: 'cover'
  }, props.navbarStyle)
})
onMounted(() => {
  // #ifdef MP-WEIXIN || MP-ALIPAY
  const menuButtonInfoALI = uni.getMenuButtonBoundingClientRect();
  menuButtonTop.value = Math.ceil(menuButtonInfoALI.top);
  menuButtonHeight.value = Math.ceil(menuButtonInfoALI.height);
  menuButtonWidth.value = Math.ceil(menuButtonInfoALI.width);
  // #endif
  // #ifdef APP-PLUS
  statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
  // #endif
  const pages = getCurrentPages();
  pageHierarchy.value = pages.length;
});

const leftIconClick = () => {
  console.log('pageHierarchy.value', pageHierarchy.value)
  if (pageHierarchy.value > 1) {
    uni.navigateBack({delta: 1})
  } else {
    uni.switchTab({url: '/pages/index/index'})
  }
}
defineExpose({
  handlePageScroll
})
</script>
<style scoped lang="scss">
.ylx-navbar {
  box-sizing: border-box;
}

.ylx-navbar-wrap {
  position: fixed;
  top: var(--window-top);
  left: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}

.temp-view {
  width: 100%;
}

.navbar-content__container {
  position: relative;
  width: 100%;
  height: 100%;
}


.ylx-navbar-container {
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
}

.ylx-navbar-container__left:not(:empty) {
  min-width: 1em;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 2px;
}


.ylx-navbar-container__center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.ylx-navbar-container__right {
  min-width: 1em;
  display: flex;
  justify-content: flex-end;
}

.ylx-navbar-content-title {
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  flex: 1;
  //justify-content: center;

}

.title {
  flex-shrink: 0;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

}

.ellipsis-double {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2
}

</style>
