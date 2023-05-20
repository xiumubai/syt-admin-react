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
      setTableData(data)
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <BasicContent>
      <Table
        columns={tableColumns} 
        dataSource={tableData} 
        bordered
        pagination={false}
        rowKey="id"
        expandable={{
          expandIcon: ({expanded, record, onExpand}) => {
            console.log(record)
            
            // 如果当前节点标识没有孩子, 不需要返回图标显示  => 让标题同级对齐
            if (!record.hasChildren) {
              return <span style={{display: 'inline-block', width: 24}}></span>
            }
            if (expanded) { // 当前是展开的状态
              // 点击此图标不需要请求加载子列表
              return <DownOutlined style={{marginRight: 10}} onClick={(e) => onExpand(record, e)} />
            }
            // 点击此图标很可能需要请求加载子列表
            return <RightOutlined style={{marginRight: 10}} onClick={async (e) => {
              // 标识有孩子, 但还没有, 请求获取子列表
              if (record.hasChildren && record.children) {
                const childList = await getDictList(record.id)
                // 如果字典项的hasChildren为true, 给它添加一个children属性, 值为[]
                childList.forEach(item => {
                  if (item.hasChildren) {
                    item.children = []
                  }
                })
                // 添加为当前字典项的孩子
                record.children = childList
              }
              // 切换图标
              onExpand(record, e)
            }} />
          }
        }}
      />
    </BasicContent>
  )
}

export default Dict