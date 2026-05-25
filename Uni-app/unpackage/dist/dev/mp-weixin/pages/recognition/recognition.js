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
  __name: "recognition",
  setup(__props) {
    const uploadedImage = common_vendor.ref(null);
    const uploadedImageFile = common_vendor.ref(null);
    const rawFileSize = common_vendor.ref(0);
    const compressedFileSize = common_vendor.ref(0);
    const recognizing = common_vendor.ref(false);
    const rawRecognitionText = common_vendor.ref("");
    const recognitionTime = common_vendor.ref(0);
    const recognitionProgress = common_vendor.ref(0);
    const progressTimer = common_vendor.ref(null);
    const isDragging = common_vendor.ref(false);
    const formattedRecognitionText = common_vendor.computed(() => {
      if (!rawRecognitionText.value)
        return "";
      return rawRecognitionText.value.replace(/### (.*?)/g, "<h3>$1</h3>").replace(/## (.*?)/g, "<h2>$1</h2>").replace(/# (.*?)/g, "<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
    });
    const calculateCompressionRate = () => {
      if (rawFileSize.value === 0)
        return 0;
      return Math.round((1 - compressedFileSize.value / rawFileSize.value) * 100);
    };
    const startProgressSimulation = () => {
      recognitionProgress.value = 0;
      progressTimer.value = setInterval(() => {
        if (recognitionProgress.value < 90) {
          recognitionProgress.value += Math.random() * 10;
          if (recognitionProgress.value > 90) {
            recognitionProgress.value = 90;
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
        common_vendor.index.__f__("error", "at pages/recognition/recognition.vue:248", "选择图片失败:", error);
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
              const savedPercent = calculateCompressionRate();
              common_vendor.index.showToast({
                title: `图片压缩完成，节省${savedPercent}%空间`,
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
            title: "图片压缩失败，使用原图",
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
      rawRecognitionText.value = "";
      recognitionTime.value = 0;
      recognitionProgress.value = 0;
    };
    const submitForRecognition = async () => {
      if (!uploadedImage.value) {
        common_vendor.index.showToast({
          title: "请先选择图片",
          icon: "none"
        });
        return;
      }
      recognizing.value = true;
      startProgressSimulation();
      const startTime = Date.now();
      try {
        const response = await utils_api.recognitionApi.identifySnake(uploadedImageFile.value);
        recognitionTime.value = ((Date.now() - startTime) / 1e3).toFixed(1);
        if (response && response.data) {
          rawRecognitionText.value = response.data;
        } else {
          rawRecognitionText.value = "### 识别完成\n未能获取有效识别结果，请重试。";
        }
        common_vendor.index.showToast({
          title: "识别完成",
          icon: "success"
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/recognition/recognition.vue:354", "识别失败:", error);
        let errorMsg = "识别失败";
        if (error.message && error.message.includes("timeout")) {
          errorMsg = "识别请求超时，请检查网络";
        } else if (error.message) {
          errorMsg += ": " + error.message;
        }
        common_vendor.index.showToast({
          title: errorMsg,
          icon: "none",
          duration: 3e3
        });
      } finally {
        recognizing.value = false;
        recognitionProgress.value = 100;
        if (progressTimer.value) {
          clearInterval(progressTimer.value);
          progressTimer.value = null;
        }
        setTimeout(() => {
          recognitionProgress.value = 0;
        }, 1e3);
      }
    };
    const findMedicalCare = () => {
      common_vendor.index.switchTab({
        url: "/pages/emergency/emergency"
      });
    };
    const saveResult = () => {
      common_vendor.index.showToast({
        title: "保存功能开发中",
        icon: "none"
      });
    };
    common_vendor.onUnmounted(() => {
      if (progressTimer.value) {
        clearInterval(progressTimer.value);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "📷 蛇类识别",
          subtitle: "上传图片，智能识别蛇类信息"
        }),
        b: !uploadedImage.value
      }, !uploadedImage.value ? {} : common_vendor.e({
        c: uploadedImage.value,
        d: common_vendor.t(common_vendor.unref(utils_helpers.formatFileSize)(rawFileSize.value)),
        e: common_vendor.t(common_vendor.unref(utils_helpers.formatFileSize)(compressedFileSize.value)),
        f: common_vendor.t(calculateCompressionRate()),
        g: common_vendor.o(retakePhoto, "b1"),
        h: recognizing.value
      }, recognizing.value ? {} : {}, {
        i: recognizing.value ? 1 : "",
        j: common_vendor.o(submitForRecognition, "5a")
      }), {
        k: isDragging.value ? 1 : "",
        l: common_vendor.o(chooseImage, "4b"),
        m: rawRecognitionText.value || recognizing.value
      }, rawRecognitionText.value || recognizing.value ? common_vendor.e({
        n: recognitionTime.value && !recognizing.value
      }, recognitionTime.value && !recognizing.value ? {
        o: common_vendor.t(recognitionTime.value)
      } : {}, {
        p: recognizing.value
      }, recognizing.value ? {
        q: common_vendor.p({
          progress: recognitionProgress.value,
          title: "AI 正在分析中...",
          subtitle: "请稍候，系统正在识别图片中的蛇类信息",
          color: "#10b981"
        })
      } : rawRecognitionText.value ? {
        s: common_vendor.t(recognitionTime.value),
        t: formattedRecognitionText.value,
        v: common_vendor.o(saveResult, "01"),
        w: common_vendor.o(findMedicalCare, "6b")
      } : {}, {
        r: rawRecognitionText.value
      }) : {}, {
        x: !rawRecognitionText.value && !recognizing.value
      }, !rawRecognitionText.value && !recognizing.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d18193c9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recognition/recognition.js.map
