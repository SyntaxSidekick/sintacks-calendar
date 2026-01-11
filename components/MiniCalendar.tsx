'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { formatters, isToday, isSameMonth } from '@/lib/date-utils'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

export function MiniCalendar() {
  const { currentDate, setCurrentDate, setView } = useCalendarStore()
  const [viewDate, setViewDate] = useState(currentDate)

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewDate)),
    end: endOfWeek(endOfMonth(viewDate)),
  })

  const handleDateClick = (date: Date) => {
    setCurrentDate(date)
    setView('day')
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatters.monthYear(viewDate)}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setViewDate(subMonths(viewDate, 1))}
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setViewDate(addMonths(viewDate, 1))}
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div
            key={idx}
            className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isDayToday = isToday(day)
          const isCurrentMonth = isSameMonth(day, viewDate)

          return (
            <button
              key={idx}
              onClick={() => handleDateClick(day)}
              className={clsx(
                'aspect-square flex items-center justify-center rounded-full text-xs transition-colors',
                isDayToday
                  ? 'bg-blue-600 text-white font-semibold'
                  : isCurrentMonth
                  ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'text-gray-400 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              )}
            >
              {formatters.dayOfMonth(day)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
