import request from '@/utils/request'

// 查询商户支付订单列表
export function listPayorder(query) {
  return request({
    url: '/paying/payorder/list',
    method: 'get',
    params: query
  })
}

// 查询商户支付订单详细
export function getPayorder(orderId) {
  return request({
    url: '/paying/payorder/' + orderId,
    method: 'get'
  })
}

// 新增商户支付订单
export function addPayorder(data) {
  return request({
    url: '/paying/payorder',
    method: 'post',
    data: data
  })
}

// 修改商户支付订单
export function updatePayorder(data) {
  return request({
    url: '/paying/payorder',
    method: 'put',
    data: data
  })
}

// 删除商户支付订单
export function delPayorder(orderId) {
  return request({
    url: '/paying/payorder/' + orderId,
    method: 'delete'
  })
}

// 商户支付订单重发通知
export function notifyPayorder(orderId) {
  return request({
    url: '/paying/payorder/notify/' + orderId,
    method: 'delete'
  })
}

// 商户支付订单补单
export function supplementPayorder(data) {
  return request({
    url: '/paying/payorder/supplement',
    method: 'put',
    data: data
  })
}
