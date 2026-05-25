# 🚀 Uni-app 微信小程序启动指南

## ✅ 环境已就绪

依赖已成功安装！当前安装的版本：
- Vue: 3.5.30
- Vite: 5.4.21
- Uni-app: 2.0.2-5000420260318002
- Pinia: 2.3.1

## 📋 启动步骤

### 方式一：使用命令行（推荐）

```bash
# 在 Uni-app 目录下运行
npm run dev:mp-weixin
```

这会自动编译项目并准备在微信小程序开发者工具中运行。

### 方式二：使用 HBuilderX

1. 打开 HBuilderX
2. 文件 → 打开目录 → 选择 `Uni-app` 文件夹
3. 点击菜单「运行」→「运行到小程序模拟器」→「微信开发者工具」

## 🔧 配置后端地址

在运行前，请确保后端服务已启动，然后编辑 `utils/api.js` 第 7 行：

```javascript
// utils/api.js
const BASE_URL = 'http://localhost:8888/api' // 确保与实际后端地址一致
```

## ⚠️ 注意事项

### 1. TabBar 图标
项目中需要准备 TabBar 图标文件。已提供两种方案：

**方案 A - 使用占位图标（临时）**
```bash
# 安装 Pillow
pip install Pillow

# 生成占位图标
python generate_icons.py
```

**方案 B - 准备正式图标**
参考 `static/tabbar/README.md` 准备专业 UI 图标

### 2. 微信小程序配置
首次运行需要在 [微信公众平台](https://mp.weixin.qq.com/) 注册小程序并获取 AppID，然后在 `manifest.json` 中配置。

开发阶段可以使用「测试号」或勾选「不校验合法域名」。

### 3. 后端服务
确保以下微服务已启动：
- snake-gateway (端口 8888)
- user-service
- recognition-service
- emergency-service
- hospital-service
- warning-service

可以使用项目根目录的 `启动脚本.bat` 一键启动所有服务。

## 🎯 快速验证

安装成功后，运行以下命令验证：

```bash
# 查看已安装的包
npm list --depth=0

# 运行项目
npm run dev:mp-weixin
```

## 📝 常见问题

### Q: 运行时提示找不到模块？
A: 删除 `node_modules` 和 `package-lock.json`，然后重新运行 `npm install --legacy-peer-deps`

### Q: 样式不生效？
A: 确保使用的是 `.vue` 单文件组件，并且 `<style>` 标签添加了 `lang="scss"`

### Q: 图片无法显示？
A: 检查图片路径是否正确，小程序中建议使用绝对路径或 base64

## 📞 更多文档

- [快速启动指南](./QUICK_START.md)
- [开发日志](./开发日志_20251219.md)
- [演示指南](./DEMO_GUIDE.md)
- [检查清单](./CHECKLIST.md)

---

**祝你使用愉快！** 🎉
