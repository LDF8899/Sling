import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    userRoles: [],
    token: localStorage.getItem('token') || null
  }),

  persist: {
    key: 'user-store',
    storage: localStorage,
    pick: ['userInfo', 'userRoles', 'token']
  },

  getters: {
    isLoggedIn: (state) => {
      return !!state.token || !!state.userInfo
    },
    username: (state) => state.userInfo ? state.userInfo.username : '',
    isAdmin: (state) => {
      const roles = state.userRoles || []
      return roles.some(role =>
        role.roleName === 'ADMIN' ||
        role.roleName === 'SUPER_ADMIN' ||
        role.roleName === 'USER_ADMIN' ||
        role.roleName === 'SYSTEM_ADMIN' ||
        role.roleName === 'CONTENT_ADMIN' ||
        role.roleCode === 'ADMIN' ||
        role.roleCode === 'SUPER_ADMIN' ||
        role.roleCode === 'USER_ADMIN' ||
        role.roleCode === 'SYSTEM_ADMIN' ||
        role.roleCode === 'CONTENT_ADMIN'
      )
    },
    isRescuer: (state) => {
      const roles = state.userRoles || []
      return roles.some(role =>
        role.roleName === 'RESCUER' ||
        role.roleCode === 'RESCUER'
      )
    },
    roles: (state) => {
      return state.userRoles || []
    }
  },

  actions: {
    setUser(userInfo) {
      this.userInfo = userInfo
    },

    setUserRoles(roles) {
      this.userRoles = roles || []
    },

    setToken(token) {
      this.token = token
    },

    setUserInfo(userInfo) {
      this.userInfo = userInfo
      if (userInfo.token) {
        this.setToken(userInfo.token)
      }
      if (userInfo.roles) {
        this.setUserRoles(userInfo.roles)
      }
    },

    logout() {
      this.userInfo = null
      this.userRoles = []
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userRoles')
    }
  }
})
