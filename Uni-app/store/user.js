import { defineStore } from 'pinia'

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN', 'USER_ADMIN', 'SYSTEM_ADMIN', 'CONTENT_ADMIN']
const ADMIN_CODES = ['ADMIN', 'SUPER_ADMIN', 'USER_ADMIN', 'SYSTEM_ADMIN', 'CONTENT_ADMIN']

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: uni.getStorageSync('userInfo') || null,
    userRoles: uni.getStorageSync('userRoles') || [],
    token: uni.getStorageSync('token') || null
  }),

  getters: {
    isLoggedIn: (state) => {
      return !!state.token && !!state.userInfo
    },
    username: (state) => state.userInfo ? state.userInfo.username : '',
    isAdmin: (state) => {
      const roles = state.userRoles || []
      return roles.some(role =>
        ADMIN_ROLES.includes(role.roleName) || ADMIN_CODES.includes(role.roleCode)
      )
    },
    roles: (state) => {
      return state.userRoles || []
    }
  },

  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo

      // If the backend returned a token, save it too
      if (userInfo.token) {
        this.setToken(userInfo.token)
      }

      // If the backend returned roles, save them too
      if (userInfo.roles) {
        this.setUserRoles(userInfo.roles)
      }

      // Persist to local storage
      uni.setStorageSync('userInfo', userInfo)
    },

    setUserRoles(roles) {
      this.userRoles = roles || []
      uni.setStorageSync('userRoles', roles || [])
    },

    setToken(token) {
      this.token = token
      uni.setStorageSync('token', token)
    },

    logout() {
      this.userInfo = null
      this.userRoles = []
      this.token = null

      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('userRoles')
      uni.removeStorageSync('token')
    }
  }
})
