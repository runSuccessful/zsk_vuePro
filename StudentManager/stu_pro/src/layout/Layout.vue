<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'

const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="layout-container">
    <!-- 头部 -->
    <Header :is-collapse="isCollapse" @toggle-collapse="toggleCollapse" />

    <div class="layout-body">
      <!-- 侧边栏 -->
      <Sidebar :is-collapse="isCollapse" />

      <!-- 主体内容 -->
      <div class="main-content">
        <!-- 路由视图 -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.layout-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.main-content {
  flex: 1;
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}

.content-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  min-height: 200px;
}

.content-wrapper h2 {
  margin-top: 0;
  color: #303133;
}

.content-wrapper p {
  color: #606266;
}

.temp-content {
  background-color: #fff;
  border-radius: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-content {
  padding: 20px 0;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 10px;
}

.stat-icon {
  font-size: 40px;
  color: #409EFF;
  margin-right: 15px;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}
</style>