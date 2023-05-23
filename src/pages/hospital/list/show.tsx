import { useCallback, useEffect, useState } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { Descriptions } from 'antd'
import { getHosInfo } from '@/servers/hospital/list'
import { useLocation } from 'react-router-dom'
import { getUrlParam } from '@/utils/helper'
import BasicContent from '@/components/Content/BasicContent'
import SubmitBottom from '@/components/Bottom/SubmitBottom'
function Show() {
  useTitle('医院详情')
  const [hosInfo, setHosInfo] = useState<any>({})
  const { search } = useLocation()
  
  const id = getUrlParam(search, 'id')

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async () => {
    try {
      const { data: { data } } = await getHosInfo(id)
      setHosInfo(data || {})
    } finally {
      console.log('over')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  /**
   * 返回父级页面
   * @param isRefresh - 返回页面是否重新加载接口
   */
  const goBack = () => {
    window.history.back()
  }

  return (
    <BasicContent>
      <>
        <Descriptions title="基本信息" bordered column={4}>
          <Descriptions.Item label="医院名称" span={2}>{ hosInfo?.hospital?.hosname }</Descriptions.Item>
          <Descriptions.Item label="医院logo" span={2}>
            <img
              src={`data:image/png;base64,${hosInfo?.hospital?.logoData}`}
              style={{width: '80px', height: '80px'}}
            />
          </Descriptions.Item>
          <Descriptions.Item label="医院编号" span={2}>{ hosInfo?.hospital?.hoscode }</Descriptions.Item>
          <Descriptions.Item label="医院地址" span={2}>{ hosInfo?.hospital?.param.fullAddress }</Descriptions.Item>
          <Descriptions.Item label="坐车路线" span={4}>{ hosInfo?.hospital?.route }</Descriptions.Item>
          <Descriptions.Item label="医院简介" span={4}>{ hosInfo?.hospital?.intro }</Descriptions.Item>
          <Descriptions.Item label="坐车路线" span={4}>{ hosInfo?.hospital?.route }</Descriptions.Item>
        </Descriptions>
        <Descriptions title="预约规则信息" column={4} bordered style={{ margin: '20px 0'}}>
          <Descriptions.Item label="预约周期" span={2}>{ hosInfo?.bookingRule?.cycle }天</Descriptions.Item>
          <Descriptions.Item label="放号时间" span={2}>{ hosInfo?.bookingRule?.releaseTime }</Descriptions.Item>
          <Descriptions.Item label="停挂时间" span={2}>{ hosInfo?.bookingRule?.stopTime }</Descriptions.Item>
          <Descriptions.Item label="退号时间" span={2}>{ hosInfo?.bookingRule?.quitTime }</Descriptions.Item>
          <Descriptions.Item label="医院编号" span={4}>{ hosInfo?.bookingRule?.hoscode }</Descriptions.Item>
        </Descriptions>
        <SubmitBottom
          isSubmit={false}
          goBack={() => goBack()}
        />
      </>
    </BasicContent>
  )
}

export default Show