import {request} from '@/http/request'
// 保存工厂信息
export const saveFactories = (data) => request({url: '/api/factory/saveFactory',method: 'post',data})
// 获取工厂信息
export const getFactoryInfo = (data) => request({url: '/api/factory/getFactoryInfo',method: 'post',data})
// 工厂标签列表
export const factoryLabelList = (data) => request({url: '/api/factory/factoryLabelList',method: 'post',data})
// 获取附近工厂
export const getNearbyFactoryList = (data) => request({url: '/api/factory/getNearbyFactoryList',method: 'post',data})
// 获取工厂详情
export const getFactoryDetail = (data) => request({url: '/api/factory/getFactoryDetail',method: 'post',data})
// 收藏工厂
export const factoryCollect = (data) => request({url: '/api/factory/collect',method: 'post',data})
// 工厂共享订单、共享工厂列表
export const getFactorySupplyList = (data) => request({url: '/api/supply/getSupplyList',method: 'post',data})
// 工厂设备列表
export const getFactoryGoodsList = (data) => request({url: '/api/goods/getGoodsList',method: 'post',data})

// 工厂需求列表
export const getFactoryNeedList = (data) => request({url: '/api/need/getNeedList',method: 'post',data})
// 工厂招聘列表
export const getRecruitList = (data) => request({url: '/api/recruit/getRecruitList',method: 'post',data})

// 获取推荐工厂
// export const getGreateFactory = (data) => request({url: '/api/factory/getGreateFactory',method: 'post',data})
export const getGreateFactory = (data) => request({url: '/api/supply/getGreateFactory',method: 'post',data})
