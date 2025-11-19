/**
 * EditorLayout - Main editor layout with toolbar, sidebars, and viewport
 */

import { ReactNode, useState, cloneElement, isValidElement } from 'react'
import { PerformanceMonitor } from '../viewport/PerformanceMonitor'

export interface EditorLayoutProps {
  /** Toolbar content */
  toolbar?: ReactNode
  /** Left sidebar content */
  leftSidebar?: ReactNode
  /** Right sidebar content */
  rightSidebar?: ReactNode
  /** Right sidebar width (needed for performance panel positioning) */
  rightSidebarWidth?: number
  /** Main viewport content */
  children: ReactNode
  /** Custom className */
  className?: string
  /** Whether to show performance monitor */
  showPerf?: boolean
}

export function EditorLayout({
  toolbar,
  leftSidebar,
  rightSidebar,
  rightSidebarWidth = 320,
  children,
  className = '',
  showPerf = false,
}: EditorLayoutProps) {
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)

  // Clone rightSidebar element to inject onCollapsedChange callback
  const enhancedRightSidebar = isValidElement(rightSidebar)
    ? cloneElement(
        rightSidebar as React.ReactElement<{ onCollapsedChange?: (collapsed: boolean) => void }>,
        {
          onCollapsedChange: setRightSidebarCollapsed,
        }
      )
    : rightSidebar

  // Calculate performance panel position based on right sidebar state
  const perfPanelRight = rightSidebarCollapsed ? 20 : rightSidebarWidth + 20

  return (
    <div className={`w-full h-full relative bg-gray-900 ${className}`}>
      {/* Canvas Layer (底层) - No z-index to avoid creating stacking context */}
      <div className="absolute inset-0">{children}</div>

      {/* Toolbar (浮动在画布上方) */}
      {toolbar && <div className="absolute top-0 left-0 right-0 z-20">{toolbar}</div>}

      {/* Left Sidebar (浮动在画布上方) */}
      {leftSidebar && <div className="absolute left-0 top-12 bottom-0 z-20">{leftSidebar}</div>}

      {/* Right Sidebar (浮动在画布上方) */}
      {enhancedRightSidebar && (
        <div className="absolute right-0 top-12 bottom-0 z-20">{enhancedRightSidebar}</div>
      )}

      {/* Performance Monitor - follows right sidebar */}
      {showPerf && (
        <PerformanceMonitor
          className="top-[60px] transition-all duration-300"
          style={{ right: `${perfPanelRight}px` }}
        />
      )}
    </div>
  )
}
