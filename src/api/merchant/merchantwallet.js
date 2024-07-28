import request from '@/utils/request'

// 查询商户钱包列表
export function listMerchantwallet(query) {
  return request({
    url: '/merchant/merchantwallet/list',
    method: 'get',
    params: query
  })
}

// 查询商户钱包详细
export function getMerchantwallet(id) {
  return request({
    url: '/merchant/merchantwallet/' + id,
    method: 'get'
  })
}

// 新增商户钱包
export function addMerchantwallet(data) {
  return request({
    url: '/merchant/merchantwallet',
    method: 'post',
    data: data
  })
}

// 修改商户钱包
export function updateMerchantwallet(data) {
  return request({
    url: '/merchant/merchantwallet',
    method: 'put',
    data: data
  })
}

// 删除商户钱包
export function delMerchantwallet(id) {
  return request({
    url: '/merchant/merchantwallet/' + id,
    method: 'delete'
  })
}
