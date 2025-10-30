'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import type { FlipBookHook, PageData } from '../types';

export function useFlipBook(pages: PageData[]): FlipBookHook {
  const bookRef = useRef<HTMLDivElement>(null);
  const [pageFlipInstance, setPageFlipInstance] = useState<PageFlip | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Initialize PageFlip instance
  useEffect(() => {
    if (!bookRef.current || pages.length === 0) return;

    // Calculate average dimensions for consistent display
    const avgWidth = pages.reduce((sum, page) => sum + page.width, 0) / pages.length;
    const avgHeight = pages.reduce((sum, page) => sum + page.height, 0) / pages.length;

    // Create PageFlip instance with actual dimensions from PDF
    const pageFlip = new PageFlip(bookRef.current, {
      width: avgWidth,
      height: avgHeight,
      size: 'stretch' as const,
      showCover: true, // Display first page alone and centered
    });

    // Load images (extract URLs from PageData)
    const imageUrls = pages.map(page => page.imageUrl);
    pageFlip.loadFromImages(imageUrls);

    // Event listeners
    pageFlip.on('flip', (e) => {
      if (typeof e.data === 'number') {
        setCurrentPage(e.data);
      }
    });

    pageFlip.on('changeState', (e) => {
      if (typeof e.data === 'string') {
        setIsFlipping(e.data === 'flipping');
      }
    });

    pageFlip.on('init', () => {
      setTotalPages(pageFlip.getPageCount());
      setCurrentPage(pageFlip.getCurrentPageIndex());
    });

    setPageFlipInstance(pageFlip);

    // Cleanup
    return () => {
      pageFlip.destroy();
      setPageFlipInstance(null);
    };
  }, [pages]);

  // Navigation functions
  const nextPage = useCallback(() => {
    pageFlipInstance?.flipNext();
  }, [pageFlipInstance]);

  const prevPage = useCallback(() => {
    pageFlipInstance?.flipPrev();
  }, [pageFlipInstance]);

  const firstPage = useCallback(() => {
    pageFlipInstance?.turnToPage(0);
  }, [pageFlipInstance]);

  const lastPage = useCallback(() => {
    if (pageFlipInstance) {
      const lastIndex = pageFlipInstance.getPageCount() - 1;
      pageFlipInstance.turnToPage(lastIndex);
    }
  }, [pageFlipInstance]);

  const goToPage = useCallback(
    (page: number) => {
      if (pageFlipInstance && page >= 0 && page < totalPages) {
        pageFlipInstance.turnToPage(page);
      }
    },
    [pageFlipInstance, totalPages]
  );

  return {
    bookRef,
    pageFlipInstance,
    currentPage,
    totalPages,
    isFlipping,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    goToPage,
  };
}
