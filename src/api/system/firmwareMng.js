import request from '@/utils/request'

// 查询软件/固件版本管理列表
export function listFirmwareMng(query) {
  return request({
    url: '/system/firmwareMng/list',
    method: 'get',
    params: query
  })
}

// 查询软件/固件版本管理详细
export function getFirmwareMng(id) {
  return request({
    url: '/system/firmwareMng/' + id,
    method: 'get'
  })
}

// 新增软件/固件版本管理
export function addFirmwareMng(data) {
  return request({
    url: '/system/firmwareMng',
    method: 'post',
    data: data
  })
}

// 修改软件/固件版本管理
export function updateFirmwareMng(data) {
  return request({
    url: '/system/firmwareMng',
    method: 'put',
    data: data
  })
}

// 删除软件/固件版本管理
export function delFirmwareMng(id) {
  return request({
    url: '/system/firmwareMng/' + id,
    method: 'delete'
  })
}
