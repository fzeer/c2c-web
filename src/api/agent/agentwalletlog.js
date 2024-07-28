import request from '@/utils/request'

// 查询代理资金流水列表
export function listAgentwalletlog(query) {
  return request({
    url: '/agent/agentwalletlog/list',
    method: 'get',
    params: query
  })
}

// 查询代理资金流水详细
export function getAgentwalletlog(id) {
  return request({
    url: '/agent/agentwalletlog/' + id,
    method: 'get'
  })
}

// 新增代理资金流水
export function addAgentwalletlog(data) {
  return request({
    url: '/agent/agentwalletlog',
    method: 'post',
    data: data
  })
}

// 修改代理资金流水
export function updateAgentwalletlog(data) {
  return request({
    url: '/agent/agentwalletlog',
    method: 'put',
    data: data
  })
}

// 删除代理资金流水
export function delAgentwalletlog(id) {
  return request({
    url: '/agent/agentwalletlog/' + id,
    method: 'delete'
  })
}
