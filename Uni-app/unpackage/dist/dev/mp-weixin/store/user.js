"use strict";
const common_vendor = require("../common/vendor.js");
const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN", "USER_ADMIN", "SYSTEM_ADMIN", "CONTENT_ADMIN"];
const ADMIN_CODES = ["ADMIN", "SUPER_ADMIN", "USER_ADMIN", "SYSTEM_ADMIN", "CONTENT_ADMIN"];
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    userInfo: common_vendor.index.getStorageSync("userInfo") || null,
    userRoles: common_vendor.index.getStorageSync("userRoles") || [],
    token: common_vendor.index.getStorageSync("token") || null
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.token && !!state.userInfo;
    },
    username: (state) => state.userInfo ? state.userInfo.username : "",
    isAdmin: (state) => {
      const roles = state.userRoles || [];
      return roles.some(
        (role) => ADMIN_ROLES.includes(role.roleName) || ADMIN_CODES.includes(role.roleCode)
      );
    },
    roles: (state) => {
      return state.userRoles || [];
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      if (userInfo.token) {
        this.setToken(userInfo.token);
      }
      if (userInfo.roles) {
        this.setUserRoles(userInfo.roles);
      }
      common_vendor.index.setStorageSync("userInfo", userInfo);
    },
    setUserRoles(roles) {
      this.userRoles = roles || [];
      common_vendor.index.setStorageSync("userRoles", roles || []);
    },
    setToken(token) {
      this.token = token;
      common_vendor.index.setStorageSync("token", token);
    },
    logout() {
      this.userInfo = null;
      this.userRoles = [];
      this.token = null;
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.removeStorageSync("userRoles");
      common_vendor.index.removeStorageSync("token");
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/user.js.map
