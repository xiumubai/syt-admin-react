/*
 * @Author: 朽木白
 * @Date: 2023-05-17 14:21:10
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-17 14:25:40
 * @Description: 角色接口
 */

import type { FormData } from '#/form'
import type { PageServerResult, PaginationData } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/acl/role'
}

/**
 * 获取角色列表
 * @param id - ID
 */
export function getRoleList(id: string) {
  return request.get(`${API.URL}/${id}`)
}
