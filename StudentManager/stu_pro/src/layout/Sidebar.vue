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
  Search
} from '@element-plus/icons-vue'

defineProps<{
  isCollapse: boolean
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
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #304156;
  transition: width 0.3s;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
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

/* 折叠状态下的样式 */
:deep(.el-menu--collapse .el-sub-menu .el-menu-item) {
  padding-left: 20px !important;
}

/* 确保图标正确显示 */
:deep(.el-menu-item .el-icon),
:deep(.el-sub-menu__title .el-icon) {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}
</style> 