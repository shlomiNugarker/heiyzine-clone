'use client';

import { useEffect, useRef } from 'react';
import { useFlipBook } from '../hooks/useFlipBook';
import type { FlipBookProps } from '../types';

export function FlipBook({ pages, onStateChange }: FlipBookProps) {
  const { bookRef, currentPage, totalPages, nextPage, prevPage, firstPage, lastPage, goToPage } = useFlipBook(pages);

  // Store the functions in a ref to avoid triggering useEffect on every render
  const functionsRef = useRef({ nextPage, prevPage, firstPage, lastPage, goToPage });

  // Update ref when functions change
  useEffect(() => {
    functionsRef.current = { nextPage, prevPage, firstPage, lastPage, goToPage };
  }, [nextPage, prevPage, firstPage, lastPage, goToPage]);

  // Notify parent of state changes (to pass controls)
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        currentPage,
        totalPages,
        nextPage: () => functionsRef.current.nextPage(),
        prevPage: () => functionsRef.current.prevPage(),
        firstPage: () => functionsRef.current.firstPage(),
        lastPage: () => functionsRef.current.lastPage(),
        goToPage: (page: number) => functionsRef.current.goToPage(page),
      });
    }
    // Only run when currentPage or totalPages change
  }, [currentPage, totalPages, onStateChange]);

  if (pages.length === 0) {
    return (
      <div className="flipbook-empty">
        <p>Upload a PDF to get started</p>
      </div>
    );
  }

  return (
    <div className="flipbook-container">
      <div ref={bookRef} className="flipbook" />
    </div>
  );
}
