import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CalendarEvent, CalendarView } from '@/types/calendar'
import { startOfToday, parseISO } from 'date-fns'

interface CalendarStore {
  events: CalendarEvent[]
  view: CalendarView
  currentDate: Date
  selectedEventId: string | null
  isEventModalOpen: boolean

  // Event operations
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  getEvent: (id: string) => CalendarEvent | undefined
  getEventsForDate: (date: Date) => CalendarEvent[]
  getEventsInRange: (start: Date, end: Date) => CalendarEvent[]

  // View & navigation
  setView: (view: CalendarView) => void
  setCurrentDate: (date: Date) => void
  goToToday: () => void

  // Modal operations
  openEventModal: (eventId?: string) => void
  closeEventModal: () => void
}

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, get) => ({
      events: [],
      view: 'month',
      currentDate: startOfToday(),
      selectedEventId: null,
      isEventModalOpen: false,

      addEvent: (event) => {
        const newEvent: CalendarEvent = {
          ...event,
          id: generateId(),
        }
        set((state) => ({
          events: [...state.events, newEvent],
        }))
      },

      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updates } : event
          ),
        }))
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
          selectedEventId: state.selectedEventId === id ? null : state.selectedEventId,
        }))
      },

      getEvent: (id) => {
        return get().events.find((event) => event.id === id)
      },

      getEventsForDate: (date) => {
        const events = get().events
        const dateStr = date.toISOString().split('T')[0]
        
        return events.filter((event) => {
          const eventStart = parseISO(event.start)
          const eventStartStr = eventStart.toISOString().split('T')[0]
          return eventStartStr === dateStr
        })
      },

      getEventsInRange: (start, end) => {
        const events = get().events
        
        return events.filter((event) => {
          const eventStart = parseISO(event.start)
          const eventEnd = parseISO(event.end)
          
          return (
            (eventStart >= start && eventStart < end) ||
            (eventEnd > start && eventEnd <= end) ||
            (eventStart < start && eventEnd > end)
          )
        })
      },

      setView: (view) => set({ view }),

      setCurrentDate: (date) => set({ currentDate: date }),

      goToToday: () => set({ currentDate: startOfToday() }),

      openEventModal: (eventId) => {
        set({
          selectedEventId: eventId || null,
          isEventModalOpen: true,
        })
      },

      closeEventModal: () => {
        set({
          isEventModalOpen: false,
          selectedEventId: null,
        })
      },
    }),
    {
      name: 'sintacks-calendar-storage',
      partialize: (state) => ({
        events: state.events,
        view: state.view,
      }),
    }
  )
)
