<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { School, User, Location, Document, Refresh, Back } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const router = useRouter()

const formRef = ref()
const loading = ref(false)

const form = reactive({
  className: '',
  grade: '',
  classNumber: '',
  teacher: '',
  maxStudents: 40,
  classroom: '',
  description: '',
  status: '正常',
  createTime: ''
})

const rules = {
  className: [
    { required: true, message: '请输入班级名称', trigger: 'blur' }
  ],
  grade: [
    { required: true, message: '请选择年级', trigger: 'change' }
  ],
  classNumber: [
    { required: true, message: '请选择班级', trigger: 'change' }
  ],
  teacher: [
    { required: true, message: '请输入班主任姓名', trigger: 'blur' }
  ],
  maxStudents: [
    { required: true, message: '请输入最大学生数', trigger: 'blur' },
    { type: 'number', min: 20, max: 60, message: '学生数范围20-60', trigger: 'blur' }
  ],
  classroom: [
    { required: true, message: '请输入教室', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
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

const classNumberOptions = [
  { label: '一班', value: '一班' },
  { label: '二班', value: '二班' },
  { label: '三班', value: '三班' },
  { label: '四班', value: '四班' },
  { label: '五班', value: '五班' },
  { label: '六班', value: '六班' }
]

const statusOptions = [
  { label: '正常', value: '正常' },
  { label: '停用', value: '停用' }
]

// 监听年级和班级变化，自动生成班级名称
const handleGradeChange = () => {
  if (form.grade && form.classNumber) {
    form.className = `${form.grade}${form.classNumber}`
  }
}

const handleClassNumberChange = () => {
  if (form.grade && form.classNumber) {
    form.className = `${form.grade}${form.classNumber}`
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    
    // 设置创建时间
    form.createTime = new Date().toISOString().split('T')[0]
    
    setTimeout(() => {
      loading.value = false
      ElMessage.success('添加班级成功！')
      router.push('/class/list')
    }, 1000)
  })
}

const handleReset = () => {
  formRef.value.resetFields()
  Object.assign(form, {
    className: '',
    grade: '',
    classNumber: '',
    teacher: '',
    maxStudents: 40,
    classroom: '',
    description: '',
    status: '正常',
    createTime: ''
  })
}

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="add-class">
    <Breadcrumb />
    <div class="form-wrapper">
      <el-card class="form-card">
        <template #header>
          <div class="form-title">
            <el-icon><School /></el-icon>
            <span>添加班级</span>
          </div>
        </template>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="class-form">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年级" prop="grade">
                <el-select v-model="form.grade" placeholder="请选择年级" @change="handleGradeChange" style="width: 100%">
                  <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级" prop="classNumber">
                <el-select v-model="form.classNumber" placeholder="请选择班级" @change="handleClassNumberChange" style="width: 100%">
                  <el-option v-for="item in classNumberOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级名称" prop="className">
                <el-input v-model="form.className" placeholder="班级名称将自动生成" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班主任" prop="teacher">
                <el-input v-model="form.teacher" placeholder="请输入班主任姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最大学生数" prop="maxStudents">
                <el-input-number v-model="form.maxStudents" :min="20" :max="60" placeholder="请输入最大学生数" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教室" prop="classroom">
                <el-input v-model="form.classroom" placeholder="请输入教室" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="班级描述">
                <el-input 
                  v-model="form.description" 
                  type="textarea" 
                  :rows="4"
                  placeholder="请输入班级描述信息" 
                  clearable 
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleSubmit">
              <el-icon><School /></el-icon>
              提交
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
            <el-button @click="handleBack">
              <el-icon><Back /></el-icon>
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.add-class {
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  padding: 10px 0;
}

.form-title .el-icon {
  font-size: 24px;
  color: #409EFF;
}

.class-form {
  margin-top: 20px;
}

.class-form .el-form-item {
  margin-bottom: 20px;
}

.class-form .el-input.is-disabled .el-input__wrapper {
  background-color: #f5f7fa;
  color: #606266;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-wrapper {
    max-width: 100%;
    padding: 0 10px;
  }
  
  .form-title {
    font-size: 18px;
  }
  
  .class-form .el-col {
    margin-bottom: 10px;
  }
}
</style> 