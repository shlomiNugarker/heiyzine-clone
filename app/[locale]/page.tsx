'use client';

import { useState, useCallback } from 'react';
import { FlipBook } from '../components/FlipBook';
import { PDFUpload } from '../components/PDFUpload';
import { Controls } from '../components/Controls';
import { Sidebar } from '../components/Sidebar';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { DEFAULT_PAGES } from '../lib/config';
import type { FlipBookStateCallback, PageData } from '../types';

export default function HomePage() {
  const [pages, setPages] = useState<PageData[]>(DEFAULT_PAGES);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [flipBookState, setFlipBookState] = useState<FlipBookStateCallback>({
    currentPage: 0,
    totalPages: 0,
    nextPage: () => {},
    prevPage: () => {},
    firstPage: () => {},
    lastPage: () => {},
    goToPage: () => {},
  });

  const handleUpload = useCallback((newPages: PageData[]) => {
    setPages(newPages);
  }, []);

  const handleStateChange = useCallback((state: FlipBookStateCallback) => {
    setFlipBookState(state);
  }, []);

  return (
    <div className="main-container">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
        <PDFUpload onUpload={handleUpload} />

        <Controls
          currentPage={flipBookState.currentPage}
          totalPages={flipBookState.totalPages}
          onNext={flipBookState.nextPage}
          onPrev={flipBookState.prevPage}
          onFirst={flipBookState.firstPage}
          onLast={flipBookState.lastPage}
          onGoToPage={flipBookState.goToPage}
          disabled={pages.length === 0}
        />

        <LanguageSwitch />
      </Sidebar>

      <FlipBook pages={pages} onStateChange={handleStateChange} />
    </div>
  );
}
