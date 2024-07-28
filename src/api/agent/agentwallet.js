import request from '@/utils/request'

// 查询代理商钱包列表
export function listAgentwallet(query) {
  return request({
    url: '/agent/agentwallet/list',
    method: 'get',
    params: query
  })
}

// 查询代理商钱包详细
export function getAgentwallet(id) {
  return request({
    url: '/agent/agentwallet/' + id,
    method: 'get'
  })
}

// 新增代理商钱包
export function addAgentwallet(data) {
  return request({
    url: '/agent/agentwallet',
    method: 'post',
    data: data
  })
}

// 修改代理商钱包
export function updateAgentwallet(data) {
  return request({
    url: '/agent/agentwallet',
    method: 'put',
    data: data
  })
}

// 删除代理商钱包
export function delAgentwallet(id) {
  return request({
    url: '/agent/agentwallet/' + id,
    method: 'delete'
  })
}
