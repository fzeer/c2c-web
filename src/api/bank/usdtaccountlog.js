import request from '@/utils/request'

// 查询USDT资金流水列表
export function listUsdtaccountlog(query) {
  return request({
    url: '/bank/usdtaccountlog/list',
    method: 'get',
    params: query
  })
}

// 查询USDT资金流水详细
export function getUsdtaccountlog(id) {
  return request({
    url: '/bank/usdtaccountlog/' + id,
    method: 'get'
  })
}

// 新增USDT资金流水
export function addUsdtaccountlog(data) {
  return request({
    url: '/bank/usdtaccountlog',
    method: 'post',
    data: data
  })
}

// 修改USDT资金流水
export function updateUsdtaccountlog(data) {
  return request({
    url: '/bank/usdtaccountlog',
    method: 'put',
    data: data
  })
}

// 删除USDT资金流水
export function delUsdtaccountlog(id) {
  return request({
    url: '/bank/usdtaccountlog/' + id,
    method: 'delete'
  })
}
