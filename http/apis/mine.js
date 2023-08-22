import {request} from '@/http/request'
// 子账号列表
export const getSubAccountList = (data) => request({url: '/api/user/subaccountList',method: 'post',data})
// 添加子账号
export const bindSubAccount = (data) => request({url: '/api/user/bindSubaccount',method: 'post',data})
// 删除子账号
export const unbindSubAccount = (data) => request({url: '/api/user/unbindSubaccount',method: 'post',data})
// 设置子账号权限
export const setSubAccountPower = (data) => request({url: '/api/user/setSubaccountPower',method: 'post',data})


// 我的订单列表
export const getOrderList = (data) => request({url: '/api/supply/getOrderList',method: 'post',data})
// 完成订单
export const finishOrder = (data) => request({url: '/api/supply/finishOrder',method: 'post',data})
// 评价订单
export const commentOrder = (data) => request({url: '/api/supply/commentOrder',method: 'post',data})


// 推广中心信息
export const getPromotInfo = (data) => request({url: '/api/promot/getPromotInfo',method: 'post',data})
// 我的下级
export const getSubUserList = (data) => request({url: '/api/promot/getSubList',method: 'post',data})
// 推广二维码
export const getPromotQrcode = (data) => request({url: '/api/promot/getPromotQrcode',method: 'post',data})
// 佣金记录
export const getCommissionList = (data) => request({url: '/api/promot/getCommissionList',method: 'post',data})
// 提现申请
export const withdrawApply = (data) => request({url: '/api/user/withdrawApply',method: 'post',data})


// 添加银行卡
export const addBank = (data) => request({url: '/api/user/addBank',method: 'post',data})
// 银行卡列表
export const getBankList = (data) => request({url: '/api/user/getBankList',method: 'post',data})

// 获取我的名片信息
export const getMineCallCard = (data) => request({url: '/api/user/getMineCallCard',method: 'post',data})

// 保存我的名片信息
export const saveMineCallCard = (data) => request({url: '/api/user/saveMineCallCard',method: 'post',data})

// 名片记录
export const cardRecords = (data) => request({url: '/api/user/cardList',method: 'post',data})
// 名片记录
export const getCarInfo = (data) => request({url: '/api/user/getCarInfo',method: 'post',data})





// 打赏平台（分佣）
export const rewardMoney = (data) => request({url: '/api/order/reward',method: 'post',data})

// 打赏记录
export const rewardRecord = (data) => request({url: '/api/order/rewardRecord',method: 'post',data})

// 我的收藏
export const mineCollect = (data) => request({url: '/api/user/mineCollect',method: 'post',data})

// 浏览记录
export const browseList = (data) => request({url: '/api/user/browseList',method: 'post',data})

// 联系平台
export const contactPlatform = (data) => request({url: '/api/user/contactPlatform',method: 'post',data})

// 申请推广
export const promotApply = (data) => request({url: '/api/promot/promotApply', method: 'post', data})















// old 下级用户详情接口
export const getSubUserDetail = (params) => request({url: '/api/promotion/getSubUserDetail', method: 'post', data: params})



