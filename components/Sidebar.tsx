'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { MiniCalendar } from './MiniCalendar'
import { Plus, Search, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'sintacks-design-system'
import { Input } from 'sintacks-design-system'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { openEventModal } = useCalendarStore()
  const [myCalendarsExpanded, setMyCalendarsExpanded] = useState(true)
  const [selectedCalendars, setSelectedCalendars] = useState<Set<string>>(
    new Set(['personal', 'work', 'family'])
  )

  const myCalendars = [
    { id: 'personal', name: 'Personal', color: 'bg-blue-500' },
    { id: 'work', name: 'Work', color: 'bg-purple-500' },
    { id: 'family', name: 'Family', color: 'bg-green-500' },
    { id: 'birthdays', name: 'Birthdays', color: 'bg-pink-500' },
  ]

  const toggleCalendar = (id: string) => {
    const newSelected = new Set(selectedCalendars)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedCalendars(newSelected)
  }

  return (
    <aside className="w-64 shrink-0 border-r border bg-card overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Create Button */}
        <Button
          onClick={() => openEventModal()}
          className="w-full flex items-center justify-start gap-3 rounded-full shadow-sm hover:shadow-md"
          variant="outline"
        >
          <div className="rounded-full bg-primary p-1">
            <Plus className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium">Create</span>
        </Button>

        {/* Mini Calendar */}
        <MiniCalendar />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search for people"
            className="w-full pl-10"
          />
        </div>

        {/* My Calendars */}
        <div className="pt-2">
          <Button
            onClick={() => setMyCalendarsExpanded(!myCalendarsExpanded)}
            className="flex w-full items-center justify-between px-2 h-auto py-1.5"
            variant="ghost"
          >
            <span className="text-sm font-semibold">
              My calendars
            </span>
            {myCalendarsExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {myCalendarsExpanded && (
            <div className="mt-1 space-y-0.5">
              {myCalendars.map((calendar) => (
                <label
                  key={calendar.id}
                  className="flex items-center gap-3 rounded px-2 py-1.5 hover:bg-accent cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCalendars.has(calendar.id)}
                    onChange={() => toggleCalendar(calendar.id)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                  />
                  <div className={cn('h-3 w-3 rounded-sm', calendar.color)} />
                  <span className="text-sm flex-1">
                    {calendar.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 pb-4">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:underline hover:text-foreground transition-colors">
              Terms
            </a>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
