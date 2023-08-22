import {request} from '@/http/request'
// 发布技术支持
export const skillPublish = (data) => request({url: '/api/skill/publish', method: 'post', data})
// 技术支持列表
export const getSkillList = (data) => request({url: '/api/skill/getSkillList', method: 'post', data})
// 技术支持详情
export const getSkillDetail = (data) => request({url: '/api/skill/getSkillDetail', method: 'post', data})
// 收藏/取消收藏技术
export const skillCollect = (data) => request({url: '/api/skill/collect', method: 'post', data})
// 上下架技术
export const skillToggleUpDown = (data) => request({url: '/api/skill/switch', method: 'post', data})
// 删除技术支持
export const skillDel = (data) => request({url: '/api/skill/del', method: 'post', data})
