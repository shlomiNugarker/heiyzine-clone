import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { generateMetadata as generateMeta, structuredData } from '../lib/config';
import { SUPPORTED_LOCALES } from '../lib/constants';
import type { LocaleParams, Locale } from '../types';
import '../styles/globals.css';

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return generateMeta(locale);
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params as { locale: Locale };

  // Validate locale
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  // Get translations
  const messages = await getMessages();

  // Determine text direction
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
