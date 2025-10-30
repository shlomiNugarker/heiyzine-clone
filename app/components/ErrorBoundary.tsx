'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // In production, send to Sentry or other error tracking service
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Example: Sentry.captureException(error, { extra: errorInfo })

      // For now, we'll just log it
      console.error('Error caught by ErrorBoundary:', {
        error: error.toString(),
        errorInfo,
        componentStack: errorInfo.componentStack,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '4rem',
              marginBottom: '1rem',
            }}
          >
            😞
          </div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#ef4444',
            }}
          >
            Oops! Something went wrong
          </h1>
          <p
            style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              maxWidth: '500px',
            }}
          >
            We&apos;re sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
          </p>
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <details
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                textAlign: 'left',
                maxWidth: '600px',
                overflow: 'auto',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6'
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Sentry configuration (to be used when Sentry is installed)
export function initSentry() {
  if (typeof window === 'undefined') return

  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured')
    return
  }

  // When Sentry is installed, initialize it here:
  // Sentry.init({
  //   dsn: SENTRY_DSN,
  //   environment: process.env.NODE_ENV,
  //   tracesSampleRate: 1.0,
  //   replaysSessionSampleRate: 0.1,
  //   replaysOnErrorSampleRate: 1.0,
  // })
}
