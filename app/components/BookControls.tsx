'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface BookControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onJumpToPage: (page: number) => void;
}

const BookControls: React.FC<BookControlsProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  onJumpToPage,
}) => {
  const t = useTranslations('home.controls');
  const [jumpPage, setJumpPage] = useState('');

  const handleJump = () => {
    const page = parseInt(jumpPage, 10) - 1; // Convert to 0-indexed
    if (!isNaN(page) && page >= 0 && page < totalPages) {
      onJumpToPage(page);
      setJumpPage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJump();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Page Progress Bar */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#6366f1',
          }}>
            {t('pageProgress')}
          </span>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1f2937',
          }}>
            {t('currentPage', { current: currentPage + 1, total: totalPages })}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${((currentPage + 1) / totalPages) * 100}%`,
            height: '100%',
            backgroundColor: '#6366f1',
            transition: 'width 0.3s ease',
            borderRadius: '4px',
          }} />
        </div>
      </div>

      {/* Primary Navigation - Large Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
      }}>
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          style={{
            padding: '0.875rem 1rem',
            backgroundColor: currentPage === 0 ? '#f3f4f6' : '#ffffff',
            color: currentPage === 0 ? '#9ca3af' : '#1f2937',
            border: '2px solid',
            borderColor: currentPage === 0 ? '#e5e7eb' : '#6366f1',
            borderRadius: '8px',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: currentPage === 0 ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 0) {
              e.currentTarget.style.backgroundColor = '#6366f1';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(99, 102, 241, 0.25)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 0) {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#1f2937';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t('previous')}
        </button>

        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages - 1}
          style={{
            padding: '0.875rem 1rem',
            backgroundColor: currentPage >= totalPages - 1 ? '#f3f4f6' : '#6366f1',
            color: currentPage >= totalPages - 1 ? '#9ca3af' : '#ffffff',
            border: '2px solid',
            borderColor: currentPage >= totalPages - 1 ? '#e5e7eb' : '#6366f1',
            borderRadius: '8px',
            cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: currentPage >= totalPages - 1 ? 'none' : '0 1px 3px rgba(99, 102, 241, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages - 1) {
              e.currentTarget.style.backgroundColor = '#4f46e5';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(99, 102, 241, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage < totalPages - 1) {
              e.currentTarget.style.backgroundColor = '#6366f1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(99, 102, 241, 0.3)';
            }
          }}
        >
          {t('next')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Secondary Navigation - Compact Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.5rem',
      }}>
        <button
          onClick={onFirstPage}
          disabled={currentPage === 0}
          style={{
            padding: '0.625rem 0.75rem',
            backgroundColor: 'transparent',
            color: currentPage === 0 ? '#9ca3af' : '#6366f1',
            border: '1px solid',
            borderColor: currentPage === 0 ? '#e5e7eb' : '#e0e7ff',
            borderRadius: '6px',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            fontSize: '0.813rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 0) {
              e.currentTarget.style.backgroundColor = '#eef2ff';
              e.currentTarget.style.borderColor = '#6366f1';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 0) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e0e7ff';
            }
          }}
        >
          ⏮ {t('first')}
        </button>

        <button
          onClick={onLastPage}
          disabled={currentPage >= totalPages - 1}
          style={{
            padding: '0.625rem 0.75rem',
            backgroundColor: 'transparent',
            color: currentPage >= totalPages - 1 ? '#9ca3af' : '#6366f1',
            border: '1px solid',
            borderColor: currentPage >= totalPages - 1 ? '#e5e7eb' : '#e0e7ff',
            borderRadius: '6px',
            cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            fontSize: '0.813rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages - 1) {
              e.currentTarget.style.backgroundColor = '#eef2ff';
              e.currentTarget.style.borderColor = '#6366f1';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage < totalPages - 1) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e0e7ff';
            }
          }}
        >
          {t('last')} ⏭
        </button>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '0.5rem 0',
      }} />

      {/* Jump to Page */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.813rem',
          fontWeight: 600,
          color: '#4b5563',
          marginBottom: '0.5rem',
        }}>
          {t('jumpTo')}
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
        }}>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('placeholder', { total: totalPages })}
            style={{
              flex: 1,
              padding: '0.625rem 0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
              color: '#1f2937',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#6366f1';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={handleJump}
            style={{
              padding: '0.625rem 1.25rem',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(16, 185, 129, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(16, 185, 129, 0.3)';
            }}
          >
            {t('go')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;
