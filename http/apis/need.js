import {request} from '@/http/request'
// 发布需求
export const needPublish = (data) => request({url: '/api/need/publish', method: 'post', data})
// 需求列表
export const getNeedList = (data) => request({url: '/api/need/getNeedList', method: 'post', data})
// 需求详情
export const getNeedDetail = (data) => request({url: '/api/need/getNeedDetail', method: 'post', data})
// 收藏/取消收藏需求
export const needCollect = (data) => request({url: '/api/need/collect', method: 'post', data})
// 上下架需求
export const toggleNeedUpDown = (data) => request({url: '/api/need/switch', method: 'post', data})
// 删除需求
export const needDel = (data) => request({url: '/api/need/del', method: 'post', data})


