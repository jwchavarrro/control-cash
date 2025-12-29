/**
 * Tipos TypeScript para la aplicación de finanzas personales
 *
 * @module lib/api/types
 */

/**
 * Transacciones
 */
export enum ENUM_TRANSACTION_TYPE {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum ENUM_TRANSACTION_CATEGORY {
  // Income categories
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  INVESTMENT = 'Investment',
  BONUS = 'Bonus',
  RENTAL = 'Rental',
  DIVIDENDS = 'Dividends',
  // Expense categories
  FOOD = 'Food',
  SHOPPING = 'Shopping',
  FURNITURE = 'Furniture',
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  TRANSPORT = 'Transport',
  UTILITIES = 'Utilities',
  HEALTH = 'Health',
  ENTERTAINMENT = 'Entertainment',
  EDUCATION = 'Education',
  TRAVEL = 'Travel',
  OTHER = 'Other',
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: ENUM_TRANSACTION_TYPE
  category: ENUM_TRANSACTION_CATEGORY
  date: string
  description?: string
  receipt_url?: string
  userId: string
  createdAt?: string
}

export interface TransactionInput {
  title: string
  amount: number
  type: ENUM_TRANSACTION_TYPE
  category: ENUM_TRANSACTION_CATEGORY
  date: string
  description?: string
  receipt_url?: string
  userId: string
}

export interface DashboardSummary {
  totalIncome: number
  totalExpenses: number
  netBalance: number
}

export interface TransactionFilters {
  type?: ENUM_TRANSACTION_TYPE
  category?: ENUM_TRANSACTION_CATEGORY
  userId?: string
}

// Tipos para Autenticación (MockAPI)
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: UserPublic
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface User {
  id: string
  email: string
  password: string
  name?: string
  createdAt?: string
}

/**
 * Usuario sin información sensible (sin password)
 * Usado para respuestas de API
 */
export interface UserPublic {
  id: string
  email: string
  name?: string
}
