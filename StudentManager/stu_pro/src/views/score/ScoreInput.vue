<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Search, Refresh, Download, Upload, 
  Edit, View, Plus, Delete, Document, Close 
} from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

// 搜索表单
const searchForm = reactive({
  grade: '',
  class: '',
  subject: '',
  examType: ''
})

// 分页参数
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 表格数据
const tableData = ref<any[]>([])
const loading = ref(false)
const multipleSelection = ref<any[]>([])

// 成绩录入相关
const scoreForm = reactive({
  subject: '',
  examType: '',
  examDate: '',
  totalScore: 100,
  passScore: 60
})

const isScoreInputMode = ref(false)
const currentClass = ref('')
const currentSubject = ref('')
const currentExamType = ref('')

// 选项数据
const gradeOptions = [
  { label: '全部年级', value: '' },
  { label: '一年级', value: '一年级' },
  { label: '二年级', value: '二年级' },
  { label: '三年级', value: '三年级' },
  { label: '四年级', value: '四年级' },
  { label: '五年级', value: '五年级' },
  { label: '六年级', value: '六年级' }
]

const classOptions = [
  { label: '全部班级', value: '' },
  { label: '一班', value: '一班' },
  { label: '二班', value: '二班' },
  { label: '三班', value: '三班' },
  { label: '四班', value: '四班' },
  { label: '五班', value: '五班' }
]

const subjectOptions = [
  { label: '全部科目', value: '' },
  { label: '语文', value: '语文' },
  { label: '数学', value: '数学' },
  { label: '英语', value: '英语' },
  { label: '科学', value: '科学' },
  { label: '社会', value: '社会' },
  { label: '体育', value: '体育' },
  { label: '音乐', value: '音乐' },
  { label: '美术', value: '美术' }
]

const examTypeOptions = [
  { label: '全部类型', value: '' },
  { label: '期中考试', value: '期中考试' },
  { label: '期末考试', value: '期末考试' },
  { label: '单元测试', value: '单元测试' },
  { label: '月考', value: '月考' },
  { label: '模拟考试', value: '模拟考试' }
]

// 模拟学生数据
const mockStudents = [
  {
    id: 1,
    studentId: '2024001',
    name: '张三',
    grade: '六年级',
    class: '一班',
    score: null,
    rank: null,
    status: '未录入',
    inputTime: null,
    remark: ''
  },
  {
    id: 2,
    studentId: '2024002',
    name: '李四',
    grade: '六年级',
    class: '一班',
    score: null,
    rank: null,
    status: '未录入',
    inputTime: null,
    remark: ''
  },
  {
    id: 3,
    studentId: '2024003',
    name: '王五',
    grade: '六年级',
    class: '一班',
    score: null,
    rank: null,
    status: '未录入',
    inputTime: null,
    remark: ''
  },
  {
    id: 4,
    studentId: '2024004',
    name: '赵六',
    grade: '六年级',
    class: '一班',
    score: null,
    rank: null,
    status: '未录入',
    inputTime: null,
    remark: ''
  },
  {
    id: 5,
    studentId: '2024005',
    name: '孙七',
    grade: '六年级',
    class: '一班',
    score: null,
    rank: null,
    status: '未录入',
    inputTime: null,
    remark: ''
  }
]

// 计算属性
const filteredData = computed(() => {
  let data = [...mockStudents]
  
  if (searchForm.grade) {
    data = data.filter(item => item.grade === searchForm.grade)
  }
  if (searchForm.class) {
    data = data.filter(item => item.class === searchForm.class)
  }
  
  return data
})

const paginatedData = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return filteredData.value.slice(start, end)
})

// 方法
const loadData = () => {
  loading.value = true
  setTimeout(() => {
    tableData.value = paginatedData.value
    pagination.total = filteredData.value.length
    loading.value = false
  }, 500)
}

const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    grade: '',
    class: '',
    subject: '',
    examType: ''
  })
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page
  loadData()
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  loadData()
}

