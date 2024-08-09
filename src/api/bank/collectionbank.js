import request from '@/utils/request'

// 查询收款账户列表
export function listCollectionbank(query) {
  return request({
    url: '/bank/collectionbank/list',
    method: 'get',
    params: query
  })
}

// 查询收款账户详细
export function getCollectionbank(accountId) {
  return request({
    url: '/bank/collectionbank/' + accountId,
    method: 'get'
  })
}

// 新增收款账户
export function addCollectionbank(data) {
  return request({
    url: '/bank/collectionbank',
    method: 'post',
    data: data
  })
}

// 修改收款账户
export function updateCollectionbank(data) {
  return request({
    url: '/bank/collectionbank',
    method: 'put',
    data: data
  })
}

// 删除收款账户
export function delCollectionbank(accountId) {
  return request({
    url: '/bank/collectionbank/' + accountId,
    method: 'delete'
  })
}
