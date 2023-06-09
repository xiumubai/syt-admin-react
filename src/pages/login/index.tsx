import type { LoginData } from './model'
import type { FormProps } from 'antd'
import type { AppDispatch } from '@/stores'
import type { ThemeType } from '@/stores/public'
// import { message } from 'antd'
import { Form, Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { THEME_KEY } from '@/utils/config'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/servers/login'
import { useTitle } from '@/hooks/useTitle'
import { useToken } from '@/hooks/useToken'
import { setThemeValue } from '@/stores/public'
import { permissionsToArray } from '@/utils/permissions'
import { setPermissions, setButtons, setUserInfo } from '@/stores/user'
import { useCommonStore } from '@/hooks/useCommonStore'
import { getUserInfo } from '@/servers/permissions'
import { getFirstMenu } from '@/menus/utils/helper'
import { defaultMenus } from '@/menus'
import Logo from '@/assets/images/logo.svg'
import styles from './index.module.less'

function Login() {
  useTitle('登录')
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [getToken, setToken] = useToken()
  const [isLoading, setLoading] = useState(false)
  const { permissions } = useCommonStore()
  const themeCache = (localStorage.getItem(THEME_KEY) || 'light') as ThemeType

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, 'light')
    }
    if (themeCache === 'dark') {
      document.body.className = 'theme-dark'
    }
    dispatch(setThemeValue(themeCache === 'dark' ? 'dark' : 'light'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeCache])

  useEffect(() => {
    // 如果存在token，则直接进入页面
    if (getToken()) {
      // 如果不存在缓存则获取权限
      if (!permissions.length) {
        getUserPermissions()
      } else {
        // 有权限则直接跳转
        const firstMenu = getFirstMenu(defaultMenus, permissions)
        navigate(firstMenu)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 获取用户信息和权限信息 */
  const getUserPermissions = async () => {
    try {
      setLoading(true)
      const { data } = await getUserInfo()
      if (data) {
        const { data : {name, avatar, routes, buttons } } = data
        const newPermissions = permissionsToArray(routes || [])
        
        const firstMenu = getFirstMenu(defaultMenus, newPermissions)
        dispatch(setUserInfo({name, avatar}))
        dispatch(setPermissions(newPermissions))
        dispatch(setButtons(buttons))
        navigate(firstMenu)
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理登录
   * @param values - 表单数据提交
   */
  const handleFinish: FormProps['onFinish'] = async (values: LoginData) => {
    try {
      setLoading(true)
      const { data } = await login(values)
      setToken(data?.data)
      getUserPermissions()
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理失败
   * @param errors - 错误信息
   */
  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.error('错误信息:', errors)
  }

  return (
    <>
      <div className={`
        ${themeCache === 'dark' ? 'bg-black text-white' : 'bg-light-400'}
        w-screen
        h-screen
        relative
        ${styles.login_bg}
      `}>
        <div className={`
          w-400px
          h-320px
          p-30px
          rounded-5px
          ${themeCache === 'dark' ? 'bg-black bg-dark-200' : 'bg-white'}
          box-border
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        `}>
         <div className="pb-30px pt-10px flex items-center justify-center">
            <img
              className="mr-2 object-contain"
              width="30"
              height="30"
              src={Logo}
              alt="LOGO"
            />
            <span className="text-xl font-bold tracking-2px">尚医通</span>
          </div>
          <Form
            name="horizontal_login"
            autoComplete="on"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            initialValues={{
              username: 'admin',
              password: '111111'
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                allow-clear="true"
                placeholder="用户名"
                data-test="username"
                autoComplete="username"
                addonBefore={<UserOutlined className='change' />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
              ]}
            >
              <Input.Password
                placeholder="密码"
                autoComplete="current-password"
                addonBefore={<LockOutlined className='change' />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-5px rounded-5px tracking-2px"
                loading={isLoading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login