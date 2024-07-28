import request from '@/utils/request'

// 查询商户通知记录列表
export function listNotifyrecord(query) {
  return request({
    url: '/paying/notifyrecord/list',
    method: 'get',
    params: query
  })
}

// 查询商户通知记录详细
export function getNotifyrecord(notifyId) {
  return request({
    url: '/paying/notifyrecord/' + notifyId,
    method: 'get'
  })
}

// 新增商户通知记录
export function addNotifyrecord(data) {
  return request({
    url: '/paying/notifyrecord',
    method: 'post',
    data: data
  })
}

// 修改商户通知记录
export function updateNotifyrecord(data) {
  return request({
    url: '/paying/notifyrecord',
    method: 'put',
    data: data
  })
}

// 删除商户通知记录
export function delNotifyrecord(notifyId) {
  return request({
    url: '/paying/notifyrecord/' + notifyId,
    method: 'delete'
  })
}
