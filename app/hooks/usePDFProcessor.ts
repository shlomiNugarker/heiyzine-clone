'use client';

import { useState, useCallback } from 'react';
import type { PDFProcessorHook, PageData } from '../types';
import { PDF_RENDER_SCALE } from '../lib/constants';

export function usePDFProcessor(): PDFProcessorHook {
  const [pages, setPages] = useState<PageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const processFile = useCallback(async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);
    setPages([]);

    try {
      // Dynamic import to reduce initial bundle size
      const pdfjsLib = await import('pdfjs-dist');

      // Set worker from jsDelivr CDN (more reliable than cdnjs)
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const newPages: PageData[] = [];

      // Process each page
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: PDF_RENDER_SCALE });

        // Create canvas with actual page dimensions
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Failed to get canvas context');
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render page to canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        // Convert to image and store with dimensions
        const imageDataUrl = canvas.toDataURL('image/png');
        newPages.push({
          imageUrl: imageDataUrl,
          width: viewport.width,
          height: viewport.height,
        });

        // Update progress
        setProgress(Math.round((i / numPages) * 100));
      }

      setPages(newPages);
      setIsLoading(false);
    } catch (err) {
      console.error('Error processing PDF:', err);
      setError(err instanceof Error ? err.message : 'Failed to process PDF');
      setIsLoading(false);
      setPages([]);
    }
  }, []);

  const reset = useCallback(() => {
    setPages([]);
    setIsLoading(false);
    setError(null);
    setProgress(0);
  }, []);

  return {
    pages,
    isLoading,
    error,
    progress,
    processFile,
    reset,
  };
}
