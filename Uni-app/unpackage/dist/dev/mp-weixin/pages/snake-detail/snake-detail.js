"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_helpers = require("../../utils/helpers.js");
const _sfc_main = {
  __name: "snake-detail",
  setup(__props) {
    const snakeName = common_vendor.ref("");
    const snakeInfo = common_vendor.ref({});
    const imageList = common_vendor.ref([]);
    const currentImageIndex = common_vendor.ref(0);
    const isFavorite = common_vendor.ref(false);
    const loadSnakeDetail = async () => {
      try {
        const response = await utils_api.api.emergency.getDetailedSnakeInfo(snakeName.value);
        if (response && response.data) {
          snakeInfo.value = response.data;
          if (response.data.imageUrls && Array.isArray(response.data.imageUrls) && response.data.imageUrls.length > 0) {
            imageList.value = response.data.imageUrls.map((url) => utils_helpers.getBackendImageUrl(url));
          } else if (response.data.imageUrl) {
            imageList.value = [utils_helpers.getBackendImageUrl(response.data.imageUrl)];
          }
          checkFavorite();
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/snake-detail/snake-detail.vue:131", "加载详情失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    };
    const getVenomClass = (venomType) => {
      if (!venomType)
        return "";
      if (venomType.includes("神经"))
        return "neurotoxic";
      if (venomType.includes("血循"))
        return "hemotoxic";
      if (venomType.includes("混合"))
        return "mixed";
      return "";
    };
    const getVenomText = (venomType) => {
      if (!venomType)
        return "无毒";
      return venomType;
    };
    const checkFavorite = () => {
      const favorites = common_vendor.index.getStorageSync("favorites") || [];
      isFavorite.value = favorites.some((item) => item.snakeName === snakeName.value);
    };
    const toggleFavorite = () => {
      const favorites = common_vendor.index.getStorageSync("favorites") || [];
      if (isFavorite.value) {
        const index = favorites.findIndex((item) => item.snakeName === snakeName.value);
        if (index !== -1) {
          favorites.splice(index, 1);
          common_vendor.index.setStorageSync("favorites", favorites);
          common_vendor.index.showToast({
            title: "已取消收藏",
            icon: "none"
          });
        }
      } else {
        const favoriteItem = {
          id: snakeInfo.value.id || Date.now(),
          snakeName: snakeInfo.value.snakeName,
          snakeAlias: snakeInfo.value.snakeAlias,
          venomType: snakeInfo.value.venomType,
          distribution: snakeInfo.value.distribution,
          imageUrl: snakeInfo.value.imageUrl,
          createTime: (/* @__PURE__ */ new Date()).getTime()
        };
        favorites.push(favoriteItem);
        common_vendor.index.setStorageSync("favorites", favorites);
        common_vendor.index.showToast({
          title: "已收藏",
          icon: "success"
        });
      }
      isFavorite.value = !isFavorite.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const callEmergency = () => {
      common_vendor.index.showModal({
        title: "紧急求助",
        content: "是否立即拨打急救电话？",
        confirmText: "拨打 120",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "120"
            });
          }
        }
      });
    };
    common_vendor.onLoad((options) => {
      if (options.snakeName) {
        snakeName.value = decodeURIComponent(options.snakeName);
        common_vendor.index.setNavigationBarTitle({
          title: snakeName.value
        });
      }
    });
    common_vendor.onMounted(() => {
      loadSnakeDetail();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack, "30"),
        b: common_vendor.t(snakeName.value),
        c: common_vendor.t(isFavorite.value ? "★" : "☆"),
        d: common_vendor.o(toggleFavorite, "c0"),
        e: common_vendor.f(imageList.value, (img, index, i0) => {
          return {
            a: img,
            b: index
          };
        }),
        f: imageList.value.length > 1
      }, imageList.value.length > 1 ? {
        g: common_vendor.t(currentImageIndex.value + 1),
        h: common_vendor.t(imageList.value.length)
      } : {}, {
        i: common_vendor.t(snakeInfo.value.snakeName),
        j: snakeInfo.value.snakeAlias
      }, snakeInfo.value.snakeAlias ? {
        k: common_vendor.t(snakeInfo.value.snakeAlias)
      } : {}, {
        l: snakeInfo.value.venomType
      }, snakeInfo.value.venomType ? {
        m: common_vendor.t(getVenomText(snakeInfo.value.venomType)),
        n: common_vendor.n(getVenomClass(snakeInfo.value.venomType))
      } : {}, {
        o: snakeInfo.value.distribution
      }, snakeInfo.value.distribution ? {
        p: common_vendor.t(snakeInfo.value.distribution)
      } : {}, {
        q: common_vendor.t(snakeInfo.value.morphology || "暂无相关信息"),
        r: common_vendor.t(snakeInfo.value.distribution || "暂无相关信息"),
        s: common_vendor.t(snakeInfo.value.toxicology || "暂无相关信息"),
        t: common_vendor.t(snakeInfo.value.symptomDescription || "暂无相关信息"),
        v: common_vendor.t(snakeInfo.value.emergencyTreatment || "暂无相关信息"),
        w: common_vendor.t(snakeInfo.value.medicalAttention || "暂无相关信息"),
        x: common_vendor.o(callEmergency, "d9"),
        y: common_vendor.t(isFavorite.value ? "已收藏" : "收藏"),
        z: common_vendor.o(toggleFavorite, "0c")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9a47689"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/snake-detail/snake-detail.js.map
