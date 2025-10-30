'use client';

import React, { useRef, useState } from 'react';

interface PDFUploaderProps {
  onPDFLoad: (pages: Array<{ content: string; image?: string }>) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onPDFLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a valid PDF file');
      return;
    }

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Dynamically import pdfjs-dist directly
      const pdfjsLib = await import('pdfjs-dist');

      // Set worker from CDN - use jsdelivr as it's more reliable
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      // Load PDF using pdfjs-dist directly
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      const pages: Array<{ content: string; image?: string }> = [];

      // Extract pages as images
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imageData = canvas.toDataURL('image/png');
        pages.push({
          content: `Page ${i}`,
          image: imageData,
        });
      }

      onPDFLoad(pages);

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Error loading PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        onClick={handleClick}
        disabled={isProcessing}
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#ffffff',
          background: isProcessing
            ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
            : 'linear-gradient(135deg, #6366f1, #ec4899)',
          border: 'none',
          borderRadius: '8px',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.3s ease',
          opacity: isProcessing ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isProcessing) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isProcessing) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
          }
        }}
      >
        {isProcessing ? '⏳ Processing...' : '📄 Upload PDF'}
      </button>
    </div>
  );
};

export default PDFUploader;
