export interface CalendarEvent {
  id: string
  title: string
  start: string // ISO 8601 date-time string
  end: string   // ISO 8601 date-time string
  color: string
  description?: string
}

export type CalendarView = 'month' | 'week' | 'day'

export interface EventColor {
  id: string
  name: string
  value: string
  background: string
  border: string
  text: string
}

export interface DragState {
  eventId: string | null
  isResizing: boolean
  isDragging: boolean
  offsetY: number
}

export interface TimeSlot {
  hour: number
  minute: number
  date: Date
}
