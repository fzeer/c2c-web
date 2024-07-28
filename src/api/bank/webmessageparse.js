import request from '@/utils/request'

// 查询银行消息解析列表
export function listWebmessageparse(query) {
  return request({
    url: '/bank/webmessageparse/list',
    method: 'get',
    params: query
  })
}

// 查询银行消息解析详细
export function getWebmessageparse(id) {
  return request({
    url: '/bank/webmessageparse/' + id,
    method: 'get'
  })
}

// 新增银行消息解析
export function addWebmessageparse(data) {
  return request({
    url: '/bank/webmessageparse',
    method: 'post',
    data: data
  })
}

// 修改银行消息解析
export function updateWebmessageparse(data) {
  return request({
    url: '/bank/webmessageparse',
    method: 'put',
    data: data
  })
}

// 删除银行消息解析
export function delWebmessageparse(id) {
  return request({
    url: '/bank/webmessageparse/' + id,
    method: 'delete'
  })
}
