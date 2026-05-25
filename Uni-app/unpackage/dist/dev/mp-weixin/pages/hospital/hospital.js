"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Math) {
  GlassNavbar();
}
const GlassNavbar = () => "../../components/GlassNavbar.js";
const _sfc_main = {
  __name: "hospital",
  setup(__props) {
    const locationInput = common_vendor.ref("");
    const searchRadius = common_vendor.ref(5e3);
    const searchLoading = common_vendor.ref(false);
    const locating = common_vendor.ref(false);
    const navLoading = common_vendor.ref(false);
    const searchResults = common_vendor.ref([]);
    const selectedHospital = common_vendor.ref(null);
    const currentLocation = common_vendor.reactive({
      latitude: null,
      longitude: null
    });
    const mapCenter = common_vendor.reactive({
      latitude: 27.7254,
      longitude: 106.9272
    });
    const mapScale = common_vendor.ref(13);
    const mapMarkers = common_vendor.ref([]);
    const onSliderChange = (e) => {
      searchRadius.value = e.detail.value;
    };
    const getCurrentLocation = async () => {
      locating.value = true;
      try {
        const res = await common_vendor.index.getLocation({
          type: "gcj02",
          highAccuracy: true
        });
        currentLocation.latitude = res.latitude;
        currentLocation.longitude = res.longitude;
        locationInput.value = `${res.longitude.toFixed(4)},${res.latitude.toFixed(4)}`;
        common_vendor.index.showToast({
          title: "定位成功",
          icon: "success"
        });
        searchHospitals();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/hospital/hospital.vue:253", "定位失败:", error);
        common_vendor.index.showToast({
          title: "定位失败，请检查权限设置",
          icon: "none",
          duration: 3e3
        });
      } finally {
        locating.value = false;
      }
    };
    const searchHospitals = async () => {
      if (locationInput.value.trim()) {
        const coords = locationInput.value.trim().split(/[,,\s]+/);
        if (coords.length >= 2) {
          const lon = parseFloat(coords[0]);
          const lat = parseFloat(coords[1]);
          if (!isNaN(lon) && !isNaN(lat)) {
            currentLocation.longitude = lon;
            currentLocation.latitude = lat;
            performSearch(lon, lat);
            return;
          }
        }
        await geocodeAddress(locationInput.value.trim());
      } else if (currentLocation.latitude && currentLocation.longitude) {
        performSearch(currentLocation.longitude, currentLocation.latitude);
      } else {
        common_vendor.index.showToast({
          title: "请输入位置信息或使用当前位置",
          icon: "none"
        });
      }
    };
    const geocodeAddress = async (address) => {
      searchLoading.value = true;
      try {
        const response = await utils_api.hospitalApi.geocode({ address });
        if (response && response.data) {
          const { longitude, latitude } = response.data;
          currentLocation.longitude = longitude;
          currentLocation.latitude = latitude;
          performSearch(longitude, latitude);
        } else {
          throw new Error("地理编码失败");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/hospital/hospital.vue:308", "地理编码失败:", error);
        common_vendor.index.showToast({
          title: "地址解析失败，请使用经纬度或当前位置",
          icon: "none",
          duration: 3e3
        });
      } finally {
        searchLoading.value = false;
      }
    };
    const performSearch = async (longitude, latitude) => {
      searchLoading.value = true;
      try {
        const response = await utils_api.hospitalApi.searchSnakeVenomHospitals({
          longitude,
          latitude,
          radius: searchRadius.value
        });
        if (response && response.data) {
          searchResults.value = Array.isArray(response.data) ? response.data : [];
          if (searchResults.value.length === 0) {
            common_vendor.index.showToast({ title: "未找到附近的医院", icon: "none" });
          } else {
            common_vendor.index.showToast({ title: `找到${searchResults.value.length}家医院`, icon: "success" });
          }
          selectedHospital.value = null;
          updateMapMarkers();
        } else {
          throw new Error("搜索失败");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/hospital/hospital.vue:345", "搜索医院失败:", error);
        common_vendor.index.showToast({
          title: "搜索失败：" + (error.message || "未知错误"),
          icon: "none",
          duration: 3e3
        });
      } finally {
        searchLoading.value = false;
      }
    };
    const selectHospital = (hospital) => {
      selectedHospital.value = hospital;
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    };
    const updateMapMarkers = () => {
      if (searchResults.value.length === 0)
        return;
      const markers = searchResults.value.map((hospital, index) => ({
        id: hospital.hospitalId || index,
        latitude: hospital.latitude || mapCenter.latitude,
        longitude: hospital.longitude || mapCenter.longitude,
        iconPath: "/static/map-marker.png",
        width: 30,
        height: 30,
        callout: {
          content: hospital.hospitalName,
          display: "ALWAYS",
          padding: 10,
          borderRadius: 5,
          bgColor: "#ffffff",
          fontSize: 12
        }
      }));
      mapMarkers.value = markers;
      if (searchResults.value.length > 0 && searchResults.value[0].latitude && searchResults.value[0].longitude) {
        mapCenter.latitude = searchResults.value[0].latitude;
        mapCenter.longitude = searchResults.value[0].longitude;
      }
    };
    const onMarkerTap = (e) => {
      const markerId = e.detail.markerId;
      const hospital = searchResults.value.find((h) => h.hospitalId === markerId);
      if (hospital) {
        selectHospital(hospital);
      }
    };
    const getNavigationUrl = async () => {
      if (!selectedHospital.value) {
        common_vendor.index.showToast({ title: "请先选择医院", icon: "none" });
        return;
      }
      if (!selectedHospital.value.latitude || !selectedHospital.value.longitude) {
        common_vendor.index.showToast({ title: "该医院暂无位置信息", icon: "none" });
        return;
      }
      navLoading.value = true;
      try {
        if (!currentLocation.latitude || !currentLocation.longitude) {
          const locRes = await common_vendor.index.getLocation({
            type: "gcj02",
            highAccuracy: true
          });
          currentLocation.latitude = locRes.latitude;
          currentLocation.longitude = locRes.longitude;
        }
        common_vendor.index.openLocation({
          latitude: selectedHospital.value.latitude,
          longitude: selectedHospital.value.longitude,
          name: selectedHospital.value.hospitalName || "目的地医院",
          address: selectedHospital.value.address || "未知地址",
          scale: 16
        });
        common_vendor.index.showToast({ title: "已打开地图，请选择导航 APP", icon: "success" });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/hospital/hospital.vue:438", "打开地图失败:", error);
        common_vendor.index.showToast({
          title: "打开地图失败：" + (error.message || "未知错误"),
          icon: "none",
          duration: 3e3
        });
      } finally {
        navLoading.value = false;
      }
    };
    const callHospital = () => {
      if (!selectedHospital.value || !selectedHospital.value.contactInfo) {
        common_vendor.index.showToast({ title: "暂无联系电话", icon: "none" });
        return;
      }
      const phone = selectedHospital.value.contactInfo.replace(/[^\d+]/g, "");
      if (phone) {
        common_vendor.index.makePhoneCall({ phoneNumber: phone });
      } else {
        common_vendor.index.showToast({ title: "无法识别电话号码", icon: "none" });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "🏥 附近医院",
          subtitle: "寻找支持蛇毒治疗的医院"
        }),
        b: common_vendor.o(searchHospitals, "7e"),
        c: locationInput.value,
        d: common_vendor.o(($event) => locationInput.value = $event.detail.value, "43"),
        e: searchRadius.value,
        f: common_vendor.o(onSliderChange, "ee"),
        g: common_vendor.t((searchRadius.value / 1e3).toFixed(1)),
        h: searchLoading.value
      }, searchLoading.value ? {} : {}, {
        i: searchLoading.value ? 1 : "",
        j: common_vendor.o(searchHospitals, "98"),
        k: locating.value
      }, locating.value ? {} : {}, {
        l: locating.value ? 1 : "",
        m: common_vendor.o(getCurrentLocation, "80"),
        n: searchResults.value.length > 0
      }, searchResults.value.length > 0 ? {
        o: mapCenter.latitude,
        p: mapCenter.longitude,
        q: mapScale.value,
        r: mapMarkers.value,
        s: common_vendor.o(onMarkerTap, "e9")
      } : {}, {
        t: searchResults.value.length > 0
      }, searchResults.value.length > 0 ? {
        v: common_vendor.t(searchResults.value.length),
        w: common_vendor.f(searchResults.value, (hospital, index, i0) => {
          return {
            a: common_vendor.t(hospital.hospitalName),
            b: common_vendor.t(hospital.address),
            c: common_vendor.t(hospital.contactInfo || "暂无联系方式"),
            d: common_vendor.t(hospital.distanceDesc || "未知距离"),
            e: common_vendor.t(hospital.hospitalType || "医院"),
            f: hospital.hospitalId || index,
            g: common_vendor.o(($event) => selectHospital(hospital), hospital.hospitalId || index)
          };
        })
      } : {}, {
        x: selectedHospital.value
      }, selectedHospital.value ? common_vendor.e({
        y: common_vendor.t(selectedHospital.value.hospitalName),
        z: common_vendor.t(selectedHospital.value.address),
        A: common_vendor.t(selectedHospital.value.contactInfo || "暂无"),
        B: common_vendor.t(selectedHospital.value.distanceDesc || "未知"),
        C: common_vendor.t(selectedHospital.value.hospitalType || "未知"),
        D: navLoading.value
      }, navLoading.value ? {} : {}, {
        E: navLoading.value ? 1 : "",
        F: common_vendor.o(getNavigationUrl, "85"),
        G: common_vendor.o(callHospital, "33")
      }) : {}, {
        H: !searchLoading.value && searchResults.value.length === 0 && !selectedHospital.value
      }, !searchLoading.value && searchResults.value.length === 0 && !selectedHospital.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4e3f1300"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/hospital/hospital.js.map
