<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { User, PieChart as PieIcon, Histogram, DataAnalysis } from '@element-plus/icons-vue'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

// 总览数据
const overview = ref([
  { icon: User, label: '学生总数', value: 1234, color: '#409EFF' },
  { icon: PieIcon, label: '男生比例', value: '54%', color: '#67C23A' },
  { icon: PieIcon, label: '女生比例', value: '46%', color: '#E6A23C' },
  { icon: DataAnalysis, label: '在读学生', value: 1100, color: '#F56C6C' }
])

// 年级分布
const gradeBarOption = ref({
  title: { text: '年级分布', left: 'center', textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['一年级','二年级','三年级','四年级','五年级','六年级'] },
  yAxis: { type: 'value' },
  series: [{
    name: '人数',
    type: 'bar',
    data: [180, 200, 210, 220, 210, 214],
    itemStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#409EFF' },
          { offset: 1, color: '#67C23A' }
        ]
      }
    }
  }]
})

// 性别比例
const genderPieOption = ref({
  title: { text: '性别比例', left: 'center', textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: '性别',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    label: { show: false, position: 'center' },
    emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold' } },
    labelLine: { show: false },
    data: [
      { value: 666, name: '男生', itemStyle: { color: '#409EFF' } },
      { value: 568, name: '女生', itemStyle: { color: '#E6A23C' } }
    ]
  }]
})

// 各班人数
const classBarOption = ref({
  title: { text: '各班人数', left: 'center', textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['一班','二班','三班','四班','五班'] },
  yAxis: { type: 'value' },
  series: [{
    name: '人数',
    type: 'bar',
    data: [45, 42, 38, 35, 32],
    itemStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#67C23A' },
          { offset: 1, color: '#409EFF' }
        ]
      }
    }
  }]
})

// 状态分布
const statusPieOption = ref({
  title: { text: '学生状态分布', left: 'center', textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: '状态',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    label: { show: false, position: 'center' },
    emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold' } },
    labelLine: { show: false },
    data: [
      { value: 1100, name: '在读', itemStyle: { color: '#67C23A' } },
      { value: 50, name: '休学', itemStyle: { color: '#E6A23C' } },
      { value: 30, name: '退学', itemStyle: { color: '#F56C6C' } },
      { value: 54, name: '毕业', itemStyle: { color: '#909399' } }
    ]
  }]
})
</script>

<template>
  <div class="student-stats">
    <Breadcrumb />
    <div class="stats-content">
      <!-- 总览卡片 -->
      <el-row :gutter="20" class="overview-row">
        <el-col :span="6" v-for="item in overview" :key="item.label">
          <el-card shadow="hover" class="overview-card">
            <div class="overview-item">
              <el-icon :style="{ background: item.color, color: '#fff' }" class="overview-icon">
                <component :is="item.icon" />
              </el-icon>
              <div class="overview-info">
                <div class="overview-value">{{ item.value }}</div>
                <div class="overview-label">{{ item.label }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 图表区域 -->
      <el-row :gutter="20" class="charts-row">
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="gradeBarOption" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="genderPieOption" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="charts-row">
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="classBarOption" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <v-chart class="chart" :option="statusPieOption" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.student-stats {
  padding: 0;
}

.stats-content {
  background: #f0f2f5;
  border-radius: 8px;
  padding: 10px 0 0 0;
}

.overview-row {
  margin-bottom: 20px;
}

.overview-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}

.overview-item {
  display: flex;
  align-items: center;
  padding: 18px 10px;
}

.overview-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-right: 16px;
}

.overview-info {
  flex: 1;
}

.overview-value {
  font-size: 22px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.overview-label {
  font-size: 14px;
  color: #909399;
}

.charts-row {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}

.chart {
  height: 300px;
}

@media (max-width: 768px) {
  .overview-row .el-col,
  .charts-row .el-col {
    margin-bottom: 15px;
  }
  .chart {
    height: 220px;
  }
}
</style> 