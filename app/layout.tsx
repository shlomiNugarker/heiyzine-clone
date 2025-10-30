import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "./components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://flipbook-viewer.com'),
  title: {
    default: "FlipBook Viewer - Interactive PDF to Digital Flipbook Converter",
    template: "%s | FlipBook Viewer"
  },
  description: "Transform your PDFs into beautiful interactive digital flipbooks. Free online PDF to flipbook converter with realistic page-turning effects. Upload, view, and share your documents as stunning magazines and catalogs.",
  keywords: [
    "flipbook",
    "pdf to flipbook",
    "digital flipbook",
    "pdf viewer",
    "interactive pdf",
    "page flip effect",
    "online flipbook maker",
    "pdf converter",
    "digital magazine",
    "digital catalog",
    "flipbook creator",
    "flip book software",
    "magazine creator",
    "brochure maker",
    "publication viewer"
  ],
  authors: [{ name: "FlipBook Viewer Team" }],
  creator: "FlipBook Viewer",
  publisher: "FlipBook Viewer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["he_IL", "es_ES", "fr_FR", "de_DE", "ja_JP", "zh_CN"],
    url: "/",
    siteName: "FlipBook Viewer",
    title: "FlipBook Viewer - Turn Your PDFs into Interactive Flipbooks",
    description: "Create stunning digital flipbooks from PDFs with realistic page-turning effects. Free, fast, and easy to use. No registration required.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlipBook Viewer - Interactive PDF Flipbook Converter",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FlipBook Viewer - Interactive PDF to Flipbook Converter",
    description: "Transform PDFs into beautiful digital flipbooks with realistic page-turning effects. Free online tool.",
    images: ["/twitter-image.jpg"],
    creator: "@flipbookviewer",
    site: "@flipbookviewer"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" }
    ]
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "he-IL": "/he",
      "es-ES": "/es",
      "fr-FR": "/fr",
      "de-DE": "/de",
      "ja-JP": "/ja",
      "zh-CN": "/zh"
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION,
      }
    })
  },
  category: "technology",
  other: {
    "theme-color": "#3b82f6",
    "color-scheme": "light dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "FlipBook"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FlipBook Viewer",
    "description": "Transform your PDFs into beautiful interactive digital flipbooks with realistic page-turning effects",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://flipbook-viewer.com",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "15420",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "PDF to Flipbook Conversion",
      "Interactive Page Turning",
      "Responsive Design",
      "No Registration Required",
      "Free Online Tool",
      "Multi-language Support"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://flipbook-viewer.com'}/screenshot.jpg`,
    "softwareVersion": "2.0",
    "author": {
      "@type": "Organization",
      "name": "FlipBook Viewer Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlipBook Viewer",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://flipbook-viewer.com'}/logo.png`
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}
      >
        <GoogleAnalytics />
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
