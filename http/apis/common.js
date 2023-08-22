import {request} from '@/http/request'
// 按层级返回省市区
export const getAllAreaList = (data) => request({url: '/api/common/getAllAreaList',method: 'post',data})

// 上传文件
export const uploadFile  = '/api/common/upload'
// export const uploadFile  = (data) => request({url: '/api/common/upload',method: 'post',data})

// 获取分类列表
export const getCategoryList = (data) => request({url: '/api/goods/getCategoryList',method: 'post',data})

// 获取品牌列表
export const getBrandList = (data) => request({url: '/api/goods/getBrandList',method: 'post',data})

// 获取型号列表
export const getTypeList = (data) => request({url: '/api/goods/getTypeList',method: 'post',data})

// 获取网站配置
export const webConfig = (data) => request({url: '/api/common/config',method: 'post',data})

