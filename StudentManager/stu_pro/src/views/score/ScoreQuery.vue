<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Download, View, Edit, Delete } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

// 搜索表单
const searchForm = reactive({
  studentId: '',
  studentName: '',
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

// 模拟成绩数据
const mockScores = [
  {
    id: 1,
    studentId: '2024001',
    studentName: '张三',
    grade: '六年级',
    class: '一班',
    subject: '语文',
    examType: '期中考试',
    score: 85.5,
    totalScore: 100,
    rank: 3,
    examDate: '2024-10-15',
    inputTime: '2024-10-15 14:30:00',
    remark: '作文写得不错'
  },
  {
    id: 2,
    studentId: '2024001',
    studentName: '张三',
    grade: '六年级',
    class: '一班',
    subject: '数学',
    examType: '期中考试',
    score: 92.0,
    totalScore: 100,
    rank: 1,
    examDate: '2024-10-16',
    inputTime: '2024-10-16 15:20:00',
    remark: '计算题全对'
  },
  {
    id: 3,
    studentId: '2024002',
    studentName: '李四',
    grade: '六年级',
    class: '一班',
    subject: '语文',
    examType: '期中考试',
    score: 78.0,
    totalScore: 100,
    rank: 5,
    examDate: '2024-10-15',
    inputTime: '2024-10-15 16:45:00',
    remark: '需要加强阅读理解'
  }
]

// 计算属性
const filteredData = computed(() => {
  let data = [...mockScores]
  
  if (searchForm.studentId) {
    data = data.filter(item => item.studentId.includes(searchForm.studentId))
  }
  if (searchForm.studentName) {
    data = data.filter(item => item.studentName.includes(searchForm.studentName))
  }
  if (searchForm.grade) {
    data = data.filter(item => item.grade === searchForm.grade)
  }
  if (searchForm.class) {
    data = data.filter(item => item.class === searchForm.class)
  }
  if (searchForm.subject) {
    data = data.filter(item => item.subject === searchForm.subject)
  }
  if (searchForm.examType) {
    data = data.filter(item => item.examType === searchForm.examType)
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
    studentId: '',
    studentName: '',
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

const handleViewDetail = (row: any) => {
  ElMessage.info(`查看 ${row.studentName} 的 ${row.subject} 成绩详情`)
}

const handleEdit = (row: any) => {
  ElMessage.info(`编辑成绩：${row.studentName} ${row.subject}`)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确定要删除 ${row.studentName} 的 ${row.subject} 成绩吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    ElMessage.success('删除成功')
    loadData()
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const handleBatchDelete = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的成绩')
    return
  }
  
  ElMessageBox.confirm(
    `确定要删除选中的 ${multipleSelection.value.length} 条成绩记录吗？`,
    '批量删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    ElMessage.success('批量删除成功')
    multipleSelection.value = []
    loadData()
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const handleExport = () => {
  ElMessage.success('成绩导出成功')
}

const getScoreColor = (score: number, totalScore: number) => {
  const percentage = (score / totalScore) * 100
  if (percentage >= 90) return '#67C23A'
  if (percentage >= 80) return '#409EFF'
  if (percentage >= 70) return '#E6A23C'
  if (percentage >= 60) return '#F56C6C'
  return '#F56C6C'
}

const getScoreLevel = (score: number, totalScore: number) => {
  const percentage = (score / totalScore) * 100
  if (percentage >= 90) return '优秀'
  if (percentage >= 80) return '良好'
  if (percentage >= 70) return '中等'
  if (percentage >= 60) return '及格'
  return '不及格'
}

// 生命周期
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="score-query">
    <Breadcrumb />
    
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>成绩查询</h3>
            <span class="subtitle">共 {{ pagination.total }} 条成绩记录</span>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-form :model="searchForm" inline>
          <el-form-item label="学号">
            <el-input
              v-model="searchForm.studentId"
              placeholder="请输入学号"
              clearable
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="searchForm.studentName"
              placeholder="请输入姓名"
              clearable
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item label="年级">
            <el-select
              v-model="searchForm.grade"
              placeholder="请选择年级"
              clearable
              style="width: 100px"
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
              style="width: 100px"
            >
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="科目">
            <el-select
              v-model="searchForm.subject"
              placeholder="请选择科目"
              clearable
              style="width: 100px"
            >
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考试类型">
            <el-select
              v-model="searchForm.examType"
              placeholder="请选择类型"
              clearable
              style="width: 100px"
            >
              <el-option
                v-for="item in examTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮区域 -->
      <div class="action-section">
        <div class="action-left">
          <el-button 
            type="danger" 
            :disabled="multipleSelection.length === 0"
            @click="handleBatchDelete"
          >
            <el-icon><Delete /></el-icon>
            批量删除 ({{ multipleSelection.length }})
          </el-button>
        </div>
        <div class="action-right">
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button @click="loadData">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="table-section">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          :fit="true"
          @selection-change="handleSelectionChange"
          border
          stripe
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="studentId" label="学号" width="100" />
          <el-table-column prop="studentName" label="姓名" width="80" />
          <el-table-column prop="grade" label="年级" width="80" />
          <el-table-column prop="class" label="班级" width="70" />
          <el-table-column prop="subject" label="科目" width="90" />
          <el-table-column prop="examType" label="考试类型" width="110" />
          <el-table-column label="成绩" width="90">
            <template #default="{ row }">
              <span :style="{ color: getScoreColor(row.score, row.totalScore), fontWeight: 'bold' }">
                {{ row.score }}/{{ row.totalScore }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="等级" width="70">
            <template #default="{ row }">
              <el-tag 
                :type="getScoreColor(row.score, row.totalScore) === '#67C23A' ? 'success' : 
                       getScoreColor(row.score, row.totalScore) === '#409EFF' ? 'primary' :
                       getScoreColor(row.score, row.totalScore) === '#E6A23C' ? 'warning' : 'danger'"
                size="small"
              >
                {{ getScoreLevel(row.score, row.totalScore) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="排名" width="70">
            <template #default="{ row }">
              <el-tag type="primary" size="small">
                第{{ row.rank }}名
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="examDate" label="考试日期" width="110" />
          <el-table-column prop="inputTime" label="录入时间" width="140" show-overflow-tooltip />
          <el-table-column prop="remark" label="备注" width="120" show-overflow-tooltip />
          <el-table-column label="操作" width="220" fixed="right">
            <template #default="{ row }">
              <div class="operation-buttons">
                <el-button type="primary" size="small" @click="handleViewDetail(row)">
                  <el-icon><View /></el-icon>
                  详情
                </el-button>
                <el-button type="warning" size="small" @click="handleEdit(row)">
                  <el-icon><Edit /></el-icon>
                  编辑
                </el-button>
                <el-button type="danger" size="small" @click="handleDelete(row)">
                  <el-icon><Delete /></el-icon>
                  删除
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
.score-query {
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

.table-section {
  margin-bottom: 20px;
}

.operation-buttons {
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
}

.operation-buttons .el-button {
  padding: 2px 6px;
  font-size: 12px;
  height: 24px;
  min-width: 56px;
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
  .search-section .el-form {
    flex-direction: column;
  }
  
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
  
  .operation-buttons {
    flex-direction: column;
    gap: 2px;
  }
  
  .operation-buttons .el-button {
    min-width: 50px;
    max-width: 50px;
    padding: 2px 4px;
    font-size: 11px;
    height: 20px;
  }
}
</style> 