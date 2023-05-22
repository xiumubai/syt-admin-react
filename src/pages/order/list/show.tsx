import { useCallback, useEffect, useState } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { Descriptions } from 'antd'
import { getOrderInfo } from '@/servers/order/list'
import { useLocation } from 'react-router-dom'
import { getUrlParam } from '@/utils/helper'
import BasicContent from '@/components/Content/BasicContent'
import SubmitBottom from '@/components/Bottom/SubmitBottom'
function Show() {
  useTitle('订单详情')
  const [orderInfo, setOrderInfo] = useState<any>({})
  const { search } = useLocation()
  
  const id = getUrlParam(search, 'id')
  // 父路径
  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async () => {
    try {
      const { data: { data } } = await getOrderInfo(id)
      console.log(data)
      
      setOrderInfo(data || {})
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
        <Descriptions title="订单信息" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="订单交易号">{ orderInfo?.orderInfo.outTradeNo || '-' }</Descriptions.Item>
          <Descriptions.Item label="医院名称">{ orderInfo?.orderInfo?.hosname }</Descriptions.Item>
          <Descriptions.Item label="科室名称">{ orderInfo?.orderInfo?.depname }</Descriptions.Item>
          <Descriptions.Item label="注册时间">{ orderInfo?.orderInfo?.createTime }</Descriptions.Item>
          <Descriptions.Item label="医生职称">{ orderInfo?.orderInfo?.title }</Descriptions.Item>
          <Descriptions.Item label="安排日期">{ orderInfo?.orderInfo?.reserveDate } { orderInfo?.orderInfo.reserveTime === 0 ? '上午' : '下午' }</Descriptions.Item>
          <Descriptions.Item label="预约号序">{ orderInfo?.orderInfo?.number }</Descriptions.Item>
          <Descriptions.Item label="医事服务费">{ orderInfo?.orderInfo?.amount }</Descriptions.Item>
          <Descriptions.Item label="建议取号时间">{ orderInfo?.orderInfo?.fetchTime }</Descriptions.Item>
          <Descriptions.Item label="取号地点">{ orderInfo?.orderInfo?.fetchAddress }</Descriptions.Item>
          <Descriptions.Item label="订单状态">{ orderInfo?.orderInfo?.param.orderStatusString }</Descriptions.Item>
          <Descriptions.Item label="预约时间">{ orderInfo?.orderInfo?.createTime }</Descriptions.Item>
        </Descriptions>
        <Descriptions title="就诊人信息" bordered style={{ margin: '20px 0'}}>
          <Descriptions.Item label="姓名">{ orderInfo?.patient?.name || '-' }</Descriptions.Item>
          <Descriptions.Item label="证件类型	">{ orderInfo?.patient?.param?.certificatesTypeString || '-' }</Descriptions.Item>
          <Descriptions.Item label="证件编号">{ orderInfo?.patient?.certificatesNo || '-'}</Descriptions.Item>
          <Descriptions.Item label="性别">{ orderInfo.patient.sex === 1 ? '男' : '女'}</Descriptions.Item>
          <Descriptions.Item label="出生年月">{ orderInfo?.patient?.birthdate || '-'}</Descriptions.Item>
          <Descriptions.Item label="手机号">{ orderInfo?.patient?.phone || '-'}</Descriptions.Item>
          <Descriptions.Item label="是否结婚">{ orderInfo.patient.isMarry === 1 ? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="联系人姓名">{ orderInfo?.patient?.contactsName || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系人证件类型">{ orderInfo?.patient?.param.contactsCertificatesTypeString || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系人证件号">{ orderInfo?.patient?.contactsCertificatesNo || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系人手机">{ orderInfo?.patient?.contactsPhone || '-'}</Descriptions.Item>
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