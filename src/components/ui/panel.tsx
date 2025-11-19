/**
 * Panel - Collapsible panel container
 */

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

export interface PanelProps {
  /** Panel title */
  title?: string
  /** Panel content */
  children: ReactNode
  /** Whether panel is initially collapsed */
  defaultCollapsed?: boolean
  /** Whether panel is collapsible */
  collapsible?: boolean
  /** Custom className */
  className?: string
}

export function Panel({
  title,
  children,
  defaultCollapsed = false,
  collapsible = true,
  className = '',
}: PanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const handleToggle = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className={cn('', className)}>
      {title && (
        <div
          className={cn(
            'px-3 py-2 flex items-center justify-between',
            collapsible && 'cursor-pointer hover:bg-gray-800/50 rounded'
          )}
          onClick={handleToggle}
        >
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
          {collapsible && (
            <svg
              className={cn(
                'w-3 h-3 text-gray-500 transition-transform',
                isCollapsed ? 'rotate-0' : 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      )}
      {!isCollapsed && <div className="px-3 py-2 space-y-1">{children}</div>}
    </div>
  )
}