const handleSelectionChange = (selection: any[]) => {
  multipleSelection.value = selection
}

// 成绩录入相关方法
const startScoreInput = () => {
  if (!scoreForm.subject || !scoreForm.examType || !scoreForm.examDate) {
    ElMessage.warning('请先选择科目、考试类型和考试日期')
    return
  }
  
  if (!searchForm.grade || !searchForm.class) {
    ElMessage.warning('请先选择年级和班级')
    return
  }
  
  isScoreInputMode.value = true
  currentClass.value = `${searchForm.grade}${searchForm.class}`
  currentSubject.value = scoreForm.subject
  currentExamType.value = scoreForm.examType
  
  ElMessage.success(`开始录入 ${currentClass.value} ${currentSubject.value} ${currentExamType.value} 成绩`)
}

const cancelScoreInput = () => {
  isScoreInputMode.value = false
  currentClass.value = ''
  currentSubject.value = ''
  currentExamType.value = ''
  
  // 重置所有成绩
  tableData.value.forEach(item => {
    item.score = null
    item.rank = null
    item.status = '未录入'
    item.inputTime = null
    item.remark = ''
  })
}

const handleScoreChange = (row: any, value: number | null) => {
  if (value !== null) {
    if (value < 0 || value > scoreForm.totalScore) {
      ElMessage.warning(`成绩范围应为 0-${scoreForm.totalScore}`)
      row.score = null
      return
    }
    row.score = value
    row.status = '已录入'
    row.inputTime = new Date().toLocaleString()
  } else {
    row.score = null
    row.status = '未录入'
    row.inputTime = null
  }
}

const calculateRank = () => {
  const validScores = tableData.value
    .filter(item => item.score !== null)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
  
  validScores.forEach((item, index) => {
    const student = tableData.value.find(s => s.id === item.id)
    if (student) {
      student.rank = index + 1
    }
  })
}

const saveScores = () => {
  const hasScores = tableData.value.some(item => item.score !== null)
  if (!hasScores) {
    ElMessage.warning('请至少录入一个学生的成绩')
    return
  }
  
  ElMessageBox.confirm(
    `确定要保存 ${currentClass.value} ${currentSubject.value} ${currentExamType.value} 的成绩吗？`,
    '确认保存',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    calculateRank()
    ElMessage.success('成绩保存成功！')
    isScoreInputMode.value = false
    currentClass.value = ''
    currentSubject.value = ''
    currentExamType.value = ''
  }).catch(() => {
    ElMessage.info('已取消保存')
  })
}

const batchInputScore = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要批量录入成绩的学生')
    return
  }
  
  ElMessage.info('批量录入功能开发中')
}

const exportScores = () => {
  ElMessage.success('成绩导出成功')
}

const importScores = () => {
  ElMessage.info('成绩导入功能开发中')
}

const getStatusTag = (status: string) => {
  const statusMap: Record<string, { type: string, color: string }> = {
    '未录入': { type: 'info', color: '#909399' },
    '已录入': { type: 'success', color: '#67C23A' }
  }
  return statusMap[status] || { type: 'info', color: '#909399' }
}

const getScoreColor = (score: number | null) => {
  if (score === null) return '#909399'
  if (score >= scoreForm.passScore) return '#67C23A'
  return '#F56C6C'
}

const getGradeType = (score: number | null) => {
  if (score === null) return 'info'
  if (score >= scoreForm.passScore) return 'success'
  return 'danger'
}

const getGradeText = (score: number | null) => {
  if (score === null) return '未评级'
  if (score >= scoreForm.passScore) return '及格'
  return '不及格'
}

