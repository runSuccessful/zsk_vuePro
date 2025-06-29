<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  User, School, Document, Bell, Plus, Search, 
  DataAnalysis, Setting, Calendar, Trophy, TrendCharts,
  CircleCheck, InfoFilled, WarningFilled, CircleClose, Refresh
} from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const router = useRouter()

// 统计数据
const statsData = ref({
  studentCount: 1234,
  classCount: 45,
  avgScore: 89.5,
  notificationCount: 12
})

// 快捷操作
const quickActions = ref([
  { title: '添加学生', icon: Plus, path: '/student/add', color: '#409EFF' },
  { title: '学生列表', icon: User, path: '/student/list', color: '#67C23A' },
  { title: '成绩录入', icon: Document, path: '/score/input', color: '#E6A23C' },
  { title: '成绩查询', icon: Search, path: '/score/query', color: '#F56C6C' },
  { title: '班级管理', icon: School, path: '/class/list', color: '#909399' },
  { title: '系统设置', icon: Setting, path: '/settings', color: '#9C27B0' }
])

// 最近活动
const recentActivities = ref([
  { time: '10:30', action: '张三 添加了新的学生信息', type: 'success' },
  { time: '09:15', action: '李老师 录入了数学成绩', type: 'info' },
  { time: '08:45', action: '王主任 创建了新班级', type: 'warning' },
  { time: '昨天', action: '系统自动备份完成', type: 'success' },
  { time: '昨天', action: '期末考试安排已发布', type: 'info' }
])

// 图表配置
const studentTrendOption = ref({
  title: {
    text: '学生数量趋势',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '学生数量',
      type: 'line',
      smooth: true,
      data: [1200, 1220, 1250, 1280, 1310, 1234],
      itemStyle: {
        color: '#409EFF'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
          ]
        }
      }
    }
  ]
})

const scoreDistributionOption = ref({
  title: {
    text: '成绩分布',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '成绩分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 335, name: '优秀(90-100)', itemStyle: { color: '#67C23A' } },
        { value: 310, name: '良好(80-89)', itemStyle: { color: '#409EFF' } },
        { value: 234, name: '中等(70-79)', itemStyle: { color: '#E6A23C' } },
        { value: 135, name: '及格(60-69)', itemStyle: { color: '#F56C6C' } },
        { value: 120, name: '不及格(<60)', itemStyle: { color: '#909399' } }
      ]
    }
  ]
})

const classSizeOption = ref({
  title: {
    text: '班级人数统计',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
  },
  yAxis: {
    type: 'value',
    name: '人数'
  },
  series: [
    {
      name: '班级人数',
      type: 'bar',
      data: [45, 42, 38, 35, 32, 28],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#409EFF' },
            { offset: 1, color: '#67C23A' }
          ]
        }
      }
    }
  ]
})

// 方法
const handleQuickAction = (action: any) => {
  router.push(action.path)
}

const refreshData = () => {
  ElMessage.success('数据已刷新')
  // 这里可以添加实际的数据刷新逻辑
}

const getActivityIcon = (type: string) => {
  const iconMap: Record<string, any> = {
    success: CircleCheck,
    info: InfoFilled,
    warning: WarningFilled,
    error: CircleClose
  }
  return iconMap[type] || InfoFilled
}

const getActivityColor = (type: string) => {
  const colorMap: Record<string, string> = {
    success: '#67C23A',
    info: '#409EFF',
    warning: '#E6A23C',
    error: '#F56C6C'
  }
  return colorMap[type] || '#909399'
}
</script>

<template>
  <div class="home">
    <Breadcrumb />
    
    <div class="home-content">
      <!-- 统计卡片 -->
      <el-row :gutter="20" class="stats-row">
        <el-col :span="6">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-item">
              <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #409EFF, #67C23A)">
                <el-icon class="stat-icon"><User /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statsData.studentCount.toLocaleString() }}</div>
                <div class="stat-label">学生总数</div>
                <div class="stat-trend">
                  <el-icon color="#67C23A"><TrendCharts /></el-icon>
                  <span style="color: #67C23A">+2.8%</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-item">
              <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #E6A23C, #F56C6C)">
                <el-icon class="stat-icon"><School /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statsData.classCount }}</div>
                <div class="stat-label">班级总数</div>
                <div class="stat-trend">
                  <el-icon color="#67C23A"><TrendCharts /></el-icon>
                  <span style="color: #67C23A">+1.2%</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-item">
              <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #67C23A, #409EFF)">
                <el-icon class="stat-icon"><Trophy /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statsData.avgScore }}</div>
                <div class="stat-label">平均成绩</div>
                <div class="stat-trend">
                  <el-icon color="#67C23A"><TrendCharts /></el-icon>
                  <span style="color: #67C23A">+1.5%</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-item">
              <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #F56C6C, #E6A23C)">
                <el-icon class="stat-icon"><Bell /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statsData.notificationCount }}</div>
                <div class="stat-label">通知消息</div>
                <div class="stat-trend">
                  <el-icon color="#F56C6C"><TrendCharts /></el-icon>
                  <span style="color: #F56C6C">-3</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 图表区域 -->
      <el-row :gutter="20" class="charts-row">
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="studentTrendOption" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="scoreDistributionOption" />
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="charts-row">
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="classSizeOption" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <div class="quick-actions">
              <div class="section-title">
                <el-icon><DataAnalysis /></el-icon>
                <span>快捷操作</span>
              </div>
              <div class="actions-grid">
                <div 
                  v-for="action in quickActions" 
                  :key="action.title"
                  class="action-item"
                  @click="handleQuickAction(action)"
                >
                  <div class="action-icon" :style="{ backgroundColor: action.color }">
                    <el-icon><component :is="action.icon" /></el-icon>
                  </div>
                  <div class="action-title">{{ action.title }}</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 最近活动 -->
      <el-row :gutter="20" class="activity-row">
        <el-col :span="24">
          <el-card shadow="hover" class="activity-card">
            <template #header>
              <div class="card-header">
                <div class="section-title">
                  <el-icon><Calendar /></el-icon>
                  <span>最近活动</span>
                </div>
                <el-button type="primary" size="small" @click="refreshData">
                  <el-icon><Refresh /></el-icon>
                  刷新
                </el-button>
              </div>
            </template>
            <div class="activity-list">
              <div 
                v-for="(activity, index) in recentActivities" 
                :key="index"
                class="activity-item"
              >
                <div class="activity-time">{{ activity.time }}</div>
                <div class="activity-icon" :style="{ color: getActivityColor(activity.type) }">
                  <el-icon><component :is="getActivityIcon(activity.type)" /></el-icon>
                </div>
                <div class="activity-content">{{ activity.action }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 0;
}

.home-content {
  background-color: #f0f2f5;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 28px;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 4px;
}

.charts-row {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart {
  height: 300px;
}

.quick-actions {
  padding: 20px;
  height: 300px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  gap: 8px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.action-item:hover {
  background: #fff;
  border-color: #409EFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: white;
  font-size: 20px;
}

.action-title {
  font-size: 14px;
  color: #606266;
  text-align: center;
}

.activity-row {
  margin-bottom: 20px;
}

.activity-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-list {
  max-height: 300px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  width: 80px;
  font-size: 12px;
  color: #909399;
  text-align: center;
}

.activity-icon {
  width: 40px;
  text-align: center;
  margin: 0 15px;
}

.activity-content {
  flex: 1;
  font-size: 14px;
  color: #606266;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-row .el-col {
    margin-bottom: 15px;
  }
  
  .charts-row .el-col {
    margin-bottom: 15px;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .chart {
    height: 250px;
  }
}
</style> 