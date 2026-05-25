"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_helpers = require("../../utils/helpers.js");
const _sfc_main = {
  __name: "exhibition",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const allSnakes = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(8);
    const displaySnakes = common_vendor.computed(() => {
      if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase();
        return allSnakes.value.filter(
          (snake) => snake.snakeName.toLowerCase().includes(keyword) || snake.alias && snake.alias.toLowerCase().includes(keyword)
        );
      }
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return allSnakes.value.slice(start, end);
    });
    const hasMore = common_vendor.computed(() => {
      return currentPage.value * pageSize.value < allSnakes.value.length;
    });
    const totalPages = common_vendor.computed(() => {
      return Math.ceil(allSnakes.value.length / pageSize.value);
    });
    const displayPages = common_vendor.computed(() => {
      const pages = [];
      const total = totalPages.value;
      const current = currentPage.value;
      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || i >= current - 1 && i <= current + 1) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== "...") {
          pages.push("...");
        }
      }
      return pages;
    });
    const loadAllSnakes = async () => {
      loading.value = true;
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
          allSnakes.value = snakeList;
        } else {
          throw new Error("返回数据为空");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/exhibition/exhibition.vue:177", "加载数据失败:", error);
        allSnakes.value = [
          { id: 1, snakeName: "银环蛇", alias: "金钱白花蛇", venomType: "神经毒", distribution: "华南地区", symptomDescription: "神经毒素，咬伤后出现眼睑下垂、吞咽困难等症状", imageUrl: "" },
          { id: 2, snakeName: "金环蛇", alias: "金脚带", venomType: "神经毒", distribution: "华南地区", symptomDescription: "神经毒素，症状与银环蛇相似", imageUrl: "" },
          { id: 3, snakeName: "竹叶青", alias: "青竹蛇", venomType: "血循毒", distribution: "长江以南", symptomDescription: "血循毒素，咬伤处剧烈疼痛、肿胀", imageUrl: "" },
          { id: 4, snakeName: "蝮蛇", alias: "土虺蛇", venomType: "混合毒", distribution: "全国各地", symptomDescription: "混合毒素，兼有神经毒和血循毒症状", imageUrl: "" },
          { id: 5, snakeName: "眼镜蛇", alias: "饭铲头", venomType: "混合毒", distribution: "南方地区", symptomDescription: "混合毒素，咬伤后组织坏死严重", imageUrl: "" },
          { id: 6, snakeName: "眼镜王蛇", alias: "过山风", venomType: "混合毒", distribution: "西南地区", symptomDescription: "剧毒，排毒量大，危险性极高", imageUrl: "" },
          { id: 7, snakeName: "五步蛇", alias: "尖吻蝮", venomType: "血循毒", distribution: "南方山区", symptomDescription: "血循毒素，出血不止，组织坏死", imageUrl: "" },
          { id: 8, snakeName: "烙铁头蛇", alias: "龟壳花", venomType: "血循毒", distribution: "南方地区", symptomDescription: "血循毒素，咬伤处剧痛、水疱", imageUrl: "" },
          { id: 9, snakeName: "海蛇", alias: "青灰海蛇", venomType: "神经毒", distribution: "沿海地区", symptomDescription: "神经毒素，肌肉麻痹、呼吸困难", imageUrl: "" },
          { id: 10, snakeName: "蝰蛇", alias: "圆斑蝰", venomType: "血循毒", distribution: "南方地区", symptomDescription: "血循毒素，凝血功能障碍", imageUrl: "" }
        ];
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      currentPage.value = 1;
      common_vendor.index.showToast({
        title: `找到 ${displaySnakes.value.length} 条结果`,
        icon: "none"
      });
    };
    const clearSearch = () => {
      searchKeyword.value = "";
      currentPage.value = 1;
    };
    const viewDetail = (snake) => {
      common_vendor.index.navigateTo({
        url: `/pages/snake-detail/snake-detail?snakeName=${encodeURIComponent(snake.snakeName)}`
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
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
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const goToPage = (page) => {
      if (typeof page === "number" && page !== currentPage.value) {
        currentPage.value = page;
      }
    };
    common_vendor.onMounted(() => {
      loadAllSnakes();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack, "84"),
        b: common_vendor.o(handleSearch, "ae"),
        c: searchKeyword.value,
        d: common_vendor.o(($event) => searchKeyword.value = $event.detail.value, "fc"),
        e: searchKeyword.value
      }, searchKeyword.value ? {
        f: common_vendor.o(clearSearch, "60")
      } : {}, {
        g: common_vendor.f(displaySnakes.value, (snake, index, i0) => {
          return {
            a: common_vendor.unref(utils_helpers.getBackendImageUrl)(snake.imageUrl) || "/static/banner/banner1.jpg",
            b: common_vendor.t(snake.snakeName),
            c: common_vendor.t(snake.alias),
            d: common_vendor.t(getVenomText(snake.venomType)),
            e: common_vendor.n(getVenomClass(snake.venomType)),
            f: common_vendor.t(snake.distribution || "全国"),
            g: common_vendor.t(snake.symptomDescription || "暂无详细描述"),
            h: snake.id,
            i: common_vendor.o(($event) => viewDetail(snake), snake.id)
          };
        }),
        h: displaySnakes.value.length === 0 && !loading.value
      }, displaySnakes.value.length === 0 && !loading.value ? {} : {}, {
        i: hasMore.value && !loading.value
      }, hasMore.value && !loading.value ? {} : {}, {
        j: totalPages.value > 1
      }, totalPages.value > 1 ? {
        k: currentPage.value === 1 ? 1 : "",
        l: common_vendor.o(prevPage, "5e"),
        m: common_vendor.f(displayPages.value, (page, k0, i0) => {
          return {
            a: common_vendor.t(page),
            b: page === currentPage.value ? 1 : "",
            c: page,
            d: common_vendor.o(($event) => goToPage(page), page)
          };
        }),
        n: currentPage.value === totalPages.value ? 1 : "",
        o: common_vendor.o(nextPage, "9b")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-faae53d7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exhibition/exhibition.js.map
