import request from '@/utils/request'

// 查询代理商列列表
export function listAgent(query) {
  return request({
    url: '/agent/agent/list',
    method: 'get',
    params: query
  })
}
// 查询代理商列列表
export function listParentAgent(query) {
  return request({
    url: '/agent/agent/parent/list',
    method: 'get',
    params: query
  })
}

// 查询代理商列详细
export function getAgent(agentId) {
  return request({
    url: '/agent/agent/' + agentId,
    method: 'get'
  })
}

// 新增代理商列
export function addAgent(data) {
  return request({
    url: '/agent/agent',
    method: 'post',
    data: data
  })
}

// 修改代理商列
export function updateAgent(data) {
  return request({
    url: '/agent/agent',
    method: 'put',
    data: data
  })
}

// 删除代理商列
export function delAgent(agentId) {
  return request({
    url: '/agent/agent/' + agentId,
    method: 'delete'
  })
}
