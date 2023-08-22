import {request} from '@/http/request'
export const getCheckLogin = (data) => request({url: '/api/user/getUserInfo',method: 'post',data})
export const getPhone = (data) => request({url: '/api/user/getPhone', method: 'post', data});
export const registerUser = (data) => request({url: '/api/user/register', method: 'post', data});
