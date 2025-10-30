'use client';

import type { SidebarProps } from '../types';
import { SIDEBAR_WIDTH_OPEN, SIDEBAR_WIDTH_COLLAPSED } from '../lib/constants';

export function Sidebar({ isOpen, onToggle, children }: SidebarProps) {
  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}
      style={{
        width: isOpen ? `${SIDEBAR_WIDTH_OPEN}px` : `${SIDEBAR_WIDTH_COLLAPSED}px`,
      }}
    >
      {/* Header Section with Toggle */}
      <div className="sidebar-header">
        {isOpen && (
          <div className="sidebar-title">
            <span className="sidebar-icon">📚</span>
            <span className="sidebar-title-text">FlipBook Viewer</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="sidebar-toggle"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`toggle-icon ${isOpen ? 'open' : 'collapsed'}`}
          >
            <path
              d="M12 4L6 10L12 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      {isOpen && (
        <div className="sidebar-content">
          <div className="sidebar-content-wrapper">{children}</div>
        </div>
      )}
    </aside>
  );
}
