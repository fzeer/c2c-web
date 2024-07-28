import request from '@/utils/request'

// 查询TG群发消息列表
export function listTgmessage(query) {
  return request({
    url: '/merchant/tgmessage/list',
    method: 'get',
    params: query
  })
}

// 查询TG群发消息详细
export function getTgmessage(msgId) {
  return request({
    url: '/merchant/tgmessage/' + msgId,
    method: 'get'
  })
}

// 新增TG群发消息
export function addTgmessage(data) {
  return request({
    url: '/merchant/tgmessage',
    method: 'post',
    data: data
  })
}

// 修改TG群发消息
export function updateTgmessage(data) {
  return request({
    url: '/merchant/tgmessage',
    method: 'put',
    data: data
  })
}

// 删除TG群发消息
export function delTgmessage(msgId) {
  return request({
    url: '/merchant/tgmessage/' + msgId,
    method: 'delete'
  })
}
