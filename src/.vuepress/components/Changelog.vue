<template>
    <div class="changelog-container">
      <div v-if="isLoading" class="loading">正在加载更新日志...</div>
  
      <div v-else-if="error" class="error">
        加载失败：{{ error.message }}
      </div>
  
      <div v-else class="timeline">
        <div v-for="(log, index) in changelogs" :key="log.version" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3 class="version">版本 {{ log.version }}</h3>
              <time class="time">{{ log.time }}</time>
            </div>
            <div class="changes" v-html="formatChanges(log.changes)"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // 定义响应式变量
  const changelogs = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  
  // 定义一个函数来格式化 changes 字符串
  const formatChanges = (changes) => {
    // 将换行符 \n 替换为 <br> 标签，以便在 HTML 中正确显示换行
    return changes.replace(/\n/g, '<br>');
  };
  
  // 在组件挂载后执行的钩子
  onMounted(async () => {
    try {
      const response = await fetch('https://api.mslmc.cn/v3/query/changelogs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code === 200) {
        changelogs.value = data.data;
      } else {
        throw new Error(data.message || 'API返回数据格式错误');
      }
    } catch (e) {
      error.value = e;
      console.error('获取更新日志失败:', e);
    } finally {
      isLoading.value = false;
    }
  });
  </script>
  
  <style scoped>
  /* --- 基础样式 (来自您的版本) --- */
  .changelog-container {
    max-width: 800px;
    margin: 2rem auto;
  }
  
  .loading, .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: var(--vp-c-text-2);
  }
  
  .error {
    color: var(--vp-c-danger);
  }
  
  .timeline {
    position: relative;
    padding-left: 30px;
    border-left: 2px solid var(--vp-c-divider);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 30px;
  }
  
  .timeline-item:last-child {
    margin-bottom: 0;
  }
  
  /* --- 圆点 & 新增动画 --- */
  .timeline-dot {
    position: absolute;
    left: -40px;
    top: 5px;
    width: 14px;
    height: 14px;
    background-color: var(--vp-c-accent, #299764);
    border-radius: 50%;
    border: 2px solid var(--vp-c-bg);
    box-shadow: 0 0 0 2px var(--vp-c-accent, #299764);
    z-index: 1;
    /* 新增：应用下面的呼吸动画 */
    animation: pulse-dot 2s infinite;
  }
  
  /* --- 卡片 & 新增悬浮效果 --- */
  .timeline-content {
    padding: 15px 20px;
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    /* 新增：为所有变换效果添加平滑过渡 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  /* 新增：鼠标悬浮时的样式 */
  .timeline-content:hover {
    /* 向上移动5像素 */
    transform: translateY(-5px);
    /* 增强阴影，更有立体感 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  
  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  
  .version {
    margin: 0;
    font-size: 1.4rem;
    color: var(--vp-c-text-1);
    font-weight: 600;
  }
  
  .time {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
  }
  
  .changes {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--vp-c-text-1);
    /* 修正：v-html不需要white-space，移除它以避免潜在的格式问题 */
    /* white-space: pre-wrap; */
    padding-top: 5px;
  }
  
  /* --- 新增：定义呼吸动画的关键帧 --- */
  @keyframes pulse-dot {
    0% {
      box-shadow: 0 0 0 0 var(--vp-c-accent, #299764);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(41, 151, 100, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(41, 151, 100, 0);
    }
  }
  </style>