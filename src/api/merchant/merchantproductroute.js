import request from '@/utils/request'

// 查询商户产品路由列表
export function listMerchantproductroute(query) {
  return request({
    url: '/merchant/merchantproductroute/list',
    method: 'get',
    params: query
  })
}

// 查询商户产品路由详细
export function getMerchantproductroute(id) {
  return request({
    url: '/merchant/merchantproductroute/' + id,
    method: 'get'
  })
}

// 新增商户产品路由
export function addMerchantproductroute(data) {
  return request({
    url: '/merchant/merchantproductroute',
    method: 'post',
    data: data
  })
}

// 修改商户产品路由
export function updateMerchantproductroute(data) {
  return request({
    url: '/merchant/merchantproductroute',
    method: 'put',
    data: data
  })
}

// 删除商户产品路由
export function delMerchantproductroute(id) {
  return request({
    url: '/merchant/merchantproductroute/' + id,
    method: 'delete'
  })
}
