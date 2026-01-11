import { EventColor } from '@/types/calendar'

export const EVENT_COLORS: EventColor[] = [
  {
    id: 'blue',
    name: 'Blue',
    value: '#3b82f6',
    background: 'bg-blue-100',
    border: 'border-blue-500',
    text: 'text-blue-900',
  },
  {
    id: 'purple',
    name: 'Purple',
    value: '#a855f7',
    background: 'bg-purple-100',
    border: 'border-purple-500',
    text: 'text-purple-900',
  },
  {
    id: 'pink',
    name: 'Pink',
    value: '#ec4899',
    background: 'bg-pink-100',
    border: 'border-pink-500',
    text: 'text-pink-900',
  },
  {
    id: 'red',
    name: 'Red',
    value: '#ef4444',
    background: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-900',
  },
  {
    id: 'orange',
    name: 'Orange',
    value: '#f97316',
    background: 'bg-orange-100',
    border: 'border-orange-500',
    text: 'text-orange-900',
  },
  {
    id: 'amber',
    name: 'Amber',
    value: '#f59e0b',
    background: 'bg-amber-100',
    border: 'border-amber-500',
    text: 'text-amber-900',
  },
  {
    id: 'green',
    name: 'Green',
    value: '#10b981',
    background: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-900',
  },
  {
    id: 'teal',
    name: 'Teal',
    value: '#14b8a6',
    background: 'bg-teal-100',
    border: 'border-teal-500',
    text: 'text-teal-900',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    value: '#06b6d4',
    background: 'bg-cyan-100',
    border: 'border-cyan-500',
    text: 'text-cyan-900',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    value: '#6366f1',
    background: 'bg-indigo-100',
    border: 'border-indigo-500',
    text: 'text-indigo-900',
  },
  {
    id: 'slate',
    name: 'Slate',
    value: '#64748b',
    background: 'bg-slate-100',
    border: 'border-slate-500',
    text: 'text-slate-900',
  },
  {
    id: 'gray',
    name: 'Gray',
    value: '#6b7280',
    background: 'bg-gray-100',
    border: 'border-gray-500',
    text: 'text-gray-900',
  },
]

export const getColorById = (colorId: string): EventColor => {
  return EVENT_COLORS.find((c) => c.id === colorId) || EVENT_COLORS[0]
}

export const getColorByValue = (value: string): EventColor | null => {
  return EVENT_COLORS.find((c) => c.value === value) || null
}

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
