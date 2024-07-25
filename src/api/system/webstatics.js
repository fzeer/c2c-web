import request from '@/utils/request'

// 查询网页统计列表
export function listWebstatics(query) {
  return request({
    url: '/system/webstatics/list',
    method: 'get',
    params: query
  })
}

// 查询网页统计详细
export function getWebstatics(id) {
  return request({
    url: '/system/webstatics/' + id,
    method: 'get'
  })
}

// 新增网页统计
export function addWebstatics(data) {
  return request({
    url: '/system/webstatics',
    method: 'post',
    data: data
  })
}

// 修改网页统计
export function updateWebstatics(data) {
  return request({
    url: '/system/webstatics',
    method: 'put',
    data: data
  })
}

// 删除网页统计
export function delWebstatics(id) {
  return request({
    url: '/system/webstatics/' + id,
    method: 'delete'
  })
}
