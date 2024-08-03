import request from '@/utils/request'

// 查询支付产品列表
export function listPayproduct(query) {
  return request({
    url: '/channel/payproduct/list',
    method: 'get',
    params: query
  })
}

// 查询支付产品详细
export function getPayproduct(productId) {
  return request({
    url: '/channel/payproduct/' + productId,
    method: 'get'
  })
}

// 新增支付产品
export function addPayproduct(data) {
  return request({
    url: '/channel/payproduct',
    method: 'post',
    data: data
  })
}

// 修改支付产品
export function updatePayproduct(data) {
  return request({
    url: '/channel/payproduct',
    method: 'put',
    data: data
  })
}

// 删除支付产品
export function delPayproduct(productId) {
  return request({
    url: '/channel/payproduct/' + productId,
    method: 'delete'
  })
}

// 查询支付产品列表
export function listSelectPayproduct(query) {
  return request({
    url: '/channel/payproduct/select',
    method: 'get',
    params: query
  })
}
// 查询支付产品列表
export function listSelectProductMerchantNoConfig(merchantId) {
  return request({
    url: '/channel/payproduct/select/merchantNoConfig/' + merchantId,
    method: 'get',
    params: null
  })
}
