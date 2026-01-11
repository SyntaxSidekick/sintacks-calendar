'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { useThemeStore } from '@/store/theme-store'
import { CalendarView } from '@/types/calendar'
import { formatters, navigation } from '@/lib/date-utils'
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'
import { Button } from 'sintacks-design-system'
import { cn } from '@/lib/utils'

interface CalendarHeaderProps {
  onCreateEvent?: () => void
}

export function CalendarHeader({ onCreateEvent }: CalendarHeaderProps) {
  const { view, currentDate, setView, setCurrentDate, goToToday } = useCalendarStore()
  const { theme, toggleTheme } = useThemeStore()

  const handlePrevious = () => {
    switch (view) {
      case 'month':
        setCurrentDate(navigation.prevMonth(currentDate))
        break
      case 'week':
        setCurrentDate(navigation.prevWeek(currentDate))
        break
      case 'day':
        setCurrentDate(navigation.prevDay(currentDate))
        break
    }
  }

  const handleNext = () => {
    switch (view) {
      case 'month':
        setCurrentDate(navigation.nextMonth(currentDate))
        break
      case 'week':
        setCurrentDate(navigation.nextWeek(currentDate))
        break
      case 'day':
        setCurrentDate(navigation.nextDay(currentDate))
        break
    }
  }

  const getTitle = () => {
    switch (view) {
      case 'month':
        return formatters.monthYear(currentDate)
      case 'week':
        return formatters.monthYear(currentDate)
      case 'day':
        return formatters.dateFull(currentDate)
    }
  }

  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-foreground">Sintacks Calendar</h1>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={goToToday}
              variant="outline"
              size="sm"
            >
              Today
            </Button>
            
            <div className="flex items-center border rounded-md">
              <Button
                onClick={handlePrevious}
                variant="ghost"
                size="sm"
                className="rounded-r-none border-r"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleNext}
                variant="ghost"
                size="sm"
                className="rounded-l-none"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-foreground">{getTitle()}</h2>
        </div>

        {/* Right: View Switcher & Create Button */}
        <div className="flex items-center gap-4">
          {/* View Switcher */}
          <div className="flex rounded-lg border bg-muted">
            {(['month', 'week', 'day'] as CalendarView[]).map((v) => (
              <Button
                key={v}
                onClick={() => setView(v)}
                variant={view === v ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'first:rounded-l-lg last:rounded-r-lg rounded-none',
                  view === v && 'bg-primary text-primary-foreground'
                )}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Create Event Button */}
          <Button
            onClick={onCreateEvent}
            variant="default"
            size="sm"
            className="shadow-sm font-semibold"
          >
            + Create
          </Button>
        </div>
      </div>
    </header>
  )
}
