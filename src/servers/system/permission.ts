/*
 * @Author: 朽木白
 * @Date: 2023-05-17 14:21:10
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-19 14:38:12
 * @Description: 角色接口
 */

import type { FormData } from '#/form'
import type { PageServerResult, PaginationData } from '#/public'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/acl/permission'
}

/**
 * 获取角色列表
 */
export function getAssignList(adminId: string) {
  return request.get(`${API.URL}/toAssign/${adminId}`)
}

/**
 * 分配角色
 */
export function doAssign(roleId: number | string, permissionId: CheckboxValueType[]) {
  return request.post(`${API.URL}/doAssign?roleId=${roleId}&permissionId=${permissionId}`)
}

