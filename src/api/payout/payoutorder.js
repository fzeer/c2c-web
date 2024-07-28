import request from '@/utils/request'

// 查询代付订单列表
export function listPayoutorder(query) {
  return request({
    url: '/payout/payoutorder/list',
    method: 'get',
    params: query
  })
}

// 查询代付订单详细
export function getPayoutorder(id) {
  return request({
    url: '/payout/payoutorder/' + id,
    method: 'get'
  })
}

// 新增代付订单
export function addPayoutorder(data) {
  return request({
    url: '/payout/payoutorder',
    method: 'post',
    data: data
  })
}

// 修改代付订单
export function updatePayoutorder(data) {
  return request({
    url: '/payout/payoutorder',
    method: 'put',
    data: data
  })
}

// 删除代付订单
export function delPayoutorder(id) {
  return request({
    url: '/payout/payoutorder/' + id,
    method: 'delete'
  })
}
