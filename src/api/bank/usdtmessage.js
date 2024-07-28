import request from '@/utils/request'

// 查询USDT消息列表
export function listUsdtmessage(query) {
  return request({
    url: '/bank/usdtmessage/list',
    method: 'get',
    params: query
  })
}

// 查询USDT消息详细
export function getUsdtmessage(msgId) {
  return request({
    url: '/bank/usdtmessage/' + msgId,
    method: 'get'
  })
}

// 新增USDT消息
export function addUsdtmessage(data) {
  return request({
    url: '/bank/usdtmessage',
    method: 'post',
    data: data
  })
}

// 修改USDT消息
export function updateUsdtmessage(data) {
  return request({
    url: '/bank/usdtmessage',
    method: 'put',
    data: data
  })
}

// 删除USDT消息
export function delUsdtmessage(msgId) {
  return request({
    url: '/bank/usdtmessage/' + msgId,
    method: 'delete'
  })
}
