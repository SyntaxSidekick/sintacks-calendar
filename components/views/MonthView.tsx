'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { getMonthViewDays, isSameMonth, isToday, formatters } from '@/lib/date-utils'
import { CalendarEvent } from '@/types/calendar'
import { parseISO } from 'date-fns'
import clsx from 'clsx'
import { hexToRgba } from '@/lib/colors'

export function MonthView() {
  const { currentDate, events, openEventModal, setView, setCurrentDate } = useCalendarStore()
  const days = getMonthViewDays(currentDate)

  const getEventsForDay = (day: Date): CalendarEvent[] => {
    const dayStr = day.toISOString().split('T')[0]
    return events.filter((event) => {
      const eventStart = parseISO(event.start)
      const eventStartStr = eventStart.toISOString().split('T')[0]
      return eventStartStr === dayStr
    }).slice(0, 3) // Show max 3 events
  }

  const getMoreEventsCount = (day: Date): number => {
    const dayStr = day.toISOString().split('T')[0]
    const count = events.filter((event) => {
      const eventStart = parseISO(event.start)
      const eventStartStr = eventStart.toISOString().split('T')[0]
      return eventStartStr === dayStr
    }).length
    return Math.max(0, count - 3)
  }

  const handleDayClick = (day: Date) => {
    setCurrentDate(day)
    setView('day')
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid flex-1 grid-cols-7 grid-rows-[repeat(auto-fit,minmax(0,1fr))] overflow-auto">
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(day)
          const moreCount = getMoreEventsCount(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isDayToday = isToday(day)

          return (
            <div
              key={idx}
              className={clsx(
                'border-b border-r border-gray-200 dark:border-gray-700 p-2 last:border-r-0',
                'min-h-[120px] transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer',
                !isCurrentMonth && 'bg-gray-50/50 dark:bg-gray-900/30 text-gray-400 dark:text-gray-500'
              )}
              onClick={() => handleDayClick(day)}
            >
              {/* Day Number */}
              <div className="mb-1 flex justify-end">
                <span
                  className={clsx(
                    'flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium',
                    isDayToday
                      ? 'bg-blue-600 text-white'
                      : isCurrentMonth
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 dark:text-gray-500'
                  )}
                >
                  {formatters.dayOfMonth(day)}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      openEventModal(event.id)
                    }}
                    className="w-full rounded px-2 py-1 text-left text-xs font-medium transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: hexToRgba(event.color, 0.2),
                      borderLeft: `3px solid ${event.color}`,
                      color: event.color,
                    }}
                  >
                    <div className="truncate">
                      {formatters.time(parseISO(event.start))} {event.title}
                    </div>
                  </button>
                ))}

                {moreCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDayClick(day)
                    }}
                    className="w-full px-2 py-1 text-left text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    +{moreCount} more
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
