import type { FormData } from '#/form'
import type { PageServerResult, PaginationData, Status } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/user'
}

/**
 * 查询医院设置列表
 * @param data - 请求数据
 */
export const getMemberList = (data: Partial<FormData> & PaginationData) => {
  return request.get<PageServerResult<FormData[]>>(
    `${API.URL}/${data.page}/${data.pageSize}`, {
    params: {
      keyword: data.keyword,
      authStatus: data.authStatus
    }
  })
}

/**
 * 锁定用户
 * @param data - 请求数据
 */
export function lockMember(id: string, status: Status) {
  return request.get(`${API.URL}/lock/${id}/${status}`)
}

/**
 * 用户信息
 * @param data - 请求数据
 */
export function getMemberInfo(id: string) {
  return request.get(`${API.URL}/show/${id}`)
}

/**
 * 同意or不同意审批接口
 * @param data - 请求数据
 */
export function approval(id: string, status: Status) {
  return request.get(`${API.URL}/approval/${id}/${status}`)
}
