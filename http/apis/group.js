import {request} from '@/http/request'

// 获取团购列表
export const getGroupList = (data) => request({url: '/api/group/getGroupList',method: 'post',data})

// 获取团购列表
export const getGroupDetail = (data) => request({url: '/api/group/getGroupDetail',method: 'post',data})

// 拼团
export const saveGroupOrder = (data) => request({url: '/api/group/saveOrder',method: 'post',data})

// 我的团购订单
export const getMineGroupOrderList = (data) => request({url: '/api/group/mineGroupOrderList',method: 'post',data})

// 获取拼团队伍状态
export const getTeamStatus = (data) => request({url: '/api/group/getTeamStatus',method: 'post',data})

