<template>
  <view class="bg-white">
    <uni-forms ref="formRef" :rules="rules" :model="formData" label-position="top">

      <uni-forms-item label-width="110px" required :name="viewArr.find(i=>i.name==='avatar').name" :label="viewArr.find(i=>i.name==='avatar').label">
        <zshu-upload-images-videos :row-limit="1" v-model:filePaths="formData.avatar"></zshu-upload-images-videos>
      </uni-forms-item>
      <uni-forms-item label-width="110px" required :name="viewArr.find(i=>i.name==='displayImage').name" :label="viewArr.find(i=>i.name==='displayImage').label">
        <zshu-upload-images-videos :row-limit="3" v-model:filePaths="formData.displayImage"></zshu-upload-images-videos>
      </uni-forms-item>
      <uni-forms-item label-width="110px" required :name="viewArr.find(i=>i.name==='businessLicence').name" :label="viewArr.find(i=>i.name==='businessLicence').label">
        <zshu-upload-images-videos :row-limit="1" v-model:filePaths="formData.businessLicence"></zshu-upload-images-videos>
      </uni-forms-item>
      <uni-forms-item label-width="110px" :name="viewArr.find(i=>i.name==='factoryName').name" :label="viewArr.find(i=>i.name==='factoryName').label" required>
        <uni-easyinput v-model="formData.factoryName" :placeholder="viewArr.find(i=>i.name==='factoryName').placeholder"/>
      </uni-forms-item>
      <uni-forms-item label-width="110px" required :label="viewArr.find(i=>i.name==='aboutTheFactory').label" :name="viewArr.find(i=>i.name==='aboutTheFactory').name">
        <uni-easyinput auto-height v-model="formData.aboutTheFactory" :placeholder="viewArr.find(i=>i.name==='aboutTheFactory').placeholder"/>
      </uni-forms-item>

      <uni-forms-item label-width="210px" required :label="viewArr.find(i=>i.name==='factoryContacts').label" :name="viewArr.find(i=>i.name==='factoryContacts').name">
        <uni-easyinput auto-height v-model="formData.factoryContacts" :placeholder="viewArr.find(i=>i.name==='factoryContacts').placeholder"/>
      </uni-forms-item>
      <uni-forms-item label-width="110px" required :label="viewArr.find(i=>i.name==='contactNumber').label" :name="viewArr.find(i=>i.name==='contactNumber').name">
        <uni-easyinput type="number" auto-height v-model="formData.contactNumber" :placeholder="viewArr.find(i=>i.name==='contactNumber').placeholder"/>
      </uni-forms-item>

      <view style="position:relative;">
        <uni-forms-item label-width="110px" required :label="viewArr.find(i=>i.name==='addressDetails').label" :name="viewArr.find(i=>i.name==='addressDetails').name">
          <uni-easyinput type="textarea" auto-height v-model="formData.addressDetails" suffixIcon="location"
                         @iconClick="getAddressDetails"
                         :placeholder="viewArr.find(i=>i.name==='addressDetails').placeholder"/>
        </uni-forms-item>

        <view class="mask" @click="getAddressDetails"></view>
      </view>

    </uni-forms>
    <zshu-footer-container>
      <template v-slot>
        <zshu-footer-inner :buttonList="buttonList" @click="((e)=>submit(formRef))"/>
      </template>
    </zshu-footer-container>
  </view>


</template>
<script>
export default {
  options: {styleIsolation: 'shared'}
}
</script>
<script setup>

import {defineEmits, defineExpose, getCurrentInstance, reactive, ref} from "vue"

import {getChooseLocation} from "@/utils/tools";


