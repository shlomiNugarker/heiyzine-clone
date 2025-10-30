'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseFullscreenHook {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
}

export function useFullscreen(elementRef: React.RefObject<HTMLElement | null>): UseFullscreenHook {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isRequestedRef = useRef(false);

  // Check if fullscreen is currently active
  const checkFullscreen = useCallback(() => {
    const fullscreenElement =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    setIsFullscreen(!!fullscreenElement);
    return !!fullscreenElement;
  }, []);

  // Enter fullscreen mode
  const enterFullscreen = useCallback(async () => {
    if (!elementRef.current || isRequestedRef.current) return;

    try {
      isRequestedRef.current = true;
      const element = elementRef.current;

      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    } finally {
      isRequestedRef.current = false;
    }
  }, [elementRef]);

  // Exit fullscreen mode
  const exitFullscreen = useCallback(async () => {
    if (!checkFullscreen() || isRequestedRef.current) return;

    try {
      isRequestedRef.current = true;

      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    } finally {
      isRequestedRef.current = false;
    }
  }, [checkFullscreen]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (checkFullscreen()) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [checkFullscreen, enterFullscreen, exitFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      checkFullscreen();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [checkFullscreen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F key to toggle fullscreen (not when typing in input)
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          toggleFullscreen();
        }
      }

      // Escape is handled by browser automatically, but we can add additional logic
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFullscreen, exitFullscreen, isFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}