const quickInputScore = (row: any) => {
  // 弹出对话框让用户快速输入成绩
  ElMessageBox.prompt(
    `请输入 ${row.name} 的成绩`,
    '快速录入成绩',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^\d+(\.\d{1,2})?$/,
      inputErrorMessage: '请输入有效的成绩',
      inputValue: row.score || '',
      inputPlaceholder: `0-${scoreForm.totalScore}`
    }
  ).then(({ value }) => {
    const score = parseFloat(value)
    if (score >= 0 && score <= scoreForm.totalScore) {
      row.score = score
      row.status = '已录入'
      row.inputTime = new Date().toLocaleString()
      ElMessage.success(`已录入 ${row.name} 的成绩：${score}`)
    } else {
      ElMessage.error(`成绩范围应为 0-${scoreForm.totalScore}`)
    }
  }).catch(() => {
    ElMessage.info('已取消录入')
  })
}

const viewScoreDetail = (row: any) => {
  ElMessage.info(`查看 ${row.name} 的成绩详情`)
}

const getInputCount = () => {
  return tableData.value.filter(item => item.score !== null).length
}

const getUninputCount = () => {
  return tableData.value.filter(item => item.score === null).length
}

const getProgressPercent = () => {
  const total = tableData.value.length
  const inputCount = getInputCount()
  return total > 0 ? Math.round((inputCount / total) * 100) : 0
}

