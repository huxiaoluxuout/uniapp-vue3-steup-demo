import {request} from '@/http/request'
// 发布设备
export const goodsPublish = (data) => request({url: '/api/goods/publishGoods',method: 'post',data})
// 获取设备列表
export const getGoodsList = (data) => request({url: '/api/goods/getGoodsList',method: 'post',data})
// 获取设备详情
export const getGoodsDetail = (data) => request({url: '/api/goods/getGoodsDetail',method: 'post',data})
// 收藏/取消收藏设备
export const goodsCollect = (data) => request({url: '/api/goods/collect',method: 'post',data})
// 上下架设备
export const toggleGoodsUnDown = (data) => request({url: '/api/goods/switch',method: 'post',data})
// 删除设备
export const goodsDel = (data) => request({url: '/api/goods/del',method: 'post',data})

// 批量删除
export const batchDel = (data) => request({url: '/api/goods/batchDel',method: 'post',data})

