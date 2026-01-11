'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { getWeekDays } from '@/lib/date-utils'
import { TimeGrid } from '../TimeGrid'

export function WeekView() {
  const { currentDate } = useCalendarStore()
  const days = getWeekDays(currentDate)

  return (
    <div className="h-full bg-white dark:bg-gray-800">
      <TimeGrid days={days} showWeekdayHeader={true} />
    </div>
  )
}
