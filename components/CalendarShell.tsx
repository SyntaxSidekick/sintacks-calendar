'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { CalendarHeader } from './CalendarHeader'
import { Sidebar } from './Sidebar'
import { MonthView } from './views/MonthView'
import { WeekView } from './views/WeekView'
import { DayView } from './views/DayView'
import { EventEditorModal } from './EventEditorModal'

export function CalendarShell() {
  const { view, openEventModal } = useCalendarStore()

  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthView />
      case 'week':
        return <WeekView />
      case 'day':
        return <DayView />
      default:
        return <MonthView />
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <CalendarHeader onCreateEvent={() => openEventModal()} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-hidden">
          {renderView()}
        </main>
      </div>

      <EventEditorModal />
    </div>
  )
}
