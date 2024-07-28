import request from '@/utils/request'

// 查询支付渠道列表
export function listPaymentchannel(query) {
  return request({
    url: '/channel/paymentchannel/list',
    method: 'get',
    params: query
  })
}

// 查询支付渠道详细
export function getPaymentchannel(channelId) {
  return request({
    url: '/channel/paymentchannel/' + channelId,
    method: 'get'
  })
}

// 新增支付渠道
export function addPaymentchannel(data) {
  return request({
    url: '/channel/paymentchannel',
    method: 'post',
    data: data
  })
}

// 修改支付渠道
export function updatePaymentchannel(data) {
  return request({
    url: '/channel/paymentchannel',
    method: 'put',
    data: data
  })
}

// 删除支付渠道
export function delPaymentchannel(channelId) {
  return request({
    url: '/channel/paymentchannel/' + channelId,
    method: 'delete'
  })
}
