'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ControlsProps } from '../types';

export function Controls({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onFirst,
  onLast,
  onGoToPage,
  disabled = false,
  isFullscreen = false,
  onToggleFullscreen,
}: ControlsProps) {
  const t = useTranslations('BookControls');
  const [pageInput, setPageInput] = useState('');

  const handleGoToPage = () => {
    const page = parseInt(pageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onGoToPage(page - 1); // Convert to 0-indexed
      setPageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  return (
    <div className="controls">
      <div className="controls-header">
        <h3>{t('navigation')}</h3>
        <span className="page-indicator">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button
          onClick={onFirst}
          disabled={disabled || currentPage === 0}
          className="nav-btn"
          title={t('first')}
        >
          ⏮
        </button>
        <button
          onClick={onPrev}
          disabled={disabled || currentPage === 0}
          className="nav-btn"
          title={t('previous')}
        >
          ◀
        </button>
        <button
          onClick={onNext}
          disabled={disabled || currentPage >= totalPages - 1}
          className="nav-btn"
          title={t('next')}
        >
          ▶
        </button>
        <button
          onClick={onLast}
          disabled={disabled || currentPage >= totalPages - 1}
          className="nav-btn"
          title={t('last')}
        >
          ⏭
        </button>
      </div>

      {/* Jump to Page */}
      <div className="jump-to-page">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('jumpToPage')}
          disabled={disabled}
          className="page-input"
        />
        <button onClick={handleGoToPage} disabled={disabled} className="go-btn">
          {t('go')}
        </button>
      </div>

      {/* Fullscreen Toggle */}
      {onToggleFullscreen && (
        <button
          onClick={onToggleFullscreen}
          disabled={disabled}
          className="fullscreen-btn"
          title={isFullscreen ? t('exitFullscreen') : t('fullscreen')}
        >
          {isFullscreen ? '🔲' : '🖥️'} {isFullscreen ? t('exitFullscreen') : t('fullscreen')}
        </button>
      )}
    </div>
  );
}
