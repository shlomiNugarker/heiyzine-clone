// Site configuration
export const SITE_CONFIG = {
  name: 'FlipBook Viewer',
  description: 'Transform your PDFs into beautiful interactive digital flipbooks',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://flipbook-viewer.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/flipbookviewer',
    github: 'https://github.com/flipbookviewer',
  },
} as const

// Supported locales
export const LOCALES = ['en', 'he', 'es', 'fr', 'de', 'ja', 'zh'] as const
export const DEFAULT_LOCALE = 'en' as const

export type Locale = typeof LOCALES[number]

// PDF processing configuration
export const PDF_CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxFileSizeClient: 20 * 1024 * 1024, // 20MB for client-side processing
  allowedMimeTypes: ['application/pdf'],
  scale: 2.0, // Scale factor for rendering quality
  imageFormat: 'jpeg' as const,
  imageQuality: 0.85,
} as const

// Analytics event types
export const ANALYTICS_EVENTS = {
  PDF_UPLOAD: 'pdf_upload',
  PDF_VIEW: 'pdf_view',
  PAGE_TURN: 'page_turn',
  PDF_DOWNLOAD: 'pdf_download',
  PDF_SHARE: 'pdf_share',
  ERROR: 'error',
} as const

// API endpoints
export const API_ENDPOINTS = {
  PDF_PROCESS: '/api/pdf/process',
  ANALYTICS_TRACK: '/api/analytics/track',
} as const

// Rate limiting
export const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // max 100 requests per minute per IP
} as const

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  static: 60 * 60 * 24 * 365, // 1 year
  api: 0, // no cache
  page: 60 * 60, // 1 hour
  image: 60 * 60 * 24 * 30, // 30 days
} as const

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Z-index layers
export const Z_INDEX = {
  base: 0,
  sidebar: 10,
  modal: 50,
  dropdown: 40,
  overlay: 45,
  tooltip: 60,
} as const
