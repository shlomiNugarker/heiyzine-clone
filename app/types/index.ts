// Application Type Definitions

import type { PageFlip } from 'page-flip';

// PDF Processing Types
export interface PageData {
  imageUrl: string;
  width: number;
  height: number;
}

export interface PDFProcessorState {
  pages: PageData[];
  isLoading: boolean;
  error: string | null;
  progress: number;
}

export interface PDFProcessorHook extends PDFProcessorState {
  processFile: (file: File) => Promise<void>;
  reset: () => void;
}

// FlipBook Types
export interface FlipBookState {
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
}

export interface FlipBookControls {
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  goToPage: (page: number) => void;
}

export interface FlipBookHook extends FlipBookState, FlipBookControls {
  bookRef: React.RefObject<HTMLDivElement | null>;
  pageFlipInstance: PageFlip | null;
}

// Component Props
export interface FlipBookStateCallback {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  goToPage: (page: number) => void;
}

export interface FlipBookProps {
  pages: PageData[];
  onStateChange?: (state: FlipBookStateCallback) => void;
}

export interface ControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  onGoToPage: (page: number) => void;
  disabled?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export interface PDFUploadProps {
  onUpload: (pages: PageData[]) => void;
  isLoading?: boolean;
}

// Locale Types
export type Locale = 'en' | 'he' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

export interface LocaleParams {
  params: Promise<{ locale: Locale }>;
}
