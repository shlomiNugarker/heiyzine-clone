'use client';

import React from 'react';
import PDFUploader from './PDFUploader';
import BookControls from './BookControls';

interface SidebarProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onJumpToPage: (page: number) => void;
  onPDFLoad: (pages: Array<{ content: string; image?: string }>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  onJumpToPage,
  onPDFLoad,
}) => {
  return (
    <div
      style={{
        width: '320px',
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e5e7eb',
        boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >
      {/* Header with gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem 1.5rem',
          color: '#ffffff',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              margin: 0,
            }}
          >
            FlipBook
          </h2>
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            margin: 0,
            opacity: 0.9,
          }}
        >
          Interactive document viewer
        </p>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        {/* PDF Uploader Section */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <h3
              style={{
                fontSize: '0.938rem',
                fontWeight: 600,
                margin: 0,
                color: '#1f2937',
              }}
            >
              Upload Document
            </h3>
          </div>
          <div style={{
            padding: '1.25rem',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            border: '2px dashed #d1d5db',
            transition: 'all 0.2s ease',
          }}>
            <PDFUploader onPDFLoad={onPDFLoad} />
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)',
        }} />

        {/* Navigation Controls Section */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <h3
              style={{
                fontSize: '0.938rem',
                fontWeight: 600,
                margin: 0,
                color: '#1f2937',
              }}
            >
              Navigation Controls
            </h3>
          </div>
          <BookControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onJumpToPage={onJumpToPage}
          />
        </div>
      </div>

      {/* Footer with Tip */}
      <div
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          borderTop: '1px solid #c7d2fe',
        }}
      >
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'start',
        }}>
          <div style={{
            fontSize: '1.25rem',
            flexShrink: 0,
          }}>
            💡
          </div>
          <div>
            <p
              style={{
                fontSize: '0.813rem',
                color: '#4338ca',
                margin: 0,
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              <strong>Pro Tip:</strong> Click page corners, use keyboard arrows, or swipe to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
