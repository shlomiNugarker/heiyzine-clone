declare module 'page-flip' {
  export type PageOrientation = 'portrait' | 'landscape';
  export type PageState = 'user_fold' | 'fold_corner' | 'flipping' | 'read';
  export type PageDensity = 'soft' | 'hard';
  export type SizeType = 'fixed' | 'stretch';
  export type CornerType = 'top' | 'bottom';

  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: SizeType;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    startPage?: number;
  }

  export interface FlipEvent {
    data: number | string | PageOrientation | PageState | { page: number; mode: PageOrientation };
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);

    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    updateFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    updateFromImages(images: string[]): void;

    destroy(): void;

    flip(page: number, corner?: CornerType): void;
    flipNext(corner?: CornerType): void;
    flipPrev(corner?: CornerType): void;

    turnToPage(page: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;

    getPageCount(): number;
    getCurrentPageIndex(): number;

    on(
      event: 'flip' | 'changeOrientation' | 'changeState' | 'init' | 'update',
      callback: (e: FlipEvent) => void
    ): void;
  }
}
