import request from '@/utils/request'

// 查询支付渠道列表
export function listChannel(query) {
  return request({
    url: '/channel/channel/list',
    method: 'get',
    params: query
  })
}

// 查询支付渠道详细
export function getChannel(channelId) {
  return request({
    url: '/channel/channel/' + channelId,
    method: 'get'
  })
}

// 新增支付渠道
export function addChannel(data) {
  return request({
    url: '/channel/channel',
    method: 'post',
    data: data
  })
}

// 修改支付渠道
export function updateChannel(data) {
  return request({
    url: '/channel/channel',
    method: 'put',
    data: data
  })
}

// 删除支付渠道
export function delChannel(channelId) {
  return request({
    url: '/channel/channel/' + channelId,
    method: 'delete'
  })
}

  // 查询渠道列表
export function listSelectChannel(query) {
    return request({
      url: '/channel/channel/select',
      method: 'get',
      params: query
    })
}
