/**
 * Toolbar - Top toolbar for tools and actions
 */

import { ReactNode } from 'react'

export interface ToolbarProps {
  /** Toolbar content */
  children: ReactNode
  /** Custom className */
  className?: string
}

export function Toolbar({ children, className = '' }: ToolbarProps) {
  return (
    <div
      className={`h-12 bg-gray-900 border-b border-gray-700 px-4 flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </div>
  )
}

export interface ToolbarGroupProps {
  /** Group content */
  children: ReactNode
  /** Custom className */
  className?: string
}

export function ToolbarGroup({ children, className = '' }: ToolbarGroupProps) {
  return <div className={`flex items-center gap-1 ${className}`}>{children}</div>
}
