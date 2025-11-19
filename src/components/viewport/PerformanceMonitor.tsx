/**
 * PerformanceMonitor - Custom performance display using PerfHeadless data
 * This component should be used OUTSIDE the Canvas, while PerfHeadless is used inside
 */

import { usePerf } from 'r3f-perf'

export interface PerformanceMonitorProps {
  /** Custom className for positioning */
  className?: string
  /** Custom inline styles */
  style?: React.CSSProperties
}

/**
 * Performance display component - use this OUTSIDE Canvas with PerfHeadless inside Canvas
 */
export function PerformanceMonitor({ className = '', style }: PerformanceMonitorProps) {
  const log = usePerf((state) => state.log)

  if (!log) return null

  return (
    <div
      className={`fixed bg-black/80 backdrop-blur-sm text-white text-xs font-mono p-3 rounded-lg border border-gray-700 shadow-xl pointer-events-none ${className}`}
      style={style}
    >
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">FPS:</span>
          <span
            className={
              parseFloat(log.fps) < 30
                ? 'text-red-400'
                : parseFloat(log.fps) < 50
                  ? 'text-yellow-400'
                  : 'text-green-400'
            }
          >
            {parseFloat(log.fps).toFixed(0)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">GPU:</span>
          <span>{parseFloat(log.gpu).toFixed(2)}ms</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">CPU:</span>
          <span>{parseFloat(log.cpu).toFixed(2)}ms</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Mem:</span>
          <span>{parseFloat(log.mem).toFixed(0)}MB</span>
        </div>
      </div>
    </div>
  )
}
