<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Plus, Search, Refresh, Edit, Delete, View, 
  Download, Upload, User, School 
} from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const router = useRouter()

// 搜索表单
const searchForm = reactive({
  className: '',
  grade: '',
  teacher: '',
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
  { label: '正常', value: '正常' },
  { label: '停用', value: '停用' }
]

// 模拟班级数据
const mockClasses = [
  {
    id: 1,
    className: '一年级一班',
    grade: '一年级',
    classNumber: '一班',
    teacher: '张老师',
    studentCount: 35,
    maxStudents: 40,
    classroom: '101教室',
    status: '正常',
    createTime: '2024-09-01',
    description: '一年级一班，班主任张老师'
  },
  {
    id: 2,
    className: '一年级二班',
    grade: '一年级',
    classNumber: '二班',
    teacher: '李老师',
    studentCount: 32,
    maxStudents: 40,
    classroom: '102教室',
    status: '正常',
    createTime: '2024-09-01',
    description: '一年级二班，班主任李老师'
  },
  {
    id: 3,
    className: '二年级一班',
    grade: '二年级',
    classNumber: '一班',
    teacher: '王老师',
    studentCount: 38,
    maxStudents: 40,
    classroom: '201教室',
    status: '正常',
    createTime: '2024-09-01',
    description: '二年级一班，班主任王老师'
  },
  {
    id: 4,
    className: '二年级二班',
    grade: '二年级',
    classNumber: '二班',
    teacher: '赵老师',
    studentCount: 30,
    maxStudents: 40,
    classroom: '202教室',
    status: '正常',
    createTime: '2024-09-01',
    description: '二年级二班，班主任赵老师'
  },
  {
    id: 5,
    className: '三年级一班',
    grade: '三年级',
    classNumber: '一班',
    teacher: '孙老师',
    studentCount: 36,
    maxStudents: 40,
    classroom: '301教室',
    status: '停用',
    createTime: '2024-09-01',
    description: '三年级一班，班主任孙老师'
  }
]

// 计算属性
const filteredData = computed(() => {
  let data = [...mockClasses]
  
  if (searchForm.className) {
    data = data.filter(item => item.className.includes(searchForm.className))
  }
  if (searchForm.grade) {
    data = data.filter(item => item.grade === searchForm.grade)
  }
  if (searchForm.teacher) {
    data = data.filter(item => item.teacher.includes(searchForm.teacher))
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
    className: '',
    grade: '',
    teacher: '',
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
  router.push('/class/add')
}

const handleEdit = (row: any) => {
  ElMessage.info(`编辑班级：${row.className}`)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确定要删除班级 ${row.className} 吗？`,
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
  ElMessage.info(`查看班级详情：${row.className}`)
}

const handleBatchDelete = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的班级')
    return
  }
  
  ElMessageBox.confirm(
    `确定要删除选中的 ${multipleSelection.value.length} 个班级吗？`,
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
    '正常': { type: 'success', color: '#67C23A' },
    '停用': { type: 'danger', color: '#F56C6C' }
  }
  return statusMap[status] || { type: 'info', color: '#909399' }
}

const getStudentCountColor = (count: number, max: number) => {
  const ratio = count / max
  if (ratio >= 0.9) return '#F56C6C'
  if (ratio >= 0.7) return '#E6A23C'
  return '#67C23A'
}

// 生命周期
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="class-list">
    <Breadcrumb />
    
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>班级列表</h3>
            <span class="subtitle">共 {{ pagination.total }} 个班级</span>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加班级
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-form :model="searchForm" inline>
          <el-form-item label="班级名称">
            <el-input
              v-model="searchForm.className"
              placeholder="请输入班级名称"
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
          <el-form-item label="班主任">
            <el-input
              v-model="searchForm.teacher"
              placeholder="请输入班主任姓名"
              clearable
              style="width: 120px"
            />
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
          <el-table-column prop="className" label="班级名称" width="120" />
          <el-table-column prop="grade" label="年级" width="100" />
          <el-table-column prop="classNumber" label="班级" width="80" />
          <el-table-column prop="teacher" label="班主任" width="100" />
          <el-table-column label="学生人数" width="120">
            <template #default="{ row }">
              <span :style="{ color: getStudentCountColor(row.studentCount, row.maxStudents) }">
                {{ row.studentCount }}/{{ row.maxStudents }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="classroom" label="教室" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag 
                :type="getStatusTag(row.status).type"
                effect="light"
              >
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120" />
          <el-table-column prop="description" label="描述" width="200" show-overflow-tooltip />
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
.class-list {
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