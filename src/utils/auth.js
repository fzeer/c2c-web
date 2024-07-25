import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const DeptKey = 'Admin-Dept-UT'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getDept() {
  var data = Cookies.get(DeptKey);
  if(data) {
    return JSON.parse(data)
  }
  else {
    return undefined
  }
}

export function setDept(dept) {
  return Cookies.set(DeptKey, JSON.stringify(dept))
}

export function removeDept() {
  return Cookies.remove(DeptKey)
}
