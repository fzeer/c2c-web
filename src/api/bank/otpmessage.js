import request from '@/utils/request'

// 查询OTP消息列表
export function listOtpmessage(query) {
  return request({
    url: '/bank/otpmessage/list',
    method: 'get',
    params: query
  })
}

// 查询OTP消息详细
export function getOtpmessage(otpId) {
  return request({
    url: '/bank/otpmessage/' + otpId,
    method: 'get'
  })
}

// 新增OTP消息
export function addOtpmessage(data) {
  return request({
    url: '/bank/otpmessage',
    method: 'post',
    data: data
  })
}

// 修改OTP消息
export function updateOtpmessage(data) {
  return request({
    url: '/bank/otpmessage',
    method: 'put',
    data: data
  })
}

// 删除OTP消息
export function delOtpmessage(otpId) {
  return request({
    url: '/bank/otpmessage/' + otpId,
    method: 'delete'
  })
}
