import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 导入所有页面组件
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import StudentList from '@/views/student/StudentList.vue'
import AddStudent from '@/views/student/AddStudent.vue'
import StudentStats from '@/views/student/StudentStats.vue'
import ClassList from '@/views/class/ClassList.vue'
import AddClass from '@/views/class/AddClass.vue'
import ScoreInput from '@/views/score/ScoreInput.vue'
import ScoreQuery from '@/views/score/ScoreQuery.vue'
import ScoreStats from '@/views/score/ScoreStats.vue'
import SystemSettings from '@/views/SystemSettings.vue'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册',
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'House',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人信息',
      requiresAuth: true
    }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      title: '修改密码',
      requiresAuth: true
    }
  },
  {
    path: '/student',
    name: 'Student',
    redirect: '/student/list',
    meta: {
      title: '学生管理',
      icon: 'User',
      requiresAuth: true
    },
    children: [
      {
        path: 'list',
        name: 'StudentList',
        component: StudentList,
        meta: {
          title: '学生列表',
          icon: 'List',
          requiresAuth: true
        }
      },
      {
        path: 'add',
        name: 'AddStudent',
        component: AddStudent,
        meta: {
          title: '添加学生',
          icon: 'Plus',
          requiresAuth: true
        }
      },
      {
        path: 'stats',
        name: 'StudentStats',
        component: StudentStats,
        meta: {
          title: '学生统计',
          icon: 'DataAnalysis',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/class',
    name: 'Class',
    redirect: '/class/list',
    meta: {
      title: '班级管理',
      icon: 'School',
      requiresAuth: true
    },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: ClassList,
        meta: {
          title: '班级列表',
          icon: 'List',
          requiresAuth: true
        }
      },
      {
        path: 'add',
        name: 'AddClass',
        component: AddClass,
        meta: {
          title: '添加班级',
          icon: 'Plus',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/score',
    name: 'Score',
    redirect: '/score/input',
    meta: {
      title: '成绩管理',
      icon: 'Document',
      requiresAuth: true
    },
    children: [
      {
        path: 'input',
        name: 'ScoreInput',
        component: ScoreInput,
        meta: {
          title: '成绩录入',
          icon: 'Edit',
          requiresAuth: true
        }
      },
      {
        path: 'query',
        name: 'ScoreQuery',
        component: ScoreQuery,
        meta: {
          title: '成绩查询',
          icon: 'Search',
          requiresAuth: true
        }
      },
      {
        path: 'stats',
        name: 'ScoreStats',
        component: ScoreStats,
        meta: {
          title: '成绩统计',
          icon: 'DataAnalysis',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/settings',
    name: 'SystemSettings',
    component: SystemSettings,
    meta: {
      title: '系统设置',
      icon: 'Setting',
      requiresAuth: true
    }
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 学生管理系统`
  }
  
  // 检查是否需要登录
  const requiresAuth = to.meta.requiresAuth !== false
  const token = localStorage.getItem('token')
  
  if (requiresAuth && !token) {
    // 需要登录但没有token，跳转到登录页
    next('/login')
  } else if (to.path === '/login' && token) {
    // 已登录用户访问登录页，跳转到首页
    next('/')
  } else if (to.path === '/register' && token) {
    // 已登录用户访问注册页，跳转到首页
    next('/')
  } else {
    // 其他情况正常跳转
    next()
  }
})

export default router 