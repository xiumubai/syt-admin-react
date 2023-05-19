/*
 * @Author: 朽木白
 * @Date: 2023-05-17 14:21:10
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-19 15:28:06
 * @Description: 权限接口
 */

import type { FormData } from '#/form'
import type { ServerResult } from '#/public'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/acl/permission'
}

/**
 * @description: 获取后台菜单列表
 * @param {GetUserListParams} param
 * @returns {*}
 */
export const getPermissionList = () => {
  return request.get<ServerResult<FormData[]>>(
    `${API.URL}`, {
  })
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deletePermission(id: string) {
  return request.delete(`${API.URL}/remove/${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createPermission(data: FormData) {
  return request.post(`${API.URL}/save`, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updatePermission(data: FormData) {
  return request.put(`${API.URL}/update`, data)
}

/**
 * 获取菜单权限列表
 */
export function getAssignList(adminId: string) {
  return request.get(`${API.URL}/toAssign/${adminId}`)
}

/**
 * 分配权限
 */
export function doAssign(roleId: number | string, permissionId: CheckboxValueType[]) {
  return request.post(`${API.URL}/doAssign?roleId=${roleId}&permissionId=${permissionId}`)
}
