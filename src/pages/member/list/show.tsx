import { detailColumns } from './model'
import { useCallback, useEffect, useState } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { Descriptions } from 'antd'
import { getMemberInfo } from '@/servers/member/list'
import { useLocation } from 'react-router-dom'
import { getUrlParam } from '@/utils/helper'
import BasicContent from '@/components/Content/BasicContent'
import SubmitBottom from '@/components/Bottom/SubmitBottom'
import BasicTable from '@/components/Table/BasicTable'
function Show() {
  useTitle('会员详情')
  const [memberInfo, setMemberInfo] = useState<any>({})
  const { search } = useLocation()
  
  const id = getUrlParam(search, 'id')
  // 父路径
  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async () => {
    try {
      const { data: { data } } = await getMemberInfo(id)
      console.log(data)
      
      setMemberInfo(data || {})
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
        <Descriptions title="用户信息" column={4} bordered>
          <Descriptions.Item label="姓名" span={2}>{ memberInfo?.userInfo?.name || '-' }</Descriptions.Item>
          <Descriptions.Item label="手机号" span={2}>{ memberInfo?.userInfo?.phone }</Descriptions.Item>
          <Descriptions.Item label="状态" span={2}>{ memberInfo?.userInfo?.authStatus === 1 ? '正常' : '锁定' }</Descriptions.Item>
          <Descriptions.Item label="注册时间" span={2}>{ memberInfo?.userInfo?.createTime }</Descriptions.Item>
        </Descriptions>
        <Descriptions title="认证信息" bordered style={{ margin: '20px 0'}}>
          <Descriptions.Item label="姓名" span={2}>{ memberInfo?.userInfo?.name || '-' }</Descriptions.Item>
          <Descriptions.Item label="证件类型" span={2}>{ memberInfo?.userInfo?.param?.certificatesTypeString || '-' }</Descriptions.Item>
          <Descriptions.Item label="证件号" span={2}>{ memberInfo?.userInfo?.certificatesNo || '-'}</Descriptions.Item>
          <Descriptions.Item label="证件图片" span={2}>
            {
              memberInfo?.userInfo?.certificatesUrl &&
              <img
                src={memberInfo.userInfo?.certificatesUrl}
                style={{ width: '80px', height: '80px' }}
              />
            }
          </Descriptions.Item>
        </Descriptions>
        <BasicTable
          columns={detailColumns()}
          pagination={false}
          dataSource={memberInfo.patientList}
        />
        <SubmitBottom
          isSubmit={false}
          goBack={() => goBack()}
        />
      </>
    </BasicContent>
  )
}

export default Show