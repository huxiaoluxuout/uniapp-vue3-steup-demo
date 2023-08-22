import {request} from '@/http/request'
// 添加百科
export const addWiki = (data) => request({url: '/api/Wiki/add',method: 'post',data})
// 百科列表
export const getWikipediaList = (data) => request({url: '/api/Wiki/wikilist',method: 'get',data})
// 百科详情
export const getWikipediaDetail = (data) => request({url: '/api/Wiki/wikidetali',method: 'get',data})
// 添加百科评论
export const addWikipediaComment = (data) => request({url: '/api/Wiki/wiki_comment',method: 'post',data})
// 评论列表
export const getWikipediaCommentList = (data) => request({url: '/api/Wiki/comment_list',method: 'get',data})
// 百科收藏
export const wikipediaCollect= (data) => request({url: '/api/Wiki/wiki_collect',method: 'post',data})
// 百科收藏
export const cancelCollection= (data) => request({url: '/api/Wiki/wiki_collect_q',method: 'post',data})

// 查看更多评论
export const commentListMore= (data) => request({url: '/api/Wiki/comment_list_more',method: 'get',data})


/*
// 添加百科浏览记录
export const addBrowseListWikipedia= (data) => request({url: '/api/user/browseList',method: 'post',data})
*/

// 查看更多评论
export const wikiSaveOrder= (data) => request({url: '/api/wiki/saveOrder',method: 'post',data})


// 查看更多评论
export const setWikiLike= (data) => request({url: '/api/wiki/like',method: 'post',data})

