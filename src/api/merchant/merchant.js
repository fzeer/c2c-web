import request from '@/utils/request'

// 查询商户列列表
export function listMerchant(query) {
  return request({
    url: '/merchant/merchant/list',
    method: 'get',
    params: query
  })
}

// 查询商户列详细
export function getMerchant(merchantId) {
  return request({
    url: '/merchant/merchant/' + merchantId,
    method: 'get'
  })
}

// 新增商户列
export function addMerchant(data) {
  return request({
    url: '/merchant/merchant',
    method: 'post',
    data: data
  })
}

// 修改商户列
export function updateMerchant(data) {
  return request({
    url: '/merchant/merchant',
    method: 'put',
    data: data
  })
}

// 删除商户列
export function delMerchant(merchantId) {
  return request({
    url: '/merchant/merchant/' + merchantId,
    method: 'delete'
  })
}

// 查询商户列列表
export function listSelectMerchant(query) {
  return request({
    url: '/merchant/merchant/select',
    method: 'get',
    params: query
  })
}
