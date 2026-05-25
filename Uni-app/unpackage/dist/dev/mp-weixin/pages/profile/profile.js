"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const showEditModal = common_vendor.ref(false);
    const editForm = common_vendor.ref({
      nickname: "",
      phone: "",
      email: ""
    });
    const userStore = store_user.useUserStore();
    const isLoggedIn = common_vendor.computed(() => userStore.isLoggedIn);
    const userInfo = common_vendor.computed(() => userStore.userInfo || {});
    const userNameFirstChar = common_vendor.computed(() => {
      const name = userInfo.value.nickname || userInfo.value.username || "";
      return name ? name.charAt(0).toUpperCase() : "用";
    });
    const stats = common_vendor.ref({
      identificationCount: 0,
      emergencyCount: 0,
      favoriteCount: 0
    });
    const getRoleText = (role) => {
      const roleMap = {
        "ADMIN": "管理员",
        "USER": "普通用户",
        "VIP": "VIP 用户"
      };
      return roleMap[role] || "用户";
    };
    const navigateTo = async (page) => {
      if (!isLoggedIn.value) {
        navigateToLogin();
        return;
      }
      switch (page) {
        case "identification":
          common_vendor.index.showToast({ title: "识别记录功能开发中", icon: "none" });
          break;
        case "emergency":
          common_vendor.index.switchTab({ url: "/pages/emergency/emergency" });
          break;
        case "warnings":
          common_vendor.index.showToast({ title: "预警记录功能开发中", icon: "none" });
          break;
        case "favorites":
          common_vendor.index.navigateTo({ url: "/pages/favorites/favorites" });
          break;
        case "hospital":
          common_vendor.index.switchTab({ url: "/pages/hospital/hospital" });
          break;
        case "serum":
          common_vendor.index.showToast({ title: "血清查询功能开发中", icon: "none" });
          break;
        case "settings":
          common_vendor.index.showToast({ title: "设置功能开发中", icon: "none" });
          break;
        case "feedback":
          common_vendor.index.showToast({ title: "意见反馈功能开发中", icon: "none" });
          break;
        case "about":
          common_vendor.index.showModal({
            title: "关于蛇灵",
            content: "蛇灵 - 智能蛇类识别与应急指导系统\n\n版本：v1.0.0\n\n提供蛇类识别、应急处理指南、血清查询等功能，帮助您安全应对蛇类相关紧急情况。",
            showCancel: false
          });
          break;
        default:
          common_vendor.index.showToast({ title: `${page}功能开发中`, icon: "none" });
      }
    };
    const navigateToLogin = () => {
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    };
    const showEditProfile = () => {
      if (!isLoggedIn.value) {
        navigateToLogin();
        return;
      }
      editForm.value = {
        nickname: userInfo.value.nickname || "",
        phone: userInfo.value.phone || "",
        email: userInfo.value.email || ""
      };
      showEditModal.value = true;
    };
    const closeEditModal = () => {
      showEditModal.value = false;
    };
    const saveProfile = async () => {
      try {
        await utils_api.userApi.updateUserInfo({
          id: userInfo.value.id,
          ...editForm.value
        });
        userStore.setUserInfo({
          ...userInfo.value,
          ...editForm.value
        });
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        closeEditModal();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/profile/profile.vue:358", "保存失败:", error);
        common_vendor.index.showToast({
          title: "保存失败：" + (error.message || "未知错误"),
          icon: "none",
          duration: 3e3
        });
      }
    };
    const changePassword = () => {
      if (!isLoggedIn.value) {
        navigateToLogin();
        return;
      }
      common_vendor.index.showModal({
        title: "修改密码",
        editable: true,
        placeholderText: "请输入新密码",
        success: async (res) => {
          if (res.confirm && res.content) {
            try {
              await utils_api.userApi.changePassword({
                userId: userInfo.value.id,
                newPassword: res.content
              });
              common_vendor.index.showToast({
                title: "修改成功",
                icon: "success"
              });
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/profile/profile.vue:390", "修改密码失败:", error);
              common_vendor.index.showToast({
                title: "修改失败：" + (error.message || "未知错误"),
                icon: "none",
                duration: 3e3
              });
            }
          }
        }
      });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: async (res) => {
          if (res.confirm) {
            userStore.logout();
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/login"
              });
            }, 1500);
          }
        }
      });
    };
    const loadStats = async () => {
      if (!isLoggedIn.value)
        return;
      try {
        const userId = userInfo.value.id;
        let recognitionCount = 0;
        try {
          const recognitionRes = await utils_api.recognitionApi.getRecordsByUser(userId);
          recognitionCount = Array.isArray(recognitionRes == null ? void 0 : recognitionRes.data) ? recognitionRes.data.length : Array.isArray(recognitionRes) ? recognitionRes.length : 0;
        } catch (e) {
          common_vendor.index.__f__("error", "at pages/profile/profile.vue:438", "Failed to load recognition records:", e);
        }
        const emergencyHistory = common_vendor.index.getStorageSync("emergency_name_history") || [];
        const emergencyCount = Array.isArray(emergencyHistory) ? emergencyHistory.length : 0;
        const favorites = common_vendor.index.getStorageSync("favorites") || [];
        const favoriteCount = Array.isArray(favorites) ? favorites.length : 0;
        stats.value = {
          identificationCount: recognitionCount,
          emergencyCount,
          favoriteCount
        };
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/profile/profile.vue:455", "加载统计数据失败:", error);
        const emergencyHistory = common_vendor.index.getStorageSync("emergency_name_history") || [];
        const favorites = common_vendor.index.getStorageSync("favorites") || [];
        stats.value = {
          identificationCount: 0,
          emergencyCount: Array.isArray(emergencyHistory) ? emergencyHistory.length : 0,
          favoriteCount: Array.isArray(favorites) ? favorites.length : 0
        };
      }
    };
    common_vendor.onMounted(() => {
      if (isLoggedIn.value) {
        loadStats();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value.avatar
      }, userInfo.value.avatar ? {
        b: userInfo.value.avatar
      } : {
        c: common_vendor.t(userNameFirstChar.value)
      }, {
        d: common_vendor.t(userInfo.value.nickname || userInfo.value.username || "点击登录"),
        e: common_vendor.t(getRoleText(userInfo.value.role)),
        f: userInfo.value.phone
      }, userInfo.value.phone ? {
        g: common_vendor.t(userInfo.value.phone)
      } : {}, {
        h: common_vendor.o(showEditProfile, "57"),
        i: common_vendor.t(stats.value.identificationCount),
        j: common_vendor.t(stats.value.emergencyCount),
        k: common_vendor.t(stats.value.favoriteCount),
        l: stats.value.identificationCount > 0
      }, stats.value.identificationCount > 0 ? {
        m: common_vendor.t(stats.value.identificationCount)
      } : {}, {
        n: common_vendor.o(($event) => navigateTo("identification"), "c6"),
        o: stats.value.emergencyCount > 0
      }, stats.value.emergencyCount > 0 ? {
        p: common_vendor.t(stats.value.emergencyCount)
      } : {}, {
        q: common_vendor.o(($event) => navigateTo("emergency"), "46"),
        r: common_vendor.o(($event) => navigateTo("warnings"), "4d"),
        s: stats.value.favoriteCount > 0
      }, stats.value.favoriteCount > 0 ? {
        t: common_vendor.t(stats.value.favoriteCount)
      } : {}, {
        v: common_vendor.o(($event) => navigateTo("favorites"), "aa"),
        w: common_vendor.o(($event) => navigateTo("hospital"), "cf"),
        x: common_vendor.o(($event) => navigateTo("serum"), "6a"),
        y: common_vendor.o(showEditProfile, "6b"),
        z: common_vendor.o(changePassword, "16"),
        A: common_vendor.o(($event) => navigateTo("feedback"), "45"),
        B: common_vendor.o(($event) => navigateTo("about"), "a7"),
        C: isLoggedIn.value
      }, isLoggedIn.value ? {
        D: common_vendor.o(logout, "97")
      } : {}, {
        E: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        F: common_vendor.o(navigateToLogin, "8d")
      } : {}, {
        G: showEditModal.value
      }, showEditModal.value ? {
        H: common_vendor.o(closeEditModal, "01"),
        I: editForm.value.nickname,
        J: common_vendor.o(($event) => editForm.value.nickname = $event.detail.value, "f1"),
        K: editForm.value.phone,
        L: common_vendor.o(($event) => editForm.value.phone = $event.detail.value, "c2"),
        M: editForm.value.email,
        N: common_vendor.o(($event) => editForm.value.email = $event.detail.value, "b3"),
        O: common_vendor.o(closeEditModal, "ed"),
        P: common_vendor.o(saveProfile, "79"),
        Q: common_vendor.o(() => {
        }, "0d"),
        R: common_vendor.o(closeEditModal, "7e")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
