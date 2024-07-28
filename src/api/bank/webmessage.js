import request from '@/utils/request'

// 查询网页消息列表
export function listWebmessage(query) {
  return request({
    url: '/bank/webmessage/list',
    method: 'get',
    params: query
  })
}

// 查询网页消息详细
export function getWebmessage(msgId) {
  return request({
    url: '/bank/webmessage/' + msgId,
    method: 'get'
  })
}

// 新增网页消息
export function addWebmessage(data) {
  return request({
    url: '/bank/webmessage',
    method: 'post',
    data: data
  })
}

// 修改网页消息
export function updateWebmessage(data) {
  return request({
    url: '/bank/webmessage',
    method: 'put',
    data: data
  })
}

// 删除网页消息
export function delWebmessage(msgId) {
  return request({
    url: '/bank/webmessage/' + msgId,
    method: 'delete'
  })
}
