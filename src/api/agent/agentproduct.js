import request from '@/utils/request'

// 查询代理产品列表
export function listAgentproduct(query) {
  return request({
    url: '/agent/agentproduct/list',
    method: 'get',
    params: query
  })
}

// 查询代理产品详细
export function getAgentproduct(id) {
  return request({
    url: '/agent/agentproduct/' + id,
    method: 'get'
  })
}

// 新增代理产品
export function addAgentproduct(data) {
  return request({
    url: '/agent/agentproduct',
    method: 'post',
    data: data
  })
}

// 修改代理产品
export function updateAgentproduct(data) {
  return request({
    url: '/agent/agentproduct',
    method: 'put',
    data: data
  })
}

// 删除代理产品
export function delAgentproduct(id) {
  return request({
    url: '/agent/agentproduct/' + id,
    method: 'delete'
  })
}
