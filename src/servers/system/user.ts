import type { FormData } from '#/form'
import type { PageServerResult, PaginationData } from '#/public'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/acl/user'
}

/**
 * @description: 获取后台用户分页列表(带搜索)
 * @param {GetUserListParams} param
 * @returns {*}
 */
export const getUserList = (data: Partial<FormData> & PaginationData) => {
  return request.get<PageServerResult<FormData[]>>(
    `${API.URL}/${data.page}/${data.pageSize}`, {
    params: { username: data.username }
  })
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createUser(data: FormData) {
  return request.post(`${API.URL}/save`, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateUser(data: FormData) {
  return request.put(`${API.URL}/update`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteUser(id: string) {
  return request.delete(`${API.URL}/remove/${id}`)
}

/**
 * 删除
 * @param id - 根据用户获取角色数据
 */
export function getAssignList(adminId: string) {
  return request.get(`${API.URL}/toAssign/${adminId}`)
}

/**
 * 删除
 * @param id - 根据用户分配角色
 */
export function doAssign(adminId: number | string, roleId: CheckboxValueType[]) {
  return request.post(`${API.URL}/doAssign?adminId=${adminId}&roleId=${roleId}`)
}
