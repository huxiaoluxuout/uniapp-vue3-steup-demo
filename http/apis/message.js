import {request} from '@/http/request'

export const getUserSign = (data) => request({url: '/api/message/getUserSign', method: 'post', data})

// 申请交换名片
export const applySwapCard = (data) => request({url: '/api/message/applySwapCard', method: 'post', data})

// 同意交换名片
export const agreeSwapCard = (data) => request({url: '/api/message/agreeSwapCard', method: 'post', data})

// 拒绝交换名片
export const refuseSwapCard = (data) => request({url: '/api/message/refuseSwapCard', method: 'post', data})

// 获取站内通知列表
export const getNoticeList = (data) => request({url: '/api/message/getNoticeList', method: 'post', data})

// 站内通知设为已读状态
export const readNotice = (data) => request({url: '/api/message/readNotice', method: 'post', data})

// 打赏（不分拥）
export const aloneReward = (data) => request({url: '/api/order/aloneReward', method: 'post', data})

// 获取聊天信息

export const getMessageInfo = (data) => request({url: '/api/message/getMessageInfo', method: 'post', data})

// 获取聊天信息

export const getSwapCarStatus = (data) => request({url: '/api/message/getSwapCarStatus', method: 'post', data})

// 消息角标
export const getNoticeSubscript = (data) => request({url: '/api/user/noteice_subscript', method: 'get', data})

