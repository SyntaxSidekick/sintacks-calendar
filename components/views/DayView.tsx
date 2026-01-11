'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { TimeGrid } from '../TimeGrid'

export function DayView() {
  const { currentDate } = useCalendarStore()

  return (
    <div className="h-full bg-white dark:bg-gray-800">
      <TimeGrid days={[currentDate]} showWeekdayHeader={true} />
    </div>
  )
}
