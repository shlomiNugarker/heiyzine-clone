'use client';

import { useState, useRef } from "react";
import ReactPageFlipBook, { FlipBookRef } from "./components/ReactPageFlipBook";
import Sidebar from "./components/Sidebar";

export default function Home() {
  // דוגמת דפים - תוכל להחליף עם תוכן משלך
  const defaultPages = [
    {
      content: "📚 My Digital Book", // כריכה
    },
    {
      content: "Welcome to your digital flipbook! This is an interactive book viewer built with React and Next.js.",
    },
    {
      content: "You can add any content you want here - text, images, or even custom React components.",
    },
    {
      content: "The flipbook is fully responsive and works great on mobile devices. Try swiping to turn pages!",
    },
    {
      content: "Click the buttons below to navigate, or click on the page numbers to jump to a specific page.",
    },
    {
      content: "You can customize the appearance, animation speed, shadows, and many other properties.",
    },
    {
      content: "Add as many pages as you need. The component will automatically handle pagination.",
    },
    {
      content: "Perfect for digital magazines, portfolios, catalogs, or any document you want to display beautifully.",
    },
    {
      content: "Enjoy creating your interactive flipbook experience!",
    },
    {
      content: "✨ The End", // כריכה אחורית
    },
  ];

  const [pages, setPages] = useState<Array<{ content?: string; image?: string }>>(defaultPages);
  const [currentPage, setCurrentPage] = useState(0);
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginRight: '320px', // Space for sidebar
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          overflow: 'hidden',
        }}
      >
        <ReactPageFlipBook
          ref={bookRef}
          pages={pages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        totalPages={pages.length}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onFirstPage={handleFirstPage}
        onLastPage={handleLastPage}
        onJumpToPage={handleJumpToPage}
        onPDFLoad={handlePDFLoad}
      />
    </div>
  );
}
