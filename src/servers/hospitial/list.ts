import type { FormData } from '#/form'
import type { PageServerResult, PaginationData, Status } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/hosp/hospital'
}

/**
 * 查询医院设置列表
 * @param data - 请求数据
 */
export const getHospitalList = (data: Partial<FormData> & PaginationData) => {
  return request.get<PageServerResult<FormData[]>>(
    `${API.URL}/${data.page}/${data.pageSize}`, {
    params: {
      provinceCode: data.provinceCode,
      hoscode: data.cityCode,
      districtCode: data.districtCode,
      hosname: data.hosname,
    }
  })
}

/**
 * 更新医院上下线状态
 * @param data - 请求数据
 */
export function updateHosStatus(id: string, status: Status) {
  return request.get(`${API.URL}/updateStatus/${id}/${status}`)
}
