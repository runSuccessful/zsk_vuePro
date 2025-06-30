<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { 
  House, 
  User, 
  School, 
  Document, 
  Setting, 
  List, 
  Plus, 
  DataAnalysis, 
  Edit, 
  Search,
  Reading,
  Fold,
  Expand
} from '@element-plus/icons-vue'

defineProps<{
  isCollapse: boolean
}>()

defineEmits<{
  toggleCollapse: []
}>()

const router = useRouter()
const route = useRoute()

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  
  // 根据菜单项跳转到对应路由
  const routeMap: Record<string, string> = {
    '1': '/',
    '2-1': '/student/list',
    '2-2': '/student/add',
    '2-3': '/student/stats',
    '3-1': '/class/list',
    '3-2': '/class/add',
    '4-1': '/score/input',
    '4-2': '/score/query',
    '4-3': '/score/stats',
    '5': '/settings'
  }
  
  const targetRoute = routeMap[key]
  if (targetRoute && targetRoute !== route.path) {
    router.push(targetRoute)
  }
}

// 根据当前路由设置默认激活的菜单项
const getDefaultActive = () => {
  const path = route.path
  const pathMap: Record<string, string> = {
    '/': '1',
    '/student/list': '2-1',
    '/student/add': '2-2',
    '/student/stats': '2-3',
    '/class/list': '3-1',
    '/class/add': '3-2',
    '/score/input': '4-1',
    '/score/query': '4-2',
    '/score/stats': '4-3',
    '/settings': '5'
  }
  return pathMap[path] || '1'
}
</script>

<template>
  <div class="sidebar" :style="{ width: isCollapse ? '64px' : '200px' }">
    <!-- 系统标题 -->
    <div class="sidebar-header">
      <h2 class="system-title" :class="{ 'collapsed': isCollapse }">
        <el-icon class="title-icon"><Reading /></el-icon>
        <span v-if="!isCollapse">学生管理系统</span>
        <span v-else>系统</span>
      </h2>
    </div>

    <el-menu
      :default-active="getDefaultActive()"
      class="sidebar-menu"
      :collapse="isCollapse"
      @select="handleSelect"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
    >
      <el-menu-item index="1">
        <el-icon><House /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      
      <el-sub-menu index="2">
        <template #title>
          <el-icon><User /></el-icon>
          <span>学生管理</span>
        </template>
        <el-menu-item index="2-1">
          <el-icon><List /></el-icon>
          <template #title>学生列表</template>
        </el-menu-item>
        <el-menu-item index="2-2">
          <el-icon><Plus /></el-icon>
          <template #title>添加学生</template>
        </el-menu-item>
        <el-menu-item index="2-3">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>学生统计</template>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><School /></el-icon>
          <span>班级管理</span>
        </template>
        <el-menu-item index="3-1">
          <el-icon><List /></el-icon>
          <template #title>班级列表</template>
        </el-menu-item>
        <el-menu-item index="3-2">
          <el-icon><Plus /></el-icon>
          <template #title>添加班级</template>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>成绩管理</span>
        </template>
        <el-menu-item index="4-1">
          <el-icon><Edit /></el-icon>
          <template #title>成绩录入</template>
        </el-menu-item>
        <el-menu-item index="4-2">
          <el-icon><Search /></el-icon>
          <template #title>成绩查询</template>
        </el-menu-item>
        <el-menu-item index="4-3">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>成绩统计</template>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item index="5">
        <el-icon><Setting /></el-icon>
        <template #title>系统设置</template>
      </el-menu-item>
    </el-menu>

    <!-- 收起/展开按钮 -->
    <div class="collapse-toggle">
      <el-button
        type="text"
        @click="$emit('toggleCollapse')"
        class="collapse-btn"
        :title="isCollapse ? '展开侧边栏' : '收起侧边栏'"
      >
        <el-icon>
          <Fold v-if="!isCollapse" />
          <Expand v-else />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #304156;
  transition: width 0.3s;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #435266;
  background-color: #2b3a4a;
}

.system-title {
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
  color: #409EFF;
}

.system-title.collapsed {
  font-size: 12px;
  gap: 4px;
}

.system-title.collapsed .title-icon {
  font-size: 16px;
}

.sidebar-menu {
  border-right: none;
  flex: 1;
}

.collapse-toggle {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

.collapse-btn {
  background-color: #409EFF;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.collapse-btn:hover {
  background-color: #66b1ff;
  transform: scale(1.1);
}

.collapse-btn .el-icon {
  font-size: 16px;
}

/* 修复子菜单项的对齐问题 */
:deep(.el-sub-menu .el-menu-item) {
  padding-left: 54px !important;
}

/* 确保父菜单项的图标和文字对齐 */
:deep(.el-sub-menu__title) {
  padding-left: 20px !important;
}

:deep(.el-menu-item) {
  padding-left: 20px !important;
}

/* 折叠状态下所有菜单项和子菜单项高度、图标严格居中对齐 */
:deep(.el-menu--collapse .el-menu-item),
:deep(.el-menu--collapse .el-sub-menu__title) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 56px !important;
  min-width: 0 !important;
  padding: 0 !important;
}
:deep(.el-menu--collapse .el-menu-item .el-icon),
:deep(.el-menu--collapse .el-sub-menu__title .el-icon) {
  margin: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 20px !important;
  height: 20px !important;
}
/* 让所有菜单项的图标颜色和未激活时一致 */
:deep(.el-menu--collapse .el-menu-item),
:deep(.el-menu--collapse .el-sub-menu__title) {
  color: #bfcbd9 !important;
}
:deep(.el-menu--collapse .el-menu-item.is-active),
:deep(.el-menu--collapse .el-menu-item.is-active .el-icon) {
  color: #409EFF !important;
}

/* 隐藏折叠状态下 el-sub-menu 的箭头（>） */
:deep(.el-menu--collapse .el-sub-menu__icon-arrow),
:deep(.el-menu--collapse .el-sub-menu .el-sub-menu__icon-arrow) {
  display: none !important;
}
</style> 