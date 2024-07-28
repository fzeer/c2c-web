import request from '@/utils/request'

// 查询商户支付产品列表
export function listMerchantproduct(query) {
  return request({
    url: '/merchant/merchantproduct/list',
    method: 'get',
    params: query
  })
}

// 查询商户支付产品详细
export function getMerchantproduct(id) {
  return request({
    url: '/merchant/merchantproduct/' + id,
    method: 'get'
  })
}

// 新增商户支付产品
export function addMerchantproduct(data) {
  return request({
    url: '/merchant/merchantproduct',
    method: 'post',
    data: data
  })
}

// 修改商户支付产品
export function updateMerchantproduct(data) {
  return request({
    url: '/merchant/merchantproduct',
    method: 'put',
    data: data
  })
}

// 删除商户支付产品
export function delMerchantproduct(id) {
  return request({
    url: '/merchant/merchantproduct/' + id,
    method: 'delete'
  })
}
