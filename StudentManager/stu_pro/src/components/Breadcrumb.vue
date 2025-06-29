<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 根据路由生成面包屑数据
const breadcrumbItems = computed(() => {
  const items = [
    { path: '/', title: '首页' }
  ]
  
  const pathMap: Record<string, string> = {
    '/student/list': '学生列表',
    '/student/add': '添加学生',
    '/student/stats': '学生统计',
    '/class/list': '班级列表',
    '/class/add': '添加班级',
    '/score/input': '成绩录入',
    '/score/query': '成绩查询',
    '/score/stats': '成绩统计',
    '/settings': '系统设置',
    '/profile': '个人信息',
    '/change-password': '修改密码'
  }
  
  const currentPath = route.path
  const currentTitle = pathMap[currentPath]
  
  if (currentTitle) {
    // 添加父级菜单
    if (currentPath.startsWith('/student')) {
      items.push({ path: '/student', title: '学生管理' })
    } else if (currentPath.startsWith('/class')) {
      items.push({ path: '/class', title: '班级管理' })
    } else if (currentPath.startsWith('/score')) {
      items.push({ path: '/score', title: '成绩管理' })
    }
    
    // 添加当前页面
    items.push({ path: currentPath, title: currentTitle })
  } else if (currentPath === '/') {
    // 首页不需要额外处理
  } else {
    // 对于没有映射的路径，尝试从路由meta中获取标题
    const routeTitle = route.meta?.title as string
    if (routeTitle) {
      items.push({ path: currentPath, title: routeTitle })
    }
  }
  
  return items
})
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item 
        v-for="item in breadcrumbItems" 
        :key="item.path"
        :to="item.path === route.path ? undefined : { path: item.path }"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 20px;
  padding: 10px 0;
}
</style> 