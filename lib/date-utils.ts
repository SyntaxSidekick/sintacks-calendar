import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addDays,
  addMonths,
  addWeeks,
  subMonths,
  subWeeks,
  subDays,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  parseISO,
  setHours,
  setMinutes,
  differenceInMinutes,
  addMinutes,
  getHours,
  getMinutes,
} from 'date-fns'

/**
 * Get all days in a month view grid (includes days from prev/next months)
 */
export function getMonthViewDays(date: Date): Date[] {
  const start = startOfWeek(startOfMonth(date))
  const end = endOfWeek(endOfMonth(date))
  return eachDayOfInterval({ start, end })
}

/**
 * Get all days in a week
 */
export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date)
  const end = endOfWeek(date)
  return eachDayOfInterval({ start, end })
}

/**
 * Get time slots for a day (15-minute increments)
 */
export function getTimeSlots(date: Date): Date[] {
  const slots: Date[] = []
  const start = startOfDay(date)
  
  // 24 hours * 4 slots per hour = 96 slots
  for (let i = 0; i < 96; i++) {
    slots.push(addMinutes(start, i * 15))
  }
  
  return slots
}

/**
 * Snap a time to the nearest 15-minute increment
 */
export function snapToInterval(date: Date, intervalMinutes: number = 15): Date {
  const minutes = getMinutes(date)
  const snappedMinutes = Math.round(minutes / intervalMinutes) * intervalMinutes
  return setMinutes(date, snappedMinutes)
}

/**
 * Calculate the position and height of an event in a time grid
 */
export function calculateEventPosition(
  startTime: string,
  endTime: string,
  dayStart: Date,
  slotHeight: number = 60 // height of 1 hour in pixels
): { top: number; height: number } {
  const start = parseISO(startTime)
  const end = parseISO(endTime)
  
  const minutesFromDayStart = differenceInMinutes(start, dayStart)
  const duration = differenceInMinutes(end, start)
  
  const top = (minutesFromDayStart / 60) * slotHeight
  const height = Math.max((duration / 60) * slotHeight, slotHeight / 4) // minimum 15 min height
  
  return { top, height }
}

/**
 * Get position from mouse Y coordinate to time
 */
export function getTimeFromPosition(
  yPosition: number,
  dayStart: Date,
  slotHeight: number = 60
): Date {
  const hours = yPosition / slotHeight
  const totalMinutes = hours * 60
  return addMinutes(dayStart, totalMinutes)
}

/**
 * Check if two date ranges overlap
 */
export function doEventsOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const s1 = parseISO(start1)
  const e1 = parseISO(end1)
  const s2 = parseISO(start2)
  const e2 = parseISO(end2)
  
  return s1 < e2 && e1 > s2
}

/**
 * Get overlapping events and calculate their offset positions
 */
export function calculateOverlappingEventPositions(
  events: Array<{ id: string; start: string; end: string }>
): Map<string, { column: number; totalColumns: number }> {
  const positions = new Map<string, { column: number; totalColumns: number }>()
  
  // Sort events by start time
  const sorted = [...events].sort((a, b) => 
    parseISO(a.start).getTime() - parseISO(b.start).getTime()
  )
  
  // Find overlapping groups
  const groups: typeof sorted[] = []
  
  for (const event of sorted) {
    let added = false
    
    for (const group of groups) {
      // Check if event overlaps with any event in the group
      const overlaps = group.some((e) =>
        doEventsOverlap(event.start, event.end, e.start, e.end)
      )
      
      if (overlaps) {
        group.push(event)
        added = true
        break
      }
    }
    
    if (!added) {
      groups.push([event])
    }
  }
  
  // Assign positions within each group
  for (const group of groups) {
    const totalColumns = group.length
    group.forEach((event, index) => {
      positions.set(event.id, {
        column: index,
        totalColumns,
      })
    })
  }
  
  return positions
}

/**
 * Format utilities
 */
export const formatters = {
  monthYear: (date: Date) => format(date, 'MMMM yyyy'),
  dayOfMonth: (date: Date) => format(date, 'd'),
  weekday: (date: Date) => format(date, 'EEE'),
  fullWeekday: (date: Date) => format(date, 'EEEE'),
  time: (date: Date) => format(date, 'h:mm a'),
  time24: (date: Date) => format(date, 'HH:mm'),
  dateShort: (date: Date) => format(date, 'MMM d'),
  dateFull: (date: Date) => format(date, 'MMMM d, yyyy'),
}

/**
 * Navigation helpers
 */
export const navigation = {
  nextMonth: (date: Date) => addMonths(date, 1),
  prevMonth: (date: Date) => subMonths(date, 1),
  nextWeek: (date: Date) => addWeeks(date, 1),
  prevWeek: (date: Date) => subWeeks(date, 1),
  nextDay: (date: Date) => addDays(date, 1),
  prevDay: (date: Date) => subDays(date, 1),
}

/**
 * Date comparison helpers
 */
export {
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  parseISO,
  setHours,
  setMinutes,
}
