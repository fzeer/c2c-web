import request from '@/utils/request'

// 查询银行流水列表
export function listCollectionbanklog(query) {
  return request({
    url: '/bank/collectionbanklog/list',
    method: 'get',
    params: query
  })
}

// 查询银行流水详细
export function getCollectionbanklog(id) {
  return request({
    url: '/bank/collectionbanklog/' + id,
    method: 'get'
  })
}

// 新增银行流水
export function addCollectionbanklog(data) {
  return request({
    url: '/bank/collectionbanklog',
    method: 'post',
    data: data
  })
}

// 修改银行流水
export function updateCollectionbanklog(data) {
  return request({
    url: '/bank/collectionbanklog',
    method: 'put',
    data: data
  })
}

// 删除银行流水
export function delCollectionbanklog(id) {
  return request({
    url: '/bank/collectionbanklog/' + id,
    method: 'delete'
  })
}
