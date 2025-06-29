// 学生类型定义
export interface Student {
  id: number
  name: string
  studentId: string
  gender: '男' | '女'
  age: number
  classId: number
  phone: string
  email: string
  address: string
  createTime: string
  updateTime: string
}

// 班级类型定义
export interface Class {
  id: number
  name: string
  grade: string
  teacher: string
  studentCount: number
  createTime: string
  updateTime: string
}

// 成绩类型定义
export interface Score {
  id: number
  studentId: number
  subject: string
  score: number
  examTime: string
  createTime: string
  updateTime: string
}

// 用户类型定义
export interface User {
  id: number
  username: string
  name: string
  role: string
  avatar: string
  createTime: string
}

// 分页参数类型
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

// 查询参数类型
export interface QueryParams extends PaginationParams {
  keyword?: string
  [key: string]: any
} 