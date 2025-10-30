'use client';

import { useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
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
  // Basic settings with defaults
  const width = props.width ?? 400;
  const height = props.height ?? 600;
  const pages = props.pages ?? [];

  // Size settings with defaults based on width and height
  const size = props.size ?? 'fixed';
  const minWidth = props.minWidth ?? Math.floor(width * 0.5);
  const maxWidth = props.maxWidth ?? width * 2;
  const minHeight = props.minHeight ?? Math.floor(height * 0.5);
  const maxHeight = props.maxHeight ?? height;
  const autoSize = props.autoSize ?? false;

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      isolation: 'isolate',
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
