"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_helpers = require("../../utils/helpers.js");
const _sfc_main = {
  __name: "favorites",
  setup(__props) {
    const favorites = common_vendor.ref([]);
    const loadFavorites = () => {
      const data = common_vendor.index.getStorageSync("favorites") || [];
      favorites.value = Array.isArray(data) ? data : [];
    };
    const formatTime = (timestamp) => {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      const minute = 60 * 1e3;
      const hour = 60 * minute;
      const day = 24 * hour;
      if (diff < minute) {
        return "刚刚";
      } else if (diff < hour) {
        return Math.floor(diff / minute) + "分钟前";
      } else if (diff < day) {
        return Math.floor(diff / hour) + "小时前";
      } else if (diff < 7 * day) {
        return Math.floor(diff / day) + "天前";
      } else {
        return date.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
    };
    const viewDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/snake-detail/snake-detail?snakeName=${encodeURIComponent(item.snakeName)}`
      });
    };
    const removeFavorite = (index) => {
      common_vendor.index.showModal({
        title: "确认移除",
        content: `确定要移除"${favorites.value[index].snakeName}"吗？`,
        success: (res) => {
          if (res.confirm) {
            favorites.value.splice(index, 1);
            common_vendor.index.setStorageSync("favorites", favorites.value);
            common_vendor.index.showToast({
              title: "已移除",
              icon: "success"
            });
            updateProfileStats();
          }
        }
      });
    };
    const clearAll = () => {
      common_vendor.index.showModal({
        title: "确认清空",
        content: "确定要清空所有收藏吗？此操作不可恢复！",
        confirmColor: "#ef4444",
        success: (res) => {
          if (res.confirm) {
            favorites.value = [];
            common_vendor.index.removeStorageSync("favorites");
            common_vendor.index.showToast({
              title: "已清空",
              icon: "success"
            });
            updateProfileStats();
          }
        }
      });
    };
    const updateProfileStats = () => {
      common_vendor.index.$emit("updateStats");
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const goToExhibition = () => {
      common_vendor.index.navigateTo({
        url: "/pages/exhibition/exhibition"
      });
    };
    common_vendor.onLoad(() => {
      loadFavorites();
    });
    common_vendor.onMounted(() => {
      loadFavorites();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack, "dd"),
        b: favorites.value.length > 0
      }, favorites.value.length > 0 ? {
        c: common_vendor.o(clearAll, "5a")
      } : {}, {
        d: favorites.value.length === 0
      }, favorites.value.length === 0 ? {
        e: common_vendor.o(goToExhibition, "ef")
      } : {
        f: common_vendor.f(favorites.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(utils_helpers.getBackendImageUrl)(item.imageUrl),
            b: common_vendor.t(item.snakeName),
            c: common_vendor.o(($event) => removeFavorite(index), index),
            d: item.snakeAlias
          }, item.snakeAlias ? {
            e: common_vendor.t(item.snakeAlias)
          } : {}, {
            f: item.venomType
          }, item.venomType ? {
            g: common_vendor.t(item.venomType)
          } : {}, {
            h: item.distribution
          }, item.distribution ? {
            i: common_vendor.t(item.distribution)
          } : {}, {
            j: common_vendor.t(formatTime(item.createTime)),
            k: index,
            l: common_vendor.o(($event) => viewDetail(item), index)
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da3e0273"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/favorites/favorites.js.map
