<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Message, Phone, Location } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

// 用户信息
const userInfo = reactive({
  username: 'zskyyds',
  name: '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  address: '北京市朝阳区',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  role: '系统管理员',
  createTime: '2024-01-01'
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

const formRef = ref()
const loading = ref(false)

// 保存个人信息
const handleSave = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟保存
    setTimeout(() => {
      ElMessage.success('个人信息保存成功')
      loading.value = false
    }, 1000)
  } catch (error) {
    loading.value = false
    console.error('表单验证失败:', error)
  }
}

// 上传头像
const handleAvatarSuccess = (response: any) => {
  userInfo.avatar = response.url
  ElMessage.success('头像上传成功')
}

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}
</script>

<template>
  <div class="profile">
    <Breadcrumb />
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      
      <div class="profile-content">
        <el-row :gutter="40">
          <!-- 左侧头像 -->
          <el-col :span="8">
            <div class="avatar-section">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false"
              >
                <el-avatar 
                  :size="120" 
                  :src="userInfo.avatar"
                  class="avatar"
                />
                <div class="upload-text">
                  <el-icon><User /></el-icon>
                  <span>点击更换头像</span>
                </div>
              </el-upload>
              
              <div class="user-basic-info">
                <h3>{{ userInfo.name }}</h3>
                <p>{{ userInfo.role }}</p>
                <p>注册时间：{{ userInfo.createTime }}</p>
              </div>
            </div>
          </el-col>
          
          <!-- 右侧表单 -->
          <el-col :span="16">
            <el-form
              ref="formRef"
              :model="userInfo"
              :rules="rules"
              label-width="100px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input 
                  v-model="userInfo.username" 
                  disabled
                  :prefix-icon="User"
                />
              </el-form-item>
              
              <el-form-item label="姓名" prop="name">
                <el-input 
                  v-model="userInfo.name" 
                  :prefix-icon="User"
                />
              </el-form-item>
              
              <el-form-item label="邮箱" prop="email">
                <el-input 
                  v-model="userInfo.email" 
                  :prefix-icon="Message"
                />
              </el-form-item>
              
              <el-form-item label="手机号" prop="phone">
                <el-input 
                  v-model="userInfo.phone" 
                  :prefix-icon="Phone"
                />
              </el-form-item>
              
              <el-form-item label="地址" prop="address">
                <el-input 
                  v-model="userInfo.address" 
                  :prefix-icon="Location"
                />
              </el-form-item>
              
              <el-form-item>
                <el-button 
                  type="primary" 
                  :loading="loading"
                  @click="handleSave"
                >
                  {{ loading ? '保存中...' : '保存修改' }}
                </el-button>
                <el-button @click="formRef?.resetFields()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.profile {
  padding: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-content {
  padding: 20px 0;
}

.avatar-section {
  text-align: center;
}

.avatar-uploader {
  margin-bottom: 20px;
}

.avatar {
  border: 4px solid #f0f2f5;
  cursor: pointer;
  transition: all 0.3s;
}

.avatar:hover {
  border-color: #409EFF;
}

.upload-text {
  margin-top: 10px;
  color: #909399;
  font-size: 14px;
  cursor: pointer;
}

.upload-text:hover {
  color: #409EFF;
}

.upload-text .el-icon {
  margin-right: 5px;
}

.user-basic-info h3 {
  margin: 10px 0 5px 0;
  color: #303133;
}

.user-basic-info p {
  margin: 5px 0;
  color: #909399;
  font-size: 14px;
}
</style> 