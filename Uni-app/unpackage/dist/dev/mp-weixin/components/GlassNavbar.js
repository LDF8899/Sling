"use strict";
const common_vendor = require("../common/vendor.js");
const utils_helpers = require("../utils/helpers.js");
const _sfc_main = {
  __name: "GlassNavbar",
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  emits: ["back"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleBack = () => {
      emit("back");
      utils_helpers.goBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: common_vendor.o(handleBack, "ce")
      } : {}, {
        c: common_vendor.t(__props.title),
        d: common_vendor.t(__props.subtitle)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6015fe8f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/GlassNavbar.js.map
