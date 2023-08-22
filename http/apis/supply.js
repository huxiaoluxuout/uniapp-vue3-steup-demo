import {request} from '@/http/request'
//获取供需列表
export const getSupplyList = (data) => request({url: '/api/supply/getSupplyList', method: 'post', data});
// 发布供需
export const supplyPublish = (data) => request({url: '/api/supply/publish', method: 'post', data})
// 获取供需详情
export const getSupplyDetail = (data) => request({url: '/api/supply/getSupplyDetail', method: 'post', data})
// 收藏/取消收藏供需
export const supplCollect = (data) => request({url: '/api/supply/collect', method: 'post', data})
// 发起竞价
export const supplySaveOrder = (data) => request({url: '/api/supply/saveOrder', method: 'post', data})
// 同意竞价
export const supplyAgreeBiddingOrder = (data) => request({url: '/api/supply/agreeBiddingOrder', method: 'post', data})
// 拒绝竞价
export const supplyRefuseBiddingOrder = (data) => request({url: '/api/supply/refuseBiddingOrder', method: 'post', data})
// 上下架供需
export const supplyToggleUpDown = (data) => request({url: '/api/supply/switch', method: 'post', data})
// 删除供需
export const supplyDel = (data) => request({url: '/api/supply/del', method: 'post', data})
// 批量删除供需
export const batchDel = (data) => request({url: '/api/supply/batchDel', method: 'post', data})
