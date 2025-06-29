<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Breadcrumb from '@/components/Breadcrumb.vue'

// 个人信息
const userInfo = ref({
  username: 'zskyyds',
  nickname: '超级管理员',
  email: 'admin@example.com',
  phone: '13800000000',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin'
})

// 主题切换
const theme = ref('light')
const handleThemeChange = (val: string) => {
  theme.value = val
  if (val === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  ElMessage.success('主题切换为 ' + (val === 'light' ? '明亮' : '暗黑'))
}

// 分页大小
const pageSize = ref(20)
const handlePageSizeChange = (val: number) => {
  pageSize.value = val
  ElMessage.success('默认分页大小已设置为 ' + val)
}

// 系统公告
const notice = ref('欢迎使用学生管理系统！如有问题请联系管理员。')
const handleNoticeSave = () => {
  ElMessage.success('系统公告已保存')
}

// 数据导出
const handleExport = () => {
  ElMessage.success('数据导出成功（模拟）')
}

// 跳转修改密码
const goChangePassword = () => {
  window.location.hash = '/change-password'
}
</script>

<template>
  <div class="system-settings">
    <Breadcrumb />
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <h2>系统设置</h2>
        </div>
      </template>
      <el-row :gutter="24">
        <!-- 个人信息 -->
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="setting-block">
            <template #header>
              <span>个人信息</span>
            </template>
            <div class="user-info">
              <el-avatar :src="userInfo.avatar" size="large" />
              <div class="user-fields">
                <div><strong>用户名：</strong>{{ userInfo.username }}</div>
                <div><strong>昵称：</strong>{{ userInfo.nickname }}</div>
                <div><strong>邮箱：</strong>{{ userInfo.email }}</div>
                <div><strong>电话：</strong>{{ userInfo.phone }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 密码修改 -->
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="setting-block">
            <template #header>
              <span>安全设置</span>
            </template>
            <div class="setting-row">
              <el-button type="primary" @click="goChangePassword">修改密码</el-button>
            </div>
          </el-card>
        </el-col>
        <!-- 主题切换 -->
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="setting-block">
            <template #header>
              <span>主题设置</span>
            </template>
            <el-radio-group v-model="theme" @change="handleThemeChange">
              <el-radio-button label="light">明亮</el-radio-button>
              <el-radio-button label="dark">暗黑</el-radio-button>
            </el-radio-group>
          </el-card>
        </el-col>
        <!-- 分页大小 -->
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="setting-block">
            <template #header>
              <span>分页设置</span>
            </template>
            <el-select v-model="pageSize" @change="handlePageSizeChange" style="width: 120px">
              <el-option :value="10" label="10条/页" />
              <el-option :value="20" label="20条/页" />
              <el-option :value="50" label="50条/页" />
              <el-option :value="100" label="100条/页" />
            </el-select>
          </el-card>
        </el-col>
        <!-- 数据导出 -->
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="setting-block">
            <template #header>
              <span>数据管理</span>
            </template>
            <el-button type="success" @click="handleExport">导出全部数据</el-button>
          </el-card>
        </el-col>
        <!-- 系统公告 -->
        <el-col :xs="24" :sm="24" :md="24">
          <el-card shadow="hover" class="setting-block">
            <template #header>
              <span>系统公告</span>
            </template>
            <el-input
              v-model="notice"
              type="textarea"
              :rows="3"
              maxlength="100"
              show-word-limit
              placeholder="请输入系统公告内容"
            />
            <el-button type="primary" style="margin-top: 10px" @click="handleNoticeSave">保存公告</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.system-settings {
  padding: 20px;
}
.main-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.setting-block {
  margin-bottom: 24px;
  min-height: 120px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-fields {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #606266;
}
.setting-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
</style> 