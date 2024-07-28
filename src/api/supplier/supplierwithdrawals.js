import request from '@/utils/request'

// 查询码商提现申请列表
export function listSupplierwithdrawals(query) {
  return request({
    url: '/supplier/supplierwithdrawals/list',
    method: 'get',
    params: query
  })
}

// 查询码商提现申请详细
export function getSupplierwithdrawals(id) {
  return request({
    url: '/supplier/supplierwithdrawals/' + id,
    method: 'get'
  })
}

// 新增码商提现申请
export function addSupplierwithdrawals(data) {
  return request({
    url: '/supplier/supplierwithdrawals',
    method: 'post',
    data: data
  })
}

// 修改码商提现申请
export function updateSupplierwithdrawals(data) {
  return request({
    url: '/supplier/supplierwithdrawals',
    method: 'put',
    data: data
  })
}

// 删除码商提现申请
export function delSupplierwithdrawals(id) {
  return request({
    url: '/supplier/supplierwithdrawals/' + id,
    method: 'delete'
  })
}
