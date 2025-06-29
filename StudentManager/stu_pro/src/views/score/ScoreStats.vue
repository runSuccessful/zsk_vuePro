<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { DataAnalysis, PieChart, Histogram, TrendCharts, Download, Refresh, Filter, View } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

// 筛选条件
const filterForm = reactive({
  grade: '',
  class: '',
  subject: '',
  examType: ''
})

// 统计数据
const statsData = ref({
  totalStudents: 0,
  totalScores: 0,
  averageScore: 0,
  passRate: 0,
  excellentRate: 0
})

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
  { id: 1, studentId: '2024001', studentName: '张三', grade: '六年级', class: '一班', subject: '语文', examType: '期中考试', score: 85.5, totalScore: 100 },
  { id: 2, studentId: '2024001', studentName: '张三', grade: '六年级', class: '一班', subject: '数学', examType: '期中考试', score: 92.0, totalScore: 100 },
  { id: 3, studentId: '2024002', studentName: '李四', grade: '六年级', class: '一班', subject: '语文', examType: '期中考试', score: 78.0, totalScore: 100 },
  { id: 4, studentId: '2024002', studentName: '李四', grade: '六年级', class: '一班', subject: '数学', examType: '期中考试', score: 88.5, totalScore: 100 },
  { id: 5, studentId: '2024003', studentName: '王五', grade: '六年级', class: '一班', subject: '语文', examType: '期中考试', score: 95.0, totalScore: 100 },
  { id: 6, studentId: '2024003', studentName: '王五', grade: '六年级', class: '一班', subject: '数学', examType: '期中考试', score: 76.0, totalScore: 100 }
]

// 计算属性
const filteredData = computed(() => {
  let data = [...mockScores]
  
  if (filterForm.grade) {
    data = data.filter(item => item.grade === filterForm.grade)
  }
  if (filterForm.class) {
    data = data.filter(item => item.class === filterForm.class)
  }
  if (filterForm.subject) {
    data = data.filter(item => item.subject === filterForm.subject)
  }
  if (filterForm.examType) {
    data = data.filter(item => item.examType === filterForm.examType)
  }
  
  return data
})

// 统计计算
const calculateStats = () => {
  const data = filteredData.value
  const totalStudents = new Set(data.map(item => item.studentId)).size
  const totalScores = data.length
  const averageScore = data.length > 0 ? (data.reduce((sum, item) => sum + item.score, 0) / data.length).toFixed(1) : '0'
  const passCount = data.filter(item => (item.score / item.totalScore) >= 0.6).length
  const passRate = data.length > 0 ? ((passCount / data.length) * 100).toFixed(1) : '0'
  const excellentCount = data.filter(item => (item.score / item.totalScore) >= 0.9).length
  const excellentRate = data.length > 0 ? ((excellentCount / data.length) * 100).toFixed(1) : '0'
  
  statsData.value = {
    totalStudents: totalStudents,
    totalScores: totalScores,
    averageScore: parseFloat(averageScore),
    passRate: parseFloat(passRate),
    excellentRate: parseFloat(excellentRate)
  }
}

// 成绩分布数据
const scoreDistribution = computed(() => {
  const data = filteredData.value
  const distribution = {
    excellent: 0, // 优秀 90-100
    good: 0,      // 良好 80-89
    medium: 0,    // 中等 70-79
    pass: 0,      // 及格 60-69
    fail: 0       // 不及格 0-59
  }
  
  data.forEach(item => {
    const percentage = (item.score / item.totalScore) * 100
    if (percentage >= 90) distribution.excellent++
    else if (percentage >= 80) distribution.good++
    else if (percentage >= 70) distribution.medium++
    else if (percentage >= 60) distribution.pass++
    else distribution.fail++
  })
  
  return [
    { name: '优秀', value: distribution.excellent, color: '#67C23A' },
    { name: '良好', value: distribution.good, color: '#409EFF' },
    { name: '中等', value: distribution.medium, color: '#E6A23C' },
    { name: '及格', value: distribution.pass, color: '#F56C6C' },
    { name: '不及格', value: distribution.fail, color: '#909399' }
  ]
})

// 科目平均分数据
const subjectAverages = computed(() => {
  const data = filteredData.value
  const subjectMap = new Map<string, number[]>()
  
  data.forEach(item => {
    if (!subjectMap.has(item.subject)) {
      subjectMap.set(item.subject, [])
    }
    subjectMap.get(item.subject)!.push(item.score)
  })
  
  const averages: Array<{subject: string, average: string}> = []
  subjectMap.forEach((scores, subject) => {
    const average = scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length
    averages.push({
      subject: subject,
      average: average.toFixed(1)
    })
  })
  
  return averages.sort((a, b) => parseFloat(b.average) - parseFloat(a.average))
})

