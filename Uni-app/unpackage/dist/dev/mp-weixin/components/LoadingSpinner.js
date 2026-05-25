"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "LoadingSpinner",
  props: {
    progress: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "AI 正在分析中..."
    },
    subtitle: {
      type: String,
      default: "请稍候，系统正在处理数据"
    },
    color: {
      type: String,
      default: "#10b981"
      // green accent
    }
  },
  setup(__props) {
    const props = __props;
    const spinnerColor = common_vendor.computed(() => props.color);
    const waveColor = common_vendor.computed(() => {
      const hex = props.color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.3)`;
    });
    const progressBgColor = common_vendor.computed(() => {
      const hex = props.color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.2)`;
    });
    const progressFillColor = common_vendor.computed(() => {
      return `linear-gradient(90deg, ${props.color}, ${props.color})`;
    });
    return (_ctx, _cache) => {
      return {
        a: spinnerColor.value,
        b: waveColor.value,
        c: waveColor.value,
        d: waveColor.value,
        e: common_vendor.t(__props.title),
        f: common_vendor.t(__props.subtitle),
        g: __props.progress + "%",
        h: progressFillColor.value,
        i: progressBgColor.value,
        j: common_vendor.t(Math.round(__props.progress)),
        k: spinnerColor.value
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19f97f1a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/LoadingSpinner.js.map
