import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales
const locales = ['en', 'he', 'es', 'fr', 'de', 'ja', 'zh']
const defaultLocale = 'en'

// Rate limiting map (in-memory for development, use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Simple rate limiter (100 requests per minute per IP)
function rateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = 100
  const window = 60 * 1000 // 1 minute

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

// Detect user's preferred locale
function getPreferredLocale(request: NextRequest): string {
  // 1. Check URL parameter
  const urlLocale = request.nextUrl.searchParams.get('lang')
  if (urlLocale && locales.includes(urlLocale)) {
    return urlLocale
  }

  // 2. Check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => {
      const [code] = lang.split(';')
      return code.trim().split('-')[0]
    })

    for (const lang of languages) {
      if (locales.includes(lang)) {
        return lang
      }
    }
  }

  return defaultLocale
}

// Next.js 16+ proxy function (replaces middleware)
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip proxy for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/favicon') ||
    pathname.includes('/manifest') ||
    pathname.includes('/robots') ||
    pathname.includes('/sitemap') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2|ttf|eot|css|js)$/)
  ) {
    return NextResponse.next()
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    if (!rateLimit(ip)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain',
          'Retry-After': '60'
        }
      })
    }
  }

  // Detect and store preferred locale (for future i18n implementation)
  // Note: i18n routing is prepared but not yet implemented with [locale] folder structure
  const preferredLocale = getPreferredLocale(request)
  const response = NextResponse.next()

  // Store user's preferred locale in cookie for future use
  if (!request.cookies.get('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', preferredLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })
  }

  // Add security headers (additional to next.config.ts)
  response.headers.set('X-Robots-Tag', 'index, follow')

  return response
}

// Configure which routes to run proxy on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|eot)).*)',
  ],
}
