import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FlipBook Viewer - Interactive PDF to Flipbook Converter',
    short_name: 'FlipBook Viewer',
    description: 'Transform your PDFs into beautiful interactive digital flipbooks with realistic page-turning effects',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'any',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['productivity', 'utilities', 'education'],
    screenshots: [
      {
        src: '/screenshot-wide.jpg',
        sizes: '1280x720',
        type: 'image/jpeg',
        form_factor: 'wide'
      },
      {
        src: '/screenshot-narrow.jpg',
        sizes: '750x1334',
        type: 'image/jpeg',
        form_factor: 'narrow'
      }
    ],
    shortcuts: [
      {
        name: 'Upload PDF',
        short_name: 'Upload',
        description: 'Upload a new PDF to convert',
        url: '/?action=upload',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }]
      }
    ],
    related_applications: [],
    prefer_related_applications: false,
    lang: 'en-US',
    dir: 'ltr'
  }
}
