<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const router = useRouter()

const formRef = ref()
const loading = ref(false)

const form = reactive({
  studentId: '',
  name: '',
  gender: '',
  age: '',
  grade: '',
  class: '',
  phone: '',
  email: '',
  address: '',
  status: '',
  enrollmentDate: '',
  avatar: ''
})

const rules = {
  studentId: [
    { required: true, message: '请输入学号', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 6, max: 30, message: '年龄范围6-30', trigger: 'blur' }
  ],
  grade: [
    { required: true, message: '请选择年级', trigger: 'change' }
  ],
  class: [
    { required: true, message: '请选择班级', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入家庭住址', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ],
  enrollmentDate: [
    { required: true, message: '请选择入学日期', trigger: 'change' }
  ]
}

const gradeOptions = [
  { label: '一年级', value: '一年级' },
  { label: '二年级', value: '二年级' },
  { label: '三年级', value: '三年级' },
  { label: '四年级', value: '四年级' },
  { label: '五年级', value: '五年级' },
  { label: '六年级', value: '六年级' }
]
const classOptions = [
  { label: '一班', value: '一班' },
  { label: '二班', value: '二班' },
  { label: '三班', value: '三班' },
  { label: '四班', value: '四班' },
  { label: '五班', value: '五班' }
]
const statusOptions = [
  { label: '在读', value: '在读' },
  { label: '休学', value: '休学' },
  { label: '退学', value: '退学' },
  { label: '毕业', value: '毕业' }
]
const genderOptions = [
  { label: '男', value: '男' },
  { label: '女', value: '女' }
]

const handleAvatarChange = (uploadFile: any) => {
  // 模拟上传，直接用本地预览
  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target?.result) {
      form.avatar = e.target.result as string
    }
  }
  reader.readAsDataURL(uploadFile.raw)
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    setTimeout(() => {
      loading.value = false
      ElMessage.success('添加成功！')
      router.push('/student/list')
    }, 1000)
  })
}

const handleReset = () => {
  formRef.value.resetFields()
  form.avatar = ''
}

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="add-student">
    <Breadcrumb />
    <div class="form-wrapper">
      <el-card class="form-card">
        <template #header>
          <div class="form-title">
            <span>添加学生</span>
          </div>
        </template>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="90px" class="student-form">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="学号" prop="studentId">
                <el-input v-model="form.studentId" placeholder="请输入学号" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender" placeholder="请选择性别">
                  <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input-number v-model="form.age" :min="6" :max="30" placeholder="请输入年龄" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年级" prop="grade">
                <el-select v-model="form.grade" placeholder="请选择年级">
                  <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级" prop="class">
                <el-select v-model="form.class" placeholder="请选择班级">
                  <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="家庭住址" prop="address">
                <el-input v-model="form.address" placeholder="请输入家庭住址" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入学日期" prop="enrollmentDate">
                <el-date-picker v-model="form.enrollmentDate" type="date" placeholder="请选择入学日期" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-change="handleAvatarChange"
                  accept="image/*"
                >
                  <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                <div class="avatar-tip">支持jpg/png，建议尺寸200x200</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button @click="handleBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.add-student {
  padding: 0;
}

.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
}

.form-card {
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  padding: 10px 0;
}

.student-form {
  margin-top: 20px;
}

.avatar-uploader {
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  background: #fafafa;
  text-align: center;
  vertical-align: middle;
}

.avatar-uploader-icon {
  font-size: 32px;
  color: #8c939d;
  line-height: 80px;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 50%;
}

.avatar-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .form-wrapper {
    max-width: 100%;
    padding: 0 10px;
  }
  .form-title {
    font-size: 18px;
  }
}
</style> 