<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Plus, Search, Refresh, Edit, Delete, View, 
  Download, Upload 
} from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const router = useRouter()

// 搜索表单
const searchForm = reactive({
  name: '',
  studentId: '',
  class: '',
  grade: '',
  status: ''
})

// 分页参数
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
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

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '在读', value: '在读' },
  { label: '休学', value: '休学' },
  { label: '退学', value: '退学' },
  { label: '毕业', value: '毕业' }
]

const classOptions = [
  { label: '全部班级', value: '' },
  { label: '一班', value: '一班' },
  { label: '二班', value: '二班' },
  { label: '三班', value: '三班' },
  { label: '四班', value: '四班' },
  { label: '五班', value: '五班' }
]

// 模拟学生数据
const mockStudents = [
  {
    id: 1,
    studentId: '2024001',
    name: '张三',
    gender: '男',
    age: 12,
    grade: '六年级',
    class: '一班',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    address: '北京市朝阳区',
    status: '在读',
    enrollmentDate: '2024-09-01'
  },
  {
    id: 2,
    studentId: '2024002',
    name: '李四',
    gender: '女',
    age: 11,
    grade: '五年级',
    class: '二班',
    phone: '13800138002',
    email: 'lisi@example.com',
    address: '北京市海淀区',
    status: '在读',
    enrollmentDate: '2024-09-01'
  },
  {
    id: 3,
    studentId: '2024003',
    name: '王五',
    gender: '男',
    age: 13,
    grade: '六年级',
    class: '三班',
    phone: '13800138003',
    email: 'wangwu@example.com',
    address: '北京市西城区',
    status: '在读',
    enrollmentDate: '2024-09-01'
  },
  {
    id: 4,
    studentId: '2024004',
    name: '赵六',
    gender: '女',
    age: 10,
    grade: '四年级',
    class: '一班',
    phone: '13800138004',
    email: 'zhaoliu@example.com',
    address: '北京市东城区',
    status: '在读',
    enrollmentDate: '2024-09-01'
  },
  {
    id: 5,
    studentId: '2024005',
    name: '孙七',
    gender: '男',
    age: 12,
    grade: '五年级',
    class: '四班',
    phone: '13800138005',
    email: 'sunqi@example.com',
    address: '北京市丰台区',
    status: '休学',
    enrollmentDate: '2024-09-01'
  }
]

// 计算属性
const filteredData = computed(() => {
  let data = [...mockStudents]
  
  if (searchForm.name) {
    data = data.filter(item => item.name.includes(searchForm.name))
  }
  if (searchForm.studentId) {
    data = data.filter(item => item.studentId.includes(searchForm.studentId))
  }
  if (searchForm.class) {
    data = data.filter(item => item.class === searchForm.class)
  }
  if (searchForm.grade) {
    data = data.filter(item => item.grade === searchForm.grade)
  }
  if (searchForm.status) {
    data = data.filter(item => item.status === searchForm.status)
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
    name: '',
    studentId: '',
    class: '',
    grade: '',
    status: ''
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

const handleAdd = () => {
  router.push('/student/add')
}

const handleEdit = (row: any) => {
  ElMessage.info(`编辑学生：${row.name}`)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确定要删除学生 ${row.name} 吗？`,
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

const handleView = (row: any) => {
  ElMessage.info(`查看学生详情：${row.name}`)
}

const handleBatchDelete = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的学生')
    return
  }
  
  ElMessageBox.confirm(
    `确定要删除选中的 ${multipleSelection.value.length} 个学生吗？`,
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
  ElMessage.success('导出成功')
}

const handleImport = () => {
  ElMessage.info('导入功能开发中')
}

const getStatusTag = (status: string) => {
  const statusMap: Record<string, { type: string, color: string }> = {
    '在读': { type: 'success', color: '#67C23A' },
    '休学': { type: 'warning', color: '#E6A23C' },
    '退学': { type: 'danger', color: '#F56C6C' },
    '毕业': { type: 'info', color: '#909399' }
  }
  return statusMap[status] || { type: 'info', color: '#909399' }
}

const getStatusText = (status: string) => {
  const textMap: Record<string, string> = {
    '在读': '正常在读',
    '休学': '暂时休学',
    '退学': '已退学',
    '毕业': '已毕业'
  }
  return textMap[status] || status
}

// 生命周期
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="student-list">
    <Breadcrumb />
    
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>学生列表</h3>
            <span class="subtitle">共 {{ pagination.total }} 名学生</span>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加学生
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-form :model="searchForm" inline>
          <el-form-item label="姓名">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入学生姓名"
              clearable
              style="width: 150px"
            />
          </el-form-item>
          <el-form-item label="学号">
            <el-input
              v-model="searchForm.studentId"
              placeholder="请输入学号"
              clearable
              style="width: 150px"
            />
          </el-form-item>
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
          <el-form-item label="状态">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择状态"
              clearable
              style="width: 120px"
            >
              <el-option
                v-for="item in statusOptions"
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
          <el-button @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入
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
          @selection-change="handleSelectionChange"
          border
          stripe
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="studentId" label="学号" width="120" />
          <el-table-column prop="name" label="姓名" width="100" />
          <el-table-column prop="gender" label="性别" width="80" />
          <el-table-column prop="age" label="年龄" width="80" />
          <el-table-column prop="grade" label="年级" width="100" />
          <el-table-column prop="class" label="班级" width="100" />
          <el-table-column prop="phone" label="联系电话" width="130" />
          <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="120">
            <template #default="{ row }">
              <el-tag 
                :type="getStatusTag(row.status).type"
                effect="light"
              >
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="enrollmentDate" label="入学日期" width="120" />
          <el-table-column label="操作" width="220" fixed="right">
            <template #default="{ row }">
              <div class="operation-buttons">
                <el-button type="primary" size="small" @click="handleView(row)">
                  <el-icon><View /></el-icon>
                  查看
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
.student-list {
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
  gap: 6px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.operation-buttons .el-button {
  flex: 1;
  min-width: 58px;
  max-width: 58px;
  padding: 6px 8px;
  font-size: 12px;
  height: 28px;
  line-height: 1;
}

.operation-buttons .el-button .el-icon {
  margin-right: 2px;
  font-size: 12px;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-name {
  font-weight: 500;
  color: #303133;
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
    gap: 4px;
  }
  
  .operation-buttons .el-button {
    min-width: 50px;
    max-width: 50px;
    padding: 4px 6px;
    font-size: 11px;
    height: 24px;
  }
}
</style> 