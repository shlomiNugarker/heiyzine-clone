'use client';

import { useState, useRef } from "react";
import { useTranslations } from 'next-intl';
import ReactPageFlipBook, { FlipBookRef } from "../components/ReactPageFlipBook";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const t = useTranslations('home.defaultPages');

  // דוגמת דפים - תוכל להחליף עם תוכן משלך
  const defaultPages = [
    {
      content: t('cover'), // כריכה
    },
    {
      content: t('welcome'),
    },
    {
      content: t('content1'),
    },
    {
      content: t('content2'),
    },
    {
      content: t('content3'),
    },
    {
      content: t('content4'),
    },
    {
      content: t('content5'),
    },
    {
      content: t('content6'),
    },
    {
      content: t('content7'),
    },
    {
      content: t('end'), // כריכה אחורית
    },
  ];

  const [pages, setPages] = useState<Array<{ content?: string; image?: string }>>(defaultPages);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const bookRef = useRef<FlipBookRef>(null);

  const handlePDFLoad = (pdfPages: Array<{ content: string; image?: string }>) => {
    setPages(pdfPages);
  };

  const handleNextPage = () => {
    bookRef.current?.nextPage();
  };

  const handlePrevPage = () => {
    bookRef.current?.prevPage();
  };

  const handleFirstPage = () => {
    bookRef.current?.flipToPage(0);
  };

  const handleLastPage = () => {
    const totalPages = bookRef.current?.getTotalPages() || 0;
    bookRef.current?.flipToPage(totalPages - 1);
  };

  const handleJumpToPage = (page: number) => {
    bookRef.current?.flipToPage(page);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Main Content Area - Full width, centered */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          // Account for sidebar width to keep book centered
          marginRight: isSidebarOpen ? '320px' : '56px',
          transition: 'margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <ReactPageFlipBook
          ref={bookRef}
          pages={pages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Sidebar - Fixed position */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <Sidebar
          currentPage={currentPage}
          totalPages={pages.length}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onFirstPage={handleFirstPage}
          onLastPage={handleLastPage}
          onJumpToPage={handleJumpToPage}
          onPDFLoad={handlePDFLoad}
          isOpen={isSidebarOpen}
          onToggle={setIsSidebarOpen}
        />
      </div>
    </div>
  );
}
