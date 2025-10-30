'use client';

import React, { useState } from 'react';
import PDFUploader from './PDFUploader';
import BookControls from './BookControls';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onJumpToPage: (page: number) => void;
  onPDFLoad: (pages: Array<{ content: string; image?: string }>) => void;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
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
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  return (
    <div
      style={{
        width: isOpen ? '320px' : '56px',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e5e7eb',
        boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: isOpen ? 'auto' : 'hidden',
        overflowX: 'hidden',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
      }}
    >
      {/* Toggle Button - Always at top */}
      <button
        onClick={handleToggle}
        style={{
          width: '100%',
          height: '56px',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderBottom: isOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          transition: 'all 0.3s ease',
          outline: 'none',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b3fa0 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Sidebar Content - Only show when open */}
      {isOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'auto',
        }}>

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

      {/* Language Selector */}
      <LanguageSelector />

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
      )}
    </div>
  );
};

export default Sidebar;
