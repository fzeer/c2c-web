import request from '@/utils/request'

// 查询码商钱包列表
export function listSupplierwallet(query) {
  return request({
    url: '/supplier/supplierwallet/list',
    method: 'get',
    params: query
  })
}

// 查询码商钱包详细
export function getSupplierwallet(walletId) {
  return request({
    url: '/supplier/supplierwallet/' + walletId,
    method: 'get'
  })
}

// 新增码商钱包
export function addSupplierwallet(data) {
  return request({
    url: '/supplier/supplierwallet',
    method: 'post',
    data: data
  })
}

// 修改码商钱包
export function updateSupplierwallet(data) {
  return request({
    url: '/supplier/supplierwallet',
    method: 'put',
    data: data
  })
}

// 删除码商钱包
export function delSupplierwallet(walletId) {
  return request({
    url: '/supplier/supplierwallet/' + walletId,
    method: 'delete'
  })
}
