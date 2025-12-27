/**
 * Tipos TypeScript para la aplicación de finanzas personales
 *
 * @module lib/api/types
 */

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  title: string
  amount: number
  type: TransactionType
  category: string
  date: string
  description?: string
  receipt_url?: string
  userId: string
  createdAt?: string
}

export interface TransactionInput {
  title: string
  amount: number
  type: TransactionType
  category: string
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
  type?: TransactionType
  category?: string
  userId?: string
}

export type SortField = 'date' | 'amount' | 'title'
export type SortOrder = 'asc' | 'desc'

export interface SortOptions {
  field: SortField
  order: SortOrder
}

// Tipos para Login (ReqRes)
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface User {
  id: string
  email: string
  name?: string
}
