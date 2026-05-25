"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const utils_api = require("../../utils/api.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const loading = common_vendor.ref(false);
    const loginForm = common_vendor.ref({
      username: "",
      password: ""
    });
    const handleLogin = async () => {
      if (!loginForm.value.username || !loginForm.value.password) {
        common_vendor.index.showToast({ title: "请输入账号密码", icon: "none" });
        return;
      }
      loading.value = true;
      try {
        const response = await utils_api.api.user.login(loginForm.value);
        if (response.code === 200) {
          userStore.setUserInfo(response.data.user);
          userStore.setUserRoles(response.data.roles || []);
          if (response.data.token) {
            userStore.setToken(response.data.token);
          }
          common_vendor.index.showToast({ title: "登录成功", icon: "success" });
          setTimeout(() => {
            common_vendor.index.reLaunch({ url: "/pages/index/index" });
          }, 500);
        } else {
          common_vendor.index.showToast({ title: response.message || "登录失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:193", "Login error:", error);
        common_vendor.index.showToast({ title: "账号或密码错误", icon: "none" });
      } finally {
        loading.value = false;
      }
    };
    const handleWechatLogin = async () => {
      loading.value = true;
      try {
        const loginRes = await common_vendor.index.login({ provider: "weixin" });
        const response = await utils_api.api.user.wechatLogin({
          code: loginRes.code
        });
        if (response.code === 200) {
          userStore.setUserInfo(response.data.user);
          userStore.setUserRoles(response.data.roles || []);
          if (response.data.token) {
            userStore.setToken(response.data.token);
          }
          common_vendor.index.showToast({ title: "微信登录成功", icon: "success" });
          setTimeout(() => {
            common_vendor.index.reLaunch({ url: "/pages/index/index" });
          }, 500);
        } else {
          common_vendor.index.showToast({ title: response.message || "微信登录失败", icon: "none" });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:231", "WeChat login error:", err);
        common_vendor.index.showToast({ title: "微信登录失败", icon: "none" });
      } finally {
        loading.value = false;
      }
    };
    const goToRegister = () => {
      common_vendor.index.showToast({
        title: "注册功能开发中，请使用微信登录",
        icon: "none",
        duration: 2e3
      });
    };
    common_vendor.onMounted(() => {
      if (userStore.isLoggedIn) {
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loginForm.value.username,
        b: common_vendor.o(($event) => loginForm.value.username = $event.detail.value, "7c"),
        c: loginForm.value.password,
        d: common_vendor.o(($event) => loginForm.value.password = $event.detail.value, "97"),
        e: !loading.value
      }, !loading.value ? {} : {}, {
        f: loading.value,
        g: common_vendor.o(handleLogin, "5e"),
        h: common_vendor.o(handleWechatLogin, "97"),
        i: common_vendor.o(goToRegister, "1f")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
