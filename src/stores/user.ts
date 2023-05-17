import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // 用户菜单权限
    permissions: [],
    // 用户按钮权限
    buttons: [],
    // 用户信息
    userInfo: {
      avatar: '',
      name: '',
    }
  },
  reducers: {
    /** 设置用户信息 */
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    /** 设置权限 */
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
    setButtons: (state, action) => {
      state.buttons = action.payload
    },
    /** 清除用户信息 */
    clearInfo: (state) => {
      state.userInfo = {
        avatar: '',
        name: ''
      }
    }
  }
})

export const {
  setUserInfo,
  setPermissions,
  setButtons,
  clearInfo
} = userSlice.actions

export default userSlice.reducer