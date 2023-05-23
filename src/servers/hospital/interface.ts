export interface ScheduleRuleItem {
  workDate: string; // 工作日期 号源时间 
  dayOfWeek: string; // 星期几
  reservedNumber: 100; // 预约号的总数量
  availableNumber: 38; // 预约号的剩余数量
}

// 排班规则的列表类型
export type ScheduleRuleList = ScheduleRuleItem[]

// 排班规则分页列表响应数据类型
export interface ReqGetScheduleRuleListResponse {
  total: number; // 总数量
  bookingScheduleList: ScheduleRuleList; // 当前页排班规则列表
  baseMap: {
    hosname: string; // 医院名称
  };
}

// 单个医生排班项类型
export interface ScheduleItem {
  id: string;
  title: string; // 职位
  workDate: string; // 号源时间
  reservedNumber: number; // 总预约数
  availableNumber: number; // 剩余预约数
  amount: number; // 挂号费
  skill: string; // 擅长技能
  docname: string; // 医生姓名
}

// 医生排班列表类型
export type ScheduleList = ScheduleItem[]

/* 
单个科室
*/
export interface DepartmentItem {
  depcode: string; // 科室编码   => key
  depname: string; //  科室名称  => title
  children: DepartmentList | null; // 子科室列表 或 null
}

/* 
科室列表
*/
export type DepartmentList = DepartmentItem[];