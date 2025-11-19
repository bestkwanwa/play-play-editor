/**
 * Sidebar - Collapsible side panel
 */

import { ReactNode, useState } from 'react'

export interface SidebarProps {
  /** Sidebar content */
  children: ReactNode
  /** Sidebar position */
  position?: 'left' | 'right'
  /** Default width */
  width?: number
  /** Whether sidebar is initially collapsed */
  defaultCollapsed?: boolean
  /** Custom className */
  className?: string
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void
}

export function Sidebar({
  children,
  position = 'left',
  width = 280,
  defaultCollapsed = false,
  className = '',
  onCollapsedChange,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    onCollapsedChange?.(newCollapsed)
  }

  const borderStyles = position === 'left' ? 'border-r' : 'border-l'
  const contentPosition = position === 'left' ? 'left-0' : 'right-0'
  const buttonPosition =
    position === 'left' ? 'rounded-r-md translate-x-full' : 'rounded-l-md -translate-x-full'

  return (
    <div
      className="relative"
      style={{
        height: '100%',
        width: isCollapsed ? 0 : width,
        transition: 'width 300ms',
      }}
    >
      {/* Sidebar Content */}
      <div
        className={`absolute top-0 bottom-0 ${contentPosition} bg-gray-900/98 backdrop-blur-sm ${borderStyles} border-gray-800 overflow-y-auto transition-all duration-300 ${className}`}
        style={{
          width: isCollapsed ? 0 : width,
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? 'none' : 'auto',
        }}
      >
        {children}
      </div>

      {/* Collapse Toggle Button - Always visible */}
      <button
        onClick={toggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 w-6 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center transition-all duration-300 z-10 ${buttonPosition}`}
        style={{
          [position === 'left' ? 'right' : 'left']: 0,
        }}
        title={isCollapsed ? 'Expand' : 'Collapse'}
      >
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={position === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
          />
        </svg>
      </button>
    </div>
  )
}
