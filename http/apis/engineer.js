import {request} from '@/http/request'
//工程师专业方向列表
export const engineerMajorList = (data) => request({url: '/api/engineer/engineerMajorList', method: 'post', data});
//保存工程师信息
export const saveEngineer = (data) => request({url: '/api/engineer/saveEngineer', method: 'post', data});
//获取工程师信息
export const getEngineerInfo = (data) => request({url: '/api/engineer/getEngineerInfo', method: 'post', data});
//获取工程师列表
export const getEngineerList = (data) => request({url: '/api/engineer/getEngineerList', method: 'post', data});
//获取工程师详情
export const getEngineerDetail = (data) => request({url: '/api/engineer/getEngineerDetail', method: 'post', data});
//收藏/取消收藏工程师
export const engineerCollect = (data) => request({url: '/api/engineer/collect', method: 'post', data});
