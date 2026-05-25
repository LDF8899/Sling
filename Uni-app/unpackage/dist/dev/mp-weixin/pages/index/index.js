"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const utils_api = require("../../utils/api.js");
const utils_helpers = require("../../utils/helpers.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const isOnline = common_vendor.ref(true);
    const showBanner = common_vendor.ref(true);
    const currentBannerIndex = common_vendor.ref(0);
    const exhibitionSnakes = common_vendor.ref([]);
    const bannerList = common_vendor.ref([
      {
        tag: "AI 识别",
        title: "智能识蛇",
        description: "拍照上传，3 秒快速识别蛇类品种",
        buttonText: "立即识别",
        link: "/pages/recognition/recognition",
        image: "/static/banner/banner1.jpg",
        bgColor: "#10b981",
        tagColor: "#059669"
      },
      {
        tag: "应急指导",
        title: "急救指南",
        description: "专业蛇咬伤应急处理标准化流程",
        buttonText: "查看指南",
        link: "/pages/emergency/emergency",
        image: "/static/banner/banner2.jpg",
        bgColor: "#ef4444",
        tagColor: "#dc2626"
      },
      {
        tag: "血清查询",
        title: "精准寻医",
        description: "快速找到最近的蛇毒治疗医院和血清",
        buttonText: "查找医院",
        link: "/pages/hospital/hospital",
        image: "/static/banner/banner3.jpg",
        bgColor: "#3b82f6",
        tagColor: "#2563eb"
      }
    ]);
    const features = common_vendor.ref([
      {
        icon: "🐍",
        title: "蛇类识别",
        description: "AI 智能识别 300+ 种蛇类",
        color: "linear-gradient(135deg, #10b981, #059669)",
        path: "/pages/recognition/recognition"
      },
      {
        icon: "📚",
        title: "应急指南",
        description: "专业急救指导流程",
        color: "linear-gradient(135deg, #ef4444, #dc2626)",
        path: "/pages/emergency/emergency"
      },
      {
        icon: "🏥",
        title: "救治医院",
        description: "附近蛇毒治疗医院",
        color: "linear-gradient(135deg, #3b82f6, #2563eb)",
        path: "/pages/hospital/hospital"
      },
      {
        icon: "🚨",
        title: "区域预警",
        description: "实时蛇类活动监测",
        color: "linear-gradient(135deg, #f59e0b, #d97706)",
        path: "/pages/warning/warning"
      }
    ]);
    const onBannerChange = (e) => {
      currentBannerIndex.value = e.detail.current;
    };
    const switchBanner = (index) => {
      currentBannerIndex.value = index;
    };
    const handleBannerClick = (item) => {
      if (item.link) {
        navigateTo(item.link);
      }
    };
    const navigateTo = (path) => {
      const tabbarPages = ["pages/index/index", "pages/recognition/recognition", "pages/emergency/emergency", "pages/hospital/hospital", "pages/profile/profile"];
      const cleanPath = path.replace(/^\/+/, "");
      if (tabbarPages.includes(cleanPath)) {
        common_vendor.index.switchTab({ url: path });
      } else {
        common_vendor.index.navigateTo({ url: path });
      }
    };
    const emergencyCall = () => {
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
    const goToProfile = () => {
      common_vendor.index.switchTab({ url: "/pages/profile/profile" });
    };
    const viewSnakeDetail = (snake) => {
      common_vendor.index.navigateTo({
        url: `/pages/snake-detail/snake-detail?snakeName=${encodeURIComponent(snake.snakeName)}`
      });
    };
    const loadExhibitionSnakes = async () => {
      try {
        const response = await utils_api.api.emergency.getAllEmergencyGuides();
        let snakeList = [];
        if (response && Array.isArray(response)) {
          snakeList = response;
        } else if (response && response.data) {
          snakeList = Array.isArray(response.data) ? response.data : [response.data];
        } else if (response && typeof response === "object") {
          snakeList = [response];
        }
        if (snakeList.length > 0) {
          exhibitionSnakes.value = snakeList.slice(0, 4);
        } else {
          throw new Error("返回数据为空");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:294", "加载科普展览数据失败:", error);
        exhibitionSnakes.value = [
          { id: 1, snakeName: "银环蛇", alias: "金钱白花蛇", imageUrl: "" },
          { id: 2, snakeName: "金环蛇", alias: "金脚带", imageUrl: "" },
          { id: 3, snakeName: "竹叶青", alias: "青竹蛇", imageUrl: "" },
          { id: 4, snakeName: "蝮蛇", alias: "土虺蛇", imageUrl: "" }
        ];
      }
    };
    common_vendor.onMounted(() => {
      loadExhibitionSnakes();
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.t(isOnline.value ? "在线" : "离线"),
        b: isOnline.value ? 1 : "",
        c: common_vendor.o(emergencyCall, "ee"),
        d: (_a = common_vendor.unref(userStore).userInfo) == null ? void 0 : _a.avatar
      }, ((_b = common_vendor.unref(userStore).userInfo) == null ? void 0 : _b.avatar) ? {
        e: common_vendor.unref(userStore).userInfo.avatar
      } : {}, {
        f: common_vendor.o(goToProfile, "13"),
        g: showBanner.value
      }, showBanner.value ? {
        h: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.tag),
            b: item.tagColor,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.description),
            e: common_vendor.t(item.buttonText),
            f: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${item.image})`,
            g: item.bgColor,
            h: common_vendor.o(($event) => handleBannerClick(item), index),
            i: index
          };
        }),
        i: common_vendor.o(onBannerChange, "c2"),
        j: common_vendor.f(bannerList.value, (item, index, i0) => {
          return common_vendor.e({
            a: currentBannerIndex.value === index
          }, currentBannerIndex.value === index ? {} : {}, {
            b: index,
            c: currentBannerIndex.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchBanner(index), index)
          });
        })
      } : {}, {
        k: common_vendor.f(features.value, (feature, index, i0) => {
          return {
            a: common_vendor.t(feature.icon),
            b: feature.color,
            c: common_vendor.t(feature.title),
            d: common_vendor.t(feature.description),
            e: index,
            f: common_vendor.o(($event) => navigateTo(feature.path), index)
          };
        }),
        l: common_vendor.o(($event) => navigateTo("/pages/exhibition/exhibition"), "4b"),
        m: common_vendor.f(exhibitionSnakes.value, (snake, index, i0) => {
          return {
            a: common_vendor.unref(utils_helpers.getBackendImageUrl)(snake.imageUrl) || "/static/banner/banner1.jpg",
            b: common_vendor.t(snake.snakeName),
            c: common_vendor.t(snake.alias || "暂无别名"),
            d: snake.id,
            e: common_vendor.o(($event) => viewSnakeDetail(snake), snake.id)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
