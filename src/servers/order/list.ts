import type { FormData } from '#/form'
import type { PageServerResult, PaginationData, Status } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/order/orderInfo'
}

/**
 * 查询医院设置列表
 * @param data - 请求数据
 */
export const getOrderList = (data: Partial<FormData> & PaginationData) => {
  return request.get<PageServerResult<FormData[]>>(
    `${API.URL}/${data.page}/${data.pageSize}`, {
    params: {
      hosname: data.hosname,
      outTradeNo: data.outTradeNo,
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

/**
 * 订单详情信息
 * @param data - 请求数据
 */
export function getOrderInfo(id: string) {
  return request.get(`${API.URL}/show/${id}`)
}
