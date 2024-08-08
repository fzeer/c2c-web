import request from '@/utils/request'

// 查询收款账户列表
export function listBankordercache(query) {
  return request({
    url: '/channel/bankordercache/list',
    method: 'get',
    params: query
  })
}

// 查询收款账户详细
export function getBankordercache(cacheId) {
  return request({
    url: '/channel/bankordercache/' + cacheId,
    method: 'get'
  })
}

// 新增收款账户
export function addBankordercache(data) {
  return request({
    url: '/channel/bankordercache',
    method: 'post',
    data: data
  })
}

// 修改收款账户
export function updateBankordercache(data) {
  return request({
    url: '/channel/bankordercache',
    method: 'put',
    data: data
  })
}

// 删除收款账户
export function delBankordercache(cacheId) {
  return request({
    url: '/channel/bankordercache/' + cacheId,
    method: 'delete'
  })
}
