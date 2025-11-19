/**
 * Components module - React UI components
 *
 * This module exports all React components used in the 3D editor.
 * Components are organized by feature/domain.
 */

// Viewport components
export {
  Viewport3D,
  Viewport2D,
  DualViewportLayout,
  ViewportHelpers,
  TestPrimitives,
} from './viewport'

export type {
  Viewport3DProps,
  Viewport2DProps,
  DualViewportLayoutProps,
  ViewportMode,
  ViewportHelpersProps,
} from './viewport'

// UI components (shadcn/ui and custom)
export { Button } from './ui/button'
export { Input } from './ui/input'
export { Separator } from './ui/separator'
export { IconButton } from './ui/icon-button'
export { Panel } from './ui/panel'

export type { ButtonProps } from './ui/button'
export type { IconButtonProps } from './ui/icon-button'
export type { PanelProps } from './ui/panel'

// Layout components
export { Toolbar, ToolbarGroup, Sidebar, EditorLayout } from './layout'

export type { ToolbarProps, ToolbarGroupProps, SidebarProps, EditorLayoutProps } from './layout'
