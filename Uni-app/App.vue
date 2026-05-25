<script>
export default {
  onLaunch: function () {},
  onShow: function () {},
  onHide: function () {}
}
</script>

<style lang="scss">
/* Global styles - existing design language */

:root {
  /* Theme colors */
  --primary-color: #10b981;
  --primary-gradient: linear-gradient(135deg, #10b981, #059669);
  --secondary-gradient: linear-gradient(135deg, #667eea, #764ba2);
  --danger-color: #ef4444;
  --info-color: #3b82f6;
  --warning-color: #f59e0b;

  /* Backgrounds */
  --bg-color: #f5f5f5;
  --card-bg: rgba(255, 255, 255, 0.95);
  --glass-bg: rgba(255, 255, 255, 0.1);

  /* Text colors */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-light: #94a3b8;

  /* Borders */
  --border-color: rgba(226, 232, 240, 0.8);
  --border-radius: 16px;

  /* Shadows */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.15);
}

page {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-color);
  box-sizing: border-box;
}

view, text, image, button {
  box-sizing: border-box;
}

/* Glass card */
.glass-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-card:active {
  transform: scale(0.98);
}

/* Gradient button */
.gradient-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.gradient-btn:active {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

/* Input field */
.input-field {
  height: 50px;
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid var(--border-color);
  padding: 0 16px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Flex utilities */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Safe area */
.safe-area-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Tab bar placeholder */
.tabbar-placeholder {
  height: 50px;
}
</style>
