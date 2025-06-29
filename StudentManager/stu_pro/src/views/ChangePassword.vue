<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Lock, View, Hide } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

// 表单数据
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value === passwordForm.oldPassword) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const formRef = ref()
const loading = ref(false)

// 修改密码
const handleChangePassword = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟修改密码
    setTimeout(() => {
      // 验证原密码是否正确（这里假设原密码是123456）
      if (passwordForm.oldPassword !== '123456') {
        ElMessage.error('原密码错误')
        loading.value = false
        return
      }
      
      ElMessage.success('密码修改成功，请重新登录')
      
      // 清除登录状态，跳转到登录页
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
      
      loading.value = false
    }, 1000)
  } catch (error) {
    loading.value = false
    console.error('表单验证失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}
</script>

<template>
  <div class="change-password">
    <Breadcrumb />
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
        </div>
      </template>
      
      <div class="password-content">
        <el-alert
          title="密码安全提示"
          type="info"
          :closable="false"
          show-icon
        >
          <template #default>
            <p>1. 密码长度至少6位</p>
            <p>2. 建议使用字母、数字、符号的组合</p>
            <p>3. 修改密码后需要重新登录</p>
          </template>
        </el-alert>
        
        <el-form
          ref="formRef"
          :model="passwordForm"
          :rules="rules"
          label-width="120px"
          class="password-form"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="passwordForm.oldPassword"
              type="password"
              placeholder="请输入原密码"
              :prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>
          
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="请输入新密码"
              :prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>
          
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="请再次输入新密码"
              :prefix-icon="Lock"
              show-password
              clearable
              @keyup.enter="handleChangePassword"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              :loading="loading"
              @click="handleChangePassword"
            >
              {{ loading ? '修改中...' : '确认修改' }}
            </el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.change-password {
  padding: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password-content {
  padding: 20px 0;
}

.password-form {
  margin-top: 30px;
  max-width: 500px;
}

.el-alert {
  margin-bottom: 20px;
}

.el-alert p {
  margin: 5px 0;
  font-size: 14px;
}
</style> 