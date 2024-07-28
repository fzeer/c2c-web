import request from '@/utils/request'

// 查询USDT账户列表
export function listUsdtaccount(query) {
  return request({
    url: '/bank/usdtaccount/list',
    method: 'get',
    params: query
  })
}

// 查询USDT账户详细
export function getUsdtaccount(usdtId) {
  return request({
    url: '/bank/usdtaccount/' + usdtId,
    method: 'get'
  })
}

// 新增USDT账户
export function addUsdtaccount(data) {
  return request({
    url: '/bank/usdtaccount',
    method: 'post',
    data: data
  })
}

// 修改USDT账户
export function updateUsdtaccount(data) {
  return request({
    url: '/bank/usdtaccount',
    method: 'put',
    data: data
  })
}

// 删除USDT账户
export function delUsdtaccount(usdtId) {
  return request({
    url: '/bank/usdtaccount/' + usdtId,
    method: 'delete'
  })
}
