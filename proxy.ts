import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Rate limiting map (in-memory for development, use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiter (100 requests per minute per IP)
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 100;
  const window = 60 * 1000; // 1 minute

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Next.js 16+ proxy function (replaces middleware)
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip proxy for static files and certain routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/favicon') ||
    pathname.includes('/manifest') ||
    pathname.includes('/robots') ||
    pathname.includes('/sitemap') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2|ttf|eot|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!rateLimit(ip)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain',
          'Retry-After': '60'
        }
      });
    }
  }

  // Apply next-intl middleware for internationalization
  const intlResponse = intlMiddleware(request);

  // Add security headers
  intlResponse.headers.set('X-Robots-Tag', 'index, follow');

  return intlResponse;
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
};
