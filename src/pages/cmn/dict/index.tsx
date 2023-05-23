import type { DictList } from '@/servers/cmn/interface'
import { useCallback, useEffect, useState } from 'react'
import { tableColumns } from './model'
import { useTitle } from '@/hooks/useTitle'
import { getDictList } from '@/servers/cmn/dict'
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons"
import Table from "antd/lib/table"
import BasicContent from '@/components/Content/BasicContent'
function Dict() {
  useTitle('数据字典')
  const [isLoading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<DictList>([])
  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async () => {
    try {
      setLoading(true)
      const { data: { data } } = await getDictList('1')
      data.forEach(item => {
        // 一级如果有children，增加一个children属性
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
          expandIcon: ({ expanded, onExpand, record }) => {
            
            // 无子节点
            if (!record.hasChildren) {
              return <span style={{display: 'inline-block', width: 24}}></span>
            }

            // 展开状态
            if (expanded) {
              return <MinusCircleTwoTone style={{marginRight: 24}} onClick={(e) => onExpand(record, e)} />
            }

            return (
              <PlusCircleTwoTone style={{marginRight: 24}} onClick={async (e) => {
                // 标识有孩子, 但还没有, 请求获取子列表
                if (record.hasChildren && record?.children?.length === 0) {
                  const { data: { data } } = await getDictList(record.id)
                  // 如果字典项的hasChildren为true, 给它添加一个children属性, 值为[]
                  data.forEach(item => {
                    if (item.hasChildren) {
                      item.children = []
                    }
                  })
                  // 添加为当前字典项的孩子
                  record.children = data
                }
                // 切换图标
                onExpand(record, e)
              }} />
            )
          }
        }}
      />
    </BasicContent>
  )
}

export default Dict