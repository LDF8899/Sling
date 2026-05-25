"use strict";
const common_vendor = require("../common/vendor.js");
const utils_api = require("./api.js");
function getBackendImageUrl(imageUrl) {
  if (!imageUrl)
    return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const baseUrl = utils_api.getBaseUrl();
  return `${baseUrl}/emergency/images/local?path=${encodeURIComponent(imageUrl)}`;
}
function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes))
    return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
function goBack() {
  const pages = getCurrentPages();
  if (pages.length <= 1) {
    common_vendor.index.switchTab({ url: "/pages/index/index" });
  } else {
    common_vendor.index.navigateBack({ delta: 1 });
  }
}
exports.formatFileSize = formatFileSize;
exports.getBackendImageUrl = getBackendImageUrl;
exports.goBack = goBack;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/helpers.js.map
