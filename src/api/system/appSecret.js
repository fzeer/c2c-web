import request from '@/utils/request'

// 查询应用密钥列表
export function listAppSecret(query) {
  return request({
    url: '/system/appSecret/list',
    method: 'get',
    params: query
  })
}

// 查询应用密钥详细
export function getAppSecret(appId) {
  return request({
    url: '/system/appSecret/' + appId,
    method: 'get'
  })
}

// 新增应用密钥
export function addAppSecret(data) {
  return request({
    url: '/system/appSecret',
    method: 'post',
    data: data
  })
}

// 修改应用密钥
export function updateAppSecret(data) {
  return request({
    url: '/system/appSecret',
    method: 'put',
    data: data
  })
}

// 删除应用密钥
export function delAppSecret(appId) {
  return request({
    url: '/system/appSecret/' + appId,
    method: 'delete'
  })
}
