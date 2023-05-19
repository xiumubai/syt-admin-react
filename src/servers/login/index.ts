import type { LoginData } from '@/pages/login/model'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

/**
 * 登录
 * @param data - 请求数据
 */
export function login(data: LoginData) {
  return request.post<ServerResult<string>>('/admin/acl/index/login', data)
}

/**
 * 登出
 * @param data - 请求数据
 */
export function logout() {
  return request.post<ServerResult<string>>('/admin/acl/index/logout')
}
