'use client'

import React, { useRef, useState, useCallback } from 'react'
import { useCalendarStore } from '@/store/calendar-store'
import { CalendarEvent } from '@/types/calendar'
import { parseISO, startOfDay, isSameDay, isToday } from 'date-fns'
import {
  calculateEventPosition,
  getTimeFromPosition,
  snapToInterval,
  calculateOverlappingEventPositions,
  formatters,
} from '@/lib/date-utils'
import clsx from 'clsx'
import { hexToRgba } from '@/lib/colors'

interface TimeGridProps {
  days: Date[]
  showWeekdayHeader?: boolean
}

const SLOT_HEIGHT = 60 // 60px per hour
const HOURS = Array.from({ length: 24 }, (_, i) => i)

export function TimeGrid({ days, showWeekdayHeader = true }: TimeGridProps) {
  const { events, openEventModal, addEvent } = useCalendarStore()
  const gridRef = useRef<HTMLDivElement>(null)
  const [dragState, setDragState] = useState<{
    isCreating: boolean
    dayIndex: number | null
    startY: number
    currentY: number
  } | null>(null)

  // Get events for a specific day
  const getEventsForDay = useCallback((day: Date): CalendarEvent[] => {
    const dayStr = day.toISOString().split('T')[0]
    return events.filter((event) => {
      const eventStart = parseISO(event.start)
      const eventStartStr = eventStart.toISOString().split('T')[0]
      return eventStartStr === dayStr
    })
  }, [events])

  // Handle mouse down to start creating an event
  const handleMouseDown = (e: React.MouseEvent, dayIndex: number) => {
    if (e.button !== 0) return // Only left click

    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top

    setDragState({
      isCreating: true,
      dayIndex,
      startY: y,
      currentY: y,
    })
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState?.isCreating || !gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    const y = Math.max(0, Math.min(e.clientY - rect.top, 24 * SLOT_HEIGHT))
    
    setDragState((prev) => prev ? { ...prev, currentY: y } : null)
  }, [dragState])

  const handleMouseUp = useCallback(() => {
    if (!dragState?.isCreating || dragState.dayIndex === null) return

    const day = days[dragState.dayIndex]
    const dayStart = startOfDay(day)

    let startY = Math.min(dragState.startY, dragState.currentY)
    let endY = Math.max(dragState.startY, dragState.currentY)

    // Minimum 15 minutes
    if (endY - startY < SLOT_HEIGHT / 4) {
      endY = startY + SLOT_HEIGHT / 4
    }

    const startTime = snapToInterval(getTimeFromPosition(startY, dayStart, SLOT_HEIGHT))
    const endTime = snapToInterval(getTimeFromPosition(endY, dayStart, SLOT_HEIGHT))

    // Create the event
    addEvent({
      title: 'New Event',
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      color: '#3b82f6',
      description: '',
    })

    setDragState(null)
  }, [dragState, days, addEvent])

  // Add event listeners
  React.useEffect(() => {
    if (dragState?.isCreating) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragState, handleMouseMove, handleMouseUp])

  // Get the current time position for the "now" indicator
  const getNowPosition = (): number | null => {
    const now = new Date()
    const dayStart = startOfDay(now)
    const { top } = calculateEventPosition(now.toISOString(), now.toISOString(), dayStart, SLOT_HEIGHT)
    return top
  }

  const nowPosition = getNowPosition()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Weekday Headers */}
      {showWeekdayHeader && (
        <div className="grid border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" style={{ gridTemplateColumns: `64px repeat(${days.length}, 1fr)` }}>
          <div className="border-r border-gray-200 dark:border-gray-700" />
          {days.map((day, idx) => (
            <div
              key={idx}
              className={clsx(
                'border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-center last:border-r-0',
                isToday(day) && 'bg-blue-50 dark:bg-blue-900/10'
              )}
            >
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {formatters.weekday(day)}
              </div>
              <div
                className={clsx(
                  'mt-1 text-2xl font-semibold',
                  isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                )}
              >
                {formatters.dayOfMonth(day)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Time Grid */}
      <div className="relative flex-1 overflow-auto" ref={gridRef}>
        <div className="grid" style={{ gridTemplateColumns: `64px repeat(${days.length}, 1fr)` }}>
          {/* Time Labels */}
          <div className="sticky left-0 z-10 bg-white dark:bg-gray-800">
            {HOURS.map((hour) => (
              <div key={hour} className="relative border-b border-gray-200 dark:border-gray-700" style={{ height: SLOT_HEIGHT }}>
                <span className="absolute -top-2 right-2 text-xs text-gray-500 dark:text-gray-300">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {days.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day)
            const dayStart = startOfDay(day)
            const positions = calculateOverlappingEventPositions(dayEvents)
            const isDayToday = isToday(day)

            return (
              <div
                key={dayIndex}
                className={clsx(
                  'relative border-r border-gray-200 dark:border-gray-700 last:border-r-0',
                  isDayToday && 'bg-blue-50/30 dark:bg-blue-900/5'
                )}
                onMouseDown={(e) => handleMouseDown(e, dayIndex)}
              >
                {/* Hour Lines */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="border-b border-gray-200 dark:border-gray-700"
                    style={{ height: SLOT_HEIGHT }}
                  />
                ))}

                {/* Events */}
                {dayEvents.map((event) => {
                  const { top, height } = calculateEventPosition(event.start, event.end, dayStart, SLOT_HEIGHT)
                  const position = positions.get(event.id)
                  const width = position ? `${100 / position.totalColumns}%` : '100%'
                  const left = position ? `${(position.column * 100) / position.totalColumns}%` : '0%'

                  return (
                    <button
                      key={event.id}
                      onClick={() => openEventModal(event.id)}
                      className="absolute overflow-hidden rounded-md border-l-4 px-2 py-1 text-left text-xs font-medium shadow-sm transition-all hover:shadow-md hover:z-10"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        width,
                        left,
                        backgroundColor: hexToRgba(event.color, 0.15),
                        borderColor: event.color,
                        color: event.color,
                      }}
                    >
                      <div className="font-semibold truncate">{event.title}</div>
                      <div className="text-[10px] opacity-75">
                        {formatters.time(parseISO(event.start))} - {formatters.time(parseISO(event.end))}
                      </div>
                    </button>
                  )
                })}

                {/* Ghost Event Preview */}
                {dragState?.isCreating && dragState.dayIndex === dayIndex && (
                  <div
                    className="pointer-events-none absolute rounded-md border-2 border-dashed border-blue-400 dark:border-blue-500 bg-blue-100/50 dark:bg-blue-900/30"
                    style={{
                      top: `${Math.min(dragState.startY, dragState.currentY)}px`,
                      height: `${Math.abs(dragState.currentY - dragState.startY)}px`,
                      left: 0,
                      right: 0,
                    }}
                  />
                )}

                {/* Now Indicator */}
                {isDayToday && nowPosition !== null && (
                  <>
                    <div
                      className="absolute left-0 right-0 z-20 h-0.5 bg-red-500"
                      style={{ top: `${nowPosition}px` }}
                    />
                    <div
                      className="absolute z-20 h-3 w-3 rounded-full bg-red-500 -translate-x-1.5"
                      style={{ top: `${nowPosition - 6}px`, left: 0 }}
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Creating Event Indicator */}
        {dragState?.isCreating && dragState.dayIndex !== null && (
          <div className="pointer-events-none fixed bottom-4 right-4 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Creating event...
          </div>
        )}
      </div>
    </div>
  )
}
