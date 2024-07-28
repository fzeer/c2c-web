import request from '@/utils/request'

// 查询渠道下单请求列表
export function listPayorderrequest(query) {
  return request({
    url: '/paying/payorderrequest/list',
    method: 'get',
    params: query
  })
}

// 查询渠道下单请求详细
export function getPayorderrequest(orderId) {
  return request({
    url: '/paying/payorderrequest/' + orderId,
    method: 'get'
  })
}

// 新增渠道下单请求
export function addPayorderrequest(data) {
  return request({
    url: '/paying/payorderrequest',
    method: 'post',
    data: data
  })
}

// 修改渠道下单请求
export function updatePayorderrequest(data) {
  return request({
    url: '/paying/payorderrequest',
    method: 'put',
    data: data
  })
}

// 删除渠道下单请求
export function delPayorderrequest(orderId) {
  return request({
    url: '/paying/payorderrequest/' + orderId,
    method: 'delete'
  })
}
