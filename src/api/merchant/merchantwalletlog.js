import request from '@/utils/request'

// 查询商户资金流水列表
export function listMerchantwalletlog(query) {
  return request({
    url: '/merchant/merchantwalletlog/list',
    method: 'get',
    params: query
  })
}

// 查询商户资金流水详细
export function getMerchantwalletlog(id) {
  return request({
    url: '/merchant/merchantwalletlog/' + id,
    method: 'get'
  })
}

// 新增商户资金流水
export function addMerchantwalletlog(data) {
  return request({
    url: '/merchant/merchantwalletlog',
    method: 'post',
    data: data
  })
}

// 修改商户资金流水
export function updateMerchantwalletlog(data) {
  return request({
    url: '/merchant/merchantwalletlog',
    method: 'put',
    data: data
  })
}

// 删除商户资金流水
export function delMerchantwalletlog(id) {
  return request({
    url: '/merchant/merchantwalletlog/' + id,
    method: 'delete'
  })
}
