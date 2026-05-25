"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Math) {
  GlassNavbar();
}
const GlassNavbar = () => "../../components/GlassNavbar.js";
const _sfc_main = {
  __name: "warning",
  setup(__props) {
    const currentRiskLevel = common_vendor.ref(null);
    const warnings = common_vendor.ref([]);
    const showDetail = common_vendor.ref(false);
    const selectedWarning = common_vendor.ref(null);
    const mapCenter = common_vendor.ref({ lng: 116.397428, lat: 39.90923 });
    const riskMarkers = common_vendor.ref([]);
    const userLocation = common_vendor.ref({ lng: "", lat: "", address: "" });
    const locating = common_vendor.ref(false);
    const currentSeason = common_vendor.ref("");
    const getCurrentSeason = () => {
      const month = (/* @__PURE__ */ new Date()).getMonth() + 1;
      if (month >= 3 && month <= 5)
        return "春季";
      if (month >= 6 && month <= 8)
        return "夏季";
      if (month >= 9 && month <= 11)
        return "秋季";
      return "冬季";
    };
    const getRealTimeWarning = async () => {
      locating.value = true;
      try {
        const res = await common_vendor.index.getLocation({
          type: "gcj02",
          highAccuracy: true
        });
        const lng = res.longitude;
        const lat = res.latitude;
        userLocation.value.lng = lng.toFixed(6);
        userLocation.value.lat = lat.toFixed(6);
        const response = await utils_api.warningApi.getRealTimeWarning({
          lng,
          lat,
          season: getCurrentSeason()
        });
        if (response && response.data) {
          userLocation.value.address = response.data.address || "未知地址";
          currentSeason.value = response.data.season || getCurrentSeason();
          updateRiskLevelFromRealTime(response.data);
          common_vendor.index.showToast({ title: "预警信息获取成功", icon: "success" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/warning/warning.vue:229", "获取实时预警失败:", error);
        let errorMsg = "获取失败";
        if (error.errMsg && error.errMsg.includes("auth deny")) {
          errorMsg = "定位权限被拒绝，请在设置中开启";
        } else if (error.errMsg && error.errMsg.includes("timeout")) {
          errorMsg = "定位超时，请重试";
        }
        common_vendor.index.showToast({ title: errorMsg, icon: "none", duration: 3e3 });
      } finally {
        locating.value = false;
      }
    };
    const updateRiskLevelFromRealTime = (data) => {
      var _a, _b;
      const activityLevel = ((_a = data.llmResponse) == null ? void 0 : _a.includes("高")) ? "high" : ((_b = data.llmResponse) == null ? void 0 : _b.includes("中")) ? "medium" : "low";
      const levelMap = {
        "high": {
          level: "high",
          levelText: "高风险",
          advice: "避免前往预警区域，如必须外出请做好防护措施，携带抗蛇毒血清。",
          location: data.address || "当前区域",
          updateTime: (/* @__PURE__ */ new Date()).toLocaleString()
        },
        "medium": {
          level: "medium",
          levelText: "中风险",
          advice: "注意周围环境，穿着长袖长裤，避免在草丛和树林中长时间停留。",
          location: data.address || "当前区域",
          updateTime: (/* @__PURE__ */ new Date()).toLocaleString()
        },
        "low": {
          level: "low",
          levelText: "低风险",
          advice: "保持基本警惕，夜间活动使用手电筒照明，注意观察脚下和周围。",
          location: data.address || "当前区域",
          updateTime: (/* @__PURE__ */ new Date()).toLocaleString()
        }
      };
      currentRiskLevel.value = levelMap[activityLevel] || levelMap.low;
      if (userLocation.value.lng && userLocation.value.lat) {
        mapCenter.value = {
          lng: parseFloat(userLocation.value.lng),
          lat: parseFloat(userLocation.value.lat)
        };
        updateRiskMarkers(data);
      }
    };
    const updateRiskMarkers = (warningData) => {
      const markers = [];
      if (userLocation.value.lng && userLocation.value.lat) {
        markers.push({
          id: "current",
          latitude: parseFloat(userLocation.value.lat),
          longitude: parseFloat(userLocation.value.lng),
          iconPath: "/static/location-marker.png",
          width: 30,
          height: 30,
          callout: {
            content: "当前位置",
            display: "ALWAYS",
            padding: 10,
            borderRadius: 5,
            bgColor: "#3b82f6",
            color: "#ffffff"
          }
        });
      }
      if (warningData && warningData.llmResponse) {
        const riskLevel = warningData.llmResponse.includes("高") ? "high" : warningData.llmResponse.includes("中") ? "medium" : "low";
        const riskColor = riskLevel === "high" ? "#ef4444" : riskLevel === "medium" ? "#f59e0b" : "#10b981";
        markers.push({
          id: "risk",
          latitude: parseFloat(userLocation.value.lat) + 0.01,
          longitude: parseFloat(userLocation.value.lng) + 0.01,
          iconPath: "/static/risk-marker.png",
          width: 40,
          height: 40,
          callout: {
            content: `${riskLevel === "high" ? "高风险" : riskLevel === "medium" ? "中风险" : "低风险"}区域`,
            display: "ALWAYS",
            padding: 10,
            borderRadius: 5,
            bgColor: riskColor,
            color: "#ffffff"
          }
        });
      }
      riskMarkers.value = markers;
    };
    const loadAllData = () => {
      loadWarnings();
      if (userLocation.value.lng && userLocation.value.lat) {
        getRealTimeWarning();
      }
    };
    const getSeverityText = (severity) => {
      const map = { "high": "高风险", "medium": "中风险", "low": "低风险" };
      return map[severity] || "未知";
    };
    const formatTime = (timeStr) => {
      if (!timeStr)
        return "";
      const date = new Date(timeStr);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 6e4);
      const hours = Math.floor(diff / 36e5);
      const days = Math.floor(diff / 864e5);
      if (minutes < 1)
        return "刚刚";
      if (minutes < 60)
        return `${minutes}分钟前`;
      if (hours < 24)
        return `${hours}小时前`;
      if (days < 7)
        return `${days}天前`;
      return date.toLocaleDateString("zh-CN");
    };
    const loadWarnings = async () => {
      try {
        const response = await utils_api.warningApi.getRecentWarnings({ limit: 10 });
        if (response && response.data) {
          warnings.value = Array.isArray(response.data) ? response.data : [];
          if (warnings.value.length > 0) {
            updateRiskLevel();
          }
          common_vendor.index.showToast({ title: "加载成功", icon: "success" });
        } else {
          throw new Error("加载失败");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/warning/warning.vue:381", "加载预警失败:", error);
        common_vendor.index.showToast({
          title: "加载失败：" + (error.message || "未知错误"),
          icon: "none",
          duration: 2e3
        });
      }
    };
    const updateRiskLevel = () => {
      if (warnings.value.length === 0) {
        currentRiskLevel.value = null;
        return;
      }
      const recentWarning = warnings.value[0];
      const severity = recentWarning.severity || "low";
      const levelMap = {
        "high": {
          level: "high",
          levelText: "高风险",
          advice: "避免前往预警区域，如必须外出请做好防护措施，携带抗蛇毒血清。",
          location: recentWarning.location || "当前区域",
          updateTime: formatTime(recentWarning.publishTime)
        },
        "medium": {
          level: "medium",
          levelText: "中风险",
          advice: "注意周围环境，穿着长袖长裤，避免在草丛和树林中长时间停留。",
          location: recentWarning.location || "当前区域",
          updateTime: formatTime(recentWarning.publishTime)
        },
        "low": {
          level: "low",
          levelText: "低风险",
          advice: "保持基本警惕，夜间活动使用手电筒照明，注意观察脚下和周围。",
          location: recentWarning.location || "当前区域",
          updateTime: formatTime(recentWarning.publishTime)
        }
      };
      currentRiskLevel.value = levelMap[severity] || levelMap.low;
    };
    const closeDetail = () => {
      showDetail.value = false;
      selectedWarning.value = null;
    };
    const onMarkerTap = (e) => {
      var _a;
      const markerId = e.detail.id;
      const marker = riskMarkers.value.find((m) => m.id === markerId);
      if (marker && ((_a = marker.callout) == null ? void 0 : _a.content)) {
        common_vendor.index.showToast({ title: marker.callout.content, icon: "none", duration: 3e3 });
      }
    };
    const shareWarning = () => {
      if (!selectedWarning.value)
        return;
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        showShareItems: ["wechatFriends", "wechatMoment"]
      });
      common_vendor.index.showToast({ title: "点击右上角分享", icon: "none" });
    };
    common_vendor.onMounted(() => {
      currentSeason.value = getCurrentSeason();
      loadWarnings();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return common_vendor.e({
        a: common_vendor.o(loadAllData, "a5"),
        b: common_vendor.p({
          title: "⚠️ 预警信息",
          subtitle: "实时蛇类活动风险预警"
        }),
        c: userLocation.value.address
      }, userLocation.value.address ? {
        d: common_vendor.t(userLocation.value.address),
        e: common_vendor.t(userLocation.value.lng),
        f: common_vendor.t(userLocation.value.lat)
      } : {}, {
        g: common_vendor.t(locating.value ? "定位中..." : "获取位置并查询预警"),
        h: common_vendor.o(getRealTimeWarning, "57"),
        i: locating.value,
        j: currentSeason.value
      }, currentSeason.value ? {
        k: common_vendor.t(currentSeason.value)
      } : {}, {
        l: currentRiskLevel.value
      }, currentRiskLevel.value ? {
        m: common_vendor.t(currentRiskLevel.value.levelText),
        n: common_vendor.n(currentRiskLevel.value.level),
        o: common_vendor.t(currentRiskLevel.value.location || "当前位置"),
        p: common_vendor.t(currentRiskLevel.value.updateTime),
        q: common_vendor.t(currentRiskLevel.value.advice)
      } : {}, {
        r: mapCenter.value.lat,
        s: mapCenter.value.lng,
        t: riskMarkers.value,
        v: common_vendor.o(onMarkerTap, "10"),
        w: showDetail.value
      }, showDetail.value ? common_vendor.e({
        x: common_vendor.o(closeDetail, "26"),
        y: (_a = selectedWarning.value) == null ? void 0 : _a.title
      }, ((_b = selectedWarning.value) == null ? void 0 : _b.title) ? {
        z: common_vendor.t(selectedWarning.value.title)
      } : {}, {
        A: common_vendor.t(selectedWarning.value.publishTime),
        B: common_vendor.t(getSeverityText(selectedWarning.value.severity)),
        C: common_vendor.n(selectedWarning.value.severity || "low"),
        D: (_c = selectedWarning.value) == null ? void 0 : _c.location
      }, ((_d = selectedWarning.value) == null ? void 0 : _d.location) ? {
        E: common_vendor.t(selectedWarning.value.location)
      } : {}, {
        F: (_e = selectedWarning.value) == null ? void 0 : _e.snakeType
      }, ((_f = selectedWarning.value) == null ? void 0 : _f.snakeType) ? {
        G: common_vendor.t(selectedWarning.value.snakeType)
      } : {}, {
        H: (_g = selectedWarning.value) == null ? void 0 : _g.description
      }, ((_h = selectedWarning.value) == null ? void 0 : _h.description) ? {
        I: common_vendor.t(selectedWarning.value.description)
      } : {}, {
        J: (_i = selectedWarning.value) == null ? void 0 : _i.precautions
      }, ((_j = selectedWarning.value) == null ? void 0 : _j.precautions) ? {
        K: common_vendor.t(selectedWarning.value.precautions)
      } : {}, {
        L: (_k = selectedWarning.value) == null ? void 0 : _k.reportCount
      }, ((_l = selectedWarning.value) == null ? void 0 : _l.reportCount) ? {
        M: common_vendor.t(selectedWarning.value.reportCount)
      } : {}, {
        N: common_vendor.o(closeDetail, "26"),
        O: common_vendor.o(shareWarning, "f6"),
        P: common_vendor.o(() => {
        }, "8c"),
        Q: common_vendor.o(closeDetail, "d0")
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4e882ad5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/warning/warning.js.map
