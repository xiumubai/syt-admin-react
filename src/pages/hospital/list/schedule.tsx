import type { Key } from 'react'
import type { ScheduleRuleList, ScheduleList } from '@/servers/hospital/interface'
import { useCallback, useEffect, useState } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { useLocation } from 'react-router-dom'
import { getUrlParam } from '@/utils/helper'
import { columns } from './model'
import {
  getDepartmentList,
  getBookingScheduleRule,
  getScheduleDetail
} from '@/servers/hospital/schedule'
import { Row, Col, Table, Pagination, Tag, Tree, message} from 'antd'
import BasicContent from '@/components/Content/BasicContent'
import SubmitBottom from '@/components/Bottom/SubmitBottom'

// 初始化搜索
const initSearch = {
  page: 1,
  pageSize: 5
}

function Schedule() {
  useTitle('订单详情')
  const [departmentList, setDepartmentList] = useState<any>([])
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [depcode, setDepcode] = useState('')
  const [hosname, setHosname] = useState('')
  const [depname, setDepname] = useState('')
  const [workDate, setWorkDate] = useState('')
  const [page, setPage] = useState(initSearch.page)
  const [pageSize, setPageSize] = useState(initSearch.pageSize)
  const [total, setTotal] = useState(0)
  const [scheduleRuleList, setScheduleRuleList] = useState<ScheduleRuleList>([])
  const [scheduleList, setScheduleList] = useState<ScheduleList>([])

  const { search } = useLocation()
  const hoscode = getUrlParam(search, 'hoscode')

  /**
   * 搜索提交
   */
  const getScheduleRuleList = async (page: number, limit: number, depcode: string) => {
    try {
      const { data: { data } } = await getBookingScheduleRule(page, limit, hoscode, depcode)
      setScheduleRuleList(data.bookingScheduleList)
      setTotal(data.total)
      setPage(page)
      setPageSize(limit)
      setHosname(data.baseMap.hosname)
      if (data.total === 0) {
        message.error('当前科室没有排班数据!')
        // 清除一些老的数据
        setScheduleList([])
        setWorkDate('')
      } else {
        // 在初始显示排班规则列表后, 显示第一个规则对应的排班列表
        const workDate = data.bookingScheduleList[0].workDate
        // 保存到状态中
        setWorkDate(workDate)
        getScheduleList(depcode, workDate)
      }
    } finally {
      console.log('over')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  /**
   * @description: 定义请求获取排班列表的函数
   * @param {string} depcode
   * @param {string} workDate
   * @returns {*}
   */
  const getScheduleList = async (depcode: string, workDate: string) => {
    const { data: { data } } = await getScheduleDetail(hoscode, depcode, workDate)
    setScheduleList(data)
  }

  /**
   * @description: 获取科室信息
   * @returns {*}
   */  
  const getDepartmentListHandle = useCallback(async() => {
    try {
      const { data:  { data } } = await getDepartmentList(hoscode)
      // 一级科室节点是禁用状态, 给一级数据对象添加一个disabled为true的属性
      setDepartmentList(data.map(item => ({...item, disabled: true})))
      setExpandedKeys(data.map(item => item.depcode))

      // 如果当前医院没有科室数据, 提示一下
      if (data.length === 0) {
        message.error('当前医院还没有添加科室')
        return
      }

      // 将第一个科室的第一个子科室的depcode保存到状态中
      if (data[0].children) {
        const {depcode, depname} = data[0].children[0]
        setDepcode(depcode)
        setDepname(depname)

        // 获取对应的排班规则列表
        getScheduleRuleList(1, 5, depcode)
      }

    } finally {
      console.log('over')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    getDepartmentListHandle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 返回父级页面
   * @param isRefresh - 返回页面是否重新加载接口
   */
  const goBack = () => {
    window.history.back()
  }

  const onSelect = (selectedKeys: Key[], event: any) => {
    if (selectedKeys.length === 0) return

    // 得到点击科室的depcode
    const depcode = selectedKeys[0] as string // selectedKeys  ['200004057']
    // 保存到state中 => 就会选中
    setDepcode(depcode)
    // 得到科室的名称
    const depname = event.node.depname
    // 更新到状态中
    setDepname(depname)

    // 重新获取排班规则列表显示
    getScheduleRuleList(1, 5, depcode)
  }

  const treeHeight = document.documentElement.clientHeight - 64 - 44 - 48 - 36

  return (
    <BasicContent>
      <>
        <div className='mb-16px mt-16px'>选择：{hosname} / {depname} / {workDate}</div>
        <Row gutter={20}>
          <Col span={5}>
            <div style={{
              height: treeHeight,
              overflowY: 'scroll'
            }}>
              <Tree
                treeData={departmentList as []} 
                fieldNames={{key: 'depcode', title: 'depname'}}
                expandedKeys={expandedKeys}
                selectedKeys={[depcode]}
                onSelect={onSelect}
              />  
            </div>
          </Col>
          <Col span={19}>
            {
              scheduleRuleList.map((item: any) => (
                <Tag
                  key={item.workDate}
                  color={workDate === item.workDate ? 'green' : ''}
                  onClick={() => {
                    if (item.workDate !== workDate) { 
                      // 点击的不是当前的
                      setWorkDate(item.workDate)
                      // 重新获取排班列表显示
                      getScheduleList(depcode, item.workDate)
                    }
                  }}
                >
                  <div>{item.workDate} {item.dayOfWeek}</div>
                  <div>{item.availableNumber} / {item.reservedNumber}</div>
                </Tag>
              ))
            }

            <Pagination
              style={{margin: '20px 0'}}
              current={page}
              pageSize={pageSize}
              total={total}
              pageSizeOptions={[5, 10, 15]}
              showSizeChanger
              onChange={(page, pageSize) => getScheduleRuleList(page, pageSize, depcode)}
            />

            <Table
              dataSource={scheduleList}
              columns={columns}
              pagination={false}
              rowKey='id'
            />
          </Col>
        </Row>
        <SubmitBottom
          isSubmit={false}
          goBack={() => goBack()}
        />
      </>
    </BasicContent>
  )
}

export default Schedule
