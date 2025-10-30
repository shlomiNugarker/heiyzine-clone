'use client';

import { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';

type PageOrientation = 'portrait' | 'landscape';
type PageState = 'user_fold' | 'fold_corner' | 'flipping' | 'read';

interface ReactPageFlipBookProps {
  // Basic settings
  width?: number;
  height?: number;
  pages?: Array<{
    content?: string;
    image?: string;
  }>;

  // Size settings
  size?: 'fixed' | 'stretch';
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  autoSize?: boolean;

  // Page settings
  startPage?: number;
  showCover?: boolean;
  drawShadow?: boolean;
  maxShadowOpacity?: number;

  // Animation settings
  flippingTime?: number;

  // Orientation settings
  usePortrait?: boolean;

  // Interaction settings
  useMouseEvents?: boolean;
  clickEventForward?: boolean;
  mobileScrollSupport?: boolean;
  swipeDistance?: number;
  showPageCorners?: boolean;
  disableFlipByClick?: boolean;

  // Other settings
  startZIndex?: number;
  renderOnlyPageLengthChange?: boolean;

  // Events
  onPageChange?: (page: number) => void;
  onChangeOrientation?: (orientation: PageOrientation) => void;
  onChangeState?: (state: PageState) => void;
  onInit?: (state: { page: number; mode: PageOrientation }) => void;
  onUpdate?: (state: { page: number; mode: PageOrientation }) => void;
}

export interface FlipBookRef {
  pageFlip: () => unknown;
  nextPage: () => void;
  prevPage: () => void;
  flipToPage: (page: number) => void;
  getCurrentPage: () => number;
  getTotalPages: () => number;
}

const ReactPageFlipBook = forwardRef<FlipBookRef, ReactPageFlipBookProps>((props, ref) => {
  // Calculate dynamic height based on viewport
  const [bookDimensions, setBookDimensions] = useState({ width: 400, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      // Only calculate on client side
      if (typeof window === 'undefined' || !containerRef.current) return;

      // Get the actual container dimensions
      const containerRect = containerRef.current.getBoundingClientRect();

      // Use minimal margins to maximize book size (only 4px on each side for breathing room)
      const horizontalMargin = 8; // 4px on each side
      const verticalMargin = 8; // 4px top and bottom

      // Make sure we don't exceed viewport height
      const maxContainerHeight = Math.min(containerRect.height, window.innerHeight);

      const availableWidth = containerRect.width - horizontalMargin;
      const availableHeight = maxContainerHeight - verticalMargin;

      // Page aspect ratio (A4: 0.707 = width/height)
      const pageAspectRatio = 0.707;

      // Strategy: Maximize book size by prioritizing height first (fill the screen vertically)
      let pageHeight = availableHeight;
      let pageWidth = pageHeight * pageAspectRatio;

      // Check if two pages side-by-side fit in the available width
      const doublePageWidth = pageWidth * 2;

      if (doublePageWidth > availableWidth) {
        // If not, recalculate based on available width (fill horizontally)
        pageWidth = availableWidth / 2;
        pageHeight = pageWidth / pageAspectRatio;
      }

      // Ensure minimum readable size
      const minPageWidth = 200;
      const minPageHeight = 283; // Maintains A4 ratio with min width

      const finalWidth = Math.max(Math.floor(pageWidth), minPageWidth);
      const finalHeight = Math.max(Math.floor(pageHeight), minPageHeight);

      setBookDimensions({
        width: finalWidth,
        height: finalHeight
      });
    };

    // Initial calculation with a small delay to ensure container is rendered
    const initialTimeout = setTimeout(calculateDimensions, 50);

    // Add window resize listener with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateDimensions, 100);
    };
    window.addEventListener('resize', handleResize);

    // Add ResizeObserver to detect container size changes (e.g., when sidebar toggles)
    let resizeObserver: ResizeObserver | null = null;
    let resizeDebounceTimeout: NodeJS.Timeout;

    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        // Debounce the resize calculation to prevent multiple rapid re-renders
        clearTimeout(resizeDebounceTimeout);
        resizeDebounceTimeout = setTimeout(() => {
          calculateDimensions();
        }, 450); // Wait for sidebar animation to complete (400ms) + buffer
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      clearTimeout(resizeDebounceTimeout);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Basic settings with defaults
  const width = props.width ?? bookDimensions.width;
  const height = props.height ?? bookDimensions.height;
  const pages = props.pages ?? [];

  // Size settings with defaults based on width and height
  const size = props.size ?? 'stretch';
  const minWidth = props.minWidth ?? Math.floor(width * 0.5);
  const maxWidth = props.maxWidth ?? width * 2;
  const minHeight = props.minHeight ?? Math.floor(height * 0.5);
  const maxHeight = props.maxHeight ?? height * 2; // Allow larger max to fill screen
  const autoSize = props.autoSize ?? true;

  // Page settings with defaults
  const startPage = props.startPage ?? 0;
  const showCover = props.showCover ?? true;
  const drawShadow = props.drawShadow ?? true;
  const maxShadowOpacity = props.maxShadowOpacity ?? 0.5;

  // Animation settings with defaults
  const flippingTime = props.flippingTime ?? 1000;

  // Orientation settings with defaults
  const usePortrait = props.usePortrait ?? false;

  // Interaction settings with defaults
  const useMouseEvents = props.useMouseEvents ?? true;
  const clickEventForward = props.clickEventForward ?? true;
  const mobileScrollSupport = props.mobileScrollSupport ?? true;
  const swipeDistance = props.swipeDistance ?? 30;
  const showPageCorners = props.showPageCorners ?? true;
  const disableFlipByClick = props.disableFlipByClick ?? false;

  // Other settings with defaults
  const startZIndex = props.startZIndex ?? 0;
  const renderOnlyPageLengthChange = props.renderOnlyPageLengthChange ?? false;

  // Events
  const {
    onPageChange,
    onChangeOrientation,
    onChangeState,
    onInit: onInitProp,
    onUpdate,
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(pages.length);

  useImperativeHandle(ref, () => ({
    pageFlip: () => bookRef.current,
    nextPage: () => bookRef.current?.pageFlip()?.flipNext(),
    prevPage: () => bookRef.current?.pageFlip()?.flipPrev(),
    flipToPage: (page: number) => bookRef.current?.pageFlip()?.flip(page),
    getCurrentPage: () => currentPage,
    getTotalPages: () => totalPages,
  }));

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
    if (onPageChange) {
      onPageChange(e.data);
    }
  }, [onPageChange]);

  const handleChangeOrientation = useCallback((e: { data: PageOrientation }) => {
    if (onChangeOrientation) {
      onChangeOrientation(e.data);
    }
  }, [onChangeOrientation]);

  const handleChangeState = useCallback((e: { data: PageState }) => {
    if (onChangeState) {
      onChangeState(e.data);
    }
  }, [onChangeState]);

  const handleInit = useCallback((e: { data: { page: number; mode: PageOrientation } }) => {
    setTotalPages(pages.length);
    if (onInitProp) {

      
      onInitProp(e.data);
    }
  }, [pages.length, onInitProp]);

  const handleUpdate = useCallback((e: { data: { page: number; mode: PageOrientation } }) => {
    setTotalPages(pages.length);
    if (onUpdate) {
      onUpdate(e.data);
    }
  }, [pages.length, onUpdate]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        isolation: 'isolate',
        overflow: 'hidden',
      }}>
      <HTMLFlipBook
        ref={bookRef}
        width={width}
        height={height}
        size={size}
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        drawShadow={drawShadow}
        flippingTime={flippingTime}
        usePortrait={usePortrait}
        startZIndex={startZIndex}
        autoSize={autoSize}
        maxShadowOpacity={maxShadowOpacity}
        showCover={showCover}
        mobileScrollSupport={mobileScrollSupport}
        clickEventForward={clickEventForward}
        useMouseEvents={useMouseEvents}
        swipeDistance={swipeDistance}
        showPageCorners={showPageCorners}
        disableFlipByClick={disableFlipByClick}
        startPage={startPage}
        renderOnlyPageLengthChange={renderOnlyPageLengthChange}
        className=""
        style={{}}
        onFlip={onFlip}
        onChangeOrientation={handleChangeOrientation}
        onChangeState={handleChangeState}
        onInit={handleInit}
        onUpdate={handleUpdate}
      >
        {pages.map((page, index) => (
          <Page key={index} number={index + 1} image={page.image}>
            {page.content}
          </Page>
        ))}
      </HTMLFlipBook>
    </div>
  );
});

ReactPageFlipBook.displayName = 'ReactPageFlipBook';

export default ReactPageFlipBook;