// 生命周期
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="score-input">
    <Breadcrumb />
    
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>成绩录入</h3>
            <span class="subtitle">
              {{ isScoreInputMode ? `${currentClass} ${currentSubject} ${currentExamType}` : '请选择班级和考试信息' }}
            </span>
          </div>
          <div class="header-right">
            <el-button 
              v-if="!isScoreInputMode" 
              type="primary" 
              @click="startScoreInput"
              :disabled="!scoreForm.subject || !scoreForm.examType || !scoreForm.examDate || !searchForm.grade || !searchForm.class"
            >
              <el-icon><Edit /></el-icon>
              开始录入
            </el-button>
            <el-button 
              v-if="isScoreInputMode" 
              type="success" 
              @click="saveScores"
            >
              <el-icon><Document /></el-icon>
              保存成绩
            </el-button>
            <el-button 
              v-if="isScoreInputMode" 
              @click="cancelScoreInput"
            >
              <el-icon><Close /></el-icon>
              取消录入
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 考试信息设置 -->
      <div class="exam-info-section">
        <el-form :model="scoreForm" inline>
          <el-form-item label="科目">
            <el-select v-model="scoreForm.subject" placeholder="请选择科目" style="width: 120px">
              <el-option
                v-for="item in subjectOptions.slice(1)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考试类型">
            <el-select v-model="scoreForm.examType" placeholder="请选择考试类型" style="width: 120px">
              <el-option
                v-for="item in examTypeOptions.slice(1)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考试日期">
            <el-date-picker
              v-model="scoreForm.examDate"
              type="date"
              placeholder="请选择考试日期"
              style="width: 150px"
            />
          </el-form-item>
          <el-form-item label="满分">
            <el-input-number
              v-model="scoreForm.totalScore"
              :min="1"
              :max="200"
              style="width: 100px"
            />
          </el-form-item>
          <el-form-item label="及格分">
            <el-input-number
              v-model="scoreForm.passScore"
              :min="1"
              :max="scoreForm.totalScore"
              style="width: 100px"
            />
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-form :model="searchForm" inline>
          <el-form-item label="年级">
            <el-select
              v-model="searchForm.grade"
              placeholder="请选择年级"
              clearable
              style="width: 120px"
            >
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="班级">
            <el-select
              v-model="searchForm.class"
              placeholder="请选择班级"
              clearable
              style="width: 120px"
            >
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮区域 -->
      <div class="action-section">
        <div class="action-left">
          <el-button 
            v-if="isScoreInputMode"
            type="warning" 
            :disabled="multipleSelection.length === 0"
            @click="batchInputScore"
          >
            <el-icon><Edit /></el-icon>
            批量录入 ({{ multipleSelection.length }})
          </el-button>
        </div>
        <div class="action-right">
          <el-button @click="exportScores">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button @click="importScores">
            <el-icon><Upload /></el-icon>
            导入
          </el-button>
          <el-button @click="loadData">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </div>
      </div>

      <!-- 统计信息区域 -->
      <div v-if="isScoreInputMode" class="stats-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="stat-card">
              <div class="stat-number">{{ tableData.length }}</div>
              <div class="stat-label">总人数</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-card">
              <div class="stat-number success">{{ getInputCount() }}</div>
              <div class="stat-label">已录入</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-card">
              <div class="stat-number warning">{{ getUninputCount() }}</div>
              <div class="stat-label">未录入</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-card">
              <div class="stat-number info">{{ getProgressPercent() }}%</div>
              <div class="stat-label">录入进度</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 表格区域 -->
      <div class="table-section">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          stripe
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="studentId" label="学号" width="100" />
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="grade" label="年级" width="80" />
          <el-table-column prop="class" label="班级" width="60" />
          <el-table-column label="成绩" width="120">
            <template #default="{ row }">
              <el-input-number
                v-if="isScoreInputMode"
                v-model="row.score"
                :min="0"
                :max="scoreForm.totalScore"
                :precision="1"
                placeholder="请输入成绩"
                style="width: 100px"
                @change="(value: number | null) => handleScoreChange(row, value)"
              />
              <span v-else :style="{ color: getScoreColor(row.score), fontWeight: 'bold' }">
                {{ row.score !== null ? row.score : '未录入' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="排名" width="70">
            <template #default="{ row }">
              <el-tag v-if="row.rank" type="primary" size="small">
                第{{ row.rank }}名
              </el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="等级" width="70">
            <template #default="{ row }">
              <el-tag 
                v-if="row.score !== null"
                :type="getGradeType(row.score)"
                size="small"
              >
                {{ getGradeText(row.score) }}
              </el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="90">
            <template #default="{ row }">
              <el-tag 
                :type="getStatusTag(row.status).type"
                effect="light"
                size="small"
              >
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="录入时间" width="120">
            <template #default="{ row }">
              <span v-if="row.inputTime">{{ row.inputTime }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100">
            <template #default="{ row }">
              <el-input
                v-if="isScoreInputMode"
                v-model="row.remark"
                placeholder="备注"
                size="small"
                style="width: 80px"
              />
              <span v-else>{{ row.remark || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ row }">
              <div class="operation-buttons">
                <el-button 
                  v-if="isScoreInputMode && row.score === null"
                  type="primary" 
                  size="small" 
                  @click="quickInputScore(row)"
                >
                  <el-icon><Edit /></el-icon>
                  录入
                </el-button>
                <el-button 
                  v-if="!isScoreInputMode"
                  type="info" 
                  size="small" 
                  @click="viewScoreDetail(row)"
                >
                  <el-icon><View /></el-icon>
                  详情
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.score-input {
  padding: 0;
}

.main-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-left h3 {
  margin: 0;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.subtitle {
  color: #909399;
  font-size: 14px;
}

.exam-info-section {
  background: #f0f9ff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e1f5fe;
}

.search-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.action-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.stats-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
}

.stat-card {
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-number.success {
  color: #67C23A;
}

.stat-number.warning {
  color: #E6A23C;
}

.stat-number.info {
  color: #409EFF;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.table-section {
  margin-bottom: 20px;
}

.operation-buttons {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
}

.operation-buttons .el-button {
  padding: 4px 8px;
  font-size: 12px;
  height: 24px;
  line-height: 1;
}

.operation-buttons .el-button .el-icon {
  margin-right: 2px;
  font-size: 12px;
}

.pagination-section {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .exam-info-section .el-form,
  .search-section .el-form {
    flex-direction: column;
  }
  
  .exam-info-section .el-form-item,
  .search-section .el-form-item {
    margin-bottom: 10px;
  }
  
  .action-section {
    flex-direction: column;
    gap: 10px;
  }
  
  .action-left,
  .action-right {
    display: flex;
    gap: 10px;
  }
}
</style> 