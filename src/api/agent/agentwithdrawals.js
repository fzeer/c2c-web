import request from '@/utils/request'

// 查询代理提现申请列表
export function listAgentwithdrawals(query) {
  return request({
    url: '/agent/agentwithdrawals/list',
    method: 'get',
    params: query
  })
}

// 查询代理提现申请详细
export function getAgentwithdrawals(id) {
  return request({
    url: '/agent/agentwithdrawals/' + id,
    method: 'get'
  })
}

// 新增代理提现申请
export function addAgentwithdrawals(data) {
  return request({
    url: '/agent/agentwithdrawals',
    method: 'post',
    data: data
  })
}

// 修改代理提现申请
export function updateAgentwithdrawals(data) {
  return request({
    url: '/agent/agentwithdrawals',
    method: 'put',
    data: data
  })
}

// 删除代理提现申请
export function delAgentwithdrawals(id) {
  return request({
    url: '/agent/agentwithdrawals/' + id,
    method: 'delete'
  })
}
