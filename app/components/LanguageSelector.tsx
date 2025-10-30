'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/routing';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div style={{
      padding: '1rem',
      borderTop: '1px solid #e5e7eb',
    }}>
      <label style={{
        display: 'block',
        fontSize: '0.813rem',
        fontWeight: 600,
        color: '#4b5563',
        marginBottom: '0.75rem',
      }}>
        🌐 Language
      </label>
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.625rem 0.875rem',
          border: '2px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#1f2937',
          backgroundColor: '#ffffff',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none',
          fontWeight: 500,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#6366f1';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
