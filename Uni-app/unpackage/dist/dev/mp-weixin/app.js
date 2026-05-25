"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/recognition/recognition.js";
  "./pages/emergency/emergency.js";
  "./pages/hospital/hospital.js";
  "./pages/warning/warning.js";
  "./pages/profile/profile.js";
  "./pages/exhibition/exhibition.js";
  "./pages/favorites/favorites.js";
  "./pages/snake-detail/snake-detail.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app,
    pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
