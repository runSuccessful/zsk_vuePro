# 学生管理系统

一个基于 Vue 3 + TypeScript + Element Plus 的现代化学生管理系统，提供完整的学生信息管理、班级管理、成绩管理等功能。

## 🚀 功能特性

### 用户管理
- ✅ 用户登录/注册
- ✅ 验证码验证
- ✅ 个人信息管理
- ✅ 密码修改
- ✅ 登录状态管理

### 学生管理
- ✅ 学生列表查看
- ✅ 添加新学生
- ✅ 学生信息统计
- ✅ 学生信息搜索

### 班级管理
- ✅ 班级列表查看
- ✅ 添加新班级
- ✅ 班级信息管理

### 成绩管理
- ✅ 成绩录入
- ✅ 成绩查询
- ✅ 成绩统计分析

### 系统功能
- ✅ 响应式布局设计
- ✅ 面包屑导航
- ✅ 侧边栏菜单折叠
- ✅ 路由守卫
- ✅ 404 页面处理

## 🛠️ 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **UI 组件库**: Element Plus
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **样式**: CSS3 + Flexbox
- **包管理**: npm

## 📁 项目结构

```
StudentManager/
├── stu_pro/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/           # 静态资源
│   │   │   ├── login-bg.svg  # 登录页背景
│   │   │   └── vue.svg
│   │   ├── components/       # 公共组件
│   │   │   ├── Breadcrumb.vue
│   │   │   ├── HelloWorld.vue
│   │   │   └── PageHeader.vue
│   │   ├── layout/          # 布局组件
│   │   │   ├── Header.vue
│   │   │   ├── Layout.vue
│   │   │   └── Sidebar.vue
│   │   ├── router/          # 路由配置
│   │   │   └── index.ts
│   │   ├── types/           # TypeScript 类型定义
│   │   │   └── index.ts
│   │   ├── utils/           # 工具函数
│   │   │   └── index.ts
│   │   ├── views/           # 页面组件
│   │   │   ├── class/       # 班级管理页面
│   │   │   ├── score/       # 成绩管理页面
│   │   │   ├── student/     # 学生管理页面
│   │   │   ├── ChangePassword.vue
│   │   │   ├── Home.vue
│   │   │   ├── Login.vue
│   │   │   ├── NotFound.vue
│   │   │   ├── Profile.vue
│   │   │   ├── Register.vue
│   │   │   └── SystemSettings.vue
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
cd stu_pro
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🔐 默认登录信息

- **用户名**: zskyyds
- **密码**: 123456

## 📱 页面说明

### 登录页面
- 美观的渐变背景设计
- 验证码验证功能
- 表单验证

### 主页面
- 响应式布局
- 可折叠侧边栏
- 面包屑导航
- 用户下拉菜单

### 功能页面
- **学生管理**: 学生列表、添加学生、学生统计
- **班级管理**: 班级列表、添加班级
- **成绩管理**: 成绩录入、成绩查询、成绩统计
- **系统设置**: 系统配置管理

## 🎨 界面特色

- 现代化的 UI 设计
- 响应式布局，支持多种设备
- 流畅的动画效果
- 直观的用户交互

## 🔧 开发说明

### 路径别名
项目配置了 `@` 路径别名，指向 `src` 目录：
```typescript
import Component from '@/components/Component.vue'
```

### 路由守卫
- 未登录用户自动跳转到登录页
- 已登录用户访问登录/注册页自动跳转到首页

### 组件结构
- 采用组件化开发
- 布局组件与业务组件分离
- 统一的样式规范

## 📝 更新日志

### v1.0.0
- ✅ 完成基础项目搭建
- ✅ 实现用户登录注册功能
- ✅ 完成主要页面组件开发
- ✅ 配置路由和导航
- ✅ 实现响应式布局

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

⭐ 如果这个项目对您有帮助，请给它一个星标！ 
