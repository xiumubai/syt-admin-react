import type { FormData } from '#/form'
import { useCallback, useEffect, useState } from 'react'
import { tableColumns } from './model'
import { useTitle } from '@/hooks/useTitle'
import { getDictList } from '@/servers/cmn/dict'
import { DownOutlined, RightOutlined } from "@ant-design/icons"
import Table from "antd/lib/table"
import BasicContent from '@/components/Content/BasicContent'
function Dict() {
  useTitle('数据字典')
  const [isLoading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<FormData[]>([])
  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async () => {
    try {
      setLoading(true)
      const { data: { data } } = await getDictList(1)
      data.forEach(item => {
        if (item.hasChildren) {
          item.children = []
        }
      })
      setTableData(data)
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  // 处理展开事件
  const handleExpand = async (expanded: boolean, record: FormData) => {
    if(!expanded) return //如果是关闭就返回
    if(record.children && record.children.length > 0) return //如果已经有数据就返回
    try {
      setLoading(true)
      const { data: { data } } = await getDictList(record.id)
      data.forEach(item => {
        if (item.hasChildren) {
          item.children = []
        }
      })
      const list = tableData
      list.forEach((item) => {
        if (item.id === record.id) {
          item.children = data
        }
      })
      setTableData(list)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BasicContent>
      <Table
        columns={tableColumns} 
        dataSource={tableData} 
        bordered
        pagination={false}
        rowKey="id"
        loading={isLoading}
        expandable={{
          onExpand: handleExpand,
        }}
      />
    </BasicContent>
  )
}

export default Dict