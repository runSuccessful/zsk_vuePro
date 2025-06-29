<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Refresh } from '@element-plus/icons-vue'
import loginBg from '@/assets/login-bg.svg'

const router = useRouter()

// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

// 验证码相关
const captchaText = ref('')
const captchaCanvas = ref<HTMLCanvasElement>()

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}

const loginFormRef = ref()
const loading = ref(false)

// 生成随机验证码
const generateCaptcha = () => {
  const canvas = captchaCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 生成4位随机验证码
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let captcha = ''
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaText.value = captcha

  // 设置画布背景
  ctx.fillStyle = '#f0f2f5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
  }

  // 绘制验证码文字
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let i = 0; i < captcha.length; i++) {
    const x = 30 + i * 20
    const y = canvas.height / 2 + (Math.random() - 0.5) * 10
    const rotation = (Math.random() - 0.5) * 0.3

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.fillStyle = `rgb(${Math.random() * 100 + 50}, ${Math.random() * 100 + 50}, ${Math.random() * 100 + 50})`
    ctx.fillText(captcha[i], 0, 0)
    ctx.restore()
  }
}

// 刷新验证码
const refreshCaptcha = () => {
  generateCaptcha()
}

// 登录方法
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    
    // 验证验证码
    if (loginForm.captcha.toUpperCase() !== captchaText.value) {
      ElMessage.error('验证码错误')
      refreshCaptcha()
      loginForm.captcha = ''
      return
    }
    
    loading.value = true
    
    // 模拟登录验证
    setTimeout(() => {
      if (loginForm.username === 'zskyyds' && loginForm.password === '123456') {
        // 登录成功
        localStorage.setItem('token', 'mock-token')
        localStorage.setItem('userInfo', JSON.stringify({
          username: loginForm.username,
          name: '管理员'
        }))
        
        ElMessage.success('登录成功')
        router.push('/')
      } else {
        ElMessage.error('用户名或密码错误')
        refreshCaptcha()
        loginForm.captcha = ''
      }
      loading.value = false
    }, 1000)
  } catch (error) {
    loading.value = false
    console.error('表单验证失败:', error)
  }
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/register')
}

// 组件挂载时生成验证码
onMounted(() => {
  generateCaptcha()
})
</script>

<template>
  <div class="login-container">
    <!-- 背景图片 -->
    <div class="login-bg" :style="{ backgroundImage: `url(${loginBg})` }"></div>
    
    <!-- 登录表单 -->
    <div class="login-box">
      <div class="login-header">
        <div class="logo">
          <el-icon size="40" color="#409EFF"><School /></el-icon>
        </div>
        <h2>学生管理系统</h2>
        <p>欢迎登录，请使用您的账号密码</p>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="captcha">
          <div class="captcha-container">
            <el-input
              v-model="loginForm.captcha"
              placeholder="请输入验证码"
              class="captcha-input"
              maxlength="4"
              @keyup.enter="handleLogin"
            />
            <div class="captcha-wrapper" @click="refreshCaptcha">
              <canvas
                ref="captchaCanvas"
                width="100"
                height="40"
                class="captcha-canvas"
              ></canvas>
              <div class="captcha-refresh">
                <el-icon><Refresh /></el-icon>
              </div>
            </div>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
        
        <div class="login-footer">
          <span>还没有账号？</span>
          <el-button type="text" @click="goToRegister">立即注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.login-box {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  margin-bottom: 15px;
}

.login-header h2 {
  color: #303133;
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 600;
}

.login-header p {
  color: #909399;
  margin: 0;
  font-size: 14px;
}

.login-form {
  margin-top: 20px;
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-input {
  flex: 1;
}

.captcha-wrapper {
  position: relative;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s;
}

.captcha-wrapper:hover {
  border-color: #409eff;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.2);
}

.captcha-canvas {
  display: block;
  background: #f0f2f5;
}

.captcha-refresh {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s;
  color: #409eff;
}

.captcha-wrapper:hover .captcha-refresh {
  opacity: 1;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  color: #909399;
  font-size: 14px;
}

.login-footer .el-button {
  margin-left: 5px;
  color: #409eff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-box {
    max-width: 90%;
    padding: 30px 20px;
  }
  
  .login-header h2 {
    font-size: 24px;
  }
}
</style> 