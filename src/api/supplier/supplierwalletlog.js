import request from '@/utils/request'

// 查询码商资金流水列表
export function listSupplierwalletlog(query) {
  return request({
    url: '/supplier/supplierwalletlog/list',
    method: 'get',
    params: query
  })
}

// 查询码商资金流水详细
export function getSupplierwalletlog(id) {
  return request({
    url: '/supplier/supplierwalletlog/' + id,
    method: 'get'
  })
}

// 新增码商资金流水
export function addSupplierwalletlog(data) {
  return request({
    url: '/supplier/supplierwalletlog',
    method: 'post',
    data: data
  })
}

// 修改码商资金流水
export function updateSupplierwalletlog(data) {
  return request({
    url: '/supplier/supplierwalletlog',
    method: 'put',
    data: data
  })
}

// 删除码商资金流水
export function delSupplierwalletlog(id) {
  return request({
    url: '/supplier/supplierwalletlog/' + id,
    method: 'delete'
  })
}
