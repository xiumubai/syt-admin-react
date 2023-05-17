import type { LoginResult } from '@/pages/login/model'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

/**
 * 权限和用户信息
 * @param data - 请求数据
 */
export function getUserInfo() {
  return request.get<ServerResult<LoginResult>>(
    '/admin/acl/index/info',
  )
}

