// Global type definitions for the application

import { LOCALES, ANALYTICS_EVENTS } from '@/lib/constants'

// Locale types
export type Locale = typeof LOCALES[number]

// Page types
export interface PageContent {
  content?: string
  image?: string
}

export interface PDFPage extends PageContent {
  pageNumber?: number
}

// PDF Upload types
export interface PDFUploadResult {
  success: boolean
  totalPages: number
  pages: Array<{
    image: string
    pageNumber: number
  }>
  metadata: {
    fileName: string
    fileSize: number
    processingDate: string
  }
}

export interface PDFUploadError {
  error: string
  details?: string
}

// Analytics types
export type AnalyticsEventType = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]

export interface AnalyticsEvent {
  eventType: AnalyticsEventType
  eventData?: Record<string, any>
  pdfId?: string
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Flipbook types
export interface FlipBookConfig {
  width?: number
  height?: number
  size?: 'fixed' | 'stretch'
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  autoSize?: boolean
  maxShadowOpacity?: number
  showCover?: boolean
  mobileScrollSupport?: boolean
  clickEventForward?: boolean
  usePortrait?: boolean
  startPage?: number
  startZIndex?: number
  drawShadow?: boolean
  flippingTime?: number
  useMouseEvents?: boolean
  swipeDistance?: number
  showPageCorners?: boolean
  disableFlipByClick?: boolean
  className?: string
  style?: React.CSSProperties
}

// User types (for future authentication)
export interface User {
  id: string
  email?: string
  name?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

// PDF Document types (for database)
export interface PDFDocument {
  id: string
  title: string
  fileName: string
  fileSize: number
  totalPages: number
  storageUrl?: string
  thumbnail?: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  createdAt: Date
  updatedAt: Date
  viewCount: number
  shareCount: number
  userId?: string
}

// Error types
export interface AppError {
  message: string
  code?: string
  statusCode?: number
  details?: any
}

// Form types
export interface UploadFormData {
  file: File
}

// Utility types
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type NonNullableFields<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

// Component prop types
export interface BaseComponentProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export interface IconProps extends BaseComponentProps {
  size?: number | string
  color?: string
}

// Toast/Notification types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Viewport types
export interface Viewport {
  width: number
  height: number
}

// File validation types
export interface FileValidation {
  isValid: boolean
  error?: string
}

// Pagination types
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// Sort types
export type SortDirection = 'asc' | 'desc'

export interface Sort {
  field: string
  direction: SortDirection
}

// Filter types
export interface Filter {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith'
  value: any
}

// Search types
export interface SearchParams {
  query?: string
  filters?: Filter[]
  sort?: Sort
  pagination?: Pagination
}
