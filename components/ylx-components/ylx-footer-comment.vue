<template>
  <view class="ylx-footer-comment">
    <view class="ylx-footer-comment__content">
      <view class="footer-comment-wrap" >
        <view class="ylx-comment-footer-input-wrapper">
          <view class="textarea-wrap" >
            <input
                shape="circle"
                placeholder-class="garyText"
                autoHeight
                :disabled="disabled"
                border="none"
                :placeholder="placeholder"
                v-model.trim="modelVal"
                confirm-type="send"
                @confirm="senMsg"
                @focus="inputBindFocus"
                @blur="inputBindBlur"
                :focus="focus"
            >
            </input>
          </view>
          <view class="send" v-if="focus" @click="senMsg">
            <text>发送</text>
          </view>

          <view class="footer-comment-right" v-else>
            <view class="footer-comment-right-item" v-for="(item,index) in iconList" :key="index" @click="iconClick(item,index)">
              <image :src="item.isSelect?item.srcOn:item.src"/>
              <text>{{ item.num }}</text>
              <button v-if="xcxShare&&index===2" class="xcx-share" open-type="share"></button>
            </view>
          </view>

        </view>
      </view>
    </view>

  </view>
</template>

<script>
import {baseImgURL} from "@/http/request";

export default {
  name: "ylx-footer-comment",
  props: {
    id: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      iconList: [
        {
          id: 1,
          src: baseImgURL+'/like.png',
          srcOn: baseImgURL+'/like-on.png',
          num: 1,
          isSelect: true
        },
        {
          id: 2,
          src: baseImgURL+'/collection.png',
          srcOn: baseImgURL+'/collection-on.png',
          num: 0,
          isSelect: false
        },
        {
          id: 3,
          src: baseImgURL+'/share.png',
          srcOn: baseImgURL+'/share.png',
          num: 0,
          isSelect: false
        },
      ],
      // 评论的内容
      commentValue: '',
      url_id: 1,
      accept: 'image',
      // 小程序分享
      xcxShare: true,
      placeholder: "请输入您的评论",
      disabled: false,
      modelVal: '',
      inputShow: false,
      focus: false,
      isReply: false,
      bottomVal:'',
      comment_id:'',//评论id
    }
  },
  created() {
    // console.log('组件创建后，但还未挂载')
    uni.$on('changeFocus',this.updateFocus)

  },
  beforeDestroy(){
    // console.log('销毁前')
    uni.$off('changeFocus',this.updateFocus)
  },
  methods: {
    updateFocus(item){
      console.log('updateFocus',item)
      console.log('updateFocus',item.user.nickname)
      this.placeholder='回复：'+item.user.nickname
      this.comment_id=item.id
      this.focus=true
      this.isReply=true
    },
    inputBindFocus(e) {
      this.focus=true
    },

    inputBindBlur() {
      if (this.modelVal.length === 0) {
        this.focus=false
        this.placeholder='请输入您的评论'
        this.isReply=false

      }
    },

    //评论
    senMsg() {
      console.log('senMsg')
      this.$emit('senMsg', {modelVal:this.modelVal,id:this.comment_id,isReply:this.isReply})
      this.modelVal=''
      this.comment_id=''
      this.focus=false
      this.placeholder='请输入您的评论'
      this.isReply=false


    },

    //收藏
    //点赞
    iconClick(item, index) {
      this.$emit('click', item, (isSelect) => {
        console.log({isSelect})
        item.isSelect = isSelect
        /*// 转发
        if (index === 2) {
          item.num = isSelect ? item.num + 1 : item.num + 1

        } else {
          item.num = isSelect ? item.num + 1 : item.num - 1
        }*/
        if (index !== 2) {
          item.num = isSelect ? item.num + 1 : item.num - 1

        }
      })

    },
  },

}
</script>

<style lang="scss" scoped>
$page-padding: 30rpx;
.custom-class{

}
.ylx-footer-comment {

}

.ylx-footer-comment__content {
  position: fixed;
  left: 0;
  width: 100vw;
  bottom: var(--window-bottom);
  z-index: 20;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.ylx-footer-comment__content-temp {
  height: calc(100rpx + 1rpx);
  width: 100%;
}

.footer-comment-wrap {
  border-top: 1px solid #ededed;
  box-sizing: border-box;
  z-index: 20;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100rpx;


  .footer-comment-input {
    height: 70rpx;
    line-height: 70rpx;
    color: #ABABAB;
    z-index: 40;
    flex: 3;
    padding-left: 30rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    background-color: #F9F9FC;
    border-radius: 100px;
  }

  .footer-comment-right {
    z-index: 40;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-around;
    padding-right: 20rpx;
    flex: 1;

    .footer-comment-right-item {
      display: flex;
      align-items: center;
      padding: 0 10rpx;
      position: relative;

      image {
        width: 50rpx;
        height: 50rpx;
        //display: block;
        margin-right: 20rpx;
      }

      text {
        font-size: 12px;
        color: #919199;
        margin-top: 6rpx;
        text-align: center;
      }

      .xcx-share {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: transparent;
        z-index: 10;
      }

      .xcx-share:after {
        border: none;
      }

    }
  }
}

.ylx-comment-footer-input-wrapper {
  display: flex;
  flex: 1;
  padding: 20rpx;
  $bgc: #f7f8fa;

  .textarea-wrap {
    flex: 1;
    background: $bgc;
    border-radius: 100px;
    padding: 10rpx 20rpx;
    //min-height: 50rpx;
    > view {
      background: $bgc;
      padding: 0;
      font-size: 14px;
    }

    .disabled {
      border: 1px solid #DDD;
      background-color: #F5F5F5;
      color: #ACA899;
    }

    .garyText {
      color: #ABABAB;
      font-size: 14px;
    }
  }

  .send {
    display: flex;
    color: red;
    font-size: 14px;
    width: 3em;
    margin-left: 20rpx;
    align-items: center;
    justify-content: center;

  }
}
.message-input {
  flex-shrink: 0;
  width: 100%;
  position: absolute; // input 所在盒子设置绝对定位
  left: 0;
  bottom: 0; // 默认 0
  z-index: 199;
}



</style>

