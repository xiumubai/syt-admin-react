import type { FormData } from '#/form'
import type { PageServerResult, PaginationData } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/hosp/hospitalSet'
}

/**
 * 查询医院设置列表
 * @param data - 请求数据
 */
export const getHospitalSetList = (data: Partial<FormData> & PaginationData) => {
  return request.get<PageServerResult<FormData[]>>(
    `${API.URL}/${data.page}/${data.pageSize}`, {
    params: {
      hosname: data.hosname,
      hoscode: data.hoscode
    }
  })
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createHos(data: FormData) {
  return request.post(`${API.URL}/save`, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateHos(data: FormData) {
  return request.put(`${API.URL}/update`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteHos(id: string) {
  return request.delete(`${API.URL}/remove/${id}`)
}
