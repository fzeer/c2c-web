import request from '@/utils/request'

// 查询码商列表
export function listSupplier(query) {
  return request({
    url: '/supplier/supplier/list',
    method: 'get',
    params: query
  })
}

// 查询码商详细
export function getSupplier(supplierId) {
  return request({
    url: '/supplier/supplier/' + supplierId,
    method: 'get'
  })
}

// 新增码商
export function addSupplier(data) {
  return request({
    url: '/supplier/supplier',
    method: 'post',
    data: data
  })
}

// 修改码商
export function updateSupplier(data) {
  return request({
    url: '/supplier/supplier',
    method: 'put',
    data: data
  })
}

// 删除码商
export function delSupplier(supplierId) {
  return request({
    url: '/supplier/supplier/' + supplierId,
    method: 'delete'
  })
}

// 查询码商列表
export function listSelectSupplier(query) {
  return request({
    url: '/supplier/supplier/select',
    method: 'get',
    params: query
  })
}
