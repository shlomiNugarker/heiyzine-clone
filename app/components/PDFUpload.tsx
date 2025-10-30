'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePDFProcessor } from '../hooks/usePDFProcessor';
import type { PDFUploadProps } from '../types';

export function PDFUpload({ onUpload, isLoading: externalLoading }: PDFUploadProps) {
  const t = useTranslations('PDFUploader');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { processFile, isLoading, error, progress, pages } = usePDFProcessor();

  const loading = isLoading || externalLoading;

  // Handle file processing
  const handleFile = async (file: File) => {
    await processFile(file);
  };

  // Notify parent when processing is complete
  useEffect(() => {
    if (pages.length > 0 && !isLoading) {
      onUpload(pages);
    }
  }, [pages, isLoading, onUpload]);

  // File input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pdf-upload">
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${loading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={loading}
        />

        {loading ? (
          <div className="upload-progress">
            <div className="spinner" />
            <p>{t('processing')}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-text">{progress}%</p>
          </div>
        ) : (
          <div className="upload-content">
            <div className="upload-icon">📄</div>
            <p className="upload-title">{t('title')}</p>
            <p className="upload-subtitle">{t('dragDrop')}</p>
            <button className="upload-button" type="button">
              {t('browse')}
            </button>
          </div>
        )}
      </div>

      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
