import request from '@/utils/request'

// 查询上游代付下单请求列表
export function listPayoutorderrequest(query) {
  return request({
    url: '/payout/payoutorderrequest/list',
    method: 'get',
    params: query
  })
}

// 查询上游代付下单请求详细
export function getPayoutorderrequest(orderId) {
  return request({
    url: '/payout/payoutorderrequest/' + orderId,
    method: 'get'
  })
}

// 新增上游代付下单请求
export function addPayoutorderrequest(data) {
  return request({
    url: '/payout/payoutorderrequest',
    method: 'post',
    data: data
  })
}

// 修改上游代付下单请求
export function updatePayoutorderrequest(data) {
  return request({
    url: '/payout/payoutorderrequest',
    method: 'put',
    data: data
  })
}

// 删除上游代付下单请求
export function delPayoutorderrequest(orderId) {
  return request({
    url: '/payout/payoutorderrequest/' + orderId,
    method: 'delete'
  })
}