const buttonList = reactive([{id: 1, text: '下一步', flex: 2, type: 'submit'}])
const props = defineProps({
  is_factory: {
    default: 0
  },
  is_scheme: {
    default: 0
  },
  is_agent: {
    default: 0
  },
  viewArr: {
    type: Array,
    default: () => {
      return [
        {
          name: 'avatar',
          label: '头像',
          placeholder: '头像',
          errorMessage: '头像不能为空',
        },
        {
          name: 'displayImage',
          label: '展示图',
          placeholder: '头像',
          errorMessage: '展示图不能为空',
        },
        {
          name: 'businessLicence',
          label: '上传营业执照',
          placeholder: '头像',
          errorMessage: '营业执照不能为空',
        },
        {
          name: 'factoryName',
          label: '名称',
          placeholder: '请输入您工厂的名称',
          errorMessage: '工厂的名称不能为空',
        },
        {
          name: 'aboutTheFactory',
          label: '简介',
          placeholder: '请输入您工厂的简介',
          errorMessage: '工厂的简介不能为空',
        },
        {
          name: 'factoryContacts',
          label: '联系人',
          placeholder: '请输入您工厂的联系人',
          errorMessage: '工厂的联系人不能为空',
        },
        {
          name: 'contactNumber',
          label: '联系电话',
          placeholder: '请输入您工厂的联系电话',
          errorMessage: '工厂的联系电话不能为空',
        },
        {
          name: 'addressDetails',
          label: '详细地址',
          placeholder: '请选择您工厂的详细地址',
          errorMessage: '工厂的详细地址不能为空',
        },

      ]
    }
  }

})

const filePaths = ref([])
// 表单数据
const formData = reactive({
  avatar: [],
  displayImage: [],
  businessLicence: [],

  factoryName: '',
  aboutTheFactory: '',
  factoryContacts: '',
  contactNumber: '',
  addressDetails: '',

  latitude: '',
  longitude: ''
})
// 校验规则
const rules = reactive({
  avatar: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'avatar').errorMessage
    }]
  },
  displayImage: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'displayImage').errorMessage
    }]
  },
  businessLicence: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'businessLicence').errorMessage
    }]
  },

  factoryName: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'factoryName').errorMessage
    }]
  },
  aboutTheFactory: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'aboutTheFactory').errorMessage
    }]
  },
  factoryContacts: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'factoryContacts').errorMessage
    }]
  },
  contactNumber: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'contactNumber').errorMessage
    }]
  },
  addressDetails: {
    rules: [{
      required: true,
      errorMessage: props.viewArr.find(i => i.name === 'addressDetails').errorMessage
    }]
  },
})
let latitude, longitude

const getAddressDetails = () => {
  getChooseLocation().then(res => {
    formData.addressDetails = res.address
    latitude = res.latitude
    longitude = res.longitude
  })
}

const formRef = ref(null)
const emits = defineEmits('submit')
const tabBar = ref(false)
const submitType = ref(false)

const submit = async (ref, callback, data) => {
  // console.log('ref', ref)

  await ref.validate((valid, fields) => {
    if (!valid) {
      // 验证成功
      console.log('验证成功', fields, latitude, longitude)
      if (data) {
        submitType.value = true
      } else {
        Object.assign(fields, {
          latitude, longitude,
          is_factory: props.is_factory,
          is_scheme: props.is_scheme,
          is_agent: props.is_agent
        })
        emits('submit', fields)
      }

    } else {
      if (data) {
        submitType.value = false
      }
    }
    callback && callback()
  })

}
const instance = getCurrentInstance();

const testSubmit = (callback, data) => {
  tabBar.value = true
  const ref = instance.refs.formRef
  submit(ref, callback, data)

}
const setButtonList = (data) => {
  if (data) {
    buttonList[0].text = '提交'
  } else {
    buttonList[0].text = '下一步'

  }
}
defineExpose({
  testSubmit,
  setButtonList,
  submitType,
})

</script>

<style scoped lang="scss">
.mask {
  z-index: 20;
  position: absolute;
  height: 35px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
}

::v-deep .is-textarea {
  box-sizing: border-box;
  min-height: 37px;
}

::v-deep .uni-easyinput__content-textarea {
  min-height: 100%;
  box-sizing: border-box;
  line-height: 1.3;
}
</style>
