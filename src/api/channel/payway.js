import request from '@/utils/request'

// 查询支付方式列表
export function listPayway(query) {
  return request({
    url: '/channel/payway/list',
    method: 'get',
    params: query
  })
}

// 查询支付方式详细
export function getPayway(id) {
  return request({
    url: '/channel/payway/' + id,
    method: 'get'
  })
}

// 新增支付方式
export function addPayway(data) {
  return request({
    url: '/channel/payway',
    method: 'post',
    data: data
  })
}

// 修改支付方式
export function updatePayway(data) {
  return request({
    url: '/channel/payway',
    method: 'put',
    data: data
  })
}

// 删除支付方式
export function delPayway(id) {
  return request({
    url: '/channel/payway/' + id,
    method: 'delete'
  })
}