// 方法
const handleFilter = () => {
  calculateStats()
  ElMessage.success('统计数据已更新')
}

const handleReset = () => {
  Object.assign(filterForm, {
    grade: '',
    class: '',
    subject: '',
    examType: ''
  })
  calculateStats()
  ElMessage.success('筛选条件已重置')
}

const handleExport = () => {
  ElMessage.success('统计数据导出成功')
}

const handleRefresh = () => {
  calculateStats()
  ElMessage.success('数据已刷新')
}

// 生命周期
onMounted(() => {
  calculateStats()
})
</script>

<template>
  <div class="score-stats">
    <Breadcrumb />
    
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>成绩统计</h3>
            <span class="subtitle">成绩数据分析与统计</span>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="handleFilter">
              <el-icon><Filter /></el-icon>
              筛选
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 筛选区域 -->
      <div class="filter-section">
        <el-form :model="filterForm" inline>
          <el-form-item label="年级">
            <el-select
              v-model="filterForm.grade"
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
              v-model="filterForm.class"
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
              v-model="filterForm.subject"
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
              v-model="filterForm.examType"
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

      <!-- 统计卡片 -->
      <div class="stats-cards">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon><DataAnalysis /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ statsData.totalStudents }}</div>
                <div class="stat-label">参与学生</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon><Document /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ statsData.totalScores }}</div>
                <div class="stat-label">成绩记录</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon><TrendCharts /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ statsData.averageScore }}</div>
                <div class="stat-label">平均分</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon><PieChart /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ statsData.passRate }}%</div>
                <div class="stat-label">及格率</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon><Histogram /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ statsData.excellentRate }}%</div>
                <div class="stat-label">优秀率</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="stat-card">
              <div class="stat-icon">
                <el-icon><View /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ filteredData.length }}</div>
                <div class="stat-label">筛选结果</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 图表区域 -->
      <div class="charts-section">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="chart-card">
              <template #header>
                <div class="chart-header">
                  <span>成绩分布</span>
                </div>
              </template>
              <div class="chart-content">
                <div class="distribution-list">
                  <div 
                    v-for="item in scoreDistribution" 
                    :key="item.name"
                    class="distribution-item"
                  >
                    <div class="distribution-info">
                      <span class="distribution-name">{{ item.name }}</span>
                      <span class="distribution-value">{{ item.value }}人</span>
                    </div>
                    <div class="distribution-bar">
                      <div 
                        class="distribution-fill"
                        :style="{ 
                          width: `${(item.value / Math.max(...scoreDistribution.map(d => d.value))) * 100}%`,
                          backgroundColor: item.color 
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="chart-card">
              <template #header>
                <div class="chart-header">
                  <span>科目平均分</span>
                </div>
              </template>
              <div class="chart-content">
                <div class="subject-list">
                  <div 
                    v-for="(item, index) in subjectAverages" 
                    :key="item.subject"
                    class="subject-item"
                  >
                    <div class="subject-info">
                      <span class="subject-name">{{ item.subject }}</span>
                      <span class="subject-average">{{ item.average }}分</span>
                    </div>
                    <div class="subject-bar">
                      <div 
                        class="subject-fill"
                        :style="{ 
                          width: `${(parseFloat(item.average) / 100) * 100}%`,
                          backgroundColor: index === 0 ? '#67C23A' : 
                                         index === 1 ? '#409EFF' : 
                                         index === 2 ? '#E6A23C' : '#F56C6C'
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 操作按钮区域 -->
      <div class="action-section">
        <div class="action-right">
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出统计
          </el-button>
          <el-button @click="handleRefresh">
            <el-icon><Refresh /></el-icon>
            刷新数据
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.score-stats {
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

.filter-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.stats-cards {
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
}

.stat-icon {
  margin-right: 15px;
  font-size: 24px;
  color: #409EFF;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.charts-section {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chart-header {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.chart-content {
  padding: 20px 0;
}

.distribution-list,
.subject-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.distribution-item,
.subject-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.distribution-info,
.subject-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.distribution-name,
.subject-name {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.distribution-value,
.subject-average {
  font-size: 14px;
  color: #409EFF;
  font-weight: 600;
}

.distribution-bar,
.subject-bar {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.distribution-fill,
.subject-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.action-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .filter-section .el-form {
    flex-direction: column;
  }
  
  .filter-section .el-form-item {
    margin-bottom: 10px;
  }
  
  .stats-cards .el-col {
    margin-bottom: 15px;
  }
  
  .charts-section .el-col {
    margin-bottom: 20px;
  }
  
  .action-section {
    justify-content: center;
  }
}
</style> 