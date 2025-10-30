'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="fixed bottom-0 left-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-0" style={{ width: 'calc(100vw - 320px)' }}>
      <div className="px-4 py-2">
        <div className="flex items-center justify-center text-center">
          <p className="text-xs text-gray-600">
            {t('createdBy')}{' '}
            <a
              href="https://shlomi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              shlomi.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
