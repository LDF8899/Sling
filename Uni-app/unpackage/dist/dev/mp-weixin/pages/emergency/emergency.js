"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_helpers = require("../../utils/helpers.js");
if (!Math) {
  (GlassNavbar + LoadingSpinner)();
}
const GlassNavbar = () => "../../components/GlassNavbar.js";
const LoadingSpinner = () => "../../components/LoadingSpinner.js";
const _sfc_main = {
  __name: "emergency",
  setup(__props) {
    const activeMode = common_vendor.ref("image");
    const userQuestion = common_vendor.ref("");
    const asking = common_vendor.ref(false);
    const answerResult = common_vendor.ref("");
    const emergencyGuide = common_vendor.ref(null);
    const snakeName = common_vendor.ref("");
    const suggestions = common_vendor.ref([]);
    const errorMessage = common_vendor.ref("");
    const nameHistoryRecords = common_vendor.ref([]);
    const questionHistory = common_vendor.ref([]);
    const expandedHistory = common_vendor.ref(null);
    const querying = common_vendor.ref(false);
    const snakeImages = common_vendor.ref([]);
    const imageLoadStatus = common_vendor.ref([]);
    const hasValidImages = common_vendor.ref(false);
    const imageLoadFailed = common_vendor.ref(false);
    const uploadedImage = common_vendor.ref(null);
    const uploadedImageFile = common_vendor.ref(null);
    const rawFileSize = common_vendor.ref(0);
    const compressedFileSize = common_vendor.ref(0);
    const analyzing = common_vendor.ref(false);
    const analysisResult = common_vendor.ref("");
    const analysisTime = common_vendor.ref(0);
    const analysisProgress = common_vendor.ref(0);
    const progressTimer = common_vendor.ref(null);
    const formattedAnalysisResult = common_vendor.computed(() => {
      if (!analysisResult.value)
        return "";
      return analysisResult.value.replace(/### (.*?)/g, "<h3>$1</h3>").replace(/## (.*?)/g, "<h2>$1</h2>").replace(/# (.*?)/g, "<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
    });
    const switchMode = (mode) => {
      activeMode.value = mode;
      clearResults();
    };
    const startProgressSimulation = () => {
      analysisProgress.value = 0;
      progressTimer.value = setInterval(() => {
        if (analysisProgress.value < 90) {
          analysisProgress.value += Math.random() * 10;
          if (analysisProgress.value > 90) {
            analysisProgress.value = 90;
          }
        }
      }, 500);
    };
    const chooseImage = async () => {
      try {
        const res = await common_vendor.index.chooseImage({
          count: 1,
          sourceType: ["album", "camera"],
          sizeType: ["compressed"]
        });
        const tempFilePath = res.tempFilePaths[0];
        const tempFileSize = res.tempFiles[0].size;
        rawFileSize.value = tempFileSize;
        const imageInfo = await common_vendor.index.getImageInfo({
          src: tempFilePath
        });
        compressImage(tempFilePath, imageInfo.width, imageInfo.height);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:457", "选择图片失败:", error);
        common_vendor.index.showToast({
          title: "选择图片失败",
          icon: "none"
        });
      }
    };
    const compressImage = (filePath, originalWidth, originalHeight) => {
      let quality = 0.8;
      if (rawFileSize.value > 5 * 1024 * 1024) {
        quality = 0.6;
      }
      if (rawFileSize.value > 10 * 1024 * 1024) {
        quality = 0.4;
      }
      common_vendor.index.compressImage({
        src: filePath,
        quality: quality * 100,
        success: (res) => {
          const compressedTempFilePath = res.tempFilePath;
          common_vendor.index.getFileInfo({
            filePath: compressedTempFilePath,
            success: (fileInfoRes) => {
              compressedFileSize.value = fileInfoRes.size;
              uploadedImage.value = compressedTempFilePath;
              uploadedImageFile.value = compressedTempFilePath;
              common_vendor.index.showToast({
                title: "图片已准备就绪",
                icon: "success"
              });
            }
          });
        },
        fail: () => {
          uploadedImage.value = filePath;
          uploadedImageFile.value = filePath;
          compressedFileSize.value = rawFileSize.value;
          common_vendor.index.showToast({
            title: "使用原图",
            icon: "none"
          });
        }
      });
    };
    const retakePhoto = () => {
      uploadedImage.value = null;
      uploadedImageFile.value = null;
      rawFileSize.value = 0;
      compressedFileSize.value = 0;
      analysisResult.value = "";
      analysisTime.value = 0;
    };
    const analyzeImage = async () => {
      if (!uploadedImage.value) {
        common_vendor.index.showToast({
          title: "请先选择图片",
          icon: "none"
        });
        return;
      }
      analyzing.value = true;
      startProgressSimulation();
      const startTime = Date.now();
      try {
        const response = await utils_api.emergencyApi.analyzeWoundImage(uploadedImageFile.value);
        analysisTime.value = ((Date.now() - startTime) / 1e3).toFixed(1);
        if (response && response.data) {
          analysisResult.value = response.data;
        } else {
          analysisResult.value = "### 分析完成\n未能获取有效分析结果，请重试。";
        }
        common_vendor.index.showToast({
          title: "分析完成",
          icon: "success"
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:560", "分析失败:", error);
        let errorMsg = "分析失败";
        if (error.message && error.message.includes("timeout")) {
          errorMsg = "分析请求超时，请检查网络";
        } else if (error.message) {
          errorMsg += ": " + error.message;
        }
        common_vendor.index.showToast({
          title: errorMsg,
          icon: "none",
          duration: 3e3
        });
      } finally {
        analyzing.value = false;
        analysisProgress.value = 100;
        if (progressTimer.value) {
          clearInterval(progressTimer.value);
          progressTimer.value = null;
        }
        setTimeout(() => {
          analysisProgress.value = 0;
        }, 1e3);
      }
    };
    const findMedicalCare = () => {
      common_vendor.index.switchTab({
        url: "/pages/hospital/hospital"
      });
    };
    const submitQuestion = async () => {
      if (!userQuestion.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入问题",
          icon: "none"
        });
        return;
      }
      asking.value = true;
      try {
        const response = await utils_api.emergencyApi.askEmergencyQuestion({
          question: userQuestion.value
        });
        if (response && response.data) {
          answerResult.value = response.data;
          saveQuestionToHistory(userQuestion.value, response.data);
          common_vendor.index.showToast({
            title: "获取答案成功",
            icon: "success"
          });
        } else {
          answerResult.value = "未能获取有效答案，请重试。";
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:623", "获取答案失败:", error);
        common_vendor.index.showToast({
          title: "获取答案失败：" + (error.message || "未知错误"),
          icon: "none",
          duration: 3e3
        });
      } finally {
        asking.value = false;
      }
    };
    const saveQuestionToHistory = (question, answer) => {
      const record = {
        question,
        answer,
        timestamp: (/* @__PURE__ */ new Date()).getTime()
      };
      questionHistory.value.unshift(record);
      if (questionHistory.value.length > 10) {
        questionHistory.value = questionHistory.value.slice(0, 10);
      }
      try {
        common_vendor.index.setStorageSync("emergency_question_history", JSON.stringify(questionHistory.value));
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:650", "保存历史记录失败:", e);
      }
    };
    const toggleHistoryItem = (index) => {
      expandedHistory.value = expandedHistory.value === index ? null : index;
    };
    const clearQuestionHistory = () => {
      questionHistory.value = [];
      try {
        common_vendor.index.removeStorageSync("emergency_question_history");
        common_vendor.index.showToast({
          title: "已清除历史记录",
          icon: "success"
        });
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:667", "清除历史记录失败:", e);
      }
    };
    const saveAnswer = () => {
      common_vendor.index.showToast({ title: "保存功能开发中", icon: "none" });
    };
    const shareAnswer = () => {
      common_vendor.index.showToast({ title: "分享功能开发中", icon: "none" });
    };
    const queryByName = async (forceRefresh = false) => {
      if (!snakeName.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入蛇类学名",
          icon: "none"
        });
        return;
      }
      querying.value = true;
      errorMessage.value = "";
      if (forceRefresh) {
        snakeImages.value = [];
        emergencyGuide.value = null;
      } else {
        snakeImages.value = [];
      }
      try {
        const response = await utils_api.emergencyApi.getEmergencyGuideByName(snakeName.value);
        if (response && response.data) {
          emergencyGuide.value = response.data;
          saveNameToHistory(snakeName.value);
          processSnakeImages(response.data);
          common_vendor.index.showToast({
            title: "查询成功",
            icon: "success"
          });
        } else {
          errorMessage.value = `未找到${snakeName.value}的相关信息`;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:715", "查询失败:", error);
        errorMessage.value = "查询失败：" + (error.message || "未知错误");
        common_vendor.index.showToast({
          title: errorMessage.value,
          icon: "none",
          duration: 3e3
        });
      } finally {
        querying.value = false;
      }
    };
    const processSnakeImages = (data) => {
      const images = [];
      if (data.imageUrls && Array.isArray(data.imageUrls)) {
        data.imageUrls.forEach((url, index) => {
          if (url) {
            images.push(utils_helpers.getBackendImageUrl(url));
          } else {
            images.push(null);
          }
        });
      }
      let validImages = images.filter((img) => img !== null);
      if (validImages.length === 0 && data.imageUrl) {
        const baseName = data.imageUrl.replace(/(_\d+)?\.\w+$/, "");
        for (let i = 1; i <= 3; i++) {
          const genUrl = `${baseName}_${i}.jpg`;
          images.push(utils_helpers.getBackendImageUrl(genUrl));
        }
      }
      validImages = images.filter((img) => img !== null);
      if (validImages.length === 0 && data.snakeName) {
        for (let i = 1; i <= 3; i++) {
          const genUrl = `${data.snakeName}_${i}.jpg`;
          images.push(utils_helpers.getBackendImageUrl(genUrl));
        }
      }
      if (images.length === 0 && data.images && Array.isArray(data.images)) {
        data.images.forEach((url) => {
          if (url) {
            images.push(utils_helpers.getBackendImageUrl(url));
          }
        });
      }
      snakeImages.value = images;
      imageLoadStatus.value = new Array(images.length).fill(false);
    };
    const handleImageLoad = (index) => {
      imageLoadStatus.value[index] = true;
      hasValidImages.value = true;
      imageLoadFailed.value = false;
    };
    const handleImageError = (index) => {
      imageLoadStatus.value[index] = false;
      const allFailed = imageLoadStatus.value.every((status) => status === false);
      if (allFailed && snakeImages.value.length > 0) {
        hasValidImages.value = false;
        imageLoadFailed.value = true;
      }
    };
    const selectSuggestion = (suggestion) => {
      snakeName.value = suggestion;
      suggestions.value = [];
      queryByName();
    };
    const saveNameToHistory = (name) => {
      const record = {
        snakeName: name,
        timestamp: (/* @__PURE__ */ new Date()).getTime()
      };
      const exists = nameHistoryRecords.value.some((r) => r.snakeName === name);
      if (!exists) {
        nameHistoryRecords.value.unshift(record);
        if (nameHistoryRecords.value.length > 10) {
          nameHistoryRecords.value = nameHistoryRecords.value.slice(0, 10);
        }
        try {
          common_vendor.index.setStorageSync("emergency_name_history", JSON.stringify(nameHistoryRecords.value));
        } catch (e) {
          common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:815", "保存历史记录失败:", e);
        }
      }
    };
    const selectHistory = (record) => {
      snakeName.value = record.snakeName;
      queryByName(true);
    };
    const clearNameHistory = () => {
      nameHistoryRecords.value = [];
      try {
        common_vendor.index.removeStorageSync("emergency_name_history");
        common_vendor.index.showToast({ title: "已清除历史记录", icon: "success" });
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:831", "清除历史记录失败:", e);
      }
    };
    const saveGuide = () => {
      common_vendor.index.showToast({ title: "保存功能开发中", icon: "none" });
    };
    const printGuide = () => {
      common_vendor.index.showToast({ title: "打印功能开发中", icon: "none" });
    };
    const clearResults = () => {
      answerResult.value = "";
      emergencyGuide.value = null;
      snakeName.value = "";
      suggestions.value = [];
      errorMessage.value = "";
      userQuestion.value = "";
      snakeImages.value = [];
      imageLoadStatus.value = [];
      hasValidImages.value = false;
      imageLoadFailed.value = false;
      uploadedImage.value = null;
      uploadedImageFile.value = null;
      rawFileSize.value = 0;
      compressedFileSize.value = 0;
      analysisResult.value = "";
      analysisTime.value = 0;
    };
    const loadHistory = () => {
      try {
        const history = common_vendor.index.getStorageSync("emergency_name_history");
        if (history) {
          nameHistoryRecords.value = JSON.parse(history);
        }
        const questionHistoryStr = common_vendor.index.getStorageSync("emergency_question_history");
        if (questionHistoryStr) {
          questionHistory.value = JSON.parse(questionHistoryStr);
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/emergency/emergency.vue:877", "加载历史记录失败:", e);
      }
    };
    common_vendor.onUnmounted(() => {
      if (progressTimer.value) {
        clearInterval(progressTimer.value);
      }
    });
    loadHistory();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "🚑 应急处理",
          subtitle: "伤口分析 | 问题咨询 | 学名查询"
        }),
        b: activeMode.value === "image" ? 1 : "",
        c: common_vendor.o(($event) => switchMode("image"), "3f"),
        d: activeMode.value === "question" ? 1 : "",
        e: common_vendor.o(($event) => switchMode("question"), "d5"),
        f: activeMode.value === "name" ? 1 : "",
        g: common_vendor.o(($event) => switchMode("name"), "70"),
        h: activeMode.value === "image"
      }, activeMode.value === "image" ? common_vendor.e({
        i: !uploadedImage.value
      }, !uploadedImage.value ? {} : common_vendor.e({
        j: uploadedImage.value,
        k: common_vendor.t(common_vendor.unref(utils_helpers.formatFileSize)(rawFileSize.value)),
        l: common_vendor.t(common_vendor.unref(utils_helpers.formatFileSize)(compressedFileSize.value)),
        m: common_vendor.o(retakePhoto, "76"),
        n: analyzing.value
      }, analyzing.value ? {} : {}, {
        o: analyzing.value ? 1 : "",
        p: common_vendor.o(analyzeImage, "24")
      }), {
        q: common_vendor.o(chooseImage, "e8"),
        r: analysisResult.value || analyzing.value
      }, analysisResult.value || analyzing.value ? common_vendor.e({
        s: analysisTime.value && !analyzing.value
      }, analysisTime.value && !analyzing.value ? {
        t: common_vendor.t(analysisTime.value)
      } : {}, {
        v: analyzing.value
      }, analyzing.value ? {
        w: common_vendor.p({
          progress: analysisProgress.value,
          title: "AI 正在分析中...",
          subtitle: "请稍候，系统正在分析伤口图片",
          color: "#ef4444"
        })
      } : analysisResult.value ? {
        y: common_vendor.t(analysisTime.value),
        z: formattedAnalysisResult.value,
        A: common_vendor.o(findMedicalCare, "cb")
      } : {}, {
        x: analysisResult.value
      }) : {}) : {}, {
        B: activeMode.value === "question"
      }, activeMode.value === "question" ? common_vendor.e({
        C: userQuestion.value,
        D: common_vendor.o(($event) => userQuestion.value = $event.detail.value, "a4"),
        E: asking.value
      }, asking.value ? {} : {}, {
        F: !userQuestion.value || asking.value ? 1 : "",
        G: common_vendor.o(submitQuestion, "f5"),
        H: questionHistory.value.length > 0
      }, questionHistory.value.length > 0 ? {
        I: common_vendor.o(clearQuestionHistory, "c8"),
        J: common_vendor.f(questionHistory.value, (record, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(record.question),
            b: common_vendor.t(expandedHistory.value === index ? "▲" : "▼"),
            c: expandedHistory.value === index
          }, expandedHistory.value === index ? {
            d: common_vendor.t(record.answer)
          } : {}, {
            e: index,
            f: common_vendor.o(($event) => toggleHistoryItem(index), index)
          });
        })
      } : {}, {
        K: answerResult.value
      }, answerResult.value ? {
        L: common_vendor.t(answerResult.value),
        M: common_vendor.o(saveAnswer, "bd"),
        N: common_vendor.o(shareAnswer, "3a")
      } : {}) : {}, {
        O: activeMode.value === "name"
      }, activeMode.value === "name" ? common_vendor.e({
        P: common_vendor.o(queryByName, "8b"),
        Q: snakeName.value,
        R: common_vendor.o(($event) => snakeName.value = $event.detail.value, "9d"),
        S: querying.value
      }, querying.value ? {} : {}, {
        T: !snakeName.value || querying.value ? 1 : "",
        U: common_vendor.o(queryByName, "bf"),
        V: suggestions.value.length > 0
      }, suggestions.value.length > 0 ? {
        W: common_vendor.f(suggestions.value, (suggestion, k0, i0) => {
          return {
            a: common_vendor.t(suggestion),
            b: suggestion,
            c: common_vendor.o(($event) => selectSuggestion(suggestion), suggestion)
          };
        })
      } : {}, {
        X: nameHistoryRecords.value.length > 0
      }, nameHistoryRecords.value.length > 0 ? {
        Y: common_vendor.o(clearNameHistory, "98"),
        Z: common_vendor.f(nameHistoryRecords.value, (record, k0, i0) => {
          return {
            a: common_vendor.t(record.snakeName),
            b: record.timestamp,
            c: common_vendor.o(($event) => selectHistory(record), record.timestamp)
          };
        })
      } : {}, {
        aa: emergencyGuide.value
      }, emergencyGuide.value ? common_vendor.e({
        ab: common_vendor.t(emergencyGuide.value.snakeName),
        ac: snakeImages.value && snakeImages.value.length > 0
      }, snakeImages.value && snakeImages.value.length > 0 ? {
        ad: common_vendor.f(snakeImages.value, (img, index, i0) => {
          return {
            a: index,
            b: img,
            c: common_vendor.o(($event) => handleImageLoad(index), index),
            d: common_vendor.o(($event) => handleImageError(index), index)
          };
        })
      } : !hasValidImages.value && imageLoadFailed.value ? {} : {}, {
        ae: !hasValidImages.value && imageLoadFailed.value,
        af: common_vendor.t(emergencyGuide.value.venomType || "未知"),
        ag: common_vendor.t(emergencyGuide.value.snakeAlias || "无"),
        ah: common_vendor.t(emergencyGuide.value.symptomDescription || "暂无描述"),
        ai: common_vendor.t(emergencyGuide.value.emergencyTreatment || "暂无描述"),
        aj: common_vendor.t(emergencyGuide.value.medicalAttention || "暂无描述"),
        ak: common_vendor.o(saveGuide, "9a"),
        al: common_vendor.o(printGuide, "a4")
      }) : {}, {
        am: errorMessage.value
      }, errorMessage.value ? {
        an: common_vendor.t(errorMessage.value)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d1a2bd0a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/emergency/emergency.js.map
