import {request} from '@/http/request'
// 发布招聘
export const recruitPublish = (data) => request({url: '/api/recruit/publish', method: 'post', data})
// 招聘列表
export const getRecruitList = (data) => request({url: '/api/recruit/getRecruitList', method: 'post', data})
// 招聘详情
export const getRecruitDetail = (data) => request({url: '/api/recruit/getRecruitDetail', method: 'post', data})
// 收藏/取消收藏招聘
export const recruitCollect = (data) => request({url: '/api/recruit/collect', method: 'post', data})
// 上下架招聘
export const recruitToggleUpDown = (data) => request({url: '/api/recruit/switch', method: 'post', data})
// 删除招聘
export const recruitDel = (data) => request({url: '/api/recruit/del', method: 'post', data})

// 招聘配置
export const recruitConfig = (data) => request({url: '/api/recruit/config', method: 'post', data})


