/*
 * @Author: 朽木白
 * @Date: 2023-05-22 22:17:13
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-23 11:18:03
 * @Description: 排班信息接口
 */

import type { ServerResult } from '#/public'
import { request } from '@/utils/request'
import { DepartmentList, ReqGetScheduleRuleListResponse, ScheduleList } from './interface'

enum API {
  URL = '/admin/hosp'
}

/**
 * @description 获取医院科室列表
 * @param hoscode - 医院编号
 */
export function getDepartmentList(hoscode: string) {
  return request.get<ServerResult<DepartmentList>>(`${API.URL}/department/${hoscode}`,)
}

/**
 * @description 获取预约信息列表
 * @param data - 请求数据
 */
export const getBookingScheduleRule = (
  page: number,
  pageSize: number,
  hoscode: string,
  depcode: string,
// eslint-disable-next-line max-params
) => {
  return request.get<ServerResult<ReqGetScheduleRuleListResponse>>(
    `${API.URL}/schedule/getScheduleRule/${page}/${pageSize}/${hoscode}/${depcode}`, {
  })
}

/**
 * @description 获取医生日程列表
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function getScheduleDetail(
  hoscode: string,
  depcode: string,
  workDate: string,
) {
  return request.get<ServerResult<ScheduleList>>(`${API.URL}/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`)
}
