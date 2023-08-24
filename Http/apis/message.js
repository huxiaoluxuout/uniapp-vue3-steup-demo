import {request} from '@/http/request'

// 获取站内通知列表
export const getNoticeList = (data) => request({url: '/api/message/getNoticeList', method: 'post', data})

// 站内通知设为已读状态
export const readNotice = (data) => request({url: '/api/message/readNotice', method: 'post', data})

// 消息角标
export const getNoticeSubscript = (data) => request({url: '/api/user/noteice_subscript', method: 'get', data})

