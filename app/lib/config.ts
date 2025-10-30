// Application Configuration - Metadata, SEO, and default content

import type { Metadata } from 'next';
import type { PageData } from '../types';

// Base URL - Update this for production
const BASE_URL = 'https://flipbook-viewer.vercel.app';

// Default Flipbook Pages (before PDF upload)
// Leave empty to show upload prompt first
export const DEFAULT_PAGES: PageData[] = [];

// SEO Metadata Generator
export function generateMetadata(locale: string): Metadata {
  const titles: Record<string, string> = {
    en: 'FlipBook Viewer - Interactive PDF Reader',
    he: 'מציג ספר דיגיטלי - קורא PDF אינטראקטיבי',
    es: 'Visor de FlipBook - Lector PDF Interactivo',
    fr: 'Visionneuse FlipBook - Lecteur PDF Interactif',
    de: 'FlipBook Viewer - Interaktiver PDF-Reader',
    ja: 'フリップブックビューア - インタラクティブPDFリーダー',
    zh: '翻页书查看器 - 交互式PDF阅读器',
  };

  const descriptions: Record<string, string> = {
    en: 'Transform your PDFs into beautiful interactive flipbooks. Upload and read documents with realistic page-turning animation.',
    he: 'המר את קבצי ה-PDF שלך לספרים דיגיטליים אינטראקטיביים. העלה וקרא מסמכים עם אנימציית הפיכת דפים ריאליסטית.',
    es: 'Transforma tus PDFs en hermosos flipbooks interactivos. Sube y lee documentos con animación realista de volteo de páginas.',
    fr: 'Transformez vos PDF en magnifiques flipbooks interactifs. Téléchargez et lisez des documents avec une animation de tournage de pages réaliste.',
    de: 'Verwandeln Sie Ihre PDFs in wunderschöne interaktive Flipbooks. Laden Sie Dokumente hoch und lesen Sie sie mit realistischer Seitenumschlag-Animation.',
    ja: 'PDFを美しいインタラクティブなフリップブックに変換します。リアルなページめくりアニメーションでドキュメントをアップロードして読むことができます。',
    zh: '将您的PDF转换为精美的交互式翻页书。上传并阅读具有逼真翻页动画的文档。',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    keywords: 'flipbook, pdf viewer, interactive reader, page flip, digital book, pdf reader',
    authors: [{ name: 'FlipBook Viewer Team' }],
    creator: 'FlipBook Viewer',
    publisher: 'FlipBook Viewer',
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: BASE_URL,
      siteName: 'FlipBook Viewer',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

// Structured Data (JSON-LD)
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FlipBook Viewer',
  description: 'Interactive PDF flipbook reader with realistic page-turning animation',
  url: BASE_URL,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};
