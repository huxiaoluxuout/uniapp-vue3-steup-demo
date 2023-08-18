<template>
  <view class="zshu-navbar" :style="{'--navbar-height':zshuBavbarHeight+'px'}">
    <view class="zshu-navbar-wrap" :style="navbarStyle_">
      <view class="navbar-content__container">
        <view class="zshu-navbar-container" :style="zahuNavbarContainerStyle">
          <view class="zshu-navbar-container__left" v-if="configNavBar_.isTabBarPage">
            <slot name="left"></slot>
          </view>
          <view class="zshu-navbar-container__left" v-else>

            <template v-if="!showHomeIcon&&pageHierarchy>1">
              <slot name="left_back_icon">
                <uni-icons type="back" :color="iconColor" size="24" @click="leftIconClick"></uni-icons>
              </slot>
            </template>
            <template v-else-if="showHomeIcon||pageHierarchy===1">
              <slot name="left_back_icon">
                <uni-icons type="home-filled" :color="iconColor" size="24" @click="leftIconClick"></uni-icons>
              </slot>
            </template>

          </view>

          <view class="zshu-navbar-container__center">
            <view class="zshu-navbar-content-title">
              <view class="title">{{ configNavBar_.title }}</view>
<!--              <view class="title" :style="{color:iconColor}">{{ configNavBar_.title }}</view>-->
              <slot name="center"></slot>
            </view>
          </view>
          <view class="zshu-navbar-container__right" v-if="configNavBar_.right">
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
import {filterPath} from "@/utils/tools";
import pagesConfig from "@/pages.json";

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
  backgroundImage: {
    type: String,
    default: ''
  },
  // 显示跳转到首页的icon
  showHomeIcon: {
    type: Boolean,
    default: false
  },
})


const {tabBar: {list: tabBarPages}} = pagesConfig
const pages = getCurrentPages();
const pagePath = pages[pages.length - 1]['route'];

const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(pagePath));

const configNavBar_ = computed(() => {
  return Object.assign({
    title: props.title,//标题名称
    isTabBarPage: isTabBarPage,
    right: false,
  }, props.configNavBar);
})


const menuButtonWidth = ref(0), menuButtonTop = ref(10),
    menuButtonHeight = ref(24), statusBarHeight = ref(0);
const pageHierarchy = ref(1), zshuBavbarHeight = ref(44);

const zahuNavbarContainerStyle = computed(() => {
  return {
    minHeight: menuButtonHeight.value + 'px',
    right: menuButtonWidth.value + 'px',
    top: menuButtonTop.value + statusBarHeight.value + 'px',
  }
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

  pageHierarchy.value = pages.length;
});

// navbar 高度
const emits = defineEmits(['update:navbarHeight'])
const zshuNavbarTempViewStyle = computed(() => {
  zshuBavbarHeight.value = (menuButtonHeight.value + menuButtonTop.value + statusBarHeight.value + 12)
  emits('update:navbarHeight', zshuBavbarHeight.value)
  return {
    height: zshuBavbarHeight.value + 'px'
  }
})

// navbar背景色
const bgColor = ref('transparent')
const navbarStyle_ = computed(() => {
  return Object.assign({
    ...zshuNavbarTempViewStyle.value,
    background: bgColor.value,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
  }, props.navbarStyle)
})

//

/*const defaultNavbarStyle = {
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  background: bgColor.value,
};
const navbarStyle_ = computed(() => {

  return {
    ...defaultNavbarStyle,
    ...zshuNavbarTempViewStyle.value,
    ...props.navbarStyle
  }
})*/
//
const iconColor = computed(() => {
  return calculateIconColor(props.navbarStyle)
})
const calculateIconColor = (navbarStyle) => {
  const cssKeyValuePairs = [
    {key: 'background', keyword: /linear-gradient|url/},
    {key: 'backgroundImage', keyword: /url/},
    // 添加更多的属性和匹配关键字对
    // { key: 'anotherProperty', keyword: /anotherKeyword/ },
  ];

  for (const {key, keyword} of cssKeyValuePairs) {

    if (key in navbarStyle) {
      const cssValue = navbarStyle[key];
      console.log(key,cssValue)

      if (keyword.test(cssValue)) {
        return '#fff';
      }
    }
  }

  return '#333';
};

const ROUTE_HOME = '/pages/index/index';

const leftIconClick = () => {
  try {
    if (pageHierarchy.value > 1) {
      uni.navigateBack({delta: 1});
    } else {
      navigateToHome();
    }
  } catch (error) {
    console.error('Error while handling leftIconClick:', error);
  }
};
const navigateToHome = () => {
  try {
    uni.switchTab({url: ROUTE_HOME});
  } catch (error) {
    console.error('Error while navigating to home:', error);
  }
};

// 页面上下滚动
const handlePageScroll = (e) => {
  bgColor.value = `rgba(255,255,255,${Math.ceil(e.scrollTop / zshuBavbarHeight.value)})`
};
//


defineExpose({
  handlePageScroll
})


</script>
<style scoped lang="scss">
.zshu-navbar {
  box-sizing: border-box;
}

.zshu-navbar-wrap {
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


.zshu-navbar-container {
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
}

.zshu-navbar-container__left:not(:empty) {
  min-width: 1em;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 2px;
}


.zshu-navbar-container__center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.zshu-navbar-container__right {
  min-width: 1em;
  display: flex;
  justify-content: flex-end;
}

.zshu-navbar-content-title {
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
  //color: #333333;
  mix-blend-mode: hard-light;

}


</style>
