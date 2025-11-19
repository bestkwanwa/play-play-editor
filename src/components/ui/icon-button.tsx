/**
 * IconButton - Button with icon and tooltip
 */

import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

export interface IconButtonProps extends Omit<ComponentPropsWithoutRef<typeof Button>, 'children'> {
  /** Icon element */
  icon: ReactNode
  /** Tooltip text */
  tooltip?: string
  /** Whether button is active */
  active?: boolean
}

export function IconButton({
  icon,
  tooltip,
  active = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      size="icon"
      title={tooltip}
      className={cn(className)}
      {...props}
    >
      {icon}
    </Button>
  )
}
