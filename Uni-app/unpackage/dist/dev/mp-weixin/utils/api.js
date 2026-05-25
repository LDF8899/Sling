"use strict";
const common_vendor = require("../common/vendor.js");
const AVAILABLE_IPS = [
  "172.30.136.39",
  // WLAN - current network
  "192.168.194.1",
  // VMware VMnet1
  "192.168.201.1",
  // VMware VMnet8
  "localhost"
];
let CURRENT_IP = AVAILABLE_IPS[0];
const GATEWAY_PORT = 8888;
const BASE_URL = `http://${CURRENT_IP}:${GATEWAY_PORT}`;
const TIMEOUT = 6e4;
const getBaseUrl = () => `http://${CURRENT_IP}:${GATEWAY_PORT}`;
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token") || "";
    const baseURL = options.baseUrl || `http://${CURRENT_IP}:${GATEWAY_PORT}`;
    common_vendor.index.request({
      url: baseURL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        ...token && { "Authorization": `Bearer ${token}` }
      },
      timeout: options.timeout || TIMEOUT,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.removeStorageSync("userInfo");
          common_vendor.index.reLaunch({
            url: "/pages/login/login"
          });
          reject(new Error("未授权，请重新登录"));
        } else {
          common_vendor.index.showToast({
            title: res.data.message || "请求失败",
            icon: "none",
            duration: 2e3
          });
          reject(new Error(res.data.message || "请求失败"));
        }
      },
      fail: (err) => {
        common_vendor.index.__f__("error", "at utils/api.js:60", "API Request Failed:", err.errMsg);
        common_vendor.index.__f__("error", "at utils/api.js:61", "Request URL:", baseURL + options.url);
        if (err.errMsg.includes("timeout"))
          ;
        else if (err.errMsg.includes("fail:-118") || err.errMsg.includes("ERR_CONNECTION_TIMED_OUT")) {
          tryNextIP();
        } else if (err.errMsg.includes("fail"))
          ;
        reject(err);
      }
    });
  });
};
let ipIndex = 0;
function tryNextIP() {
  ipIndex++;
  if (ipIndex < AVAILABLE_IPS.length) {
    CURRENT_IP = AVAILABLE_IPS[ipIndex];
  } else {
    ipIndex = 0;
  }
}
const uploadFile = (options) => {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token") || "";
    const baseURL = options.baseUrl || BASE_URL;
    common_vendor.index.uploadFile({
      url: baseURL + options.url,
      filePath: options.filePath,
      name: options.name || "file",
      formData: options.formData || {},
      header: {
        ...token && { "Authorization": `Bearer ${token}` }
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        if (data.code === 200) {
          resolve(data);
        } else {
          common_vendor.index.showToast({
            title: data.message || "上传失败",
            icon: "none",
            duration: 2e3
          });
          reject(new Error(data.message || "上传失败"));
        }
      },
      fail: (err) => {
        common_vendor.index.__f__("error", "at utils/api.js:123", "Upload Error:", err);
        common_vendor.index.showToast({
          title: "上传失败",
          icon: "none",
          duration: 2e3
        });
        reject(err);
      }
    });
  });
};
const userApi = {
  login(data) {
    return request({
      url: "/api/user/login",
      method: "POST",
      data
    });
  },
  adminLogin(data) {
    return request({
      url: "/api/user/admin/login",
      method: "POST",
      data
    });
  },
  wechatLogin(data) {
    return request({
      url: "/api/user/wechat-login",
      method: "POST",
      data
    });
  },
  register(data) {
    return request({
      url: "/api/user/register",
      method: "POST",
      data
    });
  },
  getUserInfo(id) {
    return request({
      url: `/api/user/info/${id}`,
      method: "GET"
    });
  },
  updateUserInfo(data) {
    return request({
      url: "/api/user/update",
      method: "PUT",
      data
    });
  },
  changePassword(data) {
    return request({
      url: "/api/user/change-password",
      method: "PUT",
      data
    });
  },
  uploadAvatar(file, userId) {
    return uploadFile({
      url: "/api/user/upload-avatar",
      filePath: file,
      name: "avatar",
      formData: { userId }
    });
  }
};
const recognitionApi = {
  identifySnake(filePath) {
    return uploadFile({
      url: "/api/recognition/identify",
      filePath,
      name: "image",
      timeout: 6e4
    });
  },
  // Get user recognition records
  getRecordsByUser(userId) {
    return request({
      url: `/api/recognition/records/user/${userId}`,
      method: "GET"
    });
  }
};
const emergencyApi = {
  analyzeWoundImage(filePath) {
    return uploadFile({
      url: "/api/emergency/image/analyze",
      filePath,
      name: "image",
      timeout: 6e4
    });
  },
  askEmergencyQuestion(question) {
    return request({
      url: "/api/emergency/guide/ask",
      method: "POST",
      data: question
    });
  },
  getEmergencyGuideByName(snakeName) {
    return request({
      url: `/api/emergency/guide/${snakeName}`,
      method: "GET"
    });
  },
  getDetailedSnakeInfo(snakeName) {
    return request({
      url: `/api/emergency/guide/details/${snakeName}`,
      method: "GET"
    });
  },
  getAllEmergencyGuides() {
    return request({
      url: "/api/emergency/guide/list",
      method: "GET"
    });
  },
  submitEmergency(data) {
    return request({
      url: "/api/emergency/help/submit",
      method: "POST",
      data
    });
  },
  getNearbyHospitals(location) {
    return request({
      url: "/api/hospital/snake-venom/nearby",
      method: "POST",
      data: location
    });
  }
};
const warningApi = {
  getActiveAreaMap(params) {
    return request({
      url: "/api/warning/active-area/map",
      method: "GET",
      data: params
    });
  },
  getRecentWarnings(params) {
    return request({
      url: "/api/warning/recent",
      method: "GET",
      data: params
    });
  },
  getRealTimeWarning(data) {
    return request({
      url: "/api/warning/real-time",
      method: "POST",
      data
    });
  },
  convertLocation(params) {
    return request({
      url: "/api/warning/convert-location",
      method: "GET",
      data: params
    });
  }
};
const hospitalApi = {
  searchSnakeVenomHospitals(data) {
    return request({
      url: "/api/hospital/snake-venom/nearby",
      method: "POST",
      data
    });
  },
  generateNavigationUrl(params) {
    return request({
      url: "/api/hospital/navigation",
      method: "GET",
      data: params
    });
  },
  geocode(params) {
    return request({
      url: "/api/hospital/geocode",
      method: "GET",
      data: params
    });
  },
  reverseGeocode(params) {
    return request({
      url: "/api/hospital/reverse-geocode",
      method: "GET",
      data: params
    });
  },
  searchHospitals(data) {
    return request({
      url: "/api/hospital/search",
      method: "POST",
      data
    });
  },
  getRoute(data) {
    return request({
      url: data.routeType === "driving" ? "/api/hospital/route/driving" : "/api/hospital/route/walking",
      method: "POST",
      data
    });
  }
};
const api = {
  user: userApi,
  recognition: recognitionApi,
  emergency: emergencyApi,
  warning: warningApi,
  hospital: hospitalApi
};
exports.api = api;
exports.emergencyApi = emergencyApi;
exports.getBaseUrl = getBaseUrl;
exports.hospitalApi = hospitalApi;
exports.recognitionApi = recognitionApi;
exports.userApi = userApi;
exports.warningApi = warningApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/api.js.map
